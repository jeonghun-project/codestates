# Golang

고랭에 대한 스터디를 정리하기 위한 ㄸㄱ입니다.

변수 인수에 대한 선언

```go
x int, y int
```
or
```go
x, y int
```

두 가지의 방법은 기능적으로 같다.

```go
func swap(x, y string) (string, string) {
	return y, x
}

func main() {
	a, b := swap("hello", "world")
	fmt.Println(a, b) // world hello
}
```

함수를 선언하여 return값을 할당 할 수 있다.

go의 함수는 리턴 값을 미리 정의하여 리턴할 수 있다. 이런 반환을 "naked" return이라고 한다.

```go
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}

func main() {
	fmt.Println(split(17)) // 7 10
}
```

이러한 함수는 함수의 길이가 길어지면 가독성이 떨어짐으로 피하는 것이 좋다

`var`를 통한 변수 선언

```go
// package
var c, python, java bool

func main() {
  // function
	var i int
	fmt.Println(i, c, python, java) // 0 false false false
}
```

함수의 인수 리스트와 같이 동작한다.

package level, func level 에서 선언은 둘다 가능하다.

```go
var i, j int = 1, 2

func main() {
	var c, python, java = true, false, "no!"
	fmt.Println(i, j, c, python, java)
}
```

initializer `var`선언을 할때 초기값을 설정할 수 있다.

초기값 설정의 다른 방법으로는 `:=`를 통해서도 할 수 있다.

```go
func main() {
	var i, j int = 1, 2
	k := 3
	c, python, java := true, false, "no!"

	fmt.Println(i, j, k, c, python, java) // 1 2 3 true false no!
}
```

이렇게 알아서 타입 추론이나 할당이된다.

## type

```
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // alias for uint8

rune // alias for int32
     // represents a Unicode code point

float32 float64

complex64 complex12
```

일반적으로는 int uint uintptr 의 경우는 32비트 시스템에서는 32비트이고,

64비트 시스템에서는 64비트로 동작한다.

특별한 경우가 아니라면 `int`를 사용하는 것이 맞다.

변수의 선언은 한 블럭내에서 `factored`될 수 있다.

```go
var (
	ToBe   bool       = false
	MaxInt uint64     = 1<<64 - 1
	z      complex128 = cmplx.Sqrt(-5 + 12i)
)

func main() {
	fmt.Printf("Type: %T Value: %v\n", ToBe, ToBe) 	 	 // Type: bool Value: false
	fmt.Printf("Type: %T Value: %v\n", MaxInt, MaxInt) // Type: uint64 Value: 18446744073709551615
	fmt.Printf("Type: %T Value: %v\n", z, z)					 // Type: complex128 Value: (2+3i)
}
```

초기값 없이 변수가 선언된 경우에는 zero base의 값을 할당합니다.

```go
package main

import "fmt"

func main() {
	var i int
	var f float64
	var b bool
	var s string
	fmt.Printf("%v %v %v %q\n", i, f, b, s)  // 0 0 false ""
}
```

타입을 변환하는 방법 `T(v)` T타입으로 v 밸류를 타입 변환한다.

```go
var i int = 42
var f float64 = float64(i)
var u uint = uint(f)
```
==
```go
i := 42
f := float64(i)
u := uint(f)
```

숫자의 경우 우변의 할당하는 값에 따라 알아서 type을 추론한다.

```go
i := 42           // int
f := 3.142        // float64
g := 0.867 + 0.5i // complex128
```

### 상수 선언

`const` 키워드를 사용하자

```go
package main

import "fmt"

const Pi = 3.14

func main() {
	const World = "世界"
	fmt.Println("Hello", World)      // Hello 世界
	fmt.Println("Happy", Pi, "Day")  // Happy 3.14 Day

	const Truth = true
	fmt.Println("Go rules?", Truth)  // Go rules? true
}
```

### For

반복문이다. golang의 반복문에는 ()가 없다.

```go
func main() {
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
	fmt.Println(sum) // 45
}
```

go에서는 최기 값이나 상태변화등을 생략할 수 있다.

```go
func main() {
	sum := 1
	for ; sum < 1000; {
		sum += sum
	}
	fmt.Println(sum) // 1024
}
```

세미콜론은 생략이 가능하다

```go
func main() {
	sum := 1
	for sum < 1000 {
		sum += sum
	}
	fmt.Println(sum)
}
```

무한루프

```go
func main() {
	for {
	}
}
```

### if

if문은 for 문과 마찬가지로 ()를 명시하지 않는다.

```go
func sqrt(x float64) string {
	if x < 0 {
		return sqrt(-x) + "i"
	}
	return fmt.Sprint(math.Sqrt(x))
}

func main() {
	fmt.Println(sqrt(2), sqrt(-4))
}
```

go의 if문은 다른 언어의 if 문과는 약간의 차이가 있습니다.

최초에 약간의 실행문을 포함할 수 있습니다.

```go
func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	}
	return lim
}

func main() {
	fmt.Println(
		pow(3, 2, 10),
		pow(3, 3, 20),
	)
}
```

단 여기서 선언된 v 변수의 경우 if else 문 안에서만 스코프를 가지며 유효하다.

### switch

if - else 문을 완성하는 더 짧은 구문이다.

```go
func main() {
	fmt.Print("Go runs on ")
	switch os := runtime.GOOS; os {
	case "darwin":
		fmt.Println("OS X.")
	case "linux":
		fmt.Println("Linux.")
	default:
		// freebsd, openbsd,
		// plan9, windows...
		fmt.Printf("%s.\n", os)
	}
}
```

PHP, Javascript에서 사용하는 Switch와는 다르게 break문을 사용하지 않아도, 선택된 경우에만 실행 됩니다.

또한 상수일 필요나 정수일 필요가 없다.

```go
func main() {
	fmt.Println("When's Saturday?")
	today := time.Now().Weekday() + 2
	switch time.Saturday {
	case today + 0:
		fmt.Println("Today.")
	case today + 1:
		fmt.Println("Tomorrow.")
	case today + 2:
		fmt.Println("In two days.")
	default:
		fmt.Println("Too far away.")
	}
}
```

위에서 아래로 평가하고 케이스가 성공하면 중지합니다.

```go
func main() {
	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("Good morning!")
	case t.Hour() < 17:
		fmt.Println("Good afternoon.")
	default:
		fmt.Println("Good evening.")
	}
}
```

`if-then-else`를 깔끔하게 작성하기 위해서 Switch 컨디션을 `true`로 둘 수도 있다.

```go
func main() {
	defer fmt.Println("world")

	fmt.Println("hello")
	// hello
	// world
}
```