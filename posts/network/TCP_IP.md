# where come from IP

DHCP ⇒ 이것은 단지 IP주소를 깨우는 역활을 가지고 있고, 사용하능한 IP주소를 파악하여 제공하는 프로토콜이다.

IP → 웹 프로그램의 프로토콜을 요청해야하는 주소

IP = 255.255.255.255 8bit total 32bit 2^32 40억

DNS Servers → domain name을 IP address로 변환한 것

nslookup(Name server look up)

특정 한 것의 IP 주소는 무엇인지 알 수 있다.

```bash
nslookup google.com // get google's IP : 172.217.25.110
curl -I 172.217.25.110 // get response
```

## router

home router == gateway == server(아주 작은 단위의 서버 까지도)

우리 집에 다 있다. 인터넷을 쓸수 있다면

데이터를 가지고와 인터넷에 보내주고 받아준다.

`traceoute` ⇒ 통과하는 라우터를 모두 명세하여 보여준다.

이는 케이블을 통해서 이어져 있다.

## TCP(Transmission Control Protocol)/IP

테이터의 유형 혹은 엑세스 데이터를 의미하는 고유의 number가 있다.

모든 통신에는 고유의 넘버를 가지고 요청하고 분류하고 받아온다.

53 DNS

80 http

```bash
curl -I https://www.harverd.edu:80 // Error http
curl -I https://www.harverd.edu:443 // correct https
```

아주 큰 데이터의 같은 경우 여러 조각으로 나누어 패킷을 만든다

TCP는 패킷 드롭 될수 있고, 그것을 다시 요청하여 다시 받아내는 역활을 한다.