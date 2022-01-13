# Error

Golang은 error 값으로 오류 상태를 표시한다.

함수는 종종 error 값을 반환하며, 호출 코드는 error가 nil 과 같은지 테스트하여 오류를 처리해야합니다.

```go
i, err := strconv.Atoi("42")
if err != nil { // 에러 점검
    fmt.Printf("couldn't convert number: %v\n", err)
    return
}
fmt.Println("Converted integer:", i)
```

```go
type ErrNegativeSqrt float64

func (e ErrNegativeSqrt) Error() string {
	return fmt.Sprintf("cannot Sqrt negative number: %v",float64(e))
}

func Sqrt(x float64) (float64, error) {
  var result float64

	if x < 0 {
		return 0, ErrNegativeSqrt(x)
	}

  ...

	return result, nil
}

func main() {
	fmt.Println(Sqrt(2))
	fmt.Println(Sqrt(-2))
}

```

## Readers

io 패키지는 데이터 스트림의 읽기를 나타내는 io.Reader 인터페이스를 지정합니다.

io.Reader 인터페이스에는 `Read` 메소드가 있다.

```go
func (T) Read(b []byte) (n int, err error)
```

Read 는 주어진 바이트 조각을 데이터로 체우고 채워진 바이트 수와 오류 값을 반환합니다. 스트림이 종료되면 io.EOF 오류를 반환합니다.

```go
import (
	"io"
	"os"
	"strings"
)

type rot13Reader struct {
	r io.Reader
}

func main() {
	s := strings.NewReader("Lbh penpxrq gur pbqr!")
	r := rot13Reader{s}
	io.Copy(os.Stdout, &r)
}
```

일반적인 패턴은 다른 io.Reader 을 래핑하여 어떤 방식으로든 스트림을 수정하는 io.Reader 입니다.

## images

Package image 는 Image 인터페이스를 정의합니다:

```go
package image

type Image interface {
    ColorModel() color.Model
    Bounds() Rectangle
    At(x, y int) color.Color
}
```

## Goroutines

go 런타임에 의해 관리되는 경량 쓰레드입니다.

```go
go f(x, y, z)
```

새로운 go 런타임을 시작한다.

```go
f(x, y, z)
```

f와 x, y, z의 evaluation은 현재의 goroutine에서 일어나고, f의 실행은 새로운 goroutine에서 일어난다.

goroutine은 같은 주소의 공간에서 실행되고, 따라서 공유된 메모리는 synchronous(동기적) 해야합니다. 

Go에 다른 기본형들이 존재하므로 당신이 Go에서 sync와 관련된 기본 기능이 필요없다하더라도 sync 패키지는 유용한 기본형을 제공합니다.

## Channel

Channel은 당신이 채널 연산자인 `<-` 을 통해 값을 주고 받을 수 있는 하나의 분리된 통로입니다.

```go
ch <- v    // 채널 ch에 v를 전송한다.
v := <-ch  // ch로 부터 값을 받고,
           // 값을 v에 대입한다.
```

(데이터는 화살표의 방향대로 흐릅니다.)

channel은 map과 slice처럼 사용하기 전에 생성되어야만합니다.

```go
ch := make(chan int)
```

기본적으로 전송과 수신은 다른 한 쪽이 준비될 때까지 block 상태입니다. 이는 명시적인 lock이나 조건 변수 없이 goroutine이 synchronous하게 작업될 수 있도록 합니다.

예제 코드는 두 개의 goroutine에 작업을 분산시키면서 slice 있는 숫자들을 더합니다. 두 goroutine이 그들의 연산을 완료하면, 최종 결과를 계산합니다.

```go
func sum(s []int, c chan int) {
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum // send sum to c
}

func main() {
	s := []int{7, 2, 8, -9, 4, 0}

	c := make(chan int)
	go sum(s[:len(s)/2], c)
	go sum(s[len(s)/2:], c)
	x, y := <-c, <-c // receive from c

	fmt.Println(x, y, x+y) // -5 17 12
}
```

## Buffered Channels

Channel은 buffered 될 수 있습니다.

(buffered channel이란 Channel이 버퍼를 가질 수 있다는 의미입니다.)

buffered channel을 초기화하기 위해 make 에 두 번째 인자로 buffer 길이를 제공하십시오.

```go
ch := make(chan int, 100)
```

buffered channel로의 전송은 그 buffer의 사이즈가 꽉 찼을 때에만 block 됩니다. 

buffer로 부터의 수신은 그 buffer가 비어있을 때 block 됩니다.

```go
func main() {
	ch := make(chan int, 2)
	ch <- 1
	ch <- 2
	fmt.Println(<-ch) // 1
	fmt.Println(<-ch) // 2
}
```

## Range와 Close


전송자는 더 이상 보낼 데이터가 없다는 것을 암시하기 위해 channel을 close할 수 있습니다

수신자는 수신에 대한 표현에 두 번째 매개변수를 할당함으로써 채널이 닫혔는지 테스트할 수 있습니다.


```go
v, ok := <-ch
```

for i := range c 반복문은 channel이 닫힐 때까지 반복해서 channel에서 값을 수신합니다.

**절대로 수신자가 아닌 전송자만이 channel을 닫아야합니다. 닫힌 channel에 전송하는 것은 panic을 야기한다.**

**Channel은 파일과 다릅니다. 당신은 file과 달리 보통 channel을 닫을 필요는 없습니다. channel을 닫는 것은 range 반복문을 종료시키는 것과 같이 수신자가 더 이상 들어오는 값이 없다는 것을 알아야하는 경우에만 필요합니다.**

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

## Select

`select` 문은 goroutine이 다중 커뮤니케이션 연산에서 대기할 수 있게 합니다.

`select` 는 자의 case들 중 하나가 실행될 때까지 block됩니다. 그리고나서 select문은 해당하는 case를 수행합니다. 만약 다수의 case가 준비되는 경우에는 select가 무작위로 하나를 선택합니다.

```go
func fibonacci(c, quit chan int) {
	x, y := 0, 1
	for {
		select {
		case c <- x:
			x, y = y, x+y
		case <-quit:
			fmt.Println("quit")
			return
		}
	}
}

func main() {
	c := make(chan int)
	quit := make(chan int)
	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(<-c)
		}
		quit <- 0
	}()
	fibonacci(c, quit)
}

// 0
// 1
// 1
// 2
// 3
// 5
// 8
// 13
// 21
// 34
// quit
```

## Default Selection

`select` 에서의 default case 는 다른 case들이 모두 준비되지 않았을 때 실행됩니다.

```go
select {
case i := <-c:
    // use i
default:
    // c로부터 값을 받아오는 것이 block된 경우
}
```

```go
func main() {
	tick := time.Tick(100 * time.Millisecond)
	boom := time.After(500 * time.Millisecond)
	for {
		select {
		case <-tick:
			fmt.Println("tick.")
		case <-boom:
			fmt.Println("BOOM!")
			return
		default:
			fmt.Println("    .")
			time.Sleep(50 * time.Millisecond)
		}
	}
}
```

