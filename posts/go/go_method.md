# Golang Method

다른 언어의 class method 역할을 할 수 있는 method가 존재한다.

go에는 class가 없다.

`func` 키워드와 method 이름 사이에 자체 인수(own argument)를 나타낼 수 있다.

**이를 `receiver`라고 부른다 method에만 존재하는 특별한 인수이다.**

```go
type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
}
```

method는 `receiver`가 있는 함수일 뿐이다.

아래 Abs는 일반 함수이고 위의 Abs는 method이다.

```go
type Vertex struct {
	X, Y float64
}

func Abs(v Vertex) float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(Abs(v))
}
```

이렇게 보면 구조형(struct) 타입에만 메소드가 존재 할 것이라는 오해가 있을 수 있다.

하지만 다른 타입의 변수에도 method를 선언 할 수 있다.

단 메소드와 동일한 패키지에 타입이 정의된 수신자가 있는 메소드만 선언할 수 있다.

```go
type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

func main() {
	f := MyFloat(-math.Sqrt2)
	fmt.Println(f.Abs())
}
```

## Pointer Receiver

종종 메소드에서는 복사된 값을 수정하는 것이 아닌 Pointer 값을 수정하는 것이 합리적이다

```go
type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
  fmt.Println(Abs(v)) // 5
	v.Scale(10)
	fmt.Println(v.Abs()) // 50
}
```


