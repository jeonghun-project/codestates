# KAFKA

## Topic

Data 모음

## EVENT Queue / MESSAGE Queue

> Event queue와 Message queue와의 차이점

event queue는 **비 휘발성**을 가진다

queue에 한 번 쌓인 데이터의 경우 **offset**을 가지고 데이터를 읽어 내린다.

반면 **Message queue**의 경우에는 현재 Queue에 있는 가장 먼저 들어온 데이터를 읽어 내린다.(휘발성)

이러한 문제를 보완하기위해서는 Message Queue의 경우 별도의 플러그인이나 구현이 필요하다.

## Pub(Producer) / Sub(Consumer)

공급자 / 소비자

## Broker

카프카가 설치되어 있는 서버의 단위

## replication

replication은 브로커 내부에 존재한다고 볼수 있다. 그렇기에 Broker의 갯 수를 상위할 수 없다.

고가용성에 도움을 준다.

파티션의 복제를 의미한다.

## Partition

partition Leader partition이 최초로 Topic을 수용하고, 이를 Follower partition에 분배한다.

1. ack= 0 리더 파티션에 topic을 전송하고, 전송 여부는 확인하지 않는다.

2. ack= 1 리더 파티션에 topic을 전송하고, 전송 여부를 확인한다.

3. ack= all 리더 파티션에 데이터를 보내고 Follower 파티션에 정상적으로 전송됐는지 여부도 확인한다.


## Partitioner

record의 key 와 값에 따라서 다르게 동작한다.

모든 프로듀서의 **topic은 파티셔너를 거쳐서 Broker에 메세지를 전달**한다.

동일한 Messege key를 가진 Topic은 항상 동일한 Partition에 들어가게 된다.

messega key가 없다면 round-robin 방식으로 분배된다.

파티셔너는 커스텀도 가능하다.(토픽 이름, 값 키 등을 커스텀 가능)

## LAG

토픽의 파티션에 저장된 **Data의 offset은 index개념으로 Data의 순서대로 Offset** 번호를 할당한다.

읽은(Consumer) offset과 현재 공급(Producer) offset간의 차이가 lag이다.

이중 높은 숫자의 렉이 **Record-lag-mex**라고 부른다.

## Monitoring

커슈머에서 Lag을 측정하는 것은 어려움

레이턴시나 수집으로 인한 장애가 발생할 우려가 있음

이러한 모니터링을 위해서 Burrow가 있다

- 멀티 카프카 클러스터 지원

- status 기반의 관리

- HTTP API 제공

