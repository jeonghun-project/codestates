# 객체 선언

- [객체 선언](#객체-선언)
  - [호출](#호출)
  - [Key 존재 확인](#key-존재-확인)
  - [얕은 복사(shallow copy) VS 깊은 복사(deep copy)](#얕은-복사shallow-copy-vs-깊은-복사deep-copy)

let name  = { key : value };  // property

```jsx
let user = {
	firstname: jeonghun, // key : value; = property
	lastname: choi,
	email: dsjoh@gmail.com,
	city: 'Seoul',
}
```

## 호출

user.firstname // jeonghun - Dot notation

user['firstname'] //jeonghun - bracket notation

값을 할당 또는 삭제

Dot notation, bracket notation 을 이용하여 값을 할당 할수있다

```jsx
user['gender'] = male;
user.gender = male;
user.gender = [male, female];
```

delete 키워드를 통해 삭제할 수 있다.

```jsx
delete user.gender // sex key 전체 삭제 
```

## Key 존재 확인

```jsx
'firstname' in user; // true
'adress' in user; //false
```

## 얕은 복사(shallow copy) VS 깊은 복사(deep copy)

1. 단순 객체복제

    변수만 복사 두 배열 중 하나의 배열의 변수만 변경되어도 나머지 배열도 동일하게 수정되는 현상

    ```jsx
    onst a = {number: 1};
    let b = a;

    b.number = 2

    console.log(a); // {number: 2}
    console.log(b); // {number: 2}
    ```

	단,  변경가능(mutable) 객체일 때만 해당한다는 것입니다. 숫자나 문자열과 같은 불변의(immutable) 객체일때는 위의 경우가 해당되지 않습니다.

2. 얕은 복사(shallow copy)

	단순 복제와 얕은 복사의 차이점은 복합객체(리스트)는 별도로 생성하지만 그 안에 들어가는 내용은 원래와 같은 객체 객체라는 점

	Object.assign()

	```jsx
	const obj = {
	a: 1,
	b: {
		c: 2,
	},
	};

	const copiedObj = Object.assign({}, obj);

	copiedObj.b.c = 3

	obj === copiedObj // false
	obj.b.c === copiedObj.b.c // true
	```

	전개 연산자

	```jsx
	const obj = {
	a: 1,
	b: {
		c: 2,
	},
	};

	const copiedObj = {...obj}

	copiedObj.b.c = 3

	obj === copiedObj // false
	obj.b.c === copiedObj.b.c // true 두 객체의 Nest object reference 여전히 같음
	```

3. 깊은 복사(deep copy)

	mutable 한 내부객체(내부리스트)의 문제를 해결하기 위해서는 얕은 복사가 아닌 깊은 복사(deep copy)를 해야 합니다.

	이를 위해서는 재귀 함수를 통하여 JSON.parse & JSON.stringify(느림주의)를 이용하여 가능하다.

	깊은 복사 인척 하지만 1depth 까지만 완벽히 복사해준다.

	```jsx
	function test() {
	'use strict';

	let obj1 = { a: 0 , b: { c: 0}};
	let obj2 = Object.assign({}, obj1);
	console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}

	obj1.a = 1;
	console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
	console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}

	obj2.a = 2;
	console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
	console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 0}}

	obj2.b.c = 3; // obj1, obj2 모두에 영향을 줌
	console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 3}}
	console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 3}}

	// 깊은 클론
	obj1 = { a: 0 , b: { c: 0}};
	let obj3 = JSON.parse(JSON.stringify(obj1));
	obj1.a = 4;
	obj1.b.c = 4;
	console.log(JSON.stringify(obj3)); // { a: 0, b: { c: 0}}
	}
	```

	```jsx
	it('Object를 함수의 인자로 전달할 경우, reference가 전달됩니다.', function () {
		const obj = {
		mastermind: 'Joker',
		henchwoman: 'Harley',
		relations: ['Anarky', 'Duela Dent', 'Lucy'],
		twins: {
			'Jared Leto': 'Suicide Squad',
			'Joaquin Phoenix': 'Joker',
			'Heath Ledger': 'The Dark Knight',
			'Jack Nicholson': 'Tim Burton Batman',
		},
	};

		function passedByReference(refObj) {
		refObj.henchwoman = 'Adam West';
		}
		passedByReference(obj);
		expect(obj.henchwoman).to.equal('Adam West');

		const assignedObj = obj;
		assignedObj['relations'] = [1, 2, 3];
		expect(obj['relations']).to.deep.equal([1, 2, 3]);

		const copiedObj = Object.assign({}, obj);
		copiedObj.mastermind = 'James Wood';
		expect(obj.mastermind).to.equal('Joker');

		obj.henchwoman = 'Harley';
		expect(copiedObj.henchwoman).to.equal('Adam West');

		delete obj.twins['Jared Leto'];
		expect('Jared Leto' in copiedObj.twins).to.equal(false);
	```