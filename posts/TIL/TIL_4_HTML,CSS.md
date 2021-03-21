# TIL HTML,CSS

---

**Markup** 

태그 등을 이용하여 문서나 데이터의 구조를 명기하는 언어의 한 가지

태그는 문서의 구조를 표현하는 역할을 수행 이러한 태그 방법의 체계를 마크업 언어라 한다. HTML, CSS, XML 등

**Tree Structure**

부모 자식의 구조를 가지고 있음

HTML

head

titlge

body

Self-Closing TAG

<input />

## 주요 TAG

### div / span TAG

div TAG는 한 줄을 차지한다.

span TAG는 컨텐츠 크기만큼 공간을 차지합니다.

### img TAG

img src = " "

### a TAG

link 삽입 ⇒ a href= " " target = "_balnk"

### ul, ol TAG

list 만들기

oder / unoder

### input / textarea TAG ⇒ from TAG

input type = " " placeholeder = " "

radio

checkbox

textbox

### script TAG

js 불러오기 (실행하기)

script src ='./script.js'

### section TAG - 더 알아보기

div TAG와의 차이점은 시멘틱적 의미가 있느냐 없느냐

section으로 구분하기 충분히 크지 않을때 div를 쓰도록하자

# CSS

---

HTML link TAG를 통해 불러와서 적용한다.

관심사의 분리 측명에서 내부 스타일 적용은 지양한다.

또한 같은 관점으로 CSS layout과 style font 등의 파일을 구분하여 생성하고 링크로 중첩하여 불러오는 것이 바람직하다

[class / ID](https://www.notion.so/093d8c56ce5b411784dc340be949a473)

# JAVASCRIPT

---

javascript를 통하여 조금더 동적인 Web을 표현할 수 있다.

[document](https://developer.mozilla.org/ko/docs/Web/API/Document) 참고하자....

document.getElementId(" ") → react에서 root를 호출할 때 쓰니까 기억하자 value값은 Id값만 올 수 있기 때문에 따로 #을 이용한 호출을 하지 않는다.

document.querySelctor(" ") → class, id, TAG 등 만족하는 첫 번째 Element를 반환하기 때문에 `#`, `.` 등을 사용하여 규칙에 맞게 호출하여야한다.