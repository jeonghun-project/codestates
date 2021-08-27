# apollo

아폴로는 graphql 개발을 위한 라이브러리 or 프레임워크의 하나로 graphql을 개발팀으로 하여금 조금더 유연하게 적용할 수 있도록 돕는 라이브러리이다.

apollo는 graphql을 위한 오픈소스 라이브러리인데 마치 소켓 io 처럼 서버와 클라이언트에 통신을 원할하게 돕도록 동작하는 플렛폼이라고 소개한다.

아폴로는 서버빌드에서 클라이언트에서의 graphql 통신까지 컨트롤 할수있으면서, manage 기능까지도 지원해준다.

## apollo-server

graphql의 서버는 어떻게 만들어 질까??

우선은 의존성 모듈을 설치해주고,

```bash
$  npm install apollo-server graphql
```

데이터 타입을 지정해줍니다.

```js
const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// 스키마는 타입 정의에 모음(Collection)
// 이때 데이터 쿼리의 실행 모형(shape)을 정의한다
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # 타입을 지정하고
  type Book {
    title: String
    author: String
  }

  # 쿼리 타입을 통해서 클라이언트에서 book의 배열을 books를 통해 수집할 수 있다.
  type Query {
    books: [Book]
  }
`;
```

이제 실제로 데이터가 있다는 가정해보면

```js
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];
```

이제 이러한 데이터를 쿼리언어로 받아올 수 있도록 실제로 실행해줄 resolver를 정의 해주어야합니다.

```js
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};
```

이렇게 schema 와 resolver를 정의 해주었으면 이제 서버에 Apollo Server를 provide 하는 일이 남았습니다.

```js
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

기본적인 구성은 이렇게 하면 마무리 되었다.
이렇게 만들어진 서버를 실행하고 쿼리 테스트를 진행하면 어떻게 나오는지 확인해보자

```bash
$ node index.js
```

```bash
🚀 Server ready at http://localhost:4000/
```

이제 쿼리를 바디에 실어서 요청을 보내면 응답을 얻을 수 있다.

```json
query GetBooks {
  books {
    title
    author
  }
}
-------->
{
    "data": {
        "books": [
            {
                "title" : "The Awakening",
                "author" : "Kate Chopin"
            },
            {
                "title" : "City of GlasS",
                "author" : "Paul Auster"
            }
        ]
    }
}
```
