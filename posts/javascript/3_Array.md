# 배열 (array)

- [배열 (array)](#배열-array)
  - [선언](#선언)
    - [배열 안에 배열 선언하기](#배열-안에-배열-선언하기)
  - [배열 메소드](#배열-메소드)
  - [배열의 반복분](#배열의-반복분)
  - [배열 판별하기](#배열-판별하기)
  - [배열 요소 추가 및 삭제하기](#배열-요소-추가-및-삭제하기)
  - [빈 배열 검사하기](#빈-배열-검사하기)

순서가 있는 값

값 → 요소 element

순서 → index 0~n

참조형 데이터

## 선언

```jsx
let 변수명 = [요소1, 요소2, .... , 요소n];
```

조회 변수명[n] ⇒ n-1 번째 요소에 접근

**선언된 인덱스보다 큰 인덱스에 접근시 undefined가 리턴된다**.

존재하지 않는 요소에 접근시

### 배열 안에 배열 선언하기

```jsx
let 변수명 = [ [요소1, 요소2], [요소3, 요소4], ... , [요소5,요소6]];
```

## 배열 메소드

.length //길이를 리턴

.push //마지막 인덱스 뒤 인덱스에 요소 추가 mutable :length

.pop //마지막 인덱스 제거 mutable :element

.shift //처음 인덱스 제거 mutable :element

.unshift //처음 인덱스 요소 추가 mutable :length

## 배열의 반복분

for, while문을 통하여 필요한 인덱스에 접근하여 원하는 결과 출력

## 배열 판별하기

typeof word ; // object (객체)

typeof [2,4,1] // object (객체)

Array.isArray(1123) // false

Array.isArray([3,2,4,5]) // true

// ArrayisArray

## 배열 요소 추가 및 삭제하기

console.table ⇒ 테이플 형식으로 데이터 조회

주요 배열 조작을 위한 메소드

const로 선언된 array의 경우 재할당은 금지되지만 새로운 요소를 추가하거나 변경 삭제할 수 있다.

## 빈 배열 검사하기

```jsx
(Array.isArray(arr) && !arr.length) {
	return 'arr is empty array';
}
```

```jsx
let arr = [];
arr === []; // false
```

자바스크립트 상에서는 두배열을 "주소가 다른 두 개의 빈 배열" 이라고 생각하기 때문에 false
