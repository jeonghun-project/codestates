# async await

Promise를 위한 syntax sugar이다.
코드를 표현하기 쉽도록 하는데에 목적이 있다.

## async
`Promise` 프로토타입을 만들어 내고 `resolve`에 해당하는 내용에 대하여 일반함수 처럼 return 값으로 보내주게된다.
```jsx
function fetchUser() { // Promise를 만들어서 사용하기
	return new Promise ( (resolve, reject) => {
		resolve('jeong') // resolve를 사용하지 않으면 pending 상태의 promise객체가 리턴
	}); // return Promise
}
===
async function fetchUser() { // async 사용하기
	return 'jeong'
} // return Promise
===
const fetchUser = async () => {
  return 'jeong'
}
```

## await

`await`은 `promise`의 `resolve`값을 리턴으로 받는다. (하지만 async함수가 아닌 일반 함수라면 `promise`가 아니여도 리턴을 받을 수는 있다)

`resolve`가 없을때는 즉 `error`일 때는 `reject`를 가져오는 것은 **아니다.**

```jsx
async function foo() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch(error) {
    failureCallback(error);
  }
} // async & await 을 통해서 직렬적으로 비동기적인 실행을 한다.
```

이를 병렬적으로 실행하기 위해서는 `promise`를 만들어내는 함수를 먼저 실행하여  `await`을 통해 `promise`를 할당하는 방법으로 병렬적 실행을 가능하게한다.

예를 들자면 아래코드와 같이 함수를 실행한 `Promise`를 할당한 변수를 await에 전해 줌으로서 `promise`를 만드는 함수를 실행할때 `blocking`이 발생하지 않는다.

`await`을 만나는 순간 `blocking`이 일어나지만 `Promise`를 만드는 두 함수 모두 동작하고 있다.

```jsx
async function foo() {
  try {
		const resultPromise = doSomething(); // new promise resolve()
		const newResultPromise = doSomethingElse();
    const result = await resultPromise;
    const newResult = await newResultPromise;
    console.log(`Got the final result: ${newResult}`);
  } catch(error) {
    failureCallback(error);
  }
} // 하지만 이를 축약할 수 있음 promise.all
```

## Promise.all vs Promise.race

`all`메서드는 배열로 들어온 모든 `promise`가 `resolve`일때 결과를 모든 `Promise`를 배열에 담아 보내준다.

이중 하나 이상이 `reject` 된다면 먼저 `reject`된 `Promise`로 전체를 부정한다.

```jsx
async function foo() {
  try {
		return Promise.all([doSomething(), doSomethingElse()])
		// [Promiseresult, Promiseresult];
			.then(result =>result.join(''));
    console.log(`Got the final result: ${newResult}`);
  } catch(error) {
    failureCallback(error);
  }
}

function foo() {
	try {
		return Promise.race([doSomething(), doSomethingElse()]) 
		// Promise 둘 중 먼저 끝나는 녀석
    console.log(`Got the final result: ${newResult}`);
  } catch(error) {
    failureCallback(error);
  }
}
```