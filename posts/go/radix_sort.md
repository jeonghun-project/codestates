## go를 통한 radix sort 구현하기

원소의 값의 범위가 한정적일때만 사용가능

원소의 갯수를 세어서 정렬하는 방법

```go
func main() {
  arr := [12]int{0, 5, 3, 2, 1, 3, 4, 5, 6, 7, 8, 7}
  temp := [10]int{}

  for i := 0; i < len(arr); i++ {
    idx := arr[i]
    temp[idx]++
  }
  idx := 0

  for i := 0; i < len(temp); i++ {
    for j := 0; j < temp[i]; j++ {
      arr[idx] = i
      idx++
    }
  }

 fmt.Println(arr)
}
```