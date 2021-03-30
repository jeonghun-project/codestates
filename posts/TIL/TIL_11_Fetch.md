# FETCH 패치해오기

자바스크립트는 외부 api를 이용한 데이터(JSON)를 쓰고 받고할 수 있는 간단한 기능을 제공하여 비동기적인 네트워크 통신을 할 수 있는 기능인 Fetch를 제공한다.

fetch는 response 객체에 ok를 통히여 통신의 완료여부를 판달할 수 있도록한다.
fetch자체에 대한 문제가 발생하지 않는이상 통신 결과에 인한 에러는 ok 객체의 존재 여부로 확인하여야한다.

error 데이터가 response에 그대로 담겨서 온다는 것을 기억하자.

catch하여 예외 처리하고 데이터를 response받지 않을 수 있다.

```jsx
fetch(apiurl)
.then(response => {
	if(response.ok) {
		return response.json());
	}
	throw new Error('Network response was not ok.');
});
.then(response => {
	return response;
}).catch(e => {
	console.log('There has been a problem :', error.message);
});
```

기본적으로 fetch는 promise 객체를 리턴하기 때문에 then으로 받아주거나 await을 통해 받아 줄 수 있다.
