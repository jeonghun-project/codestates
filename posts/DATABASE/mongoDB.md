# MongoDB

MongoDB 데이터베이스는 NoSQL 도큐먼트 데이터베이스

NoSQL 데이터 베이스를 사용하는 경우

1. 데이터의 구조가 거의 또는 전혀 없는 대용량의 데이터를 저장하는 경우 - 비교적 자유로운 형식으로 저장할 수 있다
2. 클라우드 컴퓨팅 및 저장공간을 최대한 활용하는 경우 - 증설이 편리함
3. 빠르게 서비스를 구축하고 데이터 구조를 자주 업데이트 하는 경우

## Atlas Cloud

MongoDB는 Atlas를 사용하여 클라우드에 데이터베이스를 설정합니다.

아틀라스는 클러스터를 배포할 수 있으며 그룹화된 서버에 데이터를 저장한다!

인스턴스의 모임인 클러스터를 이용하여 하나의 시스템처럼 작동

단일 클러스터는 각각의 인스턴스가 동일한 복제본을 가지며 이 모음을 레플리카라고 한다.

클러스터를 이용하여 배포시 자동으로 레플리카 세트를 만든다.

레플리카 세트는 데이터의 사본을 저장하는 인스턴스의 모음

때문에 인스턴스가 문제가 발생하더라도, 데이터는 그대로 유지할 수 있고

나머지 레플리카 세트의 인스턴스에 저장된 데이터로 작업 가능

- 레플리카 세트 : 데이터의 사본을 저장하는 인스턴스의 모음
- 인스턴스 : MongoDB에서는 데이터베이스, 로컬 또는 클라우드에서 특정 소프트웨어를 실행하는 단일 머신
- 클러스터 : 데이터를 저장하는 서버 그룹

## Document

객체와 같은 방식으로 필드(Field) - 값(Value)로 data를 저장하는 방법
도큐면트에서 필드는 데이터의 식별자 값은 식별자와 관련된 데이터이다.

```json
{
  <field> : <value>,
  <field> : <value>,
  "name" : "jeong",
  "title : "MongoDB",
  "age" : 30
}
```

이러한 도큐먼트들의 모음을 컬렉션이라고 부른다.

- 도큐면트(Document)
  필드 - 값 쌍으로 저장된 데이터
- 필드(Field)
  데이터포인트를 위한 고유한 식별자
- 컬렉션(Collection)
  MongoDB의 도큐먼트로 구성된 저장소 도큐먼트 간의 공통 필드

## JSON vs BSON

### JSON(JavaScript Object Notation) 특징

장점 : JSON 형식은 읽기 쉽고, 많은 개발자들이 쓰기 편한 형태

단점 : 파싱이 매우 느리고, 메모리 사용에 있어서 비효율적입니다.
그리고 JSON은 기본 데이터 타입만을 지원하기 때문에 사용 할 수 있는 타입에 제한이 있습니다.

### BSON(Binary JSON)

MongoDB는 Json의 단점을 보완하기 위하여 BSON을 사용하여 데이터를 저장하는데 사용한다.

MongoDB에서 어떻게 사용할 수 있을지 알아보자

우선은 Atlas URI가 필요하다.

export

- Mongodump : BSON export
  `mongodump --uri "<atlas Cluster URI>"`
- Mongoexport : JSON export
  `mongoexport --uri "<atlas Cluster URI>" --collection=<collection name> --out=<filename>.json`

import

- Mongorestore : BSON import
  `mongorestore --uri "<atlas Cluster URI>"`
- Mongoimport : JSON import
  `mongoimport --uri "<atlas Cluster URI>" --drop=<filename>.json`

## CRUD

- db.collection.insert() : 새로운 data 삽입
- db.collection.find() : data 조회
- db.collection.find().count() : count
- cursor.pretty()
- db.collection.findOne()
- db.collection.updataOne()
- db.collection.updateMany()
- db.collection.deleteOne()
- db.collection.deleteMany()
- db.collection.drop()
- \$inc
- \$set
- \$push
