# Golang

## Pointer

기본적인 C 레밸언어들의 포인터와 작동하는 방식은 유사하다.

```go
func main() {
	i, j := 42, 2701

	p := &i         // 포인터 i
	fmt.Println(*p) // i 값을 읽음 // 42
	*p = 21         // i 값을 정함(Set)
	fmt.Println(i)  // 새로 할당된 i // 21

	p = &j         // 포인터 j
	*p = *p / 37   // j 값을 나눠 j에 재할당
	fmt.Println(j) // 새로운 j // 73
}
```

## struct

> A struct is a collection of fields.

구초체 필드의 모음이다.

```go
type Vertex struct {
	X int
	Y int
}

func main() {
	fmt.Println(Vertex{1, 2}) // {1 2}
}
```

`.`을 이용하여 객체의 값에 접근한다.

```go
type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1, 2}
	v.X = 4
	fmt.Println(v.X) // 4
}
```

struct에서의 포인터

```go
type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1, 2}
	p := &v
	p.X = 1e9
	fmt.Println(v)
}
```

명시적으로 `(*p).X`로 작성할 수 있지만 번거로움을 줄이기 위하여 `p.X`로 작성할 수 있습니다.

```go
type Vertex struct {
	X, Y int
}

var (
	v1 = Vertex{1, 2} 
	v2 = Vertex{X: 1}  // Y:0 
	v3 = Vertex{}      // X:0 and Y:0
	p  = &Vertex{1, 2} // has type *Vertex 
)

func main() {
	fmt.Println(v1, p, v2, v3) // {1 2} &{1 2} {1 0} {0 0}
}
```

`&` Pointer 리턴

## Arrays

배열의 선언할 수 있다.

```go
var a [10]int
```

```go
func main() {
	var a [2]string
	a[0] = "Hello"
	a[1] = "World"
	fmt.Println(a[0], a[1])  //  Hello World
	fmt.Println(a)  //  [Hello World]

	primes := [6]int{2, 3, 5, 7, 11, 13}
	fmt.Println(primes) //  [2 3 5 7 11 13]
}
```

### slice

`T[low:high]` low index 와 high index를 지정하여 slice를 형성한다.

첫 번쨰 요소는 포함 마지막 요소는 제외

```go
func main() {
	primes := [6]int{2, 3, 5, 7, 11, 13}

	var s []int = primes[1:4]
	fmt.Println(s) // [3 5 7]
}
```

slice 요소를 수정하면 원본이 수정된다. mutable

```go
func main() {
	names := [4]string{
		"John",
		"Paul",
		"George",
		"Ringo",
	}
	fmt.Println(names) // [John Paul George Ringo]

	a := names[0:2]
	b := names[1:3]
	fmt.Println(a, b) // [John Paul] [Paul George]

	b[0] = "XXX"
	fmt.Println(a, b) // [John XXX] [XXX George]
	fmt.Println(names) // [John XXX George Ringo]

}
```


```go
func main() {
	q := []int{2, 3, 5, 7, 11, 13}
	fmt.Println(q) // [2 3 5 7 11 13]

	r := []bool{true, false, true, true, false, true}
	fmt.Println(r) // [true false true true false true]

	s := []struct {
		i int
		b bool
	}{
		{2, true},
		{3, false},
		{5, true},
		{7, true},
		{11, false},
		{13, true},
	}
	fmt.Println(s) // [{2 true} {3 false} {5 true} {7 true} {11 false} {13 true}]
}
```

상한 하한의 경우 생략이 가능하다.

```go
func main() {
	s := []int{2, 3, 5, 7, 11, 13}

	s = s[1:4] 
	fmt.Println(s) // [3 5 7]

	s = s[:2]
	fmt.Println(s) // [3 5]

	s = s[1:]
	fmt.Println(s) // [5]
}
```

슬라이스의 low를 통해서 capacity를 줄일 수 있다.

```go
func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	printSlice(s) // len=6 cap=6 [2 3 5 7 11 13]

	// Slice the slice to give it zero length.
	s = s[:0]
	printSlice(s) // len=0 cap=6 []

	// Extend its length.
	s = s[:4]
	printSlice(s) // len=4 cap=6 [2 3 5 7]

	// Drop its first two values.
	s = s[2:]
	printSlice(s) // len=2 cap=4 [5 7]
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```

값이 없는 배열의 경우 `nill`이다.
	
len, cap은 0이다

```go
func main() {
	var s []int
	fmt.Println(s, len(s), cap(s)) // [] 0 0
	if s == nil {
		fmt.Println("nil!")
	}
}
```

동적인 크기의 배열 만들기

`make()`이용하기

make 함수는 0으로 체워진 배열을 할당하고 해당 배열을 찹조하는 슬라이스를 반환한다.

길이(len)를 두 번째 인자, 용량(cap)을 세번째 인자에 전달하여 만들 수 있다.

