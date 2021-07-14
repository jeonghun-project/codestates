# PHP OOP(Object Oriented Programming)

php는 현재는 객체지향 프로그래밍 페러다임을 통하여 구현할 수 있도록 편의기능을 제공하도록 되어있지만, 레거시한 php는 이러한 기능들을 지원해 주지 못했다.

[SPL을 살펴보자](https://www.php.net/manual/en/book.spl.php)

```php
<?php
$stack = new SplStack(); // 객체를 만드는 코드 (새로운 인스턴스를 생성)

$stack[] = 1;
$stack[] = 2;
$stack[] = 3;
$stack->push(4);
$stack->add(4,5);

$stack->rewind();
while($stack->valid()){
  echo $stack->current(),"\n";
  $stack->next();
}
?>

// output : 5 4 3 2 1
```

```php
$array = new ArrayObject(array('a', 'b', 'c'));

$array->append('d');
foreach($array as $el){
  echo $el.'<br>';
}
```

이렇게 이미 만들어져 있는 `class(생성자)`들을 이용하여 `instance(인스턴스)`를 만들어 선언된 메소드들을 이용하는 것을 보았다.

# class (생성자)

이제 그럼 class를 만들어 보자.

```php
class CoffeeMachine{

  private $bean;
  private $shot;

  __constructor($bean, $shot){
    $bean = $bean;
    $shot = $shot;
  }

}

new CoffeeMachine(10, 2);
```

커피머신이라는 class를 만들어 보았다.

이렇게 만들어지는 인스턴스들은 생성자의 타입을 따른다.

그렇다면 OOP의 중요한 요소인 **상속, 캡슐화, 추상화, 다향성**을 어떻게 이룰수 있는지 보자.

기본적으로 javascript에서 보았는 class의 형식을 유사하게 가지고 있기에 그에 따라서 설명하도록 하겠습니다.

[Typescript에서의 OOP](../typescript/OOP.md)

그전에 getter와 setter를 살펴보고 넘어가자

## getter, setter

php의 class는 접근에 대한 권한을 설정할 수 있기에 **getter 와 setter로 은닉화를 구현할 수 있다.** 이를 통해 캡슐화도 가능하다.

```php
class CoffeeMachine{

  private $bean;
  public $shot;

  function __construct($bean, $shot){
    $this->bean = $bean;
    $this->shot = $shot;
  }

  public function setBean($bean){
    $this->bean = $bean;
  }

  public function getBean(){
    return $this->bean;
  }
}

$drip = new CoffeeMachine(3,4);
var_dump($drip);
/*
object(CoffeeMachine)[1]
  private 'bean' => int 3
  public 'shot' => int 4
*/

$drip->setBean(8);
echo $drip->getBean(); // 8
```

## Encapsulation 캡슐화

```php
class CoffeeMachine{

  private $bean;
  private $shot;
  private static $BEANS_GRAMM_PER_SHOT = 5;

  function __construct($bean, $shot){
    $this->bean = $bean;
    $this->shot = $shot;
  }

  public function setBean($bean){
    $this->bean = $bean;
  }

  public function getBean(){
    return $this->bean;
  }

  public function changeShot($shot){
    $this->shot = $shot;
  }

  public function makeCoffee($shots){
    if($this->bean < $shots * CoffeeMachine::$BEANS_GRAMM_PER_SHOT) {
      throw new Exception("value for beans should be greater than 0");
    } else {
      $this->bean -= $shots * CoffeeMachine::$BEANS_GRAMM_PER_SHOT;
      return new Coffee($shots, false);
    }
  }
}

$drip = new CoffeeMachine(5,4);
var_dump($drip);  // A
$drip->setBean(200);
echo $drip->getBean(); // B
var_dump($drip->makeCoffee(2)); // C

/*
@A
object(CoffeeMachine)[1]
  private 'bean' => int 5
  private 'shot' => int 4

@B
200

@C
  object(Coffee)[2]
  private 'shots' => int 2
  private 'hasMilk' => boolean false
*/

```

이런식으로 구현은 숨기고 동작은 노출시킬 수 있다.

## inheritance 상속

`extands` 키워드를 통하여 상속을 구현할 수 있다.

```php
class CoffeeMachine{
  ...
}

class LatteMachine extends CoffeeMachine{
  function makeCoffee($shots){
    $Latte= parent::makeCoffee($shots);
    $Latte->putinMilk();
    return $Latte;
  }
}

$latte = new LatteMachine(20, 2);
var_dump($latte->makeCoffee(2));

/*
  object(Coffee)[3]
  private 'shots' => int 2
  private 'hasMilk' => boolean true
*/
```

## Abstraction (추상화)

`Abstract` 키워드가 존재하여 추상 클래스를 선언하는 것이 가능하다.
명세서를 적어 놓음으로서 해당하는 기능은 자식 class에서 무조건적으로 구현되어야 한다.

```php
<?php
abstract class Coffee{
  abstract protected $shots;
  abstract protected $hasMilk;

  abstract function putinMilk();
  abstract function getName();

  // 물론 실제 함수도 정의 할수 있다.
  public function print() {
    print $this->getName().'\n';
  }
}
?>
```

**이렇게 만들어진 추상 클래스는 객체를 생성할 수 없다.**

`interface` 키워드를 통한 구현 이러한 interface keyword의 경우 다른 언어에서와 유사하게 동작하고 조금의 차이를 지닌다. (typescript, java)

```php
<?php
<?php
interface Coffee
{
  const BEANS_GRAMM_PER_SHOT = 5;
}

interface Machine
{
  public function makeCoffee($shots);
}

class CoffeeCup
{
  ...
}

class basicCoffeeMachine implements Coffee, Machine
{
  private $bean;

  function __construct($bean)
  {
    $this->bean = $bean;
  }

  public function makeCoffee($shots){
    if($this->bean < $shots * Coffee::BEANS_GRAMM_PER_SHOT) {
      throw new Exception("value for beans should be greater than 0");
    } else {
      $this->bean -= $shots * Coffee::BEANS_GRAMM_PER_SHOT;
      return new CoffeeCup($shots, false);
    }
  }
}
?>
```

## Polymorphism 다향성

다향성은 같은 하나의 클래스를 통해 **같은 메소드나 프로퍼티를 조금씩 다르게 적용**될 수 있도록 하는것

위에 상속의 특성으로 살펴볼수 있으니 넘어가도록 하겠다!

이상으로 php가 OOP를 어떻게 구현하게 되는지 살펴보았다.
