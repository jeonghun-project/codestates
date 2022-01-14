# go package

## Error

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
