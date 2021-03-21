# 원시타입(primitive)

- [원시타입(primitive)](#원시타입primitive)
  - [원시타입 데이터(primitive type data) 종류](#원시타입-데이터primitive-type-data-종류)
  - [특징](#특징)
- [참조타입(reference)](#참조타입reference)
  - [참조타입 데이터(reference type data)](#참조타입-데이터reference-type-data)
  - [특징](#특징-1)

## 원시타입 데이터(primitive type data) 종류

number

boolean

undefined

string

symbol

**null - null 의 경우 typeof 로 검사시 'Object' 모든 것은 null에서 부터 시작하기 때문에 null의 타입은 객체로서 볼 수 있다(있으면서도 없는 것)**

## 특징

- 객체가 아니면서 method를 가지지 않는 6가지의 타입
- 모두 '하나'의 정보, 즉 데이터를 담고 있다.

# 참조타입(reference)

저장소에 heap을 가리키는  memory의 주소를 할당하고 해당 주소 뒤에 값을 이어 붙이는 형태

호출시 메모리의 주소에 접근하여 값을 불러옴

heap

address link heap

## 참조타입 데이터(reference type data)

array

object

function

## 특징

임시 데이터 보관함인 heap을 이용한다(참조한다)

변수에는 이 데이터 보관함을 찾아갈 수 있는 주소를 담는다