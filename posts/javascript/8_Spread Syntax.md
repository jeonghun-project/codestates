# SpreadSyntax

- [SpreadSyntax](#spreadsyntax)
  - [Object(객체) Spread Syntax](#object객체-spread-syntax)
  - [Optional spreading ...falsy ...truthy](#optional-spreading-falsy-truthy)
  - [rest parameter](#rest-parameter)

배열의 각요소를 펼쳐서 전개한다.

```jsx
let arr = [3, 4, 5];
console.log(...arr); // 3,4,5
```

... 펼치고 싶은 array

## Object(객체) Spread Syntax

Object에서의 Spread syntax는 property 즉, key: value 를 전개한다

property remove

```jsx
//구조분해 할당을 이용하여 name 제거
const noName = ({ name, ...rest }) => rest;
const user = { id: 100, name: "MyName", password: "pwd" };

noName(user); // Object { id: 100, password: 'pwd' }
```

property rename

```jsx
const renamed = ({ ID, ...obj }) => ({ id: ID, ...obj });
const user = { ID: 123, name: "MyName" };
renamed(user); // { id: 123, name: 'MyName' }
```

## Optional spreading ...falsy ...truthy

선택적 전개 구문
아래 코드를 보면서 이해하자

```jsx
...(truthy) && { djlfk : twer, wert: klaejrt } // 전개 구문 펼처짐
...(falsy) || { djlfk : twer, wert: klaejrt } // 전개 구문 펼처짐

// 객체에도 적용 가능

const user = { id: 123, name: 'MyName' };
const password = 'pwd';
const userWithPassword = { ...user, id: 100, ...(password && { password })
//조건 password가 존재한다면 객체 리터럴을 이용하여 객체 생성후 객체 추가 }

userWithPassword   // { id: 100, name: 'MyName', password: 'pwd' }

```

위 예제에서는 truthy가 ture한 값을 가졌다면 우변의 객체를 리턴하고,
리턴한 객체가 Spread Syntax에 의하여 전개된다.

## rest parameter

함수의 마지막 파라미터의 앞에 ...을 붙여 모든 인수를 "표준" 배열로 대체한다.

마지막 파라미터에만 사용할 수 있다.

```jsx
function myFun(a, b, ...manyMoreArgs) {
  console.log("a", a);
  console.log("b", b);
  console.log("manyMoreArgs", manyMoreArgs);
}

myFun("one", "two", "three", "four", "five", "six");

// Console Output:
// a, one
// b, two
// manyMoreArgs, [three, four, five, six]
```

이는 argument 객체와는 차이가 있다.

argument 객체는 배열이 아니다. 단지, **iterable**인 객체인 것이다.

```jsx
function f(a, b) {
  var normalArray = Array.prototype.slice.call(arguments);
  // -- 또는 --
  var normalArray = [].slice.call(arguments);
  // -- 또는 --
  var normalArray = Array.from(arguments);

  var first = normalArray.shift(); // OK, 첫 번째 인수를 반환
  var first = arguments.shift(); // ERROR (arguments 가 일반적인 배열이 아님)
}

// 이제 rest 파라미터를 사용해 쉽게 일반적인 배열에 접근할 수 있음

function f(...args) {
  var normalArray = args;
  var first = normalArray.shift(); // OK, 첫 번째 인수를 반환
}
```
