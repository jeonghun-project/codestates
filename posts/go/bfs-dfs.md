## bfs

해당 로직은 프로그래머스의 깊이/너비 우선 탐색(DFS/BFS) 문제인 타겟 넘버 문제의 풀이에 대한 설명으로 해당 문제를 먼저 시도해 본 뒤에 포스팅을 참고하자.

![bfs-dfs](./src/problem.png)

```go
func solution(numbers []int, target int) int {
    var count int
    var recurBfs func(int, int, int)
    visit := make([]bool, len(numbers) + 1)
    
    recurBfs = func(number int, idx int, sum int) {
        sum += number
        visit[idx] = true
        
        if idx == len(numbers) {
            if sum == target {
                count++
                return
            } else {
                return
            }
        }

        if !visit[idx + 1] {
            recurBfs(numbers[idx] * -1, idx + 1, sum)
            visit = make([]bool, len(numbers) + 1)
            recurBfs(numbers[idx], idx + 1, sum)    
        }
        
    }
    
    recurBfs(0, 0, 0)

    return count
}
```
