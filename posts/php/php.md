# PHP

hypertext preproccessor

C언어로 만들어져 있다.

Web을 위해서 만들어졌다.

serverside script이다.

동적인 web을 만들수 있다.

1. 비교적 쉽다

2. 동적인 타입 추론

## php debug

error log 파악하기

`tail -f /var/log/apache2/error.log`

terminal에서 입력해보면 에러로그를 확인 해볼수있다.

[php.png](src/php.png)

php.ini에서 php 실행환경을 설정할 수 있다.

## 기본 문법

```php
<?php
if($_GET['id'] === 'jeong'){ // 조건문
  echo 'right';
} else {
  echo 'wrong';
}

for($s=0; $s<10; $s++){ // 반복문
  echo $s;
}

while($s < 10){
  echo $s;
  $s++;
}

function sum($a, $b=0){ //함수 사용
  return $a + $b;
}

$members = ['jeong', 'hoon']; // 배열

// 레거시 코드 $members = array('jeong, 'hoon')

// 배열의 반복문

for($i = 0; $i < count($members); $i++){
  echo ucfirst($members[$i]).'<br />'; // ucfirst 맨 첫 알파벳 대문자로 만듬
}

$arr = ['a', 'b', 'c', 'd', 'e'];
array_push($arr, 'f'); // 배열의 뒤에 인자 추가
var_dump($arr);
/*
  array(6) { [0]=> string(1) "a" [1]=> string(1) "b" [2]=> string(1) "c" [3]=> string(1) "d" [4]=> string(1) "e" [5]=> string(1) "f" }
*/


<?php
$li = ['a', 'b', 'c', 'd', 'e'];
$li = array_merge($li, ['f','g']); // 배열에 배열을 합칠때
var_dump($li);
?>

/*
  array(7) { [0]=> string(1) "a" [1]=> string(1) "b" [2]=> string(1) "c" [3]=> string(1) "d" [4]=> string(1) "e" [5]=> string(1) "f" [6]=> string(1) "g" }
*/

$arr = ['a', 'b', 'c', 'd', 'e'];
array_unshift($arr, 'f'); // 배열의 앞에 인자 추가
var_dump($arr);

/*
  array(6) { [0]=> string(1) "z" [1]=> string(1) "a" [2]=> string(1) "b" [3]=> string(1) "c" [4]=> string(1) "d" [5]=> string(1) "e" } ?>
*/

$li = ['a', 'b', 'c', 'd', 'e', 'z'];
array_shift($li); // 배열의 0번째 인자 제거
var_dump($li);

/*
array(5) { [0]=> string(1) "b" [1]=> string(1) "c" [2]=> string(1) "d" [3]=> string(1) "e" [4]=> string(1) "z" }
*/

$li = ['a', 'b', 'c', 'd', 'e', 'z'];
array_pop($li); // 배열의 마지막 인자 제거
var_dump($li);

/*
array(5) { [0]=> string(1) "a" [1]=> string(1) "b" [2]=> string(1) "c" [3]=> string(1) "d" [4]=> string(1) "e" }
*/

li = ['c','e','a','b','d'];
sort($li); // 배열을 정렬
rsort($li); // 역순으로 정렬
?>

// hash dictionary associative array
// 마치 javascript의 객체와 같은 느낌이다.

$grades = array('egoing'=>10, 'k8805'=>6, 'sorialgi'=>80);

$grades = array('egoing'=>10, 'k8805'=>6, 'sorialgi'=>80);
foreach($grades as $key => $value){
    echo "key: {$key} value:{$value}<br />";
}

/*
key: egoing value:10
key: k8805 value:6
key: sorialgi value:80
*/
```
