# Event Emitter

**Class: EventEmitter**

`EventEmitter`는 `Event module`에 의하여 정의 되어져 있습니다.
이 또한 [공식문서](https://nodejs.org/api/events.html#events_emitter_removelistener_eventname_listener)를 살펴보는 것을 추천한다.

```js
const EventEmitter = require('events');
```

*`EventEmitter`는 기본적으로 등록 된 모든 `Listener`를 동기적으로 호출한다. **이때 return은 무시되고 버려진다.** `Emitter`에 method와 `Listener`를 착각하지 말자


*but,* 하지만 **`EventEmitter` 자체는 비동기적이다.**
이는 **중요한 개념**이다.


필요할 경우에는 비동기적 호출을 위하여 `setImmediate()` 혹은 `process.nextTick()` method를 사용하여 비동기 작업으로 전환 할 수 있다.


## 여기서도 this

일반 `listener` 함수가 호출 될 때 `this`에 경우 의도적으로 `EventEmitter instance`를 attached 한단다.

```js
const myEmitter = new MyEmitter();
myEmitter.on('event', function(a, b) {
  console.log(a, b, this, this === myEmitter);
  // Prints:
  //     a b
  //     MyEmitter {
  //     domain: null,
  //     _events: { event: [Function] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined }
  //     true
});
myEmitter.emit('event', 'a', 'b');
```

### Event: 'newListener'

모든 `EventEmitter`가 새로운 리스너가 추가되면 `newListener`를 자체적으로 내보낸다.

주요하게 생각해볼 점은 리스너가 추가되기 전에 newListener method가 실행되는 것이다.

이로 인한 부작용을 공식문서에서 알려주는데

newListener'콜백 내에서 동일한 이름으로 등록 된 모든 추가 리스너는 추가중인 리스너 앞에 삽입된다고 한다.

```js
var EventEmitter = require('events').EventEmitter;

var em = new EventEmitter();

em.on('newListener', (event, listener) =>{
 console.log(`New listener is added for the event '${event}'`);
});

em.on('demoEvent', () => {
  console.log('Listener1 is added for demoEvent');
});

em.on('demoEvent', () => {
  console.log('Listener2 is added for demoEvent');
});

em.emit('demoEvent');

// New listener is added for the event 'demoEvent'
// New listener is added for the event 'demoEvent'
// Listener1 is added for demoEvent
// Listener2 is added for demoEvent
```

이걸 쓸일이 있을까 곰곰히 생각해 보는데 만약 이벤트의 종류가 무엇일때는 어떤 이벤트를 꼭 거쳐서 나가고 싶을때 사용하면 좋겠더라.
그렇지만 `once` method를 이용해서 한 번만 실행하는 것도 가능하다.

```js
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
// Only do this once so we don't loop forever
myEmitter.once('newListener', (event, listener) => {
  if (event === 'event') {
    // Insert a new listener in front
    myEmitter.on('event', () => {
      console.log('B');
    });
  }
});
myEmitter.on('event', () => {
  console.log('A');
});
myEmitter.emit('event');
// Prints:
//   B
//   A
```

### Event: 'removeListener'

이건 listener가 삭제돠면 발생하는 이벤트 Listner이다.

### emitter.addListener(eventName,listener)

새로운 이벤트 리스너를 등록한다.
```js
=== 
emitter.on(eventName, listner);
```

on nethod와 같은 동작이다.

### emitter.emit(eventName[, ..args])

eventName 인자와 같은 모든 이벤트들에 args를 전달하여 각각 순서대로 실행 시킨다.

막약 해당하는 EventListener가 없다면 `false`를 return 있다면 `true`를 리턴한다.
```js
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5); // true;

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

### emitter.eventNames()

emitter 내의 모든 Listener의 EventName을 배열에 담아서 리턴한다. 요소는 String or Symbol 이다.

```js
const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

### emitter.getMaxListener() and .setMaxListener(n)

eventListener의 경우 한 Event에 최대 9개의 Listener를 추가할 수 있고 10개 이상의 리스너가 추가되면 경고를 출력한다.

`setMaxListener`를 통해 이 최대 `Listener`의 갯수를 늘릴수 있다.
이러한 Max값을 `getMaxListener`를 통해 가져올 수 있다.

### emitter.listenerCount(evantName)

갯수를 세어준다.

### emitter.off(eventName, listener)

Listener를 삭제한다.

```js
===
emitter.removeListener(eventName, listener)
```

### emitter.on(eventName, listener)

Returns a reference to the EventEmitter, so that calls can be chained.
체이닝이 가능한 이유 `EventEmitter`에 대한 참조를 리턴한다.


### emitter.once(eventName, listener)

eventName에 해당하는 event에 일회성 리스너 함수를 추가한다.
이 리스너는 한 번 사용되면 없어진다.

`once` 또한 `on` method 처럼 `EventEmitter`에 대한 참조를 반환한다. 즉, 체이닝가능

### emitter.prependListener(eventName, listener)

이는 addListener method 처럼 동작하지만 이벤트 배열 앞에 추가해주는 특징이 있다.

이정도까지 알아보고 다음에 알아보도록하자...