# Scope
- [Scope](#scope)
	- [Global Scope 전역 변수](#global-scope-전역-변수)
	- [Function Scope VS Block Scope](#function-scope-vs-block-scope)
		- [**var 키워드(Function level Scope) VS. let 키워드 (Block level Scope) (ES6 추가)**](#var-키워드function-level-scope-vs-let-키워드-block-level-scope-es6-추가)
	- [const 키워드 (ES6 추가)](#const-키워드-es6-추가)
	- [window 객체](#window-객체)

변수 접근 규칙에 따른 유효 범위

자바스크립트는 정적 스코프(Static scope)가 아닌

**어휘적 범위 지정(lexical scoping)**

**렉시컬 스코프는 함수를 어디서 호출하는지가 아니라 어디에 선언하였는지에 따라 결정된다.**

```jsx
let greeting = 'Hello';
function greetSomeone() {
	let firstName = 'josh';
	return greeting + ' ' + firstName;
}

greetSomeone(); // 'Hello josh'
firstName;  // ReferenceError
```

안쪽 Scope에서 상위 Scope에서 선언된 변수에 접근하는 것은 가능

Scope는 중첩이 가능

## Global Scope 전역 변수

Javascript는 기본적으로, 특별한 시작점이 없으며 코드가 나타나는 즉시 해석되고 실행된다.

이때 함수나 Block이 지정되기 이전에 선언된 변수를 전역 변수라 한다.

전역 변수로 어디서든 접근이 가능하다.

지역 변수는 전역변수 보다 높은 우선순위를 가진다.

다만, **의도치 않은 재할당에 의한 상태 변화로 코드를 예측하기 어렵게 만드므로 사용을 억제하여야 한다.**

→ 해당 문제를 막기위해 Global Scope 객체를 선언하여 사용 하는것을 권장한다.

아래 두개의 코드로 함수내에서의 선언이 어떻게 동작하는지 알아보자

```jsx
let name = 'jack';
function greetSomeone() {
	let firstName = 'josh';
	console.log(name);
}

console.log(name); // 'jack'
greetSomeone(); // 'josh'
console.log(name); // 'jack'
```

```jsx
let name = 'jack';
function greetSomeone() {
	name = 'josh';
	console.log(name);
}

console.log(name); // jack
greetSomeone(); // 'josh'
console.log(name); // 'josh'
```

## Function Scope VS Block Scope

block = 중괄호로 시작하고, 끝나는 단위

{   } → 스코프를 구분하는 단위로도 쓰임

### **var 키워드(Function level Scope) VS. let 키워드 (Block level Scope) (ES6 추가)**

var은 함수 단위로 자신만의 Scope를 가집니다.

1. 함수 레벨 스코프(Function-level scope)
    - for loop 초기화식에서 사용한 변수를 for loop 외부 또는 전역에서 참조할 수 있다.
2. var 키워드 생략 허용
    - 의도하지 않은 변수의 전역화
3. 중복 선언 허용
    - 의도하지 않은 변수값 변경
4. 변수 호이스팅
    - 변수를 선언하기 전에 참조가 가능하다.

let은 block level

## const 키워드 (ES6 추가)

값이 변하지 않는 변수 즉, 상수를 정의할 때 사용하는 키워드

let 키워드와 동일하게 Block Scope를 따릅니다.

값을 재정의하려 하면 TypeError

## window 객체

Global Scope에 선언된 함수 그리고 var  키워드를 이용해 선언된 변수는 window 객체와 연결 (let은 안됨)

!전역 범위에 너무 많은 변수를 선언하지 않도록 주의하자.

변수 선언시 키워드를 사용하지 않을시 전역 범위로 선언된다.

```jsx
function showAge() {
	age = 90;         //age === window.age
	console.log(age);
}
```

Strict Mode를 사용하자 방지할 수 있다.
