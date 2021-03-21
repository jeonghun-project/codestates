# Arrow function

- [Arrow function](#arrow-function)
  - [기본 구문](#기본-구문)
  - [고급구문](#고급구문)
    - [바인딩 되지 않은 this](#바인딩-되지-않은-this)

화살표 함수 표현(arrow function expression)은 function 표현에 비해 구문이 짧고 자신의 **this, arguments, super 또는 new.target**을 바인딩 하지 않습니다. 화살표 함수는 **항상 익명**입니다 - mdn


## 기본 구문

```jsx
(param1, param2, …, paramN) => { statements }
(param1, param2, …, paramN) => expression
// 다음과 동일함:  => { return expression; }

// 매개변수가 하나뿐인 경우 괄호는 선택사항:
(singleParam) => { statements }
singleParam => { statements }

// 매개변수가 없는 함수는 괄호가 필요:
() => { statements }
```

## 고급구문

```jsx
// 객체 리터럴 표현을 반환하기 위해서는 함수 본문(body)을 괄호 속에 넣음:
params => ({foo: bar})

// 나머지 매개변수 및 기본 매개변수를 지원함
(param1, param2, ...rest) => { statements }
(param1 = "defaultValue1", param2, …, paramN = "defaultValueN") => { statements }

// 매개변수 목록 내 구조분해할당도 지원됨
var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
f();  // 6
```

### 바인딩 되지 않은 this

arrow function이 있기 전까지는 모든 함수는 함수가 어떻게 호출 되었는지에 따라 this를 정의하였다.

- 이 함수가 생성자인 경우는 새로운 객체 :: constructor
- [엄격 모드](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode) 함수 호출에서는 `undefined` ::
- 함수가 "객체 메서드"로서 호출된 경우 문맥 객체
- 등등

객체 지향 스타일에서 this 의 문제가 발생

```jsx
function Person() {
  // Person() 생성자는 `this`를 자신의 인스턴스로 정의.
  this.age = 0;

  setInterval(function growUp() {
    // 비엄격 모드에서, growUp() 함수는 `this`를
    // 전역 객체로 정의하고, 이는 Person() 생성자에
    // 정의된 `this`와 다름.
    this.age++;
  }, 1000);
}

var p = new Person();
```

arrow function이 있기 이전 해결 방법

```jsx
function Person() {
  var that = this;
  that.age = 0;

  setInterval(function growUp() {
    // 콜백은  `that` 변수를 참조하고 이것은 값이 기대한 객체이다.
    that.age++;
  }, 1000);
}
```

arrow function이 생긴 이후

```jsx
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this|는 Person 객체를 참조
  }, 1000);
}

var p = new Person();
```

이런 것이 가능해진 이유 arrow function은 자체적인 `this`를 가지고 있지 않기에 lexical scope에 따라서 바로 바깥의 범위에서 `this`를 찾는 것으로 끝낸다