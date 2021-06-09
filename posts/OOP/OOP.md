# OOP (Object Oriented Programming)

객체 지향적 프로그래밍은 기존의 순차적인 프로그래밍을 데이터의 처리 과정을 보다 다양한 방식으로 수행할 수 있도록 변화하였다. 이로서 데이터와 기능이 별개가 아닌 하나의 묶음으로 처리 될 수 있도록 프로그래밍이 가능하게 되었다.

최근 엘리님이 진행하시는 dreamcoding typescript 편을 수강하면서 OOP에 대한 개념을 확실한 예제와 함께 정리할 수 있었는데,
예시 코드는 **드림코딩에 엘리님의 진행하시는 강좌를 기반으로 작성 되었음을 알립니다.**

타입스크립트에 대한 개념을 잡아 줄수 있는 수업으로 도움이 많이 되었습니다.

## Encapsulation (캡슐화)

- 데이터와 기능을 하나의 단위로 묶는 것
- 은닉 (hiding) : 구현을 숨기고, 동작은 노출시킴
- 느슨한 결합 (Loose Coupling)에 유리 : 언제든 구현을 수정할 수 있음
- 이는 코드가 복잡하지 않게 만들어주고, 재사용성을 높입니다.

```ts
type CoffeeCup = {
  shots: number;
  hasMilk: boolean;
};

// public 일반적
// private 외부에서 볼 수 없고 접근 할 수 없음
// protected 상속시 자식클레스에서만 접근 할 수 있음
class CoffeeMaker {
  private static BEANS_GRAMM_PER_SHOT: number = 8; // class level 맴버 변수뿐 아니라 함수에서도 호출 가능
  private coffeeBeans: number = 0; // instance level 맴버 변수

  private constructor(beans: number) {
    this.coffeeBeans = beans;
  }

  static makeMachine(coffeeBeans: number): CoffeeMaker {
    return new CoffeeMaker(coffeeBeans);
  }

  fillCoffeeBeans(beans: number) {
    if (beans < 0) {
      throw new Error("value for beans should be greater than 0");
    }
    this.coffeeBeans += beans;
  }

  makeCoffee(shots: number): CoffeeCup {
    if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
      throw new Error("Not enough coffee beans!");
    }
    this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
    return {
      shots,
      hasMilk: false,
    };
  }
}

const maker = CoffeeMaker.makeMachine(32);
maker.fillCoffeeBeans(20);

class User {
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  private internalAge = 4;
  get age(): number {
    return this.internalAge;
  }
  set age(num: number) {
    if (num < 0) {
      //유효성 검사도 할 수 있음.
      throw new Error("Age is should greater than 0");
    }
    this.internalAge = num;
  }
  constructor(private firstName: string, private lastName: string) {}
}

const user = new User("Steve", "Jobs");
user.age = 6;
console.log(user.fullName);
```

## inheritance (상속)

[class](../javascript/11_class.md) 여기를 살펴보자

```ts
type CoffeeCup = {
  shots: number;
  hasMilk: boolean;
};

interface CoffeeMaker {
  makeCoffee(shots: number): CoffeeCup;
} //계약서, 명세서 같은 녀석

class CoffeeMachine implements CoffeeMaker {
  private static BEANS_GRAMM_PER_SHOT: number = 8; // class level 맴버 변수뿐 아니라 함수에서도 호출 가능
  private coffeeBeans: number = 0; // instance level 맴버 변수

  constructor(beans: number) {
    this.coffeeBeans = beans;
  }

  static makeMachine(coffeeBeans: number): CoffeeMachine {
    return new CoffeeMachine(coffeeBeans);
  }

  fillCoffeeBeans(beans: number) {
    if (beans < 0) {
      throw new Error("value for beans should be greater than 0");
    }
    this.coffeeBeans += beans;
  }

  clean() {
    console.log("cleaning the machine...");
  }

  private grindBeans(shots: number) {
    console.log(`grinding beans for ${shots}`);
    if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
      throw new Error("Not enough coffee beans!");
    }
    this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
  }

  private preheat(): void {
    console.log("heating up~~~");
  }

  private extract(shots: number): CoffeeCup {
    console.log(`Pulling ${shots} shots....`);
    return {
      shots,
      hasMilk: false,
    };
  }

  makeCoffee(shots: number): CoffeeCup {
    this.grindBeans(shots);
    this.preheat();
    return this.extract(shots);
  }
}

class CaffeLatteMachine extends CoffeeMachine {
  constructor(beans: number, public readonly serialNumber: string) {
    super(beans);
  }
  private steamMilk(): void {
    console.log("steaming some milk");
  }

  makeCoffee(shots: number): CoffeeCup {
    const coffee = super.makeCoffee(shots);
    this.steamMilk();
    return {
      ...coffee,
      hasMilk: true,
    };
  }
}

const machine = new CoffeeMachine(23);
const latteMachine = new CaffeLatteMachine(23, "SSSSS");
const coffee = latteMachine.makeCoffee(2);
console.log(coffee);
console.log(latteMachine.serialNumber);
```

## Abstraction (추상화)

복잡한 과정은 안으로 숨기고 기능적인 부분만 노출할 수 있다.

