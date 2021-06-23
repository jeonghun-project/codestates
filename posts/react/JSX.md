# JSX

자바스크립트를 통해 HTML을 작성하는 확장문법

## JSX의 규칙

### 반드시 하나의 엘리먼트로 감싸야한다.

이때 Fragment를 이용하면 된다.

> `<Fragment></Fragment`, `<React.Fragment></React.Fragment>`, `<> </>` 로 elements들을 감싸주면 된다.

### 내부에 자바스크립트 코드는 중괄호로 감쌀 수 있다.

아래의 [단순한 JSX 사용](#단순한-jsx-사용)을 참고하자

### if는 삼항연산자로만 작성 가능하다

```js
return <div>{props.id ? props.newTag : <div>{props.name}</div>}</div>;
```

### class는 className으로 적어주자.

```js
<>
isGookWork
<Fram className="mainContainer">
```

## 단순한 JSX 사용

```js
const name = "jeong";
const element = <h1>Hello, {name}</h1>;

render(element);
```

태그가 비어있다면 XML 처럼 />를 이용하여 바로 닫아주자

```js
const element = <img src={user.profile} />;
```

자식 태그를 가질 수 있다.

```js
const element = (
  <div>
    <h1>Hello world</h1>
    <h2>nice to meet you</h2>
  </div>
);
```

JSX에 삽입된 모든 값은 렌더링하기 전에 이스케이프 하기때문에,
명시적으로 작성되지 않은 내용은 주입되지 않는다.
XSS(cross-site-scripting) 공격을 방지할 수 있다.

## JSX는 객체를 표현한다.

Babel은 JSX를 React.createElement() 호출로 컴파일합니다.

```js
const element = <h1 className="greeting">Hello, world!</h1>;
```

위 아래는 같다.

```js
const element = React.createElement(
  "h1",
  { className: "greeting" },
  "Hello, world!"
);
```

React.createElement()는 버그가 없는 코드를 작성하는 데 도움이 되도록 몇 가지 검사를 수행
다음과 같은 객체를 생성한다.

```js
// 주의: 다음 구조는 단순화되었습니다
const element = {
  type: "h1",
  props: {
    className: "greeting",
    children: "Hello, world!",
  },
};
```
