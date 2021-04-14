# HTTPS

**HTTPS(Hyper Text Transfer Protocol Secure Socket layer)**

HTTP over SSL(TLS), HTTP over Secure라고도 부른다.

HTTPS는 HTTP 요청을 SSL 혹은 TLS라는 알고리즘을 이용해, HTTP 통신을 하는 과정에서 내용을 암호화하여 데이터를 전송하는 방법이다.

## SSL TLS ?

SSL(Secure Socket Layer) TLS(Transport Layer Security) 보안 프로토콜

SSL과 TLS는 값은 의미의 단어이다. TLS가 엄밀히 말하면 후속 버전이지만 일반적으로 SSL이라한다.

SSL은 결국 암호화를 하는 보안에 대한 검증을 하는 보안 계층을 의미하고,

이러한 보안 계층을 http 통신에 추가한 것이 https라고 이해할 수 있따.

## SSL의 통신 단계

1. 핸드셰이크
   데이터를 주고받기 위해 어떤 방법을 사용해야 하는지 서로의 상태를 파악
   SSL은 80포트를 사용하지만 http는 443번 포트를 사용하기는 TCP 프로토콜이기에 SSL 핸드셰이크 전에 TCP 3-way 핸드셰이크를 수행합니다.

2. 전송
   협상이 끝나면 SSL 세션이 생성되고 클라이언트와 서버는 원하는 데이터를 주고받을 수 있습니다.

3. 종료
   데이터 전송의 끝을 서로에게 알려 세션을 종료합니다.

## 핸드셰이크

![handshake](./src/handshake.png)

- **Client hello** : 클라이언트가 서버에게 인사합니다. 접속을 요청하는 것입니다. 클라이 언트는 이때 자신이 가진 Cipher Suite list를 전달합니다. 랜덤 데이터를 만들어 함께 전송합니다.
- **Server hello** : 서버가 클라이언트에게 맞인사를 합니다. 서버는 Cipher Suite 중 하나를 택하여 알려주고, 인증서(Certificate)를 전달합니다. 인증서에는 서버의 공개키가 담겨있습니다. 서버 또한 랜덤 데이커를 만들어 함께 전송합니다.
- **Server key Exchange** : 공개키가 인증서 내부에 없는 경우 Server가 직접 전달합니다.
- **Client key Exchange** : 클라이언트는 미리 주고 받은 자신의 서버의 랜덤 데이터와 공개키를 참고하여 서버와 암호화 통신을 할 때 사용할 키(대칭키)를 생성한 후 서버에게 전달합니다. 이때 인증서에 담긴 공개키로 암호화하여 보내집니다.
- **Finished** : 핸드셰이크가 정상적으로 끝나면, 서버와 클라이언트 모두 finished 메세지를 보냅니다. 이제 암호화된 데이터를 주고받을 수 있습니다.

### Cipher suite

프로토콜 - 키 교환방식 - 인증서 검증 알고리즘 - WITH - 대칭키를 이용한 블록 암호화 방식 - 블록 암호 운용방식 - 메세지 인증(무결성)

이러한 구조를 가졌다.

`TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA`

요렇게 쓰여져서 보내진다.
