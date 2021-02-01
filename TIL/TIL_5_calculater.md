계산기 구현하기 나만에 계산기를 구현하자

[jeonghun-project/Learning-things](https://github.com/jeonghun-project/Learning-things/tree/main/javascript/calculator)

## Step 1

계산기 레이아웃 HTML, CSS 구성하기

내부 로직 Javascript 구현하기 

## Step 2

간단한 한 자릿수 사칙 연산 한 자릿수 계산기 만들기

## Step 3

한 자릿수 초과하는 수 입력 받기

연산자 입력 후 두 번째 숫자 입력 받기

계산기에 추가적인 기능 구현 소수점 수 표현 소수점 연산 등

## Step 4

완벽한 계산기의 기능 구현 완벽한 계산기를 위하여 몇 가지의 예외사항 추가

- 소숫점의 연속된 클릭
- 연산자의 연속된 클릭
- 결과값 출력 버튼 연속 클릭
- 연산자 클릭 이후 소숫점 버튼 클릭시
- 연산자 클릭 후 이후값 없이 출력 버튼 클릭시
- 연속된 계산시 결과값 임시처리

모든 기능들이 복합적으로 잘 작동하는 것을 확인하여 제출하여 완성

---

## 과제 완료 후 느낀점

1. 처음부터 **구조에 대한 이해를 통해 변수를 어떻게 이용하여 구현할 것** 인지에 대하여 충분히 고민하여 효율적인 방안을 고민하는 것이 이후에 있을 작업시간을 효과적으로 줄일 수 있다. 
2. 입력 받는 데이터에 대한 관리를 메모리에 어떻게 할 것인지에 대한 고민을 더 해보면 좋을 것이다.
3. 보기 좋은 코드를 위하여 조금 더 리펙토링 작업이 없도록 깔끔하게 작업하자.
4. 변수를 최소한으로 할당하여 작업을 효율적으로 해결하자
5. 변수의 쓰임을 정확히 정의 하지 못하여 코드를 해석하는 일이 본인 이외는 거의 힘들 것으로 보인다.ㅠㅠ

```jsx
const display = document.querySelector('.calculator__display--intermediate');
let firstNum, intermediateOperator, previousKey, previousNum;

buttons.addEventListener('click', function (event) {
  const target = event.target; 
  const action = target.classList[0]; 
  const buttonContent = target.textContent; 

  if (target.matches('button')) {
    if (action === 'number') {
      if((display.textContent === '0' || firstNum === undefined) && display.textContent !== '0.') {
        firstNum = parseInt(buttonContent);
        display.textContent = firstNum;
      } else if((Number.isInteger(firstNum) === false && firstNum > 0) || display.textContent === '0.') {
        firstNum += buttonContent;
        display.textContent = firstNum;
      } else if(firstNum > 0 ) {
        firstNum *= 10;
        firstNum += parseInt(buttonContent);
        display.textContent = firstNum;
      }
    }
    if (action === 'operator') {
      if (firstNum === undefined) {
        intermediateOperator = buttonContent;
        display.textContent = previousNum;
      } else if(previousKey === undefined && previousNum !== undefined) {
        previousNum = calculate(previousNum, intermediateOperator, firstNum);
        display.textContent = previousNum;
        intermediateOperator = buttonContent;
        firstNum = undefined;
      }
      else if(previousKey === undefined){
        intermediateOperator = buttonContent;
        previousNum = firstNum; 
        display.textContent = previousNum;
        firstNum = undefined;
      } else if (previousKey !== undefined) {
        intermediateOperator = buttonContent;
        previousNum = previousKey; 
        firstNum = undefined;
      } else if (intermediateOperator !== undefined) {
        intermediateOperator = buttonContent;
      } 
    }
    if (action === 'decimal') {
      if(display.textContent === '0') {
        display.textContent = '0' + '.'
        firstNum =display.textContent;
      } else if (firstNum > 0 && Number.isInteger(firstNum) === true){
        firstNum = String(firstNum) + '.';
        display.textContent = firstNum;
      } else if (firstNum === undefined) {
        firstNum ='0.'
        display.textContent = firstNum;
      }
    }
    if (action === 'clear') {
      previousKey = undefined;
      display.textContent = '0';
      firstNum = 0;
      previousNum = undefined;
      intermediateOperator = undefined;
    }
    if (action === 'calculate') {
      if(previousNum !== undefined) {
        if (firstNum === undefined) {
          previousKey = calculate(previousNum, intermediateOperator, previousNum)
        } else {
          previousKey = calculate(previousNum, intermediateOperator, firstNum);
        }
        display.textContent = previousKey;
        previousNum = undefined;
      } else if (intermediateOperator !== undefined) {
        previousKey = calculate(previousKey, intermediateOperator, firstNum)
        display.textContent = previousKey;
      }
      

    }
  }

});
```