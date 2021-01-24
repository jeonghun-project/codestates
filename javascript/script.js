const calculator = document.querySelector('.calculator'); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector('.calculator__buttons'); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

const firstOperend = document.querySelector('.calculator__operend--left'); // calculator__operend--left 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const operator = document.querySelector('.calculator__operator'); // calculator__operator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const secondOperend = document.querySelector('.calculator__operend--right'); // calculator__operend--right 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const calculatedResult = document.querySelector('.calculator__result'); // calculator__result 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

function calculate(n1, operator, n2) {
  let result = 0;
  // TODO : n1과 n2를 operator에 따라 계산하는 함수를 만드세요.
  // ex) 입력값이 n1 : '1', operator : '+', n2 : '2' 인 경우, 3이 리턴됩니다.
  if(operator === '+') {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === '-') {
    result =  parseFloat(n1) - parseFloat(n2);
  } else if (operator === '/') {
    result =  parseFloat(n1) / parseFloat(n2);
  } else if (operator === '*') {
    result =  parseFloat(n1) * parseFloat(n2);
  }
  return String(result);
} // 연산이 끝난 값 
  

buttons.addEventListener('click', function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드(Line 19 - 21)는 수정하지 마세요.

  if (target.matches('button')) {
    // TODO : 계산기가 작동할 수 있도록 아래 코드를 수정하세요. 작성되어 있는 조건문과 console.log를 활용하시면 쉽게 문제를 풀 수 있습니다.
    // 클릭된 HTML 엘리먼트가 button이면
    if (action === 'number') {
      // 그리고 버튼의 클레스가 number이면
      // 아래 코드가 작동됩니다.
      if(parseInt(firstOperend.textContent) === 0) {
        firstOperend.textContent = buttonContent;
      }else if(parseInt(secondOperend.textContent) === 0 ) {
        secondOperend.textContent = buttonContent;
      }
      console.log('숫자 ' + buttonContent + ' 버튼');
    }

    if (action === 'operator') {
        operator.textContent = buttonContent;
      console.log('연산자 ' + buttonContent + ' 버튼');
    }

    if (action === 'decimal') {
      // console.log('소수점 버튼');
    }

    if (action === 'clear') {
      firstOperend.textContent = 0;
      secondOperend.textContent = 0;
      operator.textContent = '+';
      calculatedResult.textContent = 0;
      console.log('초기화 버튼');
    }
    if (action === 'calculate') {
      calculatedResult.textContent = calculate(firstOperend.textContent, operator.textContent, secondOperend.textContent);
      console.log('계산 버튼');
    }
  }
});


// ! intermediate, advanced test를 위한 코드입니다. 도전하신다면 주석을 해제하세요.
const display = document.querySelector('.calculator__display--intermediate'); // calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
let firstNum, intermediateOperator, previousKey, previousNum;

buttons.addEventListener('click', function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.
  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드는 수정하지 마세요.

  // ! 여기서부터 intermetiate & advanced 과제룰 풀어주세요.
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
