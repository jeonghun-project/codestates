# cookie

쿠키다 쿠키는 작은 데이터의 작은 조각이다.

서버에서 클라이언트에 데이터를 저장하는 방법중 하나이다.

**서버가 클라이언트에 데이터를 저장할 수 있다.**

이러한 쿠키는 클라이언트가 서버에게 전해줄 수 있는 경우는 특정 조건을 만족할 때인데 이러한 조건을 쿠키 옵션으로 줄 수 있다.

HTTP 통신의 stateless한 특성을 보완해 줄 수 있다.

기본적으로 mdn에서는 set-cookie를 통해서 쿠이 옵션을 정해주고 만들수 있다고 하지만, express에서 제공하는 추가적인 라이브러리를 이용하면 편리하게 할 수 있다는 것도 알아두자.

`Set-Cookie: <cookie-name>=<cookie-value>;`

```js
Set-Cookie: <cookie-name>=<cookie-value>
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit>
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>
Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>
Set-Cookie: <cookie-name>=<cookie-value>; Secure
Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly

Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Strict
Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Lax
Set-Cookie: <cookie-name>=<cookie-value>; SameSite=None; Secure

// Multiple attributes are also possible, for example:
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly
```

이러한 다양한 옵션들이 있는데 우리가 주요하게 알아야하는 것을 알아보자.

## Options

- `Max-Age` : cookie가 살아있는 기간을 의미한다.
- `Expires=<date>` : cookie가 살아있는 기간을 날짜로 정해줄 수 있다.
- `Domain` : 쿠키가 전송될 호스트를 의미 default는 현재 도큐먼트의 url이다.
- `PAth=<path-value>` : / 이후의 디렉토리 구조
- `Secure` : https에서 쿠키를 주고 받을 수 있도록한다. 하지만 이는 여전히 javascript에서 읽거나 수정될 수 있다.
- `HttpOnly` : 더 이상 javascript에서 읽거나 수정할 수 없다.
- `SameSite=<sanesite-value>` : cors 에대한 컨트롤을 할 수 있다.
  - Strict는 다른 origin에서는 쿠키를 받을 수 없다.
  - Lax는 사용자가 외부 사이트에서 origin 사이트로 이동할 때 전송
  - None 모두 열어줍니다. 이때는 Secure를 꼭 사용하자.

## 제약

하지만 쿠키는 아무래도 클라이언트에서 저장을 하기에 사용자에게 보안의 중요한 책임을 주는 것과 같기에 이를 서버에 저장하고 서버에서 데이터를 받아가도록도 할 수 있는데 이때 우리는 Session을 이용하게 된다.

cookie에는 Session에 접속할 수 있는 Session Id를 전해주고,

클라이언트가 전해준 Cookie에 Session Id를 확인해서 서버는 해당 Session에 있는 정보를 읽어 전달하여줄 수 있다.
