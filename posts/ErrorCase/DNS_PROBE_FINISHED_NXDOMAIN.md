# DNS_PROBE_FINISHED_NXDOMAIN

배포가 끝나고 DNS 연결을 완료한 페이지에 문제가 있는지 chrome 브라우저를 통해서 배포 도메인에 들어가니 DNS_PROBE_FINISHED_NXDOMAIN 이라는 메세지를 만나게 되었다...

DNS가 잘못 구성되거나 문제가 발생했다는 메세지인 것으로 보인다.

`NXDOMAIN === Non-Existent Domain` 즉 존재하지 않은 DOMANIN이다 이런 말인데,

하지만 terminal에서 curl과 nslookup으로 조회하였을 때는 정상적으로 Domain에 접근이 가능하였다.

폭풍 검색의 결과 여기서 문제를 해결할 수 있었다.

[구글 검색의 유산](https://kinsta.com/knowledgebase/dns_probe_finished_nxdomain/)

정확히는 DNS Server를 바꿔주는 것으로 해결되었는데 내 기존의 MAC DNS를 8.8.8.8 and 1.0.0.1로 변경해주니 해결 되었다.
