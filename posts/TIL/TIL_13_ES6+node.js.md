# TIL ES6+node.js

# 오늘의 한 일

오늘은 자바스크립트 특히 ES6에서 등장한 주요한 syntax를 활용하는 연습(?)을 하였다.

## Arrow Function

[Arrow function](../javascript/9_Arrow%20function.md) 

함수를 표현하는 다른 방법 기존의 표현식이나 선언식이 아닌 ⇒ 화살표를 이용한여 함수를 표현한다.

- 함수를 간단히 나타낼 수 있다
- return을 생략할 수 있다.
- closure를 혁신적으로 만들 수 있다.
- 다른 함수와는 다르게 `this` 가 존재하지 않는다.

## 구조 분해 할당 ( destructuring-assignment )

[구조 분해 할당 (destructuring-assignment)](../javascript/10_구조%20분해%20할당%20(destructuring-assignment).md) 

배열과 객체를 분해해서 할당한다 말 그대로다.

- 배열은 요소를 순서대로 좌측에 요소에 할당하는 개념이다.
- 객체는 key를 maping 하여 value를 가져와 할당하는데 이때의 기준은 좌측 변수이름과 일치하는 key의 value를 선택한다. 뭔가 복잡하면 위 링크에 예제를 보자.
- 객체의 구조 분해 할당에서 주의해야 할 것은 key를 maping한 값을 key와 일치하는 변수이름 말고 다른 변수에 할당 할 수 있다. 콜론(:)을 이용하여 `<serch key> : <reAssignment variable>` 할당한다.
- 구조분해 할당은 함수에 인자에서도 가능하다.

## node.js

javascript를 위한 런타임 환경이라고 생각하자.

javascript는 최초에는 web browser에서 동작하는 언어로서의 기능을 수행하였지만, node.js를 이용하여 node

### CommonJS API

나중에 따로 한 번 다뤄야 겠지만 일단은 간략하게 이해하자면 javascript의 module화를 위한 도구라고 보면되겠다. 이로서 다른 사람이 만든 환경에서도 어플리케이션을 실행하는데에 문제가 없도록 만든다.

Core Modules

코어 모듈은 Node 소스코드의 `lib/` 폴더에 들어 있다.

모듈을 require하면 항상 코어 모듈이 먼저 로드된다. 예를 들어, `require('http')`로 로드될 것 같은 파일이 있어도 Node에 들어 있는 HTTP 모듈이 반환된다.

## npm

[npm](../noodeJS/npm.md) 

패키지 관리 도구 

node.js 에서 설치 가능한 모듈들을 패키지화하여 모아둔 저장소 역활을 한다.

패키지를 검색하고 설치하고 배포할 수 있다.