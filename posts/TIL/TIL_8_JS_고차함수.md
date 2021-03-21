# TIL 고차함수

First-class citizen

## 퍼스트 클래스

- 변수에 할당(assignment)할 수 있따.
- 다른 함수의 인자(argument)로 전달될 수 있다.
- 다른 함수의 결과로서 리턴될 수 있다.

함수를 마치 데이터(string, number, array, object, boolean) 다루듯이 다룰 수 있다.

⇒ 함수 표현식

[Code States TIL(Today I Learned) day1](https://www.notion.so/Code-States-TIL-Today-I-Learned-day1-b74f5563014e4dfdb9cfc863adb0663c) 

함수 선언식의 호이스팅은 편리하지만 지나치게 사용하다 보면 코드의 유지 보수측면에서 좋지 않다.

## 고차 함수 : What is higher order function?

함수를 인자(argument)로 받거나 함수를 리턴하는 함수를 말한다.

다른 함수(`caller`)의 인자(argument)로 전달되는 함수를 콜백 함수(callback function)라고 합니다.

콜백 함수를 전달받은 함수는 이 콜백 함수를 호출(invoke) 할 수 있습니다.

### '함수를 리턴하는 함수'  === 커리 함수

고차함수에 엄밀히 말하면 포함되지만 커리 함수는 커리함수 고차 함수는 고차 함수라고 한정지어서 사용하기도 한다.

1. 다른 함수를 인자로 받는 경우

```jsx
function double(num) {
  return num * 2;
}

function doubleNum(func, num) {
  return func(num);
}

// 함수 doubleNum은 다른 함수를 인자로 받는 고차 함수입니다.
// 함수 doubleNum의 첫 번째 인자 func에 함수가 들어올 경우
// 함수 func는 함수 doubleNum의 콜백 함수입니다.
// 아래와 같은 경우, 함수 double은 함수 doubleNum의 콜백 함수입니다.
let output = doubleNum(double, 4);
console.log(output); // -> 8
```

2. 함수를 리턴하는 경우

```jsx
function adder(added) {
  return function (num) {
    return num + added;
  };
}

// 함수 adder는 다른 함수를 리턴하는 고차 함수입니다.
// adder는 인자 한 개를 입력받아서 함수(익명 함수)를 리턴합니다.
// 리턴되는 익명 함수는 인자 한 개를 받아서 added와 더한 값을 리턴합니다.

// adder(5)는 함수이므로 함수 호출 연산자 '()'를 사용할 수 있습니다.
let output = adder(5)(3); // -> 8
console.log(output); // -> 8

// adder가 리턴하는 함수를 변수에 저장할 수 있습니다.
// javascript에서 함수는 일급 객체이기 때문입니다.
const add3 = adder(3);
output = add3(2);
console.log(output); // -> 5
```

3. 함수를 인자로 받고, 함수를 리턴하는 경우

```jsx
function double(num) {
  return num * 2;
}

function doubleAdder(added, func) {
  const doubled = func(added);
  return function (num) {
    return num + doubled;
  };
}

// 함수 doubleAdder는 고차 함수입니다.
// 함수 doubleAdder의 인자 func는 함수 doubleAdder의 콜백 함수 입니다.
// 함수 double은 함수 doubleAdder의 콜백으로 전달되었습니다.

// doubleAdder(5, double)는 함수이므로 함수 호출 기호 '()'를 사용할 수 있습니다.
doubleAdder(5, double)(3); // -> 13

// doubleAdder가 리턴하는 함수를 변수에 저장할 수 있습니다. (일급 객체)
const addTwice3 = doubleAdder(3, double);
addTwice3(2); // --> 8
```

메서드 중 고차 함수 학습하기

- forEach, find, filter, map, reduce, sort, some, every

 - map 

인자로 주어진 함수를 수행하여 재구성한 새로운 배열을 만든다

```jsx
var kvArray = [{key:1, value:10},
               {key:2, value:20},
               {key:3, value: 30}];

var reformattedArray = kvArray.map(function(obj){
   var rObj = {};
   rObj[obj.key] = obj.value;
   return rObj;
});
```

 - filter

인자로 주어진 함수의 리턴값이 true인 배열만을 선택하여 새로운 배열로 만든다.

 - **reduce

인자로 주어진 함수의 실행값을 다시 인자로 주어 실행하여 최종적인 실행값을 얻는다

## 명시적 프로그램

고차 함수를 사용할 때 인자에 함수 이름만 인자로 주었습니다. 이렇게 변수와 함수의 이름 명명을 통해 변수와 함수의 기능을 명시적으로 표현하는 것을 명시적 프로그레밍(declarative programming)이라고 합니다.

```jsx
//// 1 번
function length5AndEven(word) {
	let wordLen = word.length;
	return wordLen > 5 && wordLen % 2 === 0 ? true: false;
}

function filteringWords(words) {
	return words.filter(length5AndEven);
}

// 2번
function filteringWords(words) {
	function length5AndEven(word) {
		let wordLen = word.length;
		return wordLen > 5 && wordLen % 2 === 0 ? true: false;
	}
return words.filter(length5AndEven);
}

// 3번
function filteringWords(words) {
	const result = words.filter(function (word) {
	return word.length > 5 && word.length % 2 === 0
})
return result;
}

// 4번
function filteringWords(words) {
	return words.filter(function (word) {
		if (word.length > 5) {
			if (word.length % 2 === 0) {
				return true;
			}
		}
	})
}
```

위 코드 4개는 모두 같은 동작을 한다.