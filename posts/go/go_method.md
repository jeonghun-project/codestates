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

## Pointer indirection

포인터를 인수로 받는 함수의 경우 반드시 포인터를 전달해야 컴파일 에러를 일으키지 않는다.

```go
var v Vertex
ScaleFunc(v, 5)  // Compile error!
ScaleFunc(&v, 5) // OK
```

반면 포인터를 받는 Method의 호출은 값에서의 호출이건 포인터에서의 호출이건 상관없다.

```go 
var v Vertex

v.Scale(5)  // OK
p := &v
p.Scale(10) // OK
```

v는 값에서의 method 호출, p는 포인터에서의 메소드 호출이다.

이렇게 되면 receiver에 포인터가 선언되어 있다고 하더라도, &v을 알아서 두 method에서 받아 오게 된다.

`v.Scale(5) == (&v).Scale(5)` 결과적으로 이런 결과가 나온다

```go
type Vertex struct {
	X, Y float64
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func ScaleFunc(v *Vertex, f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	v.Scale(2)
	ScaleFunc(&v, 10)

	p := &v
	p.Scale(2)
	ScaleFunc(p, 8)

	fmt.Println(v, p) // {960 1280} &{960 1280}
}
```

반대로도 마찬가지로 동작한다.

```go
var v Vertex
fmt.Println(AbsFunc(v))  // OK
fmt.Println(AbsFunc(&v)) // Compile error!
```

```go
var v Vertex
fmt.Println(v.Abs()) // OK
p := &v
fmt.Println(p.Abs()) // OK
```

포인터 리시버는 두 가지 장점을 가지는데 리시버가 가리키는 값을 수정하는 것이고,

두번째로는 값을 복사하지 않을 수 있는 것이 장점이다.

리시버가 큰 struct를 가질 수록 더 효율적이다.

```go
type Vertex struct {
	X, Y float64
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func (v *Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := &Vertex{3, 4}
	fmt.Printf("Before scaling: %+v, Abs: %v\n", v, v.Abs())
	v.Scale(5)
	fmt.Printf("After scaling: %+v, Abs: %v\n", v, v.Abs())
}
```

## interface 

인터페이스는 메소소드 서명을 나타낸다.

인터페이스 유형의 값은 해당 메소드를 구현하는 모든 값을 보유할 수 있다.

```go
type Abser interface {
	Abs() float64
}

func main() {
	var a Abser
	f := MyFloat(-math.Sqrt2)
	v := Vertex{3, 4}

	a = f  // a MyFloat implements Abser
	
  fmt.Println(a.Abs()) // 1.4142135623730951

	a = &v // a *Vertex implements Abser

	fmt.Println(a.Abs()) // 5
}

type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}
```