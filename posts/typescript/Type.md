#  Type

기존 자바스크립트와는 다르게 분명한게 타입을 명시해주어 변수사용의 혼동이 오는 것을 봉쇄한다.

## 정적 타입선언

정적으로 변수를 사용할때 타입을 선언하여 다른 타입의 데이터는 할당하지 않도록 에러를 표시한다.

```tsx
/* string */
let string: string = "hello";
let haptic: string = `hello`; /* Template literals */
let Template literals: string = `hello ${name}`;

/* number */
let num: number = 2;

/* boolean */
let b: boolean = true;

/* null */
let n: null = null;

/* undefined */
let u: undefined = undefined;

/* array */
let array: any = [3, true, "hello"];
let array: number = [3, 4, 5];
let array: Array<number> = [2, 5, 6];

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

/* any 타입체크가 필요한 값을 사용할 때 사용하자 */
let what: any = 3 or "hello" or [3, "eld"]

/* void */
function doSomething(): void { }

/* never */
function infiniteLoop(): never { // 무한 루프
  while (true) {}
}

function error(message: string): never { // 에러 체크
  throw new Error(message);
}
```

## 타입 추론(Type Inference)

타입스크립트는 정적인 타입을 추구하지만 간혹 타입이 선언되지않고 변수에 값을 할당하게 될시에는 타입을 자바스크립트와같이 추론하여 타입을 정한다.

- 이렇게 타입 추론으로 통해 값을 할당 할때 해당 변수의 타입을 정한다
- 타입이 정해진 변수는 다른 타입의 값이 할당될 때 정적인 타입 특성으로 에러를 터트린다.
- 타입 추론은 일반적으로 Union type을 통해 결정된다.

```tsx
let number = 4 // number || boolean
```

하지만 우리는 중간에 타입이 변환될 수도 있다 이럴때 어떻게 하는게 좋을까

## 타입 캐스팅

기존의 타입에서 다른 타입으로 타입 캐스팅하려면 `as` 키워드를 사용하거나 `<>` 연산자를 사용할 수 있다.

```tsx

```

아래는 리엑트 type의  usecase이다. 아래자세한 내용이 나와 있다.

[Typing Component Props | React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example)

```tsx
type AppProps = {
  message: string;
  count: number;
  disabled: boolean;
  /** array of a type! */
  names: string[];
  /** string literals to specify exact string values, with a union type to join them together */
  status: "waiting" | "success";
  /** any object as long as you dont use its properties (NOT COMMON but useful as placeholder) */
  obj: object;
  obj2: {}; // almost the same as `object`, exactly the same as `Object`
  /** an object with any number of properties (PREFERRED) */
  obj3: {
    id: string;
    title: string;
  };
  /** array of objects! (common) */
  objArr: {
    id: string;
    title: string;
  }[];
  /** a dict object with any number of properties of the same type */
  dict1: {
    [key: string]: MyTypeHere;
  };
  dict2: Record<string, MyTypeHere>; // equivalent to dict1
  /** any function as long as you don't invoke it (not recommended) */
  onSomething: Function;
  /** function that doesn't take or return anything (VERY COMMON) */
  onClick: () => void;
  /** function with named prop (VERY COMMON) */
  onChange: (id: number) => void;
  /** alternative function type syntax that takes an event (VERY COMMON) */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  /** an optional prop (VERY COMMON!) */
  optional?: OptionalType;
};
```