# session 이용하기(with exrpess-session)

```js
// 미들웨어로 해당 통신에 세션을 추가해 줄 수 있다.
express.use(
  session({
    secret: "@mysecret!@#", //쿠키에게 주어지는 sessionID를 암호화하여 저장하도록 돕습니다.
    store: new redis(mystore), // store를 사용하여 session을 서버의 메모리에서 벗어날 수 있도록 할 수 있다.
    resave: false, // false : 세션이 수정될 때만 다시 저장되도록 할 수 있다. default가 true인데 일반적으로는 false옵션을 사용한다.
    rolling: true, // true : 매 응답에 세션의 식별자를 다시 설정하고 maxAge가 초기화 됩니다. default는 false 왠만하면 false로 쓰자.
    saveUninitialized: true, // 초기화되지 않은 세션이 저장소에 저장되도록한다. 로그인이나 서버스토리지의 사용량을 줄이거나 할때 false를 주도록 하자.
    cookie: { config } // sessionID를 가지는 cookie의 config를 넣어주자.
  })
);
```

이렇게하면 이제 설정에 따라 새션을 만들어 보낼수 있다.
이렇게 하면 express session에서는 req.session 객체를 민들어준다.

```js
// session 미들웨어를 만들어 주고,
app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));

// req.session 객체에 접근하여 세션을 조작해보자
app.get("/", function(req, res, next) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader("Content-Type", "text/html");
    res.write("<p>views: " + req.session.views + "</p>");
    res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
    res.end();
  } else {
    req.session.views = 1;
    res.end("welcome to the session demo. refresh!");
  }
});
```

이제 client에서 sessionID를 담은 쿠키를 가지게 될 것이다.

클라이언트에서는 이제 login 권한이 필요한 요청을 보낼때는 쿠키를 함께 보내주면 된다.

```js
axios.get(requrl, {
  withCredentials: true
});
```

이렇게 config에 withCredentials 옵션을 true로 주면 client는 준비가 끝났다.

다만 server에서도 받을 준비를 해줘야하는데 express cors에서 해당 설정이 가능하다.

```js
express(cors((credentials: true)));
```

이렇게 주면 간단하게 cors설정에 벗어나지 않는 도메인의 요청에는 cookie를 잘 가져올 수 있다.

이제 어떻게하면 login에 대한 요청을 session에 저장하고, 다른 요청이 들어왔을 때 회원인지 확인 할 수 있을까?

## session 읽어오기

기본적으로 express-session은 요청에 포함된 cookie의 sessionID가 일치하는 session을 찾아서 해당하는 session 객체의 데이터를 꺼내 올 수 있다.