```go
func main() {
	a := make([]int, 5)
	printSlice("a", a) // a len=5 cap=5 [0 0 0 0 0]

	b := make([]int, 0, 5)
	printSlice("b", b) // b len=0 cap=5 []

	c := b[:2]
	printSlice("c", c) // c len=2 cap=5 [0 0]

	d := c[2:5]
	printSlice("d", d) // d len=3 cap=3 [0 0 0]
}

func printSlice(s string, x []int) {
	fmt.Printf("%s len=%d cap=%d %v\n",
		s, len(x), cap(x), x)
}
```

```go
func main() {
	// Create a tic-tac-toe board.
	board := [][]string{
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
	}

	// The players take turns.
	board[0][0] = "X"
	board[2][2] = "O"
	board[1][2] = "X"
	board[1][0] = "O"
	board[0][2] = "X"

	for i := 0; i < len(board); i++ {
		fmt.Printf("%s\n", strings.Join(board[i], " "))
	}

	//	X _ X
	//  O _ X
	//  _ _ O
}
```

### Append

슬라이스에 새 요소를 추가하는 것이 일반적 Go는 내장 append 함수를 제공한다.

```go
func append(s []T, vs ...T) []T
```

첫 번째 인자에 차가 할 타겟 slice이고 나머지 ... 는 추가할 대상 T이다.

리턴 값은 origin 배열과 제공 된 인자를 포함하는 결과이다.

주어지는 s 가 리턴되야할 배열보다 작은 크기라면 더 큰 배열에 할당되어 새로운 배열이 리턴되어 가리켜집니다.

```go
func main() {
	var s []int
	printSlice(s) // len=0 cap=0 []

	// append works on nil slices.
	s = append(s, 0)
	printSlice(s) // len=1 cap=1 [0]

	// The slice grows as needed.
	s = append(s, 1)
	printSlice(s) // len=2 cap=2 [0 1]

	// We can add more than one element at a time.
	s = append(s, 2, 3, 4)
	printSlice(s) // len=5 cap=6 [0 1 2 3 4]
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```

### range

슬라이스 범위를 지정하면 각 반복에 대해 두 개의 값이 반환된다.

첫 번째는 인덱스이고 두 번째는 해당 인덱스에 있는 요소의 복사본이다.

```go
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
	for i, v := range pow {
		fmt.Printf("2**%d = %d\n", i, v)
	}
}

// 2**0 = 1
// 2**1 = 2
// 2**2 = 4
// 2**3 = 8
// 2**4 = 16
// 2**5 = 32
// 2**6 = 64
// 2**7 = 128
```

`_`를 할당하여 인덱스나 값을 건너 뛸 수 있다.

```go
for i, _ := range pow
for _, value := range pow
```

index만 원하면 아예 2번째 인자를 생략할 수도 있다.

```go
for i := range pow
```

## map

맵은 키에 값을 매핑한다.

```go
type Vertex struct {
	Lat, Long float64
}

var m map[string]Vertex

func main() {
	m = make(map[string]Vertex)
	m["Bell Labs"] = Vertex{
		40.68433, -74.39967,
	}
	fmt.Println(m["Bell Labs"]) // {40.68433 -74.39967}
}
```

맵의 literals 구조체(struct) 리터럴과 유사하지만 키가 필요하다.

```go
type Vertex struct {
	Lat, Long float64
}

var m = map[string]Vertex{
	"Bell Labs": Vertex{
		40.68433, -74.39967,
	},
	"Google": Vertex{
		37.42202, -122.08408,
	},
}

====
 // 유형의 이름은 top-level과 같을 시에 생략가능
var m = map[string]Vertex{
	"Bell Labs": {40.68433, -74.39967},
	"Google":    {37.42202, -122.08408},
}


func main() {
	fmt.Println(m) // map[Bell Labs:{40.68433 -74.39967} Google:{37.42202 -122.08408}]
}
```

map 타입의 두 가지 변수

첫 번째는 값을 할당하고, 두번째는 존재한다면 true 없다면 false 입니다.

```go
func main() {
	m := make(map[string]int)

	m["Answer"] = 42
	fmt.Println("The value:", m["Answer"]) // The value: 42

	m["Answer"] = 48
	fmt.Println("The value:", m["Answer"]) // The value: 48

	delete(m, "Answer")
	fmt.Println("The value:", m["Answer"]) // The value: 0

	v, ok := m["Answer"]
	fmt.Println("The value:", v, "Present?", ok) // The value: 0 Present? false
}
```

## higher function

function values 함수는 변수 처럼 사용할 수 있습니다.

```go
func compute(fn func(float64, float64) float64) float64 {
	return fn(3, 4)
}

func main() {
	hypot := func(x, y float64) float64 {
		return math.Sqrt(x*x + y*y)
	}
	fmt.Println(hypot(5, 12)) // 13

	fmt.Println(compute(hypot)) // 5 
	fmt.Println(compute(math.Pow)) // 81
}
```

## Closures

Go 함수는 클로저일 수 있다.

클로저는 본문 외부의 변수를 참조하는 함수 값입니다. 함수는 참조된 변수에 엑세스하고 할당할 수 있다.

이러한 의미에서 함수는 변수에 할당할 수 있다.

```go
func adder() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}

func main() {
	pos, neg := adder(), adder()
	for i := 0; i < 10; i++ {
		fmt.Println(
			pos(i),
			neg(-2*i),
		)
	}
}
```

