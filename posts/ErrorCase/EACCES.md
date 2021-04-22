# listen EACCCES : permission denied 0.0.0.0:portnum

우선적으로 해당 오류문구 상황을 보자

nodemon 과 ts-node를 이용하여 express 서버를 구동하는 코드를 작성중에 있었고 테스트를 위하여 nodemon script를 이용하여 서버를 구동하는 순간

`listen EACCES: permission denied 0.0.0.0:334`를 만나게 되었다.

리눅스에서 1024 이하의 well known port를 사용하려면 root 권한이 필요하다고 한다.

여기에는 몇 가지 해결방법이 존재하는데

1. 1025 이상의 포트를 쓰거나 루트 권한으로 실행하자.
2. root 권한으로 실행하기 위해 sudo로 실행한다.
3. linux 환경에서 강제로 root 권한으로 전환하는 패키지를 사용한다.

```bash
sudo apt-get install libcap2-bin
sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
```

하지만 우선 local에서 테스트하는 목적으로 문제를 해결하고 싶었던 것이라.

4000포트를 설정해주는 것으로 문제는 일단 해결하였다.
