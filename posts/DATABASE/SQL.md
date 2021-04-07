 # Structured Query Language
 
MySQL, Oracle, SQLite, PostgreSQL 등이 있다.

**데이터베이스 용 프로그래밍 언어 - SQL**

관계형 데이터 베이스 SQL

비관계형 데이터 베이스 NoNSQL

## SQL DATABASE

DATABASE SERVER - 여러 DATABASE를 관리

DATABASE TABLE - DTATABASE안에는 TABLE이 있다

각각의 TABLE - row와 column으로 구성되어 있다.

이러한 DATA를 관리하기 쉽도록하는 것이 데이타 베이스이다.

## query

질의문 query를 통하여 데이터 베이스에 원하는 데이터만을 추려서 가져올 수 있다.

## ACID

**Atomicity** 원자성 하나의 트랜젝션 내에서는 모든 연산이 성공하거나 모두 실패해야 한다.

**Consistency** 일관성 데이터베이스 상태는 이전과 같이 유효해야 한다. 제약을 위반하지 않아야 한다.

**Isolation** 고립성 하나의 트랜잭션이 다른 트랜잭션은 독립적이여야 한다.

**Durability** 지속성 트랜잭션에 대한 로그 기록은 영구적이어야 한다.


## DBMS(DATABASE MANAGE SYSTEM)

이런 데이터 베이스를 관리하는 시스템으로 MariaDB, Oracle, MySQL, MongoDB, 등등이 있다.

table에 colomn을 색인(index)화 하여 검색 속도를 높인다.
데이터베이스 안의 레코드를 처음부터 fullscen하지 않고, B+ Tree로 구성된 구조에서 index 파일 검색으로 속도를 향상시킨다.

DATA 조회하기

```sql
SELECT email FROM sutudents WHERE email LIKE "%naver%"
```

### JOIN

INNER JOIN

![inner](./src/inner.png)

```sql
SELECT
A.NAME, B.AGE
FROM EX_TABLE A
INNER JOIN JOIN_TABLE B ON A.NO_EMP = B.NO_EMP
```

LEFT JOIN

![LEFT](./src/left.png)

```sql
SELECT
A.NAME, B.AGE
FROM EX_TABLE A
LEFT OUTER JOIN JOIN_TABLE B ON A.NO_EMP = B.NO_EMP
```

RIGHT OUTER JOIN

![RIGHT](./src/right.png)

```sql
SELECT
A.NAME, B.AGE
FROM EX_TABLE A
RIGHT OUTER JOIN JOIN_TABLE B ON A.NO_EMP = B.NO_EMP
```

FULL OUTER JOIN

![outer](./src/outer.png)

```sql
SELECT
A.NAME, B.AGE
FROM EX_TABLE A
FULL OUTER JOIN JOIN_TABLE B ON A.NO_EMP = B.NO_EMP
```

추가로 알아보기 ORM - SQL문을 직접쓰지 않고 python node.js 등의 환경에서 SQL을 다룰수 있도록 해준다.

