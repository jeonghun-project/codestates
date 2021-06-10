# Composition

깊은 상속관계를 피하는 방법으로 Composition이 있습니다.

`Favor Composition over inheritance`

아래 코드는 커피머신이라는 객체를 상속받아서 우유커피머신, 설탕커피머신 등등을 상속을 통해 구현하였지만

우유와 설탕이 동시에 들어간 커피를 만드는 커피머신을 만들기 위해서는 수직적인 상속을 이어나갈 수가 없는 문제를 봉착하게되고,

이러한 문제를 해결해줄 Class를 만들기 위해 `Composition`을 통하면 가능하다.

```ts
{
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

    constructor(
      beans: number,
      private milk: MilkFrother,
      private sugar: SugerProvider
    ) {
      this.coffeeBeans = beans;
    }

    ...

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      const coffee = this.extract(shots);
      const sugarAdded = this.sugar.addSugar(coffee);
      return this.milk.makeMilk(sugarAdded);
    }
  }

  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  interface SugerProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  // 싸구려 우유 거품기
  class CheapMilkSteamer implements MilkFrother {
    private steamMilk() {
      console.log("steaming some milk");
      return true;
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      const steam = this.steamMilk();
      return {
        ...cup,
        hasMilk: steam,
      };
    }
  }

  //고급 우유 제조기
  class FancyMilkSteamer implements MilkFrother {
    private steamMilk() {
      console.log("steaming some milk");
      return true;
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      const steam = this.steamMilk();
      return {
        ...cup,
        hasMilk: steam,
      };
    }
  }

  class ColdMilkSteamer implements MilkFrother {
    private steamMilk() {
      console.log("steaming some milk");
      return true;
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      const steam = this.steamMilk();
      return {
        ...cup,
        hasMilk: steam,
      };
    }
  }
  class NoMilk implements MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  // 설탕 제조기
  class CandySugarMixer implements SugerProvider {
    private getSugar() {
      console.log("Getting some sugar from candy");
      return true;
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }

  class SugarMixer implements SugerProvider {
    private getSugar() {
      console.log("Getting some sugar from jar!!!!");
      return true;
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }

  class NoSugar implements SugerProvider {
    addSugar(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  //
  const cheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();
  const noMilk = new NoMilk();

  const candySugar = new CandySugarMixer();
  const sugar = new SugarMixer();
  const noSugar = new NoSugar();

  const americanoMachine = new CoffeeMachine(12, noMilk, noSugar);
  const sugarCoffeeMachine = new CoffeeMachine(12, noMilk, sugar);
  const expansiveCoffeeMachine = new CoffeeMachine(12, coldMilkMaker, sugar);
}
```
