# REST

**REpresentational State Transfer**

- 분산 하이퍼미디어 시스템을 위한 소프트웨어 아키텍처의 한 형식 (WIKI)

Representational State Transfer

웹 서비스를 만드는데 사용 되는 제약(constraint) 모음

> Web을 망가뜨리지 않고 어떻게 HTTP를 개선할 수 있을까?

## RESTful

1. **Client-server** : 클라이언트와 서버는 서로 독립적으로 존재해야한다.
   - 서버와 클라이언트는 인터페이스가 변경되지 않는 한 독립적으로 교체 및 개발 될 수 있습니다. 사용자 인터페이스에 대한 문제 데이터 스토리지 문제를 분리하여 크로스 플랙폼에서의 사용자 인터페이스를 더욱 명확히하고, 확장성을 개선하며, 서버를 간추릴 수 있어야 한다.

   
2. **Stateless** : 어떠한 상태를 가지고 있지 않아야한다.
   - 클라이언트의 각각의 요청은 이를 서버가 이해하기에 필요한 모든 정보가 있어야하며 서버에 context를 이용 및 저장할 수 없다. 따라서 세션의 상태는 클라이언트에 유지되어야한다.
   
3. **Cacheable** : 특정한 정보를 저장할 수 있어야한다.
   - 캐시 제약 조건에 따라 요청에 대한 응답은 암시적 또는 명시적으로 캐시 가능 또는 캐시 불가능으로 레이블이 지정되어야한다. 응답 캐시가 사용 가능할 경우 나중에 같은 요청에 재사용 할 수 있는 권한이 부여된다.
   
4. **Uniform interface** : 동일한 인터페이스 즉 API는 표준에 가깝게 작성되어야한다. **이게 제일 서버를 구현할 때 중요함 다른건 HTTP가 이미 가지고 있음**
   - component interface에 대부분에 소프트웨어 엔지니어링 원칙을 적용하여, 전체 시스템 구조가 단순화되고 상호 작용을 좀더 직관적으로 보이게 하여야 한다. 시스템의 리소스에는 논리적 URI가 하나만 있어야하며 관련 데이터나 추가 데이터를 가져 오는 방법을 제공해야합니다.

> REST는 네 가지 인터페이스 제약 조건으로 정의됩니다.
> - *identification of resources*
> - *manipulation of resources through representations*
> - *self-descriptive messages*
> - *hypermedia as the engine of application state. (HATEOAS)*
>

1. **Layered system** : 어떠한 겹겹이 잘 싸여져 있어서 구분적으로 각각을 독립적으로 다룰 수 있도록 구현되어야한다.
   - 계층화 시스템 스타일을 사용하여 상호 작용하는 바로 아래 계층을 'see'할 수 없도록 동작을 제한하여 구조를 계층적으로 구성할 수 있습니다.

*REST를 사용하면 서버 A에 API를 배포하고 서버 B에 데이터를 저장하고 서버 C에 요청을 인증하는 계층 형 시스템 아키텍처를 사용할 수 있습니다.

1. **Code on demand (optional)** : 코드를 내려줄 수 있어야 한다.(javascript)
   - REST를 사용 애플릿 또는 스크립트 형태로 코드를 다운로드 실행 클라이언트 기능을 확장 할 수 있다. 사전 구현에 필요한 기능의 수를 줄여 클라이언트를 단순화한다.
   

# Resource

REST에서는 resource에 대한 추상화가 무엇보다 중요하다.

이름을 지정할 수있는 모든 정보는 리소스가 될 수 있다.

REST에서는 리소스 식별자를 이용 components 간의 상호 작용에 특정 리소스를 식별한다.

**A truly RESTful API looks like hypertext**

hypertext driven

**hypertext** : simultaneous presentation of information and controls 정보와 제어를 동시에 표현하는 것

즉 이전에 주고 받던 HTML이나 XML or JSON일 필요가 없다 (이때는 이랬단다)

**Resource의 표현은 자기 자신을 잘 드러내야한다.**

Self-descriptive message

필요한 모든 정보가 있어야한다!!
header에 모든 정보를 잘 꾹꾹 눌러담아줘야한다.

**HATEOAS**

애플리케이션의 상태가 항상 Hyperlink를 이용해 상태(state) 전이되어야한다.
Link header를 통하여도 가능하다.


## Resouce Methods

원하는 전환을 하는데 필요한 resource method가 REST에 또 다른 중요한 부분이다.

이것은 HTTP GET/PUT/POST/DELETE method들과는 관련이 없다

그저 **interface가 균일**해야 하는 것이 중요한 원칙이다.

가령 POST method를 통하여 resource를 update하기로 하였다면 **RESTful**이 되기에 괜찮은 방법입니다.

RESTful API를 빌드하는 동안 도움이되는 또 다른 점은 쿼리가 리소스 식별을 대체하지 않기 때문에 쿼리 기반 API 결과가 원래 리소스 표현의 배열이 아니라 요약 정보가있는 링크 목록으로 표시되어야한다는 것입니다.


## Resource naming

**명사를 사용해라**

1. document 
2. collection
3. store
4. controller

일관성이 핵심 CRUD 기능(동사)는 URI에 사용하지 마라.

참고

[RESOURCE-NAME](https://restfulapi.net/resource-naming)

"그런 REST API로 괜찮은가?" - Naver DEVIEW 2017


이러한 REST의 특성을 지키면서 REST API를 작성하는 것이

# RESTfulAPI

시스템 전체를 통제할 수 있다고 생각하거나, 진화에 관심이 없다면, REST를 따지느라 시간을 낭비하지 마라

REST API 구현

JSON XML 깉은 media type에 대한 문제
Hyperlink 가 정의 되어 있지 않고
Self-descriptive 를 위하여 별도의 API 문서를 작성한다.


Self-descriptive 확장 가능한 커뮤니케이션

HATEOAS 애플리케이션 상태 전이의 late binding 링크는 동적으로 변경될 수 있다.


Media type을 정의하고 IANA에 등록한다.
Profile 명세를 작성하고 Link header에 명세한다.

HATEOAS
data에 직접 정의한다.
HTTP 헤더를 통해서