# TIL_7_JS_Scope,Clousure

[Scope / Clousure](https://www.notion.so/Scope-Clousure-5b60bd37f02d4432a10364eb50eac8d2) 

### 스코프 와 클로저

## 스코프는 활동 범위 라고 볼수있다.

Global Scope는 전역 변수로 문서 전체에서 활동할 수 있다. window  혹은 키워드 없이 선언된 변수들이 이와 같다

function Scope로 함수 단위로 작동하는 변수로 var 키워드로 선언된 변수가 이러하다

Block Scope의 단위로 { } 내에 서만 활동하는 변수들이 있다 const, let 이 대표적이다.

하위 블록에서는 상위 블록의 객체들을 호출하여 사용할 수 있다. 고로 호출하여 조작하는 것도 가능하다

스코프의 개념을 이해하였다면 클로저 또한 이해 가능하다.

## clousure 클로저

함수안에 함수를 선언하여 사용할 수 있다.

정의 : 함수와 함수가 선언된 어휘적 환경의 조합

클로저는 함수와 그 함수가 선언됐을 때의 렉시컬 환경(Lexical environment)과의 조합이다.

스코프는 함수를 호출할 때가 아니라 함수를 어디에 선언하였는지에 따라 결정된다. 이를 렉시컬 스코핑(Lexical scoping)라 한다.

**클로저는 private method를 생성할 수 있고,** 

**함수 공장을 만들어 유용하게 사용할 수 있다**

