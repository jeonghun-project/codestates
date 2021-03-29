# React onChange 이벤트 결과 바로 적용

lifecycle에 대한 이해가 부족해서 일어난 일

SetState를 통하여 State가 변경된 후에 didUpdate가 실행되기에
didUpdate에서 State를 변경한다면, 반드시 아래와 같은 처리가 필요하다.

또한 state는 SetState를 통해 변경해야만 render를 진행하고 state의 변화가 component에 반영이 된다.

```js
  componentDidUpdate () {
    if(this.state.name === 'jeong') {
      this.state.char = '천재'
      this.state.isCharactor = true;
    } else {
      this.state.isCharactor = true;
      this.state.char = '바보'
    }
  }
```

```js
  componentDidUpdate(preProps, preState) {
    if(this.state.name !== preState.name) {
      if(this.state.name === 'jeong') {
        this.setState({
          ...this.state,
          char : '천재',
          isCharactor : true,
        })
      } else {
        this.setState({
          ...this.state,
          isCharactor : true,
          char : '바보',
        })
      }
    }
  }
```
