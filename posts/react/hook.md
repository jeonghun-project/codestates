# 갈고리는 무엇을 잡아오는가?

드디어 대망의 react hook에 대한 이야기이다.

우리는 class component를 통하여 react 상태관리를 하는 법을 익히고 사용해보았지만, class components가 가지는 고질적인 문제를 react는 2018년 새로운 기능을 통하여 획기적으로 해결하였다.

## class component가 가지는 한계

- 컴포넌트 상태와 관련된 로직의 재사용성이 어렵다
- 복잡하게 만들어진 component는 서비스이해를 방해한다.
- react의 러닝 커브를 높인다.

이러한 문제들을 변화시키기 위하여 react팀은 더이상 this가 필요없고 명시적인 사용을 줄이고 기능을 필요한 기능을 합쳐 hooks를 만들어 내었습니다.

## react hooks

모든 상태 관리의 핵심 useState

### useState

state기반의 라이프사이클을 가지는 react에서는 state의 관리가 무엇 보다 중요한데, 이를 편리하게 선언하고 사용할 수 있도록 해준다.

기존의 class component에서는 constructor내에서만 state를 선언할 수 있었지만, javascript에서 변수를 다루듯이 여러 state를 useState를 통해 선언할 수 있고, 각각의 state를 각각의 set function을 통하여 update할 수 있다.

```js

function count () {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div onClick={()=> setCount(count + 1)}>
        {count}
      </div>
    </div>
  )

}
