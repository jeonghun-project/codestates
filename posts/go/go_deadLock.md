# go-DeadLock

golang에서는 concurrency 작업을 수행하기 위해서는 goroutine을 이용하여 작업을 수행한다.

이떄 channel을 통해서 Resource의 이동이 발생하게 하는데

> Resource의 이동이 원할하지 못해서 각각의 Processe가 작업을 수행하지 못하고 대기하는 상태가 되는 것이 DeadLock이다.

```go
func main() {
    a := make(chan string)

    a <- "N" // fatal error : all goroutines are asleep - deadlock!
}
```

**Receiver가 없는 경우**

```go
func main() {
    a:= make(chan string)

    a <- "N" // fatal error : all goroutines are asleep - deadlock!
    <- a 
}
```

**Receiver가 준비되지 않은 경우**

```go
func main() {
    c := make(chan string, 1) // buffered channel
    c <- "Y"
    fmt.Println(<-c, "정상적으로 출력됨") 
}
```

**Buffered channel의 경우에는 Receiver가 준비되지 않아도 Buffer에 보관하기 때문에 정상작동**

```go
func main() {
    c := make(chan string, 1) // buffered channel 

    c <- "Y"
    c <- "Y"  // fatal error : all goroutines are asleep - deadlock!
}
```

**Buffer를 넘어선 경우에도 Deadlock이 발생**

```go
func main() {
    c := make(chan string, 1)
    c <- "Y"
    for v := range c {
        fmt.Println(v) // Y ... fatal error: all goroutines are asleep - deadlock!
    }
}
```

**range로 channel을 순회하기 위해서는 `Close`가 필요하다.**

```go
func fibonacci(n int, c chan int) {
	x, y := 0, 1
	for i := 0; i < n; i++ {
		c <- x
		x, y = y, x+y
	}
	close(c)
}

func main() {
	c := make(chan int, 10)
	go fibonacci(cap(c), c)
	for i := range c {
		fmt.Println(i)
	}
}
```

**위 코드는 정상 작동한다.**

```go
type BatchWriter struct {
	mu   sync.Mutex
	data []int
}

var batchWriter = &BatchWriter{}

func main() {

	go func() {
		for i := 0; i < 1000; i++ {
			batchWriter.data = append(batchWriter.data, 1)
		}
	}()

	go func() {
		for i := 0; i < 1000; i++ {
			batchWriter.data = append(batchWriter.data, 1) 
		}
	}()

	time.Sleep(1 * time.Second)

	fmt.Println(len(batchWriter.data)) // 2000이 출력될 거 같지만 그렇지 않다. 정확한 출력이 나오지 않을때가 많다
}
```

위에 문제 또한 Deadlock은 아니지만 교착상태를 무시한 상태에서 발생하는 Resource가 부정확해 지는 문제를 볼 수 있다.

goroutine 프로세스에서 같은 데이터 Resource를 참조하다 보니 같은 메모리의 데이터를 변경하는 과정중에 **어셈블리어 코드의 순서에 따라서 이전 값을 참조하게 되어서 발생하는 문제이다**


이러한 문제를 방지하기 위해서 Golang 에서는 `Mutex`를 지원한다.

**Mutex**: 뮤텍스입니다. 상호 배제(mutual exclusion)라고 하며 여러 스레드(고루틴)에서 공유되는 데이터를 보호할 때 주로 사용합니다.

[go tour에서 설명하는 Mutex](https://go-tour-ko.appspot.com/concurrency/9)


Mutex를 통해서 Resource를 어떻게 안정적으로 컨트롤할 수 있는지 살펴보도록 하자.

Mutex에는 해당 `goroutine`의 Thread에서 데이터를 `Lock`, `Unlock` 할 수 있다.

아래에서 자세한 사용 법을 알아보자.

```go
type BatchWriter struct {
	mu   sync.Mutex
	data []int
}

var batchWriter = &BatchWriter{}

func main() {

	go func() {
		for i := 0; i < 1000; i++ {
            batchWriter.mu.Lock()
			batchWriter.data = append(batchWriter.data, 1)
            batchWriter.mu.Unlock()
		}
	}()

	go func() {
		for i := 0; i < 1000; i++ {
            batchWriter.mu.Lock()
			batchWriter.data = append(batchWriter.data, 1) 
			batchWriter.mu.Unlock()
		}
	}()

	time.Sleep(1 * time.Second)

	fmt.Println(len(batchWriter.data)) // 2000 확정적으로 출력된다
}
```

이렇게 확정적으로 2000이 출력될 수 있도록 data를 보호 할 수 있다.

하나의 goroutine에서 블럭한 Resource에는 다른 goroutine Thread에서 접근이 불가능해진다.

하지만 이러한 눈에 보이지 않는 **`goroutine schedule` 상에서의 동작 변화나 흐름등을 정확히 Debbuging 하는 것이 굉장히 어렵다.**

이러한 디버깅의 편리를 위해서 **`pprof`를** 통해 시각화된 정보로 흐름을 살펴보거나

**`go-deadlock`같은** 패키지의 도움을 받을 수 있다.

### go-deadlock

[go-deadlock](https://github.com/sasha-s/go-deadlock)github repo에서 자세한 것을 알아볼 수 있다.

goroutine의 Debbuging은 굉장한 Hell이라고 다들 입을 모아 말한다.

go-deadlock은 그러한 문제들을 대부분을 로그를 통해 쉽게 해결할 수 있도록 돕는다.

```
POTENTIAL DEADLOCK: Inconsistent locking. saw this ordering in one goroutine:
happened before
inmem.go:623 bttest.(*server).ReadModifyWriteRow { r.mu.Lock() } <<<<<
inmem_test.go:118 bttest.TestConcurrentMutationsReadModifyAndGC.func4 { _, _ = s.ReadModifyWriteRow(ctx, rmw()) }

happened after
inmem.go:629 bttest.(*server).ReadModifyWriteRow { tbl.mu.RLock() } <<<<<
inmem_test.go:118 bttest.TestConcurrentMutationsReadModifyAndGC.func4 { _, _ = s.ReadModifyWriteRow(ctx, rmw()) }

in another goroutine: happened before
inmem.go:799 bttest.(*table).gc { t.mu.RLock() } <<<<<
inmem_test.go:125 bttest.TestConcurrentMutationsReadModifyAndGC.func5 { tbl.gc() }

happend after
inmem.go:814 bttest.(*table).gc { r.mu.Lock() } <<<<<
inmem_test.go:125 bttest.TestConcurrentMutationsReadModifyAndGC.func5 { tbl.gc() }
```