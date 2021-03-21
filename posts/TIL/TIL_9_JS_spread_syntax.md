# spread Syntax / rest prameter

[spread Syntax](https://www.notion.so/spread-Syntax-b4fcc952dd194562a9f360689a54148a)

둘다 뭔가를 전개하여 array 형식으로 전달 하는 것인데 

spread Syntax 를 함수의 마지막 인자로 전달하는 것이 rest parameter다.

```jsx
const f = (a, b, ...c) => { //마지막 파라미터만 Rest parameter로 전달 된다
  //
}
```

Optinal spreading ...falsy ...turety

```jsx
...turety && { djlfk : twer, wert: klaejrt } // 전개 구문 펼처짐
...falsy || { djlfk : twer, wert: klaejrt } // 전개 구문 펼처짐
```

method: 객체 안에 정의된 함수, 객체를 통해서 호출되는 함수

```jsx
let user = {
  name: "John",
  age: 30
};

user.sayHi = function() {
  alert("안녕하세요!");
};

user.sayHi(); // 안녕하세요!
```

단축 할 수 있습니다 (위 아래는 완전히 동일하진 않습니다. 객체 상속과 관련된 미묘한 차이가 존재하지만 동일하게 사용할 수 있습니다)

```jsx
// 단축 구문을 사용하니 더 깔끔해 보이네요.
user = {
  sayHi() { // "sayHi: function()"과 동일합니다.
    alert("Hello");
  }
};
```

`this` : 매서드내부에서 `this` 키워드를 사용하면 객체에 접근할 수 있습니다.

`this.` : 이때의 디스는 객체를 나타냅니다. method를 호출할 때 사용된 객체입니다.

```jsx
let user = {
  name: "John",
  age: 30,
  sayHi() {
    alert( user.name ); // Error: Cannot read property 'name' of null
  }
};

let admin = user;
user = null; // user를 null로 덮어씁니다.
admin.sayHi(); // sayHi()가 엉뚱한 객체를 참고하면서 에러가 발생했습니다.
```

this가 어려운 이유는 그 분이 바뀔 수 있기 떄문에

동적을 변한다. 실행중에 변한다.

```jsx
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// 별개의 객체에서 동일한 함수를 사용함
user.f = sayHi;
admin.f = sayHi;

// 'this'는 '점(.) 앞의' 객체를 참조하기 때문에
// this 값이 달라짐
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (점과 대괄호는 동일하게 동작함)
```