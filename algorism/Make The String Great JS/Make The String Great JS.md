# 문제

Given a string `s` of lower and upper case English letters.

A good string is a string which doesn't have **two adjacent characters** `s[i]` and `s[i + 1]` where:

- `0 <= i <= s.length - 2`
- `s[i]` is a lower-case letter and `s[i + 1]` is the same letter but in upper-case or **vice-versa**.

To make the string good, you can choose **two adjacent** characters that make the string bad and remove them. You can keep doing this until the string becomes good.

Return *the string* after making it good. The answer is guaranteed to be unique under the given constraints.

**Notice** that an empty string is also good.

## 제한사항

## 입출력 예

```
Input: s = "leEeetcode"
Output: "leetcode"
Explanation: In the first step, either you choose i = 1 or i = 2, both will result "leEeetcode" to be reduced to "leetcode".
```

```jsx
var makeGood = function(s) {
    s = s.split('');
    let lower = 'abcdefghijklmnopqrstuvwxyz'
    let i = 0;
    while (i < s.length - 1) {
        if(lower.includes(s[i])) {
            if(s[i].toUpperCase() === s[i + 1]) {
                s.splice(i, 2);
                i = 0;
                continue;
            }
        } else {
            if(s[i].toLowerCase() === s[i + 1]) {
                s.splice(i, 2);
                i = 0;
                continue;
            }
        }
        i++;
    };
    return s.join('');
};
```

O(N log N)

## 유의할 점

---

greedy algorism 기초 문제 중 하나이지만 그리디 문제를 해결하는 방식의 사고 능력이 부족하여 코드의 길이와 복잡도가 늘어나게됨

best case O(N)

```jsx
var makeGood = function(s) {
    const stack = [''];
    
    for(let c of s) {
        let top = stack[stack.length-1];
        if(top.toLowerCase() === c.toLowerCase() && top !== c) stack.pop()
        else stack.push(c);
    }
    return stack.join('');
};
```