# 내가 복잡해서 만드는 DATABASE 용어

![database](./src/database.png)

1. **Relation**

   - 우리가 일반적으로 알고 있는 테이블을 칭하는 용어이다.
   - 관계형 데이터베이스에서 어떠한 entity를 표현하기 위한 장치이다.

2. **attribute**

   - 데이터로 어떠한 것(현실의 어떤 사물, 개념, 관계 등)을 표현하기위한 속성
   - 이를 column기준으로 분류하곤 한다.
   - 솟성의 Relation 에서 담당하는 역활이 주어 질수 있는데 이를 Key로 분류한다.

3. **Tuple**
   - 엔티티의 특정한 인스턴스에 관한 정보에 대한 값을 나타내는 모임
   - 단일의 데이터 구조를 나타내는 항목들의 모임
   - record 라고도 한다.

## KEY

- Super key : Attribute의 유일한 식별자, 이때 column하나가 식별자일 수 있고, 여러개를 조합하여 식별자로 사용할 수 있다.

- Candidate Key : Relation에서 하나 이상의 키가 있다면 단, 이때 사용하는 속성은 최소한의 갯수를 보장해야한다.

- Primary Key : 후보키들 중 유일하면서도 최소한의 갯수도 보장하는 속성

- Alternate Key : 후보키가 두개 이상일 경우 하나를 Primary key화 한 뒤에 남은 키

- Foreign Key : 다른 테이블의 데이터를 참조할 때 없는 값을 참조하는 것을 막아주는 key, 참조할 수 있는 키는 오직 다른 Relation에 Primary Key 뿐이다.
