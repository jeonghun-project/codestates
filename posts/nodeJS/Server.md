# Node js 내장 서버

Node.js의 경우 내장된 웹서버를 지원한다.
Node.js 공식 Documents에 자세한 내용이 나와있어 공부를 위해 다시 읽으면 옮겨보았다.
자세한 내용과 본문을 그대로 옮겨둔 내 글보다는 원글을 천천히 이해해 보는것을 추천한다.

[HTTP 트랜젝션 해부](https://nodejs.org/ko/docs/guides/anatomy-of-an-http-transaction/)

`EventEmitters`와 `Stream`에 대한 이해가 필요하다는데 일단은 이해가 없는 상태에서 만들수는 있었다. 몇 가지 API 만 그때 그때 참고하면서 만들어 보았다.

다시 정리하면서 필요한 부분만 따로 정리하여 post로 만들었으니 참고

## 서버 생성
```js
const http = require('http');

const server = http.createServer((request, response) => {
  // 여기서 작업이 진행됩니다!
});
```

우선 서버를 만드는 것은 굉장히 간단한데, HTTP 통신이 올때마나 `Server`라는 객체를 만들어 통신에 이용하는 것이다.

여기서 만들어진 `Server` 객체는 `EventEmitter`이고, 여기에 `Listener`를 함께 추가해준다. -- 이를 축약한 것이 `createServer`이다.

```js
const server = http.createServer();
server.on('request', (request, response) => {
  // 여기서 작업이 진행됩니다!
}).listen(80) //서버가 사용하고자하는 포트를 server객체에 전달한다. 80 : http
```

## request vs response

HTTP 요청이 들어오면 Node가 트랜잭션을 다루기 위한 `request` 객체와 `response` 객체를 전달하고. 요청을 다루기위한 핸들러 함수를 호출한다.

`Node.js`에서 제공하는 문서를 살펴보면 `request` 객체는 `ReadableStream interface`를 구현하고 `response` 객체는 `ServerResponse interface`를 구현하며 이는 `WritableStream`이다.
`Stream`이 무엇인지 잠시 알아보면,

**[Stream에 대한 정리보기](https://jeonghun-project.github.io/Learning-things/nodeJS/Stream.html)**

해당 문서를 간략하게 읽어보면
`Stream`은 추상인터페이스 이면서 `data`를 다루기 위한 인터페이스이고
`request`는 이중에서 데이터를 읽을 수 있는 `Stream`인 것이다.

그러면 `request`를 통하여 우리는 `data`를 읽을 수 있는 것인데

자세하게 `request`에 대하여 알아보자.

## request

`request` 객체 내부에는 유용한 property가 이미 포함되어 있고, 이를 적절히 사용할 수 있다.

```js
const { method, url } = request;
const { headers } = request;
const userAgent = headers['user-agent']; // header 정보는 무조건 소문자로 들어온다.
```

헤더를 반복해서 설정하면 덮어씌워지거나 콤막로 구분된 문자열로 합쳐집니다.
이를 방지하기 위해서는 `rawHeaders`를 사용할 수도 있다.

#### request body

`ReadableStream interface`로 구현된 `request` 객체인 `Stream`에는 `EventListner`를 등록하거나 다른 `Stream`에 `pipe`로 연결할 수 있다.

`data`와 `end` `event`에 `eventListner`를 등록하여 데이터를 받을 수 있다.

```js
let body = [];
request.on('data', (chunk) => {
  body.push(chunk);
}).on('end', () => {
  body = Buffer.concat(body).toString();
  // 여기서 `body`에 전체 요청 바디가 문자열로 담겨있습니다.
});
```
`'data'` 이벤트에서 발생하는 chun는 Buffer입니다.
이 데이터를 배열에 수잡한 다음 `'end'`이벤트에서 이어 붙인 다음 문자열로 만드는 것이 문자열을 다루는 일반 적인 방법이다.

#### Error handling

`request` 객체가 `ReadableStream`인 `EventEmitter`이기에 Error가 발생하였을 때 `EventEmitter`처럼 동작합니다.

**[EventEmitter에 대한 정리보기](https://jeonghun-project.github.io/Learning-things/nodeJS/EventEmitter.html)**

오류가 발생하면 Stream에서 `'error'`이벤트가 발생하면서 오류를 전달합니다.

**이벤트에 리스너가 등록되어 있지 않다면 Node.js 프로그램을 종료시킬 수도 있는 오류를 던질 것이다.**
그러므로 단순히 오류를 로깅만하더라도 Stream에 `'error'`리슨너를 추가해야 합니다.


```js
request.on('error', (err) => {
  // 여기서 `stderr`에 오류 메시지와 스택 트레이스를 출력합니다.
  console.error(err.stack);
});
```

## response

HTTP 상태 코드 `statusCode` 프로퍼티를 설정하여 상태 코드를 변경할 수 있고, 따로 설정이 없을 때는 `200`인 상태이다.

```js
response.statusCode = 404; // 클라이언트에게 리소스를 찾을 수 없다고 알려줍니다.
```

응답 헤어 설정 메소드 `setHeader`

```js
response.setHeader('Content-Type', 'application/json');
response.setHeader('X-Powered-By', 'bacon');
```
응답 헤더를 설정할 때 헤어 이름의 대소문자는 중요하지 않다. 헤더를 여러 번 설정한다면 마지막에 설정한 값을 보낸다.

### 명시적인 헤더 데이터 전송

"암묵적인 헤더" body data를 보내기 전 적절한 순간에 헤더를 보내는 일을 노드에 의존하고 있다.
"명시적 헤더" `writeHead`를 이용하여 header에 상태 코드와 내용을 작성할 수 있다.

```js
response.writeHead(200, {
  'Content-Type': 'application/json',
  'X-Powered-By': 'bacon'
});
```

일단 헤더를 어떻게든 작성해야 데이터를 전송할 준비가 된 것이다.

### response body

`response` 객체는 `WritableStream` 이다.
`Stream` method를 사용해서 작성하면 된다.

```js
response.write('<html>');
response.write('<body>');
response.write('<h1>Hello, World!</h1>');
response.write('</body>');
response.write('</html>');
response.end();
```

Stream의 `end` method에 보낼 데이터의 마지막 비트를 선택적으로 전달할 수 있다.

```js
response.end('<html><body><h1>Hello, World!</h1></body></html>');
```

> 주의 : 바디에 데이터 청크를 작성하기 전에 상태 코드와 헤더를 설정해야 합니다. HTTP 응답에서 바디 전에 헤더가 존재해야 하기 때문에

-  요청 핸들러 함수로 HTTP 서버의 인스턴스를 생성하고 특정 포트로 서버를 열 수 있습니다.
-  request 객체에서 헤더, URL, 메서드, 바디 데이터를 가져올 수 있습니다.
-  URL이나 request 객체의 데이터에 기반을 둬서 라우팅을 할 수 있습니다.
-  response 객체로 헤더, HTTP 상태 코드, 바디 데이터를 보낼 수 있습니다.
-  request 객체에서 response 객체로 데이터를 파이프로 연결할 수 있습니다.
-  request와 response 스트림 모두에서 스트림 오류를 처리할 수 있습니다.

위 문서는 Node.js 트랜잭션 해부 문서의 내용을 그대로 가져왔다.
공부를 위한 개인적인 옮기기이니 아래를 참고하는 것이 바람직하다.

[Node.js 트랜잭션 해부](https://nodejs.org/ko/docs/guides/anatomy-of-an-http-transaction/)