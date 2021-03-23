# RESTfulAPI

Representational State Transfer

웹 서비스를 만드는데 사용 되는 제약(constraint) 모음

> Web을 망가뜨리지 않고 어떻게 HTTP를 개선할 수 있을까?

## 6가지 제약

- Client-Server
- Stateless
- Cacheable
- Uniform interface
- Layered system
- Code on demand


**Client-Server**

클라이 언트와 서버는 서로 독립적으로 존재해야한다.

**Stateless**

어떠한 상태를 가지고 있지 않아야한다.

**Cacheable**

특정한 정보를 저장할 수 있어야한다.

**Uniform interface**

동일한 인터페이스 즉 API는 표준에 가깝게 작성되어야한다.

**Layered system**

어떠한 겹겹이 잘 싸여져 있어서 구분적으로 각각을 독립적으로 다룰 수 있도록 구현되어야한다. DB가 뭔지 몰라도 통신이 가능하다.

**Code on demand**

코드를 내려줄 수 있어야 한다.


## Uniform interface

Resource - 이름 붙일 수 있는 어떤 것이든 리소스가 될 수 있다.
이러한 Resouce에 대하여 어떻게 조작할 것인지가 중요하다.

- Identification of resources
- manipulation of resources through representation
- self-descriptive messages
- Hypermedia As The Of Application State (HATEOAS)

[RESOURCE-NAME](https://restfulapi.net/resource-naming)
"그런 REST API로 괜찮은가?" - Naver DEVIEW 2017

**명사를 사용해라**

1. document 
2. collection
3. store
4. controller

일관성이 핵심

CRUD 기능 이름은 URI에 사용하지 마라.
