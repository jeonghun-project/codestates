# H-index

- 생성일: 2021년 1월 26일 오후 4:09
- 태그: 완료
- 언어: Javascript

# 문제

[프로그래머스](https://programmers.co.kr/learn/courses/30/lessons/42747) 

어떤 과학자가 발표한 논문 n편 중, h번 이상 인용된 논문이 h편 이상이고 나머지 논문이 h번 이하 인용되었다면 h의 최댓값이 이 과학자의 H-Index입니다.

## 제한사항

- 과학자가 발표한 논문의 수는 1편 이상 1,000편 이하입니다.
- 논문별 인용 횟수는 0회 이상 10,000회 이하입니다.

## 입출력 예

[3, 0, 6, 1, 5] // 3

```jsx
jsfunction solution(citations) {
    let answer = 0;
    for(let h = 1; h < 1001; h++) {
        for(let i = 0; i < citations.length; i++) {
            if (citations[i] >= h) {
                answer++;
            }
        }
        if (answer <= h) {
            return answer;
        }
        answer = 0;
    }
    return answer;
}
```

## 유의할 점

---

h-index는 논문의 편수가 중요한 요소로 작용한다.

논문의 편수가 인용수가 같아진는 순간이나 정확히 같지 않다면 커지지 않는 시점 즉 이하인 값중 가장 큰 값을 출력하는 로직이 중요하다.