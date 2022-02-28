# Epress vs Node server

Epress를 통해서 조금더 간결한 http 통신에 대한 작성을 할 수 있다.

지금까지 배운 웹 통신 기술

- Node.js 내장 서버
- Epress.js
- socket.io

간단히 따로 정리해둔 글이 있으니 참고하자
[Epress](../nodeJS/expressJS.md)

우리는 Router와 middleware를 위하여 서버를 작성하는 방법을 알고 있고, 이후에는 Authentication에서 발생하는 보안에 대한 문제들을 잘 해결하는데 중점적으로 서버를 작성하는데 주의를 기해야 할 것이다.

지금은 Router Middleware가 무엇인지 중점적으로 알아보자

## Router

URL, URI 따른 분기를 라우터라고 할 수 있다.

우리가 흔히 보고 알고 있는 url의 구조를 보자

` scheme:[//[user[:password]@]host[:port]][/path][?query][#fragment]`

![uri](./src/uri.png)

우리가 항상 주소창에서 보던 것들은 각각이 어떠한 역활을 하고 있었고, uri에 따른 화면의 변화나 데이터의 송수신을 할 수 있도록 HTTPS 통신의 주소로 이용되고 있었다.

```js
//구조
express.METHOD('path', callback)

// GET method route
app.get('/home', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/mypage', function (req, res) {
  res.send('POST request to the homepage');
});
```

이런 각 주소값에 어떠한 기능을 담당할 수 있도록 정해주는 것이 라우터라고 볼 수 있다.

## Middleware

미들웨어란 미들웨어란 어떠한 서버와 클라이언트 간에 통신이 이루어지기 이전에 사전적인 처리들을 이루어내는 곳이다.

Express에서 제공하는 미들웨어

- [애플리케이션 레벨 미들웨어](https://expressjs.com/ko/guide/using-middleware.html#middleware.application)
- [라우터 레벨 미들웨어](https://expressjs.com/ko/guide/using-middleware.html#middleware.router)
- [오류 처리 미들웨어](https://expressjs.com/ko/guide/using-middleware.html#middleware.error-handling)
- [기본 제공 미들웨어](https://expressjs.com/ko/guide/using-middleware.html#middleware.built-in)
- [써드파티 미들웨어](https://expressjs.com/ko/guide/using-middleware.html#middleware.third-party)

Express에서 제공하는 기능만드로도 웹, 엡에서 구동하는 다양한 서버의 기능들은 대부분 구햔이 가능하기에 적절하게 사용한다면 원하는 server를 구현할 수 있을 것이다.