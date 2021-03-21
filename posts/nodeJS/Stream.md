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

각각은 [공식문서](https://nodejs.org/api/stream.html#stream_highwatermark_discrepancy_after_calling_readable_setencoding)를 통해 Writable method와 Readable method를 확인할 수 있으니 자세하게 알아보면 좋겠다.



