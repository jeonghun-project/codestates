# 문제

Given the array `candies` and the integer `extraCandies`, where `candies[i]` represents the number of candies that the ***ith*** kid has.

For each kid check if there is a way to distribute `extraCandies` among the kids such that he or she can have the **greatest** number of candies among them. Notice that multiple kids can have the **greatest** number of candies.

## 제한사항

## 입출력 예

```
Input: candies = [2,3,5,1,3], extraCandies = 3
Output: [true,true,true,false,true] 
```

## 답안

```jsx
const kidsWithCandies = function(candies, extraCandies) {
    const greatest = Math.max(...candies);
    return candies.map((ele) => ele + extraCandies < greatest ? false : true);
};
```

## 유의할 점

---

```jsx
const kidsWithCandies = function(candies, extraCandies) {
    return candies.map((ele) => ele + extraCandies < Math.max(...candies) ? false : true);
};
```
변수에 max를 할당하는 과정이 없어지면 map에서 매번 Math method 를 호출하게 되어 처리 속도면에서 불리함