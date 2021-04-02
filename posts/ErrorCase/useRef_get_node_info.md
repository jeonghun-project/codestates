# useRef로 DOM node의 크기 위치 정보등 가져오기

하 이게 문제가 뭐나면 아직 component가 매번 새로 생성되는 것이라서 그때 useRef로 들고온 current에는 element의 정보가 담겨있지가 않는것이 문제 였다.

계속해서 나는 null에서 뭘 할 수가 없는데라는 오류 메세지가 떠서

document에서 id를 통해 element를 잡아오려 하였지만 이것또한 불가능... didMount상태에서는 원래 정상적으로 가져와야하는 것인데

useEffect에서도 leyoutEffect에서도 안 들고와지는 것은 무슨 문제인지 파악해서 업데이트 하겠슴...

**기존 코드**

```js
const TooltipBox = useRef(null);
const [height, setHeight] = useState(0);

useLayoutEffect(() => {
  console.dir(document.getElementById("TooltipBox"));
  // setHeight(document.getElementById('TooltipBox').clientHeight);
  if (TooltipBox.current) {
    console.log(TooltipBox.current.clientHeight);
    setHeight(TooltipBox.current.clientHeight);
  }
}, []);
```

일단 DOM node에서 정보 가져오기는 react에서 사실 알려주고 있었는데 아래 쪽에 작성한 코드를 확인해보면

**변경 코드**

```js
const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  if (!isVisible.state) return '';
  return (
    <Div
      ref={measuredRef}
      className="chatTooltip"
      x={user.position.x - 60 + 'px'}
      y={user.position.y - height + 'px'}
    >
```

이렇게 use 콜백을 이용하여 ref에 callback 함수를 넣어주면 알아서 정보를 잘 가져온다.
