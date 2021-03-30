# 갈고리는 무엇을 잡아오는가?

드디어 대망의 react hook에 대한 이야기이다.

우리는 class component를 통하여 react 상태관리를 하는 법을 익히고 사용해보았지만, class components가 가지는 고질적인 문제를 react는 2018년 새로운 기능을 통하여 획기적으로 해결하였다.

## class component가 가지는 한계

- 컴포넌트 상태와 관련된 로직의 재사용성이 어렵다
- 복잡하게 만들어진 component는 서비스이해를 방해한다.
- react의 러닝 커브를 높인다.

이러한 문제들을 변화시키기 위하여 react팀은 더이상 this가 필요없고 명시적인 사용을 줄이고 기능을 필요한 기능을 합쳐 hooks를 만들어 내었습니다.

# react hooks

모든 상태 관리의 핵심 useState

## useState

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
```

## useEffect

useEffec는 class component 에서 cDM,cDU과 cWU 을 합쳐 놓은 기능을 담당한다.
이를 통해 우리는 useEffect를 통하여 lifecycle을 통한 상태관리 및 렌더링을 손쉽게 할 수 있도록 되었다.

```js
function Effect () {
  useEffect ( () => {
    effect
    return () => {
      clearup
    }
  }, [])
}
```

react는 어떻게 cDM, cDU, cWU를 useEffect에 담았는가?

우리는 두 번째 인자에 주목해야 한다.

```js
useEffect (() => {
  effect
  return () => {
    clearup
  }
}, []) // 2번째 인자로는 배열이 들어올 수 있다.
```
2번째 인자로 들어오는 요소들에 따라 useEffect를 실행할 것인지 말 것인지에 대한 결정을할수 있다.

1. **2번쨰 인자가 없을 경우 - cDM, cDU, cWU 에 해당하는 경우 모두 실행**

2. **2번째 인자에 빈 배열([])가 들어올 경우 - cDM, cWU에 해당하는 경우 실행**

3. **2번째 인자인 배열에 요소로 특정 sate or props가 들어올 경우 - cDM, cDU, cWU 를 해당하는 요소에 종속적으로 실행한다.**

이렇게 useState와 useEffect만으로도 기본적인 다양한 기능들을 만드는 것에는 무리가 없다.
하지만 알아두면 편리하고 쓰임새 있는 추가적인 hooks를 알아보자

## useMemo & useCallback

이 둘의 관계이다. 결국은 함수를 메모이제이션 하는 것이 Callback이다

### useCallback

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

함수와 그에 해당하는 인자를 미리 만들어둘 필요성이 어디에 있는가를 보면
이렇게 종속성을 유지하는데 도움이 된다.

이렇게 해두면 useEffect내에 함수를 작성할 필요성이 없어짐으로 코드가 좀더 직관적으로
해당 컴포넌트에서 직접 함수를 작성하여 이해하기에 쉽게 만들수 있다.

```js
function ProductPage({ productId }) {
  // ✅ 모든 렌더링에서 변경되지 않도록 useCallback으로 래핑
  const fetchProduct = useCallback(() => {
    // ... productId로 무언가를 합니다 ...
  }, [productId]); // ✅ 모든 useCallback 종속성이 지정됩니다

  return <ProductDetails fetchProduct={fetchProduct} />;
}

function ProductDetails({ fetchProduct }) {
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]); // ✅ 모든 useEffect 종속성이 지정됩니다
  // ...
}
```

또한 그냥 콜백을 만들어서 사용하고 싶을때도 사용할 수 있다.

```js
const handler = useCallback(() => {
    onMouseMove
    onMouseUp
    ...
    ref.current.addEventListener("mousemove", onMouseMove);
    ref.current.addEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <Div width={size.x} height={size.y} ref={ref} onMouseDown={handler} >
  )
```

### useMemo

이 최적화는 모든 렌더링 시의 고비용 계산을 방지하게 해 줍니다. - 공식문서에 나와있다.

어떻게 Memo는 고비용 계산을 방지할까?

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

useMemo에 전달된 함수는 렌더링 중에 실행이 된다.

렌더링과는 무관한 함수만이 Memo를 사용하기에 적합하다.

Memo, Effect, Callback 을 거쳐서 보았듯이 배열이 없는 경우 매 렌더링 때마다 새 값을 계산하게 될 것입니다.

배열안의 요소와 hook의 관계는 종석적이라는 것을 잊지말자.