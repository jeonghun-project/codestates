# Type in function

```ts
// Javascript
function jsAdd(num1, num2) {
  return num1 + num2;
}

// Typescript
function add(num1: number, num2: number): number {
  return num1 + num2;
}
```

```ts
//Javascript
function fetchNum(id) {
  return new Promise((resolve, reject) => {
    resolve(100);
  });
}

//Typescript
function fetchNum(id: string): Promise<number> {
  return new Promise((resolve, reject) => {
    resolve(100);
  });
}
```

```ts
function printName(firstName: string, lastName?: string) {
  console.log(firstName);
  console.log(lastName);
}
printName("steve", "Jobs");
PrintName("jeong");

function printMessage(message: string = "default message") {
  console.log(message);
}

// rest parameter
function addNumbers(...args: number[]): number {
  return args.reduce((pre: number, cu) => {
    pre += cu;
  }, 0);
}
```

```ts
const num: number[];
const numberArr : Array<number>;

function (num: readonly number[]):number {
  return number[9]
}

//Tuple -> interface, type alias, class로 대체하여 사용하자.
let type: [string, number];
const [name, age] = User;
```

## union, intersection

union : | or 연산자와 유사한 기능으로 두 타입을 따르지만 둘 중하나의 타입에 포함되어 있다면 문제없다.

intersection : & and 연산자와 유사한 기능으로 두 타입을 따르면서 두 타입 모두 완벽하게 일치하여야 한다.

```ts
// union : |
type SuccessState = {
  response: {
    body: string;
  };
};

type FailState = {
  reason: string;
};

type LoginState = SuccessState | FailState;

async function login(id: string, pw: string): Promise<LoginState> {
  return {
    response: {
      body: "logged in!",
    },
  };
}

function prontLoginState(state: LoginState) {
  if ("response" in state) {
    console.log(`${state.response.body}`);
  } else {
    console.log(`${state.reason}`);
  }
}

// intersection : &
type Student = {
  name: string;
  score: number;
};

type Worker = {
  employeeId: number;
  work: () => void;
};

function interWork(person: Student & Worker) {
  console.log(person.name, person.employeeId, person.work());
}
```
