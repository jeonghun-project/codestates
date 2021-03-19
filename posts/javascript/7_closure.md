# Closure(폐쇠)

- [Closure(폐쇠)](#closure폐쇠)
    - [유용한 클로저](#유용한-클로저)
    - [클로저를 이용해서 프라이빗 메소드(private method) 흉내 내기](#클로저를-이용해서-프라이빗-메소드private-method-흉내-내기)
    - [clousure Scope chain](#clousure-scope-chain)

변수의 유효범위에 대한 이해가 필요하다(Lexical scoping)

Javascript는 함수도 리턴할 수 있다. ⇒ 함수를 포함하고 있는 상태인 Closure (함수 공장)

```jsx
function outerFn() {
	let outerVar = 'outer';
	console.log(outerVar);

	function innerFn() {
	let innerVar = 'inner';
	console.log(innerVar);
	}
	return innerFn;
}

let out = outerfn();
/* 
	outer
<return
	innerFn() {
	let innerVar = 'inner';
	console.log(innerVar);
	} 
*/
```

결론적으로 오직 하나의 메소드를 가지고 있는 객체를 일반적으로 사용하는 모든 곳에 클로저를 사용할 수 있다. - MDN

### 유용한 클로저

동적 웹페이지를 구현 할때 기능적인 함수를 내장하여 편리하게 사용할 수 있다.

```jsx
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}
```

### 클로저를 이용해서 프라이빗 메소드(private method) 흉내 내기

[모듈 패턴](https://yubylab.tistory.com/entry/%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4-for-javascript-Module-Pattern)으로 이용할 수 있다

```jsx
var counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };
})();

console.log(counter.value()); // logs 0
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
counter.decrement();
console.log(counter.value()); // logs 1
```

변수에 할당하여 각각 독립적인 함수로 활용할 수 있다.

유효 Scope 의 차이로 인한 서로의 변수를 침해하지 않기에 정보를 은닉하고 캡슐화 할 수 있는 이점을 가져온다 

예시를 보자

```jsx
var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }
};

var counter1 = makeCounter();
var counter2 = makeCounter();
alert(counter1.value()); /* 0 */
counter1.increment();
counter1.increment();
alert(counter1.value()); /* 2 */
counter1.decrement();
alert(counter1.value()); /* 1 */
alert(counter2.value()); /* 0 */
```

그렇다면 clousure의 스코프 체인을 알아볼 필요가 있다

### clousure Scope chain

모든 클로저에는 세가지 스코프(범위)가 있다.

- 지역 범위 (Local Scope, Own scope)
- 외부 함수 범위 (Outer Functions Scope)
- 전역 범위 (Global Scope)

```jsx
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

// 아래 주석을 참조하면 아래 func을 통과하지 않고도 구현 가능하다
function makeHelpCallback(help) { 
  return function() {
    showHelp(help);
  };
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];  /// var keyword 를 let 으로 변경하여 Scope를 변경하자
    document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
  }
}

setupHelp();
```