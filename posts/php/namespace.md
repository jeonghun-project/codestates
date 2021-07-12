# php - include/require

php 파일들은 서로 참조형식을 지원하고

`include`

`require`

`include_once`

`require_once`

메소드들을 통하여 모듈화를 할수가 있다.

다만 이때 해당 파일에 선언되어 있는 모든 함수 변수를 가져오기 때문에 변수나 함수 명들의 중복이 우려된다.

다행히 php는 함수나 변수명의 중복을 fatal오류로 취급하지만, 코딩을 하는 과정에 외부 라이브러리를 사용할때 변수명을 짖는데 곤란한 상황들이 생길 수 있다.

우선 함수를 불러와 사용하는 코드를 살펴보면

```php
test.php
<?php
$grades = array('jeong'=>10, 'kim'=>6, 'sora'=>80);
function printObj($grades) {
    foreach($grades as $key => $value){
        echo "key: {$key} value:{$value}<br />";
    }
}
?>
```

이렇게 선언해 둔 파일과 변수를

```php
index.php
<?php
include 'test.php';
printObj($grades);
?>
```

다른 파일에서 불러와서 사용할 수 있다.

## namespace

이렇게 되면 *변수명의 중복에 대한 문제*가 존재할 수 있는데 이러한 문제를 해결하고 내가 사용하는 변수들을 다른 라이브러리의 변수들과 독립적으로 사용할 수 있도록 만들어 주는 것이 `namespace`이다.

각 모듈이 되는 파일들의 `namespace` 마치 `directory`와 유사한 각 영역을 만들어 주어서 해당 영역안의 변수와 함수는 다른 영역의 변수와 함수를 **침범하지 못하도록(고유하도록) 만들어 줄 수 있다.**

예를 살펴보자

```php
test.php
<?php
$grades = array('hoon'=>10, 'jang'=>6, 'sori'=>80);
  function printObj($grades) {
    foreach($grades as $key => $value){
        echo "key: {$key} value:{$value}<br />";
    }
  }
?>
```

```php
<?php
main.php
$object = array('jeong'=>10, 'bora'=>6, 'nogo'=>80);
  function printObj($grades) {
    foreach($grades as $key => $value){
        echo "key: {$key} value:{$value}<br />";
    }
  }
?>
```

위에 두 파일의 pringObj라는 같은 함수명을 가지는 함수가 선언되어 있다.

```php
include 'test.php';
include 'main.php';
printObj($object);
```

이렇게 하면

`Fatal error: Cannot redeclare printObj() (previously declared in /var/www/html/test.php:3) in /var/www/html/main.php on line 4`

이런 에러를 볼 수가 있다. 이미 선언되어 있다고 한다 이를 네임스페이스로 어떻게 방지할수 있는지 살펴보자

```php
test.php
<?php
namespace func\grade;
$grades = array('hoon'=>10, 'jang'=>6, 'sori'=>80);
  function printObj($grades) {
    foreach($grades as $key => $value){
        echo "key: {$key} value:{$value}<br />";
    }
  }
?>
```

```php
main.php
<?php
namespace func\obj;
$object = array('jeong'=>10, 'bora'=>6, 'nogo'=>80);
  function printObj($grades) {
    foreach($grades as $key => $value){
        echo "key: {$key} value:{$value}<br />";
    }
  }
?>
```

이런 식으로 각각의 `namespace` 를 파일에 선언해 줄수 있다. 사용하는 방법은 아래와 같다.

```php
include 'test.php';
include 'main.php';
func\obj\printObj($object);
func\grade\printObj($grades);
```

이렇게 우리는 우리가 작성하는 변수와 함수가 다른 사람이 작성한 변수와 함수명의 중복으로 인한 오류를 방지할 수 있다.
