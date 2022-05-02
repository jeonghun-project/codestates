# redis

메모리를 사용하는 데이터스토어로 오픈소스이며 Cache, Message Broker, Streaming Engine에 많이 사용된다. 

> Open Source in-memory data stroe

Redis의 가장 큰 장점으로는 In-memory의 특성인 속도이다.

**Redis는 시스템 메모리를 사용하기에 비싼 메모리를 무한정으로 확장할 수는 없기에 효율적인 관리가 필요하다.**

## Redis의 성능

이러한 redis는 성능을 위하여 기본적으로 `Key-Value`형식의 저장방식을 제공하고, 이는 O(1)성능을 가지기에 Redis의 성능을 보장한다.

Value 타입에는 기본적으로 String을 지원하고, Set, List, Hash등의 value들도 사용할 수 있다.

이러한 Redis는 기본적 4개의 Tread로 구성되지만 Query 명령어를 처리하는 쓰레드는 메인 쓰레드 하나이므로 `Single-thread` 이다.

기본적으로 Single-thread이기 때문에 긴 시간을 소요하는 작업을 요청하는 횟수에 따라서 성능을 현저하게 떨어뜨릴 수 있습니다.

*운영중인 클러스터에 `keys`와 같은 명령어를 수행하는 것은 극도로 피해야 한다.*

다행히 Redis는 시간복잡도에 대해서 각 명령에따라 제공하는 가이드가 있기에 참고 하면 좋다.

## Redis의 영속성

우리가 아는 Memory는 휘발성이라는 특성이 있다. 

하지만 Redis는 In-memory임에도 불구하고 `Persistent` 하다고 한다.

 `RDB` 와 `AOF`를 통하여 데이터 영속성을 가질 수 있도록 한다.

### RDB, AOF

`RDB`는 Memory Snapshot이다. 하지만 이 Snapshot을 유지하는 것은 성능에 문제를 야기 할 수 있다.

`AOF`는 Write Log를 저장해 두어 Snapshot이후의 log를 통해서 