- 인터페이스의 단순화
- 메소드와 속성만 정의한 것을 인터페이스라 한다.
- 변화에 대한 영향을 최소화 할 수 있다.

```ts
type CoffeeCup = {
  shots: number;
  hasMilk: boolean;
};

interface CoffeeMaker {
  makeCoffee(shots: number): CoffeeCup;
} //계약서, 명세서 같은 녀석

interface CommercialCoffeeMaker {
  makeCoffee(shots: number): CoffeeCup;
  fillCoffeeBeans(beans: number): void;
  clean(): void;
} //계약서, 명세서 같은 녀석

class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
  private static BEANS_GRAMM_PER_SHOT: number = 8; // class level 맴버 변수뿐 아니라 함수에서도 호출 가능
  private coffeeBeans: number = 0; // instance level 맴버 변수

  private constructor(beans: number) {
    this.coffeeBeans = beans;
  }

  static makeMachine(coffeeBeans: number): CoffeeMachine {
    return new CoffeeMachine(coffeeBeans);
  }

  fillCoffeeBeans(beans: number) {
    if (beans < 0) {
      throw new Error("value for beans should be greater than 0");
    }
    this.coffeeBeans += beans;
  }

  clean() {
    console.log("cleaning the machine...");
  }

  private grindBeans(shots: number) {
    console.log(`grinding beans for ${shots}`);
    if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
      throw new Error("Not enough coffee beans!");
    }
    this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
  }

  private preheat(): void {
    console.log("heating up~~~");
  }

  private extract(shots: number): CoffeeCup {
    console.log(`Pulling ${shots} shots....`);
    return {
      shots,
      hasMilk: false,
    };
  }

  makeCoffee(shots: number): CoffeeCup {
    this.grindBeans(shots);
    this.preheat();
    return this.extract(shots);
  }
}

class AmateurUser {
  constructor(private machine: CoffeeMaker) {}

  makeCoffee() {
    const coffee = this.machine.makeCoffee(2);
    console.log(coffee);
  }
}

class ProBarista {
  constructor(private machine: CommercialCoffeeMaker) {}
  makeCoffee() {
    const coffee = this.machine.makeCoffee(2);
    console.log(coffee);
    this.machine.fillCoffeeBeans(45);
    this.machine.clean();
  }
}

const maker: CoffeeMachine = CoffeeMachine.makeMachine(32);
const amateur = new AmateurUser(maker);
const pro = new ProBarista(maker);

amateur.makeCoffee();
pro.makeCoffee();
```

## Polymorphism (다향성)

- 하나의 클래스를 통해 같은 기능이 조금씩 다르게 적용되도록 할 수 있다.
- 자동차의 색깔을 바꾼다던지 종류를 바꾼다던지 하는식

```ts
type CoffeeCup = {
  shots: number;
  hasMilk: boolean;
  hasSugar?: boolean;
};

interface CoffeeMaker {
  makeCoffee(shots: number): CoffeeCup;
} //계약서, 명세서 같은 녀석

class CoffeeMachine implements CoffeeMaker {
  private static BEANS_GRAMM_PER_SHOT: number = 8; // class level 맴버 변수뿐 아니라 함수에서도 호출 가능
  private coffeeBeans: number = 0; // instance level 맴버 변수

  constructor(beans: number) {
    this.coffeeBeans = beans;
  }

  static makeMachine(coffeeBeans: number): CoffeeMachine {
    return new CoffeeMachine(coffeeBeans);
  }

  fillCoffeeBeans(beans: number) {
    if (beans < 0) {
      throw new Error("value for beans should be greater than 0");
    }
    this.coffeeBeans += beans;
  }

  clean() {
    console.log("cleaning the machine...");
  }

  private grindBeans(shots: number) {
    console.log(`grinding beans for ${shots}`);
    if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
      throw new Error("Not enough coffee beans!");
    }
    this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
  }

  private preheat(): void {
    console.log("heating up~~~");
  }

  private extract(shots: number): CoffeeCup {
    console.log(`Pulling ${shots} shots....`);
    return {
      shots,
      hasMilk: false,
    };
  }

  makeCoffee(shots: number): CoffeeCup {
    this.grindBeans(shots);
    this.preheat();
    return this.extract(shots);
  }
}

class CaffeLatteMachine extends CoffeeMachine {
  constructor(beans: number, public readonly serialNumber: string) {
    super(beans);
  }

  private steamMilk(): void {
    console.log("steaming some milk");
  }

  makeCoffee(shots: number): CoffeeCup {
    const coffee = super.makeCoffee(shots);
    this.steamMilk();
    return {
      ...coffee,
      hasMilk: true,
    };
  }
}

class SweetCoffeeMaker extends CoffeeMachine {
  makeCoffee(shots: number): CoffeeCup {
    const coffee = super.makeCoffee(shots);
    return {
      ...coffee,
      hasSugar: true,
    };
  }
}

const machines: CoffeeMaker[] = [
  new CoffeeMachine(16),
  new CaffeLatteMachine(16, "SSSSSS"),
  new SweetCoffeeMaker(15),
];

machines.forEach((machine) => {
  console.log("===============================");
  console.log(machine.makeCoffee(1));
});
```
