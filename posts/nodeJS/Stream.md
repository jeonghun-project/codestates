# Stream

공식문서에서 살펴보면
> A stream is an abstract interface for working with streaming data in Node.js

`Stream`은 추상 인터페이스 이고, 이는 Streaming data를 작업을 위한 인터페이스 라고한다.

Node.js에는 많은 스트림 객체가 있는데 예를 들면 `request` to an HTTP server and `process.stdout` 등이 있다고 한다.

Stream은 읽기 혹은 쓰기 혹은 둘 다 가능하고, **모든 Stream은 EventEmitter의 인스턴스이다.**

### type of stream

Stream의 기본적인 유형

- Writable : data를 쓸 수 있는 Stream
- Readable : data를 읽을 수 있는 Stream
- Duplex : 읽기 및 쓰기가 가능한 Stream
- Transform : 데이터를 쓰고 읽을때 수정이나 변환할 수 있는 이중 Stream

### Object mode

Node.js API로 생성 된 모든 `Stream`은 `String` and `Buffer`(ro Unit8Array) 객체에서만 작동한다. steam instance들은 생성시에 objectMode 옵션을 통해 object mode 로 변경 된다.

## Buffering

stream의 `Writable` and `Readable` 은 모두 내부 버퍼에 데이터를 저장한다.

구현할 때에 `stream.push(chunk)`를 호출하면 데이터가 ReadableStream에 buffering 되고, 이를 Read하지 않으면 data는 지속적으로 queue에 존재하게 된다.

Stream API 특히, `pipe` method, 핵심 목적은 데이터 buffering을 허용 가능한 수준으로 제한하고, 속도가 다른 소스와 대상이 사용 가능한 메모리를 압도하지 않도록 하는 것이다.

이를 위해 Stream은 `highWaterMark` option으로 임계값을 지정할 수 있다.

## HighWaterMark

`Steam`들을 생성할때 전달되는 **`HighWaterMark`** option을 통해 buffer되는 data의 양(bytes)을 정할 수 있다.

일반적인 `Stream`의 경우 바이트의 수(메모리)를 지정하도록 되어 있다.(<u>비 객체 모드</u>)
객체 모드으 경우에는 청 겍체의 수로 지정된다.

하지만, 이는 한계가 아니라 임계값이고, `Stream`이 **더 많은 데이터 요청을 중지하기 전에 버퍼링 하는 데이터 양을 지정**한다. 엄격하게 메모리를 제한하지는 않지만 특정한 `Stream`은 더 엄격한 메모리 제한을 하도록 선택할 수 있다.

## Consumers

이러한 **`Stream`** 들을 실질적 이용에 대한 설명이다.

우리는 `server`를 객체를 만들어 server객체에 `Stream`으로 다듬어진 `request` 객체와 `response` 객체를 볼 수 있다.

결국 `Stream`은 **Streaming**된 `Buffer` data에 대한 처리를 하는 instance인데

이를 읽어 내리는 Stream
써 내리는 Stream이 있는 것이다.

각각은 [공식문서](https://nodejs.org/api/stream.html#stream_highwatermark_discrepancy_after_calling_readable_setencoding)를 통해 Writable API와 Readable API를 확인할 수 있으니 자세하게 알아보면 좋겠다.

## Writable

### **Event**
- close
- drain
- error
- finish
- pipe
- unpipe
- ...

#### `'close'`

writableStream 을 말 그대로 닫는다. 더이상 write할 수가 없는 상태가 된다. 더 이상 이벤트가 발생하지 않고 계산이 이루어지지 않는다.

#### `'drain'`

write() method에서 false가 리턴되는 경우 즉, highWaterMark 보다 큰 데이터의 요청이 들어올 때
청크가 버퍼링되며 현재 버퍼링된 모든 청크가 빠져나가면 drain 이벤트를 발생시키면 메모리 에러를 방지할 수 있다.

write()가 false를 리턴 하면 write()를 호출하지 않는 것이 좋다.

```js
function writeOneMillionTimes(writer, data, encoding, callback) {
  let i = 1000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // Last time!
        writer.write(data, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}
```

#### `'error'`

데이터 쓰기 또는 piping 중 오류가 발생하면 `'error'`이벤트가 발생한다. 리스너 콜백은 호출 될 때 단일 Error인수를 전달합니다.

일반적으로는 `'error'` 이벤트가 발생하면 스트림이 닫힌다.

`'error'`이벤트 이후에는 `'close'`이벤트 외에는 생성되지 않아야한다.

#### `'finish'`

`end()`가 호출되고 모든 데이터가 기본 상태로 돌아가면 `'finish'`이벤트가 실행된다.


#### `'pipe'`

`pipe()`가 호출되면 `'pipe'` event가 실행됩니다.

`unpipe`의 경우에는 반대입니다.


### writable Stream: method

너무 많으니 중요한 것만 살펴보자.
- destroy()
- end()
- write()

#### `destroy([error])`

`Stream`을 파괴합니다. 선택적으로 `'error'`이벤트를 생성하고 `'close'`이벤트를 생성합니다.
`destroy`된 Stream은 종료되고 이후에 호출되는 `write()` or `end()`은 **ERR_STREAM_DESTROYED** 오류를 발생시킵니다.

`'drain'`event가 없는 경우에는 이전에 호출(previous call)된 `write()`또한 **ERR_STREAM_DESTROYE**오류를 트리거 한다고 한다.

결론, `destroy()` 되기 전에 데이터가 정상적으로 write되기를 바라는 경우 `destroy()` 대신에 `end()`를 사용하거나 `'drain'`event를 만들어 두면 된다.

#### end([chunk[, encoding]][,callback])

writable.end () 메서드를 호출하면 더 이상 데이터가 Writable에 기록되지 않는다는 신호를 보냅니다.
선택적 청크 및 인코딩 인수를 사용하면 스트림을 닫기 직전에 하나의 최종 추가 데이터 청크를 쓸 수 있습니다.

```js
// Write 'hello, ' and then end with 'world!'.
const fs = require('fs');
const file = fs.createWriteStream('example.txt');
file.write('hello, ');
file.end('world!');
// Writing more now is not allowed!
```

#### `write(chunk[, encoding][, callback])`



### Readable

이와는 별개로 `EventEmiter`에 명시되어 있는 method들 또한 `Stream` 객체이면서 `EventEmiter`인 `request`에 대한 이해에 있어 필수적이다.

[EventEmiter](https://jeonghun-project.github.io/Learning-things/nodeJS/EventEmitter.html)







