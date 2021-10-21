# iptble

`$ sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080`

이 명령을 사용하게 된 이유는 현재 AWS EC2 인스턴스에 올라가 있는 서버의 포트포워당 때문이다.

AWS 로드 밸런서를 통하여 서버에 SSL 인증을 통과시키기 위해서 443 port를 통한 인증을 해주었기에 서버측에서 모든 포트의 수신을 옳바르게 처리하기 위함이다.
