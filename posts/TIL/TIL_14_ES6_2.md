# TIL ES6_2

오늘은 자바스크립트 특히 ES6에서 등장한 주요한 syntax를 활용하는 연습(?)을 하였다.

의 연장 part2, class의 등장 instance 개념과 method closure에 사용 나아가서 this까지!

## Singleton

싱글턴 패턴은 인스턴스가 오직 1개만 생성되야 하는 경우에 사용되는 패턴입니다.

closure가 혁신적이고 비밀을 간직한체 Singleton 객체를 생성하는 방법이다.

```jsx
var singleton = (function() {
  var instance;
  var a = 'hello';
  function initiate() {
    return {
      a: a,
      b: function() {
        alert(a);
      }
    };
  }
  return {
    getInstance: function() {
      if (!instance) {
        instance = initiate();
      }
      return instance;
    }
  }
})();
var first = singleton.getInstance();
var second = singleton.getInstance();
console.log(first === second); // true;
```

참조 [https://www.zerocho.com/category/JavaScript/post/57541bef7dfff917002c4e86](https://www.zerocho.com/category/JavaScript/post/57541bef7dfff917002c4e86)

## method

method는 객체에 할당된 함수로서 해당객체에서 호출하여 사용할 수 있는 함수를 말한다.

# class

[class](https://www.notion.so/class-4f021df815bd473a83f3975f4cdeda56) 

객체를 찍어낼 수 있는 청사진(blueprint) class를 이용해서 객체를 만들어낼 수 있고, 이렇게 만들어진 객체를 instance라고 칭한다.

## prototype

original object form 즉, class로 만들어지는 모든 instance의 부모 열활을 담당하는 객체와 연결될 수 있도록 해준다. 이러한 original object for이 Prototype Object ⇒ Prototype이라고 칭한다.

## constructor

class는 생성자를 필요로한다.

## new

new는 instance 키워드이다. 각각의 인스턴스는 class의 내장 함수인 mthod에 접근할 수 있다.

## this

[this](https://www.notion.so/this-9f3b760acebf4d3abcf30b3110c45125) 

javascript에서만 있는 기능이다