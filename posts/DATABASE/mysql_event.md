# mysql event

몽고나 nosql에서 제공하는 TTL 기능을 mysql에서 실행하기 위하여 찾아본 서치 결과 공유 입니다.

mysql은 최근 event를 통해 일정 주기에 job을 추가하여 실행할 수 있는 event기능을 추가로 제공합니다.

이를 통해 TTL과 같은 기능을 구현할 수 있습니다.

```sql
CREATE EVENT
    clearlogs
    ON SCHEDULE EVERY 1 DAY
    DO
    BEGIN
        DELETE FROM
            log
        WHERE created_at < NOW() - INTERVAL 1 DAY;
    END;
```
