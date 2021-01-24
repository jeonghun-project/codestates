# 조건문

---

특정 조건을 만족할 경우 (true값을 받는 경우) 해당하는 실행내용을 실행하도록 하는 기능

## 비교 연산자(comparison operator)

---

비교 연산자는 늘 Boolean 값을 return 한다. 즉, true or false이다.

> ⇒ 초과

< ⇒미만

≥ ⇒ 이상

≤ ⇒ 이하

== ⇒ 단순 값만 비교하여 같은 경우 true를 return한다. 0 은 false 1은 true  로 인식하는 컴퓨터 언어의 특성등 예외 경우가 많다.

=== ⇒ 타입과 값이 모두 같은 경우에만 true를 return한다.

## 논리 연산자(Logical Operator)

---

&& - AND - 두 가지 다 true 일 때만 true 값을 반환

|| - OR - 둘 중에 하나만 true이여도 true 값을 반환

! - NOT - truthy 와 falsy 여부를 반전

*!undefined ⇒ true, !"hello" ⇒ false

false, null, undefined, 0, NaN, ' ' ⇒ false

## IF

---

조건문 IF

```jsx
if (expr) {
	// 실행 코드
} else if (expr2) {
	// 실행 코드
} else {
	// 실행 코드
}
```

# 문자열

---

문자열은 배열형식으로 저장된다.

str ="Hello workld"

str[0] = "H"

단, index에 접근은 가능하지만 쓸 수는 없음(read-only)

문자열 + 문자열 = 연결된 문자열

문자열 + 다른 타입(배열 포함) = 문자열로 변환되어 반환

### length PROPERTY

---

문자열의 길이를 알 수 있다.

str.length

### 문자열 메소드

---

[메소드](https://www.notion.so/0821f29570b5455b928070738f758e78)

## 백틱 (backquoto/backtick)

---

Javascript에서 템플릿 리터럴(Template literals(Tamplate strings))에 활용 되고, 마크다운에서 코드를 강조 하는데 쓰이기도 한다.( ```)

- 줄바꿈을 쉽게 할 수 있다
- 문자열 내부에 표현식을 포함할 수 있다.
    - Expression interpolation 표현식 삽입

    ```jsx
    let a = 5;
    let b = 10;
    console.log(`Fifteen is ${a + b} and
    not ${2 * a + b}.`);
    // "Fifteen is 15 and
    // not 20."
    ```

    - Nesting templates - 중첩 → 대표적으로는 ?(if문)이 있다.

    ```jsx
    let classes = 'header';
    classes += (isLargeScreen() ?
      '' : item.isCollapsed ?
        ' icon-expander' : ' icon-collapser');
    ```

    - tag가 지정된 값을 불러 올 수 있다.

    ```jsx
    let person = 'Mike';
    let age = 28;

    function myTag(strings, personExp, ageExp) {
      let str0 = strings[0]; // "That "
      let str1 = strings[1]; // " is a "
      let str2 = strings[2]; // "."

      let ageStr;
      if (ageExp > 99){
        ageStr = 'centenarian';
      } else {
        ageStr = 'youngster';
      }

      // We can even return a string built using a template literal
      return `${str0}${personExp}${str1}${ageStr}${str2}`;
    }

    let output = myTag`That ${ person } is a ${ age }.`;

    console.log(output);
    // That Mike is a youngster.
    ```