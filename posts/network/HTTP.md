# HTTP

HyperText Transfer Protocol

네트워크 통신 규약이다.

컴퓨터는 0과 1로 이루어진 데이터를 만들고 읽고 쓰고 지우고(CRUD) 하게 되어 있다.

이런 모든 행위를 프로그래밍이라고 할 수 있는데, 우리는 실제로 어떠한 데이터를 이용하여 메모리를 적극적으로 활용하는 것을 프로그램이라 칭하고 각종 방법으로 메모리를 적극적으로 사용하였다.

단지, 브라우저는 내 컴퓨터내에서만 작동하는 프로그램이 아니라 다른 프로그램과 통신을 하고 있는 것일 뿐이다. (인터넷의 통신을 위한 프로그램이 웹 서버이다)

결국 HTTP는 Protocol이다. 즉 약속과 규약이다.

철수가 영희를 처음만나면 : 악수를하고 인사를 하고, 자기소개를 하는 관례가 있는 것 처럼 (인간들의 규약 or 규칙 or 약속)

브라우저는 웹 서버에게 HTTP라는 관례에 맞추어 통신하는 것이다.

HTTP는 주소를 정하고 이 주소에 특정한 message를 전달하는 것으로 통신을 한다.

요청을 보내면

```HTTP
GET  /HTTP/1.1
Host: www.facebook.com
```

인간이 만든 프로그램인 HTTP 또한 message로 response한다.

응답을 한다.

```HTTP
HTTP/1.1 200 OK
Content-Type: text/html
```

```HTTP
HTTP/1.1 404 Not Found
```

```HTTP
HTTP/1.1 301 Moved Permanently
Content-Type: text/html
Location: https://www.harvard.edu
```

HTTP의 response는 statusCode를 가지고 통신의 결과 상태를 알려준다

| Code | status                          | 내용                                                                                                                                                                                                                        |
| :--: | :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200  | OK                              | 요청이 성공적으로 됨 GET:리소스를 불러와서 메세지를 바디에 전송 \n HEAD: 개체 해더가 메시지 바디에 있음 \n PUT or POST: 수행 결과 리소스가 메시지 바디에 전송 \n TRACE: 메시지 바디는 서버에서 수신한 요청 메시지를 포함 \n |
| 201  | create                          | 새로운 리소스가 생성됨 POST PUT                                                                                                                                                                                             |
| 202  | Accpted                         | 수신하였지만 그에 응한 행공은 할 수 없음, 다른 프로세스에서 처리 또는 서버가 요청을 다루고 있음 배치 프로세스를 하고 있는 경우                                                                                              |
| 203  | Non-Authoritative Information   | 메타 정보 세트가 오리진 서버의 것과 일치하지 않지만 로컬이나 서드 파티 복사본에서 모아졌음
| 204  | No Content                      | 요청에 대해서 보내줄 수 있는 콘텐츠 x                                                                                                                                                                                       |
| 205  | Rest Content                    | 요청을 완수한 이후 이 요청을 보내 문서 뷰를 리섹하라고 알려줌                                                                                                                                                               |
| 206  | Partial Content                 | 클라이언트에서 복수의 스트림을 분할 다운로드                                                                                                                                                                                |
| 207  | Multi-Status                    | 멀티-상태 응답 여러 리소스가 여러 상태 코드인 상황                                                                                                                                                                          |
| 208  | Multi-Status                    | DAV에서 사용 컬렉션으로 바인드된 복수의 내부 멤버를 반복적으로 열거하는 것을 피하기 위해 사용                                                                                                                               |
| 226  | IM Used                         | 서버가 GET 요청에 대한 리소스의 의무를 다 함, 응답이 하나 또는 그 이상의 인스턴스 조작이 현재 인스턴스에 적용이 되었음                                                                                                      |
| 300  | Multi Choise                    | 요청에 대하여 하나 이상의 응다비 가능함. 둘 중 하나를 반드시 선택해야함                                                                                                                                                     |
| 301  | Moved Permanently               | 요청한 리소스의 URI가 변경됨                                                                                                                                                                                                |
| 302  | Found                           | URI가 일시적으로 변경됨                                                                                                                                                                                                     |
| 303  | See Other                       | 요청이 다른 URI에서 얻어햐 할 때, 서버가 클라이언트를 리다이렉트함                                                                                                                                                          |
| 304  | Not Modified                    | 이것은 캐시를 목적으로함. 응답이 수정되지 않았음을 알려줌, 클라이언트는 계속 은답의 캐시된 버전을 사용함                                                                                                                    |
| 305  | X                               | 더 이상 안 쓰임                                                                                                                                                                                                             |
| 306  | X                               | 더 이상 안 쓰임                                                                                                                                                                                                             |
| 307  | Temporary Redirect              | 리소스가 다른 URI에 있음 302code와 동일한 의미, but 사용자가 HTTP method를 변경하지 말아야 함                                                                                                                               |
| 308  | Permanent Redirect              | 리소스가 HTTP Header `Location:`에 명시된 다른 URI에 위치함 301code와 동일, but 사용자가 HTTP method를 변경하지 말아야 함                                                                                                   |
| 400  | Bad Request                     | 이 응답은 잘못됨                                                                                                                                                                                                            |
| 401  | Unauthorized                    | "비인증(unauthenticated)", 스스로를 인증해야함                                                                                                                                                                              |
| 403  | Forbidden                       | 콘텐츠에 접근할 권리가 없음, 401과는 다름 인증됐지만 권한 없음                                                                                                                                                              |
| 404  | Not Found                       | 요청받은 리소스 찾을 수 없음                                                                                                                                                                                                |
| 405  | Method Not Allowed              | 메소드는 서버에서 알고 있지만, 제거되었고 사용할 수 없음.                                                                                                                                                                   |
| 406  | Not Acceptable                  | 사용자 에이전트에서 정해준 규격에 따른 콘텐츠를 찾지 않았을 때                                                                                                                                                              |
| 407  | Proxy Authentication Required   | 401과 비슷하지만 프록시 완료 인증이 필요                                                                                                                                                                                    |
| 408  | Request Timeout                 | 서버가 사용되지 않는 연결을 끊고 싶어한다는 것을 의미함                                                                                                                                                                     |
| 409  | Conflict                        | 현재 서버의 산태와 충돌                                                                                                                                                                                                     |
| 410  | Gone                            | 요청한 콘텐츠가 서버에서 영구적으로 삭제됨                                                                                                                                                                                  |
| 411  | Length Required                 | Content-Length 해더 필드가 정의 되지 안흥ㅁ                                                                                                                                                                                 |
| 412  | Precondition Failed             | 헤더 전제조건 서버의 전제조건에 적절하지 않음                                                                                                                                                                               |
| 413  | Payload Too Large               | 서버에서 정의한 한계보다 큼 Retry-After 헤더 필드로 돌려 보낼듯                                                                                                                                                             |
| 414  | URI Too Long                    | URI는 서버에서 처리하지 않기로 한 길이보다 길다.                                                                                                                                                                            |
| 415  | Unsupported Media Type          | 요청한 미디어 포맷은 서버에서 지원하지 않는다.                                                                                                                                                                              |
| 416  | Reqyested Range Not Satusfiable | Range 헤더 필드에 요청한 지정 범위를 만족시킬 수 없음. 데이터의 크기를 벗어났을 가능성                                                                                                                                      |
| 417  | Expectation Failed              | 이 응답 코드는 Expect 요청 헤더 필드로 요청한 예상이 서버에서는 적당하지 않음                                                                                                                                               |
| 421  | Misdirected Request             | 서버로 요청된 응답을 생성할 수 없음, URI와 연결된 스킴과 권한을 구성하여 생성할 수 없을 때 보냄                                                                                                                             |
| 422  | Unorocessable Ebtity            | 요청은 잘 만들었으나, 문법 오류가 있음                                                                                                                                                                                      |
| 423  | Locked                          | 리소스는 접근하는 것이 잠김                                                                                                                                                                                                 |
| 424  | Failed Dependency               | 이전 요청이 실패 그래서 지금도 실패                                                                                                                                                                                         |
| 426  | Upgrade Required                | 클라이언트가 다른 프로토콜로 업그레이드 하면 처리 할지도 모름을 알려줌                                                                                                                                                      |
| 428  | Precondition Required           | 오리진 서버는 요청이 조건적이여야함 업데이트 상실을 예방하기 위해                                                                                                                                                           |
| 429  | Too Many Requests               | 너무 많은 요청을 보냄                                                                                                                                                                                                       |
| 431  | Request Header Fields Too Large | 요청한 헤더 필드가 너무 큼                                                                                                                                                                                                  |
| 451  | Unavailable For Legal Reasons   | 정부에 의하여 검열됨                                                                                                                                                                                                        |
| 500  | Internal Server Error           | 서버가 처리 방법을 모르는 상황이 발생.                                                                                                                                                                                      |
| 501  | Not Implemented                 | 서버에서 지원되지 않으므로 처리할 수 없다.                                                                                                                                                                                  |
| 502  | Bad Gateway                     | 서버가 요청을 처리하는 데 필요한 응답을 얻기 위해 게이트웨이로 작업하는 동안 잘못된 응답을 수신했음                                                                                                                         |
| 503  | Service Unacailable             | 서버가 요청을 처리할 준비가 되지 않음                                                                                                                                                                                       |
| 504  | Gateway Timeout                 | 서버가 게이트웨이 역활을 하고 적시에 응답을 받을 수 없음                                                                                                                                                                    |
| 505  | HTTP Version Not Supported      | 요청에 사용된 HTTP 버전은 서버에서 지원되지 않음                                                                                                                                                                            |
| 506  | Variant Also Negotiates         | 서버에 내부 구성 오류                                                                                                                                                                                                       |
| 507  | Insufficient Storage            | 서버에 내부 구성 오류                                                                                                                                                                                                       |
| 508  | Loop Detected                   | 서버가 요청을 처리하는 동안 무한 루프를 감지함                                                                                                                                                                              |
| 510  | Not Extended                    | 서버가 요청을 이행하려면 요청에 대한 추가 확장이 필요함                                                                                                                                                                     |
| 511  | Networl Authentication Required | 네트워크 액세스를 얻기 위해 인증이 필요함                                                                                                                                                                                   |
