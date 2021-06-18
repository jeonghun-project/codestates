# this

자바스크립트의 함수는 호출될때, 매개변수로 전달되는 인자값 이외에, arguments 객체와 `this` 를 암묵적으로 전달 받는다.

\*java의 this와의 차이점 자바의 경우 매개변수와 객체 자신이 가지고 있는 멤버변수명이 같을 경우 그 구분을 위해 사용된다. this.변수명은 멤버변수를 의미한다.

## this의 바인딩

자바스크립트의 경우 this에 바인딩 되는 객체는 한가지가 아니라 해당 함수 호출 방식에 따라 this에 바인딩되는 객체가 달라진다.

**즉, 함수를 호출할 때 함수가 어떻게 호출되었는지가 중요하다.**

> 자바스크립트의 렉시컬 스코프는 [Scope / Clousure](./5_scope.md) 함수를 어디서 호출하는지가 아니라 어디에 선언하였는지에 따라 결정된다. this 바인딩과 혼동하지 말.

자바스크립트의 함수 호출 방식

```js
let foo = function () {
  console.log(this);
};
```

1. 함수 호출

   ```js
   foo(); // window
   ```

2. 메소드 호출

   ```js
   let obj = { foo: foo };
   obj.foo(); // obj
   ```

3. 생성자 호출

   ```js
   var instance = new foo(); // instance
   ```

4. apply, call, bind 호출

   ```js
   var bar = { name: "bar" };
   foo.call(bar); // bar
   foo.apply(bar); // bar
   foo.bind(bar)(); // bar
   ```

### 함수 호출

전역객체(Global Object)는 모든 객체의 유일한 최상위 객체를 의미하며 일반적으로 Browser-side `window` , Server-side `global` 을 의미한다.

전역객체는 전역변수를 프로퍼티로 소유한다.글로벌 영역에 선언한 함수는 전역객체의 프로퍼티로 접근할 수 있는 전역 변수의 메소드이다.

기본적인 함수 호출시에 `this` 는 전역객체(Global object)에 바인딩 된다. 전역함수는 물론이고 심지어 내부 함수의 경우도 `this` 는 외부함수가 아닌 전역객체에 바인딩된다.

```js
function foo() {
  console.log("foo's this: ", this); // window
  function bar() {
    console.log("bar's this: ", this); // window
  }
  bar();
}
foo();
```

![this console](./src/this1.png)

or 메소드의 내부 함수일 경우에도 this는 전역객체에 바인딩된다.

```js
value = 5;

let obj = {
  value: 10,
  foo: function () {
    console.log("foo's this: ", this); // obj
    console.log("foo's this.value: ", this.value); // 10
    function bar() {
      console.log("bar's this: ", this); // window
      console.log("bar's this.value: ", this.value); // 5
    }
    bar();
  },
};

obj.foo();
```

or 콜백함수의 경우에도 this는 전역객체에 바인딩된다.

```js
value = 10;

let obj = {
  value: 1,
  foo: function () {
    setTimeout(function () {
      console.log("callback's this: ", this); // window
      console.log("callback's this.value: ", this.value); // 10
    }, 100);
  },
};

obj.foo();
```

즉 내부함수는 어디에서 선언되었는 `this`는 전역객체를 바인딩한다.

이를 회피하기 위한 대안 (ES5)

```js
value = 1;

let obj = {
  value: 100,
  foo: function () {
    var that = this; // Workaround : this === obj

    console.log("foo's this: ", this); // obj
    console.log("foo's this.value: ", this.value); // 100
    function bar() {
      console.log("bar's this: ", this); // window
      console.log("bar's this.value: ", this.value); // 1

      console.log("bar's that: ", that); // obj
      console.log("bar's that.value: ", that.value); // 100
    }
    bar();
  },
};

obj.foo();
```

이 같은 객체를 지시하는 변수를 중복 생성함으로 비효율적이기에 ES6는 이를 화살표 함수로 해결한다.

```js
value = 1;

let obj = {
  value: 100,
  foo: function () {
    console.log("foo's this: ", this); // obj
    console.log("foo's this.value: ", this.value); // 100
    let bar = () => {
      console.log("bar's this: ", this); // obj
      console.log("bar's this.value: ", this.value); // 100
    };
    bar();
  },
};

obj.foo();
```

이외에도 apply, call, bind 메소드를 이용하여 this를 바인드딩 할 수 있다.

```jsx
var value = 1;

var obj = {
  value: 100,
  foo: function () {
    console.log("foo's this: ", this); // obj
    console.log("foo's this.value: ", this.value); // 100
    function bar(a, b) {
      console.log("bar's this: ", this); // obj
      console.log("bar's this.value: ", this.value); // 100
      console.log("bar's arguments: ", arguments);
    }
    bar.apply(obj, [1, 2]);
    bar.call(obj, 1, 2);
    bar.bind(obj)(1, 2);
  },
};

obj.foo();
```

### method 호출

메소드 내부의 `this` 는 해당 메소드를 소유한 객체에 바인딩 된다.

```js
var obj1 = {
  name: "Lee",
  sayName: function () {
    console.log(this.name);
  },
};

var obj2 = {
  name: "Kim",
};

obj2.sayName = obj1.sayName;

obj1.sayName();
obj2.sayName();
```

prototype object mettod 내부에 `this` 또한 일반 메소드 방식과 마찬가지로 호출한 객체에 바인딩.

```js
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

var me = new Person("Lee");
console.log(me.getName()); // 'Lee'

Person.prototype.name = "Kim";
console.log(Person.prototype.getName()); // 'Kim'
```

### 생성자 함수 호출

new 연산자와 함께 생성자 함수를 호출하면 어떻게 동작할까?

1. 빈 객체 생성 및 `this` 바인딩

   빈 객체가 우선 생성 → construct가 내의 `this`는 이 빈 객체를 가리킨다.

2. `this`를 통한 프로퍼티 생성

   생성된 빈 객체에 `this`를 사용하여 동적으로 프로퍼티나 메소드를 생성할 수 있다. `this`는 새로 생긴 객체를 가리키므로 this를 통해 생성한 프로퍼티와 메소드는 새로 생성된 객체에 추가된다.

3. 생성된 객체 반환
   - 반환문이 없는 경우, `this`에 바인딩된 새로 생성한 객체가 반환된다.
   - 반환문이 `this`가 아닌 다른 객체를 명시적으로 반환하는 경우, `this`가 아닌 해당 객체가 반환된다. 이때 `this`를 반환하지 않은 함수는 생성자 함수로서의 역할을 수향하지 못한다. 따라서 **생성자 함수는 반환문을 명시적으로 사용하지 않는다.**

### 객체 리터럴 방식과 차이

```js
let foo = {
	name : 'jeong',
	gender : 'male'
}

console.dir(foo);

class Person(name, gender) {
	this.mame = name;
	this.gender = gender;
}

let me = new Person('jeong', 'male');
console.dir(me);
let hwo = new Person('Choi', 'male');
console.dir(hwo);
```

- 객체 리터럴 방식은, 프로토타입 객체은 Object.prototype이다.
- 생성자 함수 방식은, Person.prototype이다.
