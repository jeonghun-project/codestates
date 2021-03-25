# component

자바스크립트의 함수와 유사함 "`props`"라고 하는 임의의 입력을 받은 후, 화면에 어떻게 표시되는지를 기술하는 React엘리먼트를 반환합니다.


## 컴포넌트 랜더링

일반 함수 컴포넌트를 어떻게 랜더링할 수 있을까?

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Jeong" />;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

이러한 방식으로 JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 만들어 전달한다.
단일객체를 어떻게 전달하는지 알아보자.

```js
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

위는 아래처럼 props 단일객체로 만들어진다.

```js
{color: 'blue', shadowSize: 2}
```

또한 `props`는 읽기 전용입니다. 수정해서는 안됩니다.

```js
//이런 것을 순수함수 props를 사용하지 변경하지 않는다
function sum(a, b) {
  return a + b;
}
```

```js
// 이렇게 하면 혼나고 State를 사용 해야한다.
function withdraw(account, amount) {
  account.total -= amount;
}
```

**모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 합니다.**


## function component vs class component

함수로 컴포넌트 정의하기

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
이를 class component로도 작성 할 수 있다.

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
이렇게 까지는 어떠한 차이도 없이 같은 컴포넌트 처럼 보인다.
하지만 class에서는 this.state를 할당함으로서 state에 동적인 동작이 가능하도록 하였는데 이는 프로젝트의 규모가 커지면서 점점 wrap지옥을 만들어 내었고, 아를 개선하기 위하여 hook이 등장하였다.(2018)
기본적으로 class에서 어떻게 state의 변화를 어떻게 다루는지 알아보자

```js
export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      char: '',
      isCharactor : false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate () {
    if(this.state.name === 'jeong') {
      this.state.char = '천재'
      this.state.isCharactor = true;
    } else {
      this.state.isCharactor = true;
      this.state.char = '바보'
    }
  }

  handleChange(e) {
    this.setState({
      name : e.target.value
      });
  }

  render() {
    return (
      <section>
        <h1>Hello, {this.state.name}</h1>
        {
          this.state.isCharactor ? <p>{this.state.char}</p> : ''
        }
        <input value={this.state.name} onChange={this.handleChange} />
      </section>
    )
  }
}
```