# php - debug

PHP의 디버깅 요소들을 알아보자

## var_dump

인자로 전달된 값을 화면에 출력해주는 함수

1.

```php
$a = [1, 2 ,'jeong'];

var_dump($a);
```

2.

```php
error_log(var_export($a, 1));
```

`tail -f /var/log/apache2/error.log` 터미널을 이용하여 에러로그 파일에 변수를 찍어볼수 있다.

두 가지 방법을 이용해서 변수에 들어있는 값을 확인할 수 있다.

## xdebug

xdebug라는 도구를 이용할 수 있다. 본 포스팅은 우분투 사용기준이므로 참고하자.

우선 설치를 진행한다. [공식 페이지를 참고하자](https://xdebug.org/docs/install)

```sh
$sudo apt-get update
$sudo apt-get install php-xdebug
$sudo apt-get install php-dev
```

기본적인 설치가 끝나면 `/etc/php/version/apache2/conf.d/xdebug.ini` 파일이 생성되고 `xdebug.so`설정이 자동으로 될 것이다.

이렇게 기본적인 설정이 끝나면 php 파일에 xdebug를 이용하여 debug를 진행할 수 있다.

기본적으로 var_dump()가 보기 좋게 변하는 것 뿐아니라 다양한 자체 메소드를 지원하니 알아보도록하자.

```php
<?php
    function fix_string($a)
    {
        echo "Called @ ".
            xdebug_call_file().
            ":".
            xdebug_call_line().
            " from ".
            xdebug_call_function();
    }

    $ret = fix_string(array('Derick'));

?>

<?php
$text = "coding everybody";
$prev_mem = xdebug_memory_usage();
for($i=0; $i<10; $i++){
        $text.=$text;
        echo $i.':'.xdebug_memory_usage().':'.(xdebug_memory_usage()-$prev_mem).':'.strlen($text)."\n";
}
?>
```

이런 식으로 어느 위치에서 파일이 읽게 되었는지, **메모리는 얼마나 사용**하고 있는지, **시간이 얼마나** 걸렸는지 등등 다양한 디버깅에 필요한 편의 기능들을 제공한다.

위 내용은 [생활코딩](https://opentutorials.org/module/411/3756)의 xdebug 강의에 나오는 코드내용이다.

이렇게 xdebug를 이용해서 php 디버깅을 해볼 수 있다.
