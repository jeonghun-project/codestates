# Type

기존 자바스크립트와는 다르게 분명한게 타입을 명시해주어 변수사용의 혼동이 오는 것을 봉쇄한다.

## 정적 타입선언

정적으로 변수를 사용할때 타입을 선언하여 다른 타입의 데이터는 할당하지 않도록 에러를 표시한다.

```ts
/* string */
let string: string = "hello";
let haptic: string = `hello`; /* Template literals */
let Template literals: string = `hello ${name}`;

/* number */
let num: number = 2;

/* boolean */
let b: boolean = true;

/* null */
let n: number | null; // 텅텅 비었음

/* undefined */
let u: string | undefined;  // 비엇는지 안 비었는지 모름

/* unknown */
let it: unknown; // 어떤 타입인지 모를때 근데 쓰지말자...

/* any */
let any: any; // 이 녀석도 레거시다 가져다가 버리자

/* void */
function  print():void { // 리턴타입을 지정해주는 것이 좋은 관례이다. 변수의 타입으로 지정해 주지는 않는다.
  console.log('hello');
  return;
}

/* array */
let array: any = [3, true, "hello"];
let array: number = [3, 4, 5];
let array: Array<number> = [2, 5, 6];

/* object */
let obj:object; // 쓰지말자 인터페이스로 대체하자.
function acceptSomeObject(obj: object) {}

/* tuple */
let tuple: [string, number] /* 고정된 수와 타입을 명시하여 제한 */
tuple = ["hello", 3]

/* enum 열거형 변수로 정수를 하나로 합칠 때 편리한 기능 */
/* enum tree-shaking issue 아래 블로그에서 확인하자 */
// https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking/
enum move {
	car, // 0
	plane, // 1
	trein // 2
}
or
enum move {
	car = 'car',
	plane = 'plane',
	train = 'train'
}
or
const enum move  {
	...
}

/* never */
function infiniteLoop(): never { // 무한 루프
  while (true) {}
}

function error(message: string): never { // 에러 체크
  throw new Error(message);
} // 이렇게 하면 어플리케이션이 죽는다.
```

## enum

enum은 대부분이 union타입으로 대체 가능하다. **사용하지 않는 것을 권장**
모바일은 어플리케이션과 json 형식으로 통신을 할때 서로 이해하기 위하여 enum을 사용할 수 있다

```ts
// enum 여러가지 상수값을 모아서 정의

const MAX_NUM = 6;
const MAX_studentes_per_class = 10;

const monday = 0;
const tuesday = 1;
const wednsday = 2;
const days_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1 });
const dayOfToday = days_ENUM.MONDAY;

//ts
enum Days {
  Monday, // 0
  Tuesday, // 1
  Wednesday, // 2
  Thursday, // 3
  Friday, // 4
  Satarday, // 5
  Sunday, // 6
}

console.log(Days.Monday); // => 0
let day = Days.Satarday;
console.log(day); // => 5

day = 10; // 어떠한 컴파일 에러도 나타내지 않는다. 이것이 enum사용을 피해야하는 이유이다.
console.log(day); // => 10
```

## 타입 추론(Type Inference)

타입스크립트는 정적인 타입을 추구하지만 간혹 타입이 선언되지않고 변수에 값을 할당하게 될시에는 타입을 자바스크립트와같이 추론하여 타입을 정한다.

- 이렇게 타입 추론으로 통해 값을 할당 할때 해당 변수의 타입을 정한다
- 타입이 정해진 변수는 다른 타입의 값이 할당될 때 정적인 타입 특성으로 에러를 터트린다.
- 타입 추론은 일반적으로 Union type을 통해 결정된다.

```ts
// assertion 똥이다 똥

function jsStrFunc(): any {
  return "hello";
}

const result = jsStrFunc();
(result as string).length;

const wrong: any = 5;
console.log((wrong as Array<number>).push(1)); //죽는다 주겅

function findNumbers(): number[] | undefined {
  return undefined;
}
const numbers = findNumbers();
numbers!.push(2); // 죽는다 죽어 !는 절대적으로 있다고 장담하는 경우

const button = document.querySelector("class");
button.nodeValue; // this is not good
if (button) {
  button.nodeValue; // this is good
}
```
