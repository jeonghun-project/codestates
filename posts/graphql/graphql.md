# graph.ql

graph.ql에 대하여 알아보자.

> A query language for your API

공식 홈페이지의 소개 제목이다. API를 위한 query 언어라는 말인데 우리는 현재는 표준화된 HTTPS 통신을 위한 REST API를 통해 API를 표준화하고 있었다.

이제는 `graph.ql`이 이러한 API를 대신할 수 있는 것일까?

클라이언트에서 필요한 것과 그렇지 않은 것을 정확하게 여구할 수 있다고 한다.

여태의 API들을 생각해보면, 앤드포인트에 따라서 데이터의 호출을 나누고 내가 원하는 데이터를 만들기 위해서 **다중으로 API를 호출**하거나 **더 많은 데이터를 받아올 수 밖에 없었다.**

**하지만 `graph.ql`은 그렇지 않다.**

홈페이지에 메인으로 소개하는 graph.ql 특징이다.

1. _한번의 요청으로 많은 데이터 받기_

2. _필요한 데이터만 요청하여 받기_

3. _타입 시스템_

4. _버전 관리가 필요없음_

## query

그렇담 graphql의 쿼리를 알아보자

```json
query
{
  hero {
    name
  }
}

====>

response
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}
```

이렇게 쿼리를 사용해볼 수 있다.

```json
{
  hero {
    name
    # Queries can have comments!
    friends {
      name
    }
  }
}

====>

response
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

스키마에 서명 그대로 전체 데이터를 조회하는 방법으로 기본 쿼리는 작동한다.

이 뿐만으로도 이미 기존의 통신을 대체하기에는 충분하지만

### Arguments

```json
{
  human(id: "1000") {
    name
    height
  }
}

====>

{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 1.72
    }
  }
}
```

이렇게 인자를 전달함으로서 특정 데이터를 조회하는 것 또한 가능하다.

나아가서

```json
{
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}

====>

{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 5.6430448
    }
  }
}
```

이런것도 가능하다.

### Aliases (별칭)

데이터의 이름이 겹칠때 원하는 데이터를 정확히 받아오기 위해서 사용해보자

```json
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}

====>

{
  "data": {
    "empireHero": {
      "name": "Luke Skywalker"
    },
    "jediHero": {
      "name": "R2-D2"
    }
  }
}
```

### Fragments

우리의 엡은 상당히 복잡한 페이지를 가지고 있을수 있고, 같은 구조의 쿼리를 반복해서 요청해야 할 때가 있다.

이러한 부분을 해결하도록 `graphql`은 `Fragments`를 지원한다.

```json

{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}
​
fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}

===>

{
  "data": {
    "leftComparison": {
      "name": "Luke Skywalker",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
      "friends": [
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        },
        {
          "name": "C-3PO"
        },
        {
          "name": "R2-D2"
        }
      ]
    },
    "rightComparison": {
      "name": "R2-D2",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

Fragment내에서는 변수를 이용하여 쿼리를 요청할 수도 있는데 아래 코드를 살펴보자

```graphql
query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
```

```json
{
  "data": {
    "leftComparison": {
      "name": "Luke Skywalker",
      "friendsConnection": {
        "totalCount": 4,
        "edges": [
          {
            "node": {
              "name": "Han Solo"
            }
          },
          {
            "node": {
              "name": "Leia Organa"
            }
          },
          {
            "node": {
              "name": "C-3PO"
            }
          }
        ]
      }
    },
    "rightComparison": {
      "name": "R2-D2",
      "friendsConnection": {
        "totalCount": 3,
        "edges": [
          {
            "node": {
              "name": "Luke Skywalker"
            }
          },
          {
            "node": {
              "name": "Han Solo"
            }
          },
          {
            "node": {
              "name": "Leia Organa"
            }
          }
        ]
      }
    }
  }
}
```
