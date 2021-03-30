# Vue js 시작하기

vue js 공식문서에 따르면

> Vue(/vjuː/ 로 발음, view 와 발음이 같습니다.)는 사용자 인터페이스를 만들기 위한 프로그레시브 프레임워크 입니다

## vue의 기본적인 기능

- [Vue js 시작하기](#vue-js-시작하기)
  - [vue의 기본적인 기능](#vue의-기본적인-기능)
  - [선언을 통하여 데이터 렌더링하기](#선언을-통하여-데이터-렌더링하기)
  - [v- attribute](#v--attribute)
    - [v-if](#v-if)
    - [v-for](#v-for)
    - [v-on](#v-on)
    - [v-model](#v-model)
  - [components](#components)
    - [with props components](#with-props-components)

## 선언을 통하여 데이터 렌더링하기

```html
// index.html
...
    <body>
        
        <div id="app">
            {{ message }}
        </div>
...
```

```js
// Vue instance 생성하기
var app = new Vue({ 
  // id로 element 타겟 설정하기
    el: '#app',
    // data 객체에 필요한 정보 저장하기.
    data: {
        message: 'Hello Vue!'
    }
});

app.message = 'changed the data'
```

이제 화면에는 Hello Vue가 보이게 된다.

## v- attribute
v-를 통해서 다양한 vuejs attribute를 설정할 수 있다.

### v-if 
```html
<div id="app">
    <span v-if="seen">Now you see me</span>
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    // 보이고
    seen: true
  }
})
// 안 보이고
app.seen = false;
```

### v-for
```html
...
    <body>
        
        <div id="app">
            <ol>
                <li v-for="todo in todos">
                {{ todo.text }}
                </li>
            </ol>
        </div>
...
```

```js
var app = new Vue({
  el: '#app',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ]
  }
});
```

### v-on

```html
...
    <body>
        
        <div id="app">
            <p>{{ message }}</p>
            <button v-on:click="reverseMessage">Reverse Message</button>
        </div>
        
...
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```

### v-model

```html
...
    <body>
    
        <div id="app">
            <p>{{ message }}</p>
            <input v-model="message">
        </div>
    ...
``` 

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

## components

```html
...
    <body>
    
        <div id="app">
            <ol>
                <todo-item></todo-item>
                <todo-item></todo-item>
            </ol>
        </div>
...
```

```js
//children components
Vue.component('todo-item', {
  template: '<li>This is a todo</li>'
})

// parent
var app = new Vue({
  el: '#app'
})
```

### with props components

```html
...
    <body>
    
        <div id="app">
            <ol>
                <todo-item
                    v-for="item in groceryList"
                    v-bind:todo="item"
                    v-bind:key="item.id">
               </todo-item>
            </ol>
        </div>
        <!-- https://vuejs.org/v2/guide/list.html#key -->
        <script src="index.js"></script>
    </body>
</html>
```

```js
Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

var app = new Vue({
    el: '#app',
    data: {
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ]
    }
})
```
