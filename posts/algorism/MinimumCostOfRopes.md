# MinimumCostOfRopes

- 생성일: 2021년 1월 26일 오후 4:12
- 태그: 로직의 효율성 검토, 리펙토링필요
- 언어: Javascript

# 문제

[geeksforgeeks](https://practice.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1)

There are given N ropes of different lengths, we need to connect these ropes into one rope. The cost to connect two ropes is equal to sum of their lengths. The task is to connect the ropes with minimum cost.

## 제한사항

You don't need to read input or print anything. Your task isto complete the function

**minCost()**

which takes 2 arguments and returns the minimum cost.

## 입출력 예

```
n = 5
arr[] = {4, 2, 7, 6, 9}  /// 62
```

## code

```jsx
function MinimumCostOfRopes(arr) {
    let length = 0;
    let count= 0;
    let min;
    let n = 0
    while(n <arr.length) {
        for(let i = 0; i <arr.length; i++) {
            if(arr[n] <= arr[i]) {
                count++;
            }
        }
        if(count >= arr.length) {
            if(min !== undefined){
                length += min + arr[n];
                arr.push(min+ arr[n]);
                min = undefined;
            } else {
                min = arr[n];
            }
            arr.splice(n, 1);
            n = 0;
        }else {
            n++;
        }
        count = 0;
    }
    return length;
}
```

## 유의할 점

---