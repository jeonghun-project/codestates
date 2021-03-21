# 구조 분해 할당 (destructuring-assignment)

- [구조 분해 할당 (destructuring-assignment)](#구조-분해-할당-destructuring-assignment)
- [2. destructuring-assignment](#2-destructuring-assignment)
  - [2.1. 기본 용법](#21-기본-용법)
  - [2.2. Array](#22-array)
  - [2.3. Oject](#23-oject)
  - [2.4. rest paremeters](#24-rest-paremeters)
  - [2.5. punction prameters](#25-punction-prameters)

# 2. destructuring-assignment

배열과 객체 두 자료 구조를 각각 할당하는 방법의 일종

## 2.1. 기본 용법

배열 - 데이터 항목을 정렬된 목록으로 모을 수 있다.

```jsx
let [a, b, c] = [1, 2, 3] // a = 1; b = 2; c =3;
```

객체 - 객체의 key를 단일한 value를 가진 존재로 만들 수 있다.

```jsx
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

let {title, width, height} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

## 2.2. Array

- 할당할 변수가 없으면 건너 뛴다.

```jsx
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert( title );
```

- 리터럴한 어떠한 것도 할당할 수 있다.

```jsx
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```

- 할당이 가능하다면 어떠한 것이와도 가능하다.

```jsx
let user = {};
[user.name, user.surname] = "John Smith".split(' ');
//객체에 할당도 가능
alert(user.name); // John
alert(user.surname); // Smith
```

- 객체의 키와 값을 반복하는 것도 배열 구조 분해 할당을 통해서 가능하다.

```jsx
let user = {
  name: "John",
  age: 30
};

for (let [key, value] of Object.entries(user)) {
  alert(`${key}:${value}`); // name:John, then age:30
}
```

위와 같지만 map set 을 이용한 방법 **[참고](https://ko.javascript.info/map-set)**

```jsx
//map을 이용한 방법
let user = new Map();
user.set("name", "John");
user.set("age", "30");

for (let [key, value] of user) {
  alert(`${key}:${value}`); // name:John, then age:30
}
```

- 두 값을 바꾸는 트릭

```jsx
let guest = "Jane";
let admin = "Pete";

// Let's swap the values: make guest=Pete, admin=Jane
[guest, admin] = [admin, guest];

alert(`${guest} ${admin}`); // Pete Jane (successfully swapped!)
```

## 2.3. Oject

- 선언후에 할당하는 방법에는 문제가 있다

```jsx
let title, width, height;

// error in this line
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

코드 블록이 아님을 자바 스크립트에 표시하기 위해 표현식을 괄호로 묶을 수 있습니다.

```jsx
let title, width, height;

// okay now
({title, width, height} = {title: "Menu", width: 200, height: 100});

alert( title ); // Menu
```

- nested oject에 경우에도 구조 분해 할당을 할 수 있다.

```jsx
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

// destructuring assignment split in multiple lines for clarity
let {
  size: { // put size here
    width,
    height
  },
  items: [item1, item2], // assign items here
  title = "Menu" // not present in the object (default value is used)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

- 객체의 경우 key 를 탐색하여 maping 하여 value를 인자로 가져오고, 해당 key를 또 다른 변수에 할당함으로서 maping 된 value를 할당된 다른 변수에 재할당 할 수 있다.

```jsx
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

## 2.4. rest paremeters

배열 - rest paremeter를 통해서 배열의 나머지 요소들을 배열로 할당할 수 있다.

```jsx
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

// rest is array of items, starting from the 3rd one
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
```

객체 - rest parameter를 통해 maping하지 못한 객체의 property를 object 형태로 할당한다.

```jsx
let {name, age, gender, ...rest} = { name : 'jeong', age : 18, gender = 'male', human : true, character : 'crazy'}

console.log(name); // jeong
console.log(age); // 18
console.log(gender); // male
console.log(rest); // { human : true, character : 'crazy' }
```

## 2.5. punction prameters

- 함수의 인자를 구조분해 할당하여 넘겨줄 수 있다.

```jsx
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

```jsx
function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

참고

[Destructuring assignment](http://javascript.info/destructuring-assignment)