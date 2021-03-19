# JS(Javasript) 기본


## 변수

- 변수 선언(declaration) → 변수 할당(assignment)
- 변수 타입(type)
    - 숫자
    - 문자열 → ' ' , " "
    - 불리언(Boolean) → true, false
    - 타입이 섞인 (compound) 타입 = 자료형 (배열 array, 객체 object)
    - undefined
    - 함수

## 함수

코드의 묶음 기능의 단위

입력값과 출력값을 가짐(mapping)

함수 선언(declaration) → 함수 호출(Call, invocation) → return

함수의 표현 방법 ⇒ 함수이름(전달인자(argument))

func( param1, .... , paramN ) → return

### 함수의 표현 방법

---

함수 선언식

```jsx
function myFunction(input) {
	//컴퓨터에게 시킬 일
}
```

함수 표현식

```jsx
let myFunction = function(input) {
	//컴퓨터에게 시킬 일
}
```

함수 선언식과 표현식의 가장 큰 차이는 호이스팅에 있다.
함수 선언식은 함수에 호이스팅이 일어나기 때문에 함수를 선언하는 시기에 대한 고민이 없지만, 무분별한 사용으로 코드의 복잡성이 늘어날 수있는 위험이 있다.
