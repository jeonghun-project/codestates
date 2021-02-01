typeof를 통해 null 값을 입력시 object가 나온다 null 값을 판별하기 우하여 무엇이 필요할까?

배열에 직접쓸 수 있는 경우 없는 경우?

배열(array)과 객체(object)

```jsx
arr = [a, 3 ,4 ,[m, 5, d], v];   // array
obj = {           // object
	learn: true,
	date: 'today',
	time: 2,
	what: 'javascript'
}
```

arr[3] = 3; // 해당 index에 값을 쓸 수 있다.

array[index]  = element - 용어 정리

배열을 조작할 때는 mutable / immutable 을 주의하자.

method가 어떻게 작동하는지 확인하자

[배열 (Array)](https://www.notion.so/Array-403f73f788574730983fd20d9c0282f1) 

mutable

- 변할 수 있다.
- 참조타입
- 해당 데이터 주소를 찾아서 값을 변경함

immutable

- 불변, 변할 수 없다
- 원시타입
- 해당 데이터 주소와 별개의 새로운 주소에 값이 할당