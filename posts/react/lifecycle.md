# React RifeCycle

리액트의 핵심개념중 하나인 라이프사이클에 대하여 알아보자.

리액트는 라이프사이클을 가지고 있다.

[라이프 싸이클 알아보기](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

어떠한 메소드들이 리엑트의 상태를 읽어들이고 관리하게 되는지에 대한 관계도라고 보면된다.

리엑트는 기본적으로 state를 유지하는 각각의 component에서 state의 변경사항이 생겼을때 해당 변경사항이 있는 component만을 가상 돔을통해 재랜더링하기에 모든 페이지를 다시 로드하는 방식으로 작동한다.

그렇기에 이런 리엑트를 제대로 알고 사용하기 위해서는 라이프 싸이클을 잘 알아야한다.

주의)기본적으로 class component를 베이스로 설명한다
hook은 따로 정리하도록 하겠다.

  - [생성 될 때](#생성-될-때)
  - [업데이트 할 때](#업데이트-할-때)
  - [제거 할 때](#제거-할-때)

## 생성 될 때

constructor() -> render() -> componentDidMount()

컨스트럭터에서 props와 최초의 state, event들을 읽어내고
render를 통하여 JSX을 HTML로 그려낸다.

`componentDidMount()`는 모든 돔이만들어지고 화면에 대한 render()를 끝마친 뒤에 일어난다.

componentDidMount()는 component가 생성될 때 한 번 실행 되는 것이다.

## 업데이트 할 때

업데이트가 발생하는 경우는 세 가지로 나뉜다.

`new props`가 주어질 때

`setState`를 통해 `State`가 변경될 때

`force­Update()`를 통하여 `render()`를 실행하였을 때

1. 현재 상속받고 있는 props가 상위 컴포넌트에서 변경되어 주어지면 render를 다시 실행한다.

2. 현재 component의 state가 변경될 때도 변경된 state를 이용하여 렌더링을 해준다.

3. `forceUdate()` method는 강제로 render를 시키기에 업데이트가 발생하게 된다.

class components lifecycle method
```js
class lifecycle extends Component {
  
  componentDidMount() {
  // 생명주기상 컴포넌트가 마운트 될때 실행된다.
  }

  compomemtDidUpdate(){
    // state 변경, props의 변경, forceUdate()를 통해 render가 강제로 실행되었을떄 Update를 실행한다.
  }

  componentWillUnMount() {
    // 컴포넌트가 DOM 상에서 사라질 때 (SPA 특성상 전체페이지가 바뀌는 것이 아니기에)
    // 반드시 component가 가상DOM에서 없어질떄 기존의 이벤트 루프 등을 없애야만 메모리에 누수가 없다.
  }

}
```
