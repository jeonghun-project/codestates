# php에서의 Error

[모던PHP의 자료를 참고하자](https://modernpug.github.io/php-the-right-way/#errors) 확인해보면 php에서의 에러에 대한 계략적인 설명을 하고 있어 이해하기에 좋다.

> 우선 php는 에러에 대하여 관대하다 암격하게 검사하는 다른 프로그래밍언어들과는 차이가 있다. 왠만한 치명적인 스크립트를 중지 시키지 않을 만한(?) 상황을 만나더라도 php는 지속적으로 프로그램을 실행한다.

이러한 부분은 개발자로 하여금 예상치 못한 상황을 만나게 할 수 있기에 우리는 의도적으로 에러를 핸들링해줘야한다.

php는 Error에 레벨이 있다.

1. **Error** : 치명적인 런타임 에러

2. **notice** : 알림 실행 중에는 문제를 일으킬 가능성이 있는 정도의 코드 스크립트 실행은 지속됨

3. **warning** : 치명적이지 않음 평상시처럼 동작함

php에서는 이러한 **Error보다는 의도적인 핸들링을 위하여 Exeption을 적극적**으로 사용한다.

## Exeption 예외

php 한국어 가이드에 설명

> CodeIgniter 등 많은 수의 오래된 PHP 프레임워크들은 실패 시에 단순히 false를 리턴하고 프레임워크가 제공하는 로그 기록 시스템에 로그 메시지를 기록하며, $this->upload->get_error() 를 호출하면 무슨 이유로 실패했는지 알 수 있게 해주는 식으로 동작합니다.

어디에서 무엇으로인한 문제인지 확인하는 과정이 까다로운 편인것이다.
혼자서 개발한 가벼운 소프트웨어가 아닌 이상 이러한 불친절함을 해소할 필요가 있는데

[공식 php 문서의 예외부분](https://www.php.net/language.exceptions)을 참고할 필요가 있다.

### 가장 기본적인 error handler

```php
<?php
function exception_error_handler($severity, $message, $file, $line) {
    if (!(error_reporting() & $severity)) {
        // This error code is not included in error_reporting
        return;
    }
    throw new ErrorException($message, 0, $severity, $file, $line);
}
set_error_handler("exception_error_handler");

/* Trigger exception */
strpos();
?>
```

### Fatal error & NoN-Fatal Error

```php
<?php
function custom_error_handler($number, $string, $file, $line, $context)
{
    // Determine if this error is one of the enabled ones in php config (php.ini, .htaccess, etc)
    $error_is_enabled = (bool)($number & ini_get('error_reporting') );

    // -- FATAL ERROR
    // throw an Error Exception, to be handled by whatever Exception handling logic is available in this context
    if( in_array($number, array(E_USER_ERROR, E_RECOVERABLE_ERROR)) && $error_is_enabled ) {
        throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
    }

    // -- NON-FATAL ERROR/WARNING/NOTICE
    // Log the error if it's enabled, otherwise just ignore it
    else if( $error_is_enabled ) {
        error_log( $string, 0 );
        return false; // Make sure this ends up in $php_errormsg, if appropriate
    }
}
?>
```

### try & catch

기본적으로 `try & catch` 구문을 이용하여 예외를 처리해줄 수 있다.

```php
<?php
function inverse($x) {
    if (!$x) {
        throw new Exception('Division by zero.');
    }
    return 1/$x;
}

try {
    echo inverse(5) . "\n";
    echo inverse(0) . "\n";
} catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}

// Continue execution
echo "Hello World\n";
?>

/*
  0.2
  Caught exception: Division by zero.
  Hello World
*/

```
