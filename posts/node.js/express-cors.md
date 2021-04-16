# express-cors

express cors 시작하기 `npm install cors`

config에 대한 부분을 먼저 살펴보자

```js
const express = require('express');
const cors= require('cors');

const app = express();
//미들웨어로 cors처리해주자
app.use(cors({
  origin: true, // Access-Control-Allow-Origin
  credentials: true, // Access-Control-Allow-Credentials
  methods: ["GET", "POST", "OPTIONS"] // Access-Control-Allow-Methods
  allowedHeaders: // Access-Control-Allow-Headers
  exposedHeaders: // Access-Control-Expose-Headers
  maxAge: // Access-Control-Max-Age
}))
```

요렇게하면 미들웨어를 통과하게되면서 cors를 체크받게 된다.

추가적으로 알면 좋을 내용을 알아보자.

db에서 cors origin 가져와서 처리하기

```js
const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: function(origin, callback) {
    // db.loadOrigins is an example call to load
    // a list of origins from a backing database
    db.loadOrigins(function(error, origins) {
      callback(error, origins);
    });
  }
};

app.get("/products/:id", cors(corsOptions), function(req, res, next) {
  res.json({ msg: "This is CORS-enabled for an allowed domain." });
});

app.listen(80, function() {
  console.log("CORS-enabled web server listening on port 80");
});
```

비동기적으로 cors config 처리하기

```js
const express = require('express')
const cors = require('cors')
const app = express()

const allowlist = ['http://example1.com', 'http://example2.com']
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  allowlist.includes(req.header('Origin'))
  ? corsOptions = { origin: true }
  : corsOptions = { origin: false };
  }
  callback(null, corsOptions)
}

app.get('/products/:id', cors(corsOptionsDelegate), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for an allowed domain.'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```
