# Redis - ZSets

> Redis는 오픈소스 in-memory data store 입니다.

일반적으로 Cache, streaming engine, Message Broker에 사용이 됩니다.

**현재 글에서는 Redis에서 지원하는 우선순위가 있는 데이터 저장법에 대하여 알아보도록 할 예정입니다.**

## ZSets

ZSets 는 Score를 통해 우선순위를 정할 수 있는 데이터 타입이다. **Sorted Set**

1. ZADD는 `Key, Score, Value`로 구성된다. 

    - `ZADD KEY_NAME SCORE1 VALUE1.. SCOREN VALUEN`

    ```go
    res := redisDB.ZAdd(ctx, key, &redis.Z{Score: rate, Member: id})
    ```

    이렇게 보관된 Data를 Score를 따라 우선순위를 정해서 리턴 할 수 있다.

2. ZRANGE

    - Score가 작은 것 부터 Value를 조회한다.

    `zrange key start stop` => 전체 조회를 위해서는 `start` = 0 `stop` = -1을 줄 수 있다.

    `withscores` 옵션을 사용하면 스코어 정보도 함께 조회할 수 있다.

3. ZREM

    - 멤버 삭제

4. ZRangeByScore
    
    - Score 범위를 지정해서 조회 할 수 있다 

    `zrangebyscore key min max` => 전체 조회를 위햐서는 `min` = -inf `max` = +inf로 조회하면 된다.

5. ZScore
    
    - Value의 Score를 개별 조회 한다.


이외에도 다양한 `ZSets`의 사용법이 있으니 확인해보길 바란다.

[ZSets](http://redisgate.kr/redis/command/zsets.php)