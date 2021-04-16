# Oauth 2

사용자의 인증을 외부 기관에게 요청하는 것

- google, facebook, github, naver, kakao 로그인 등이 있다.

![Oauth2](./src/Oauthflow.png)

**로직이 이루어지는 플로우**

1. 사용자의 요청이 있으면 클라이언트는 외부인증 기관에게 요청을 보낸다.

2. 외부 인증기관은 사용자에게 사용허가를 받는다.

3. 외부 인증기관은 Authorization code를 받는다.

4. Authorization code(grant type)를 가지고 서버에게 요청을 보낸다.

5. 서버는 Authorization 코드를 외부 인증기관에 보내서 ACCESS TOKEN과 REFRESH_TOKEN(grant type)을 받는다.

6. 이러한 ACCESS_TOKEN과 REFRESH_TOKEN을 전달 받고 사용자 정보로 사용한다.(로그인 대체)

외부 인증기관(리소스 서버)에 요청을 할때도 access token을 이용하고.

app server에 요청을 할때도 access token여부를 확인하여 응답을 줄 수 있다.
