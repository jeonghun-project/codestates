# axios

fetch를 대신할 비동기 통신 요청하기

fetch는 브라우저에는 기본적으로 있지만 nodejs 환경에서는 쓸 수 없다 node-fetch를 설치해야하는데 axios가 express처럼 편리하게 통신을 요청할 수 있으니까는 axios를 배워서 쓰자.

비동기 통신요청하기

GET POST 요청

```js
axios({
  method: "post",
  url: "/user/12345",
  data: {
    firstName: "Fred",
    lastName: "Flintstone"
  }
});
```

```js
axios({
  method: "get",
  url: "http://bit.ly/2mTM3nY",
  responseType: "stream"
}).then(function(response) {
  response.data.pipe(fs.createWriteStream("ada_lovelace.jpg"));
});
```

```js
axios.get(url, config);
axios.post(url, data, config);
axios.put(url, data, comfig);
axios.patch(url, data, config);
axios.delete(url, config);

axios.request(config)
axios.head(url[, config])
axios.options(url[, config])
```

동시에 요청하기

```js
axios.all(iterable);
axios.spread(callback);
```

instance 만들어서 사용하기

```js
const instance = axios.create({
  baseURL: "https://some-domain.com/api/",
  headers: { "X-Custom-Header": "foobar" },
  timeout: 1000
});
```

axio요청은 javascript ES6 Promise 객체를 리턴함으로 자세한 설명은 생략한다.
