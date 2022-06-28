let firstNum = '0',
  secondNum = '',
  operator,
  currentNum = 'first',
  temp;

const add = function (a, b) {
  return parseFloat(a) + parseFloat(b);
};

const subtract = function (a, b) {
  return parseFloat(a) - parseFloat(b);
};

const multiply = function (a, b) {
  return parseFloat(a) * parseFloat(b);
};

const divide = function (a, b) {
  return parseFloat(a) / parseFloat(b);
};

function operate(a, b, op) {
  let answer;
  if (op === '') {
    return 0;
  }
  if (secondNum === '') {
    b = a;
  }
  if (op === '+') {
    answer = add(a, b);
  } else if (op === '-') {
    answer = subtract(a, b);
  } else if (op === '*') {
    answer = multiply(a, b);
  } else if (op === '/') {
    if (b === '0') {
      secondNum = '';
      removePressed();
      operator = '';
      display.textContent = '🤯';
      currentNum = 'first';
      return 0;
    } else {
      answer = divide(a, b);
    }
  }
  if (answer > 999999999999 || answer < -999999999999) {
    firstNum = '0';
    secondNum = '';
    removePressed();
    display.textContent = 'Math Error';
    currentNum = 'first';
    return 0;
  }
  if (answer >= +'1e6' || answer < 0.000001) {
    if (answer.toString().includes('e')) {
      firstNum = answer.toPrecision(2).toString();
    } else firstNum = answer.toString();
  } else firstNum = roundAccurately(answer, 15).toString();
  temp = true;
  secondNum = '';
  removePressed();
  operator = '';

  firstNum.includes('-')
    ? (display.textContent = +firstNum.slice(0, 13))
    : (display.textContent = +firstNum.slice(0, 12));
  currentNum = 'first';
}

const addCharToString = function (char) {
  if (currentNum === 'first') {
    if (temp === true) {
      firstNum = char;
      temp = false;
      display.textContent = firstNum;
      return;
    }
    if (firstNum.startsWith('-')) {
      if (firstNum === '-0') {
        firstNum = '-' + char;
        display.textContent = firstNum;
      } else if (firstNum.length < 13) {
        firstNum = firstNum.concat(char);
        display.textContent = firstNum;
      }
    } else {
      if (firstNum === '0') {
        firstNum = char;
        display.textContent = firstNum;
      } else if (firstNum.length < 12) {
        firstNum = firstNum.concat(char);
        display.textContent = firstNum;
      }
    }
  } else {
    //currentNum === 'second'
    if (secondNum.startsWith('-')) {
      if (secondNum === '-0') {
        secondNum = '-' + char;
        display.textContent = secondNum;
      } else if (secondNum.length < 13) {
        secondNum = secondNum.concat(char);
        display.textContent = secondNum;
      }
    } else {
      if (secondNum === '0') {
        secondNum = char;
        display.textContent = secondNum;
      } else if (secondNum.length < 12) {
        secondNum = secondNum.concat(char);
        display.textContent = secondNum;
      }
    }
  }
};

const changeOperator = function (char) {
  currentNum = 'second';
  removePressed();
  switch (char) {
    case '+':
      operator = '+';
      btnPlus.classList.remove('buttoncolored');
      btnPlus.classList.add('pressed');
      break;
    case '-':
      operator = '-';
      btnMinus.classList.remove('buttoncolored');
      btnMinus.classList.add('pressed');
      break;
    case '/':
      operator = '/';
      btnDivide.classList.remove('buttoncolored');
      btnDivide.classList.add('pressed');
      break;
    case '*':
      operator = '*';
      btnMultiply.classList.remove('buttoncolored');
      btnMultiply.classList.add('pressed');
      break;
    default:
      operate = '';
  }
};

function removePressed() {
  btnMultiply.classList.remove('pressed');
  btnDivide.classList.remove('pressed');
  btnPlus.classList.remove('pressed');
  btnMinus.classList.remove('pressed');
  btnDivide.classList.add('buttoncolored');
  btnPlus.classList.add('buttoncolored');
  btnMinus.classList.add('buttoncolored');
  btnMultiply.classList.add('buttoncolored');
}

function clear() {
  removePressed();
  firstNum = '0';
  secondNum = '';
  currentNum = 'first';
  operator = '';
  display.textContent = firstNum;
}

function backspace() {
  let a;
  if (firstNum.startsWith('-') || secondNum.startsWith('-')) {
    a = 1;
  } else {
    a = 0;
  }

  if (temp === true) {
    temp = false;
    firstNum = '0';
    display.textContent = firstNum;
  }
  if (currentNum === 'first') {
    firstNum < 0
      ? (firstNum = firstNum.slice(0, 13))
      : (firstNum = firstNum.slice(0, 12)); //changes exact number to number with 12sf

    if (firstNum.length !== 1 + a && firstNum.length !== 0 + a) {
      firstNum = firstNum.slice(0, -1);
      display.textContent = firstNum;
    } else if (firstNum.length === 1 + a) {
      firstNum.startsWith('-') ? (firstNum = '-0') : (firstNum = '0');
      display.textContent = firstNum;
    } else if (firstNum.length === 0 + a) {
      return 0;
    }
  } else if (currentNum === 'second') {
    secondNum < 0
      ? (secondNum = secondNum.slice(0, 13))
      : (secondNum = secondNum.slice(0, 12));

    if (secondNum.length === 0) {
      // secondNum = firstNum;
      // (secondNum < 0) ? secondNum = secondNum.slice(0,13) : secondNum = secondNum.slice(0,12);
      // secondNum = secondNum.slice(0,-1);
      secondNum = '0';
      display.textContent = secondNum;
    } else if (secondNum.length === 1 + a) {
      secondNum.startsWith('-') ? (secondNum = '-0') : (secondNum = '0');
      display.textContent = secondNum;
    } else if (secondNum.length !== 1 + a && secondNum.length !== 0 + a) {
      secondNum = secondNum.slice(0, -1);
      display.textContent = secondNum;
    }
  }
}

function negative() {
  if (currentNum === 'first') {
    if (firstNum.startsWith('-')) {
      firstNum = firstNum.slice(1);
      display.textContent = firstNum.slice(0, 12);
    } else {
      firstNum = '-'.concat(firstNum);
      display.textContent = firstNum.slice(0, 13);
    }
  } else if (currentNum === 'second') {
    if (secondNum.startsWith('-')) {
      secondNum = secondNum.slice(1);
      display.textContent = secondNum.slice(0, 12);
    } else if (secondNum === '') {
      secondNum = '-0';
      display.textContent = secondNum;
    } else {
      secondNum = '-'.concat(secondNum);
      display.textContent = secondNum.slice(0, 13);
    }
  }
}

function decimal() {
  if (currentNum === 'first') {
    if (firstNum.includes('.')) {
      return 0;
    } else {
      firstNum = firstNum.concat('.');
      display.textContent = firstNum;
    }
  } else {
    if (secondNum.includes('.')) {
      return 0;
    } else if (secondNum === '') {
      secondNum = '0.';
      display.textContent = secondNum;
    } else {
      secondNum = secondNum.concat('.');
      display.textContent = secondNum;
    }
  }
}

function roundAccurately(num, places) {
  return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}
//DOM
const display = document.querySelector('.display');

const btn1 = document.querySelector('#one');
btn1.addEventListener('click', () => addCharToString('1'));

const btn2 = document.querySelector('#two');
btn2.addEventListener('click', () => addCharToString('2'));

const btn3 = document.querySelector('#three');
btn3.addEventListener('click', () => addCharToString('3'));

const btn4 = document.querySelector('#four');
btn4.addEventListener('click', () => addCharToString('4'));

const btn5 = document.querySelector('#five');
btn5.addEventListener('click', () => addCharToString('5'));

const btn6 = document.querySelector('#six');
btn6.addEventListener('click', () => addCharToString('6'));

const btn7 = document.querySelector('#seven');
btn7.addEventListener('click', () => addCharToString('7'));

const btn8 = document.querySelector('#eight');
btn8.addEventListener('click', () => addCharToString('8'));

const btn9 = document.querySelector('#nine');
btn9.addEventListener('click', () => addCharToString('9'));

const btn0 = document.querySelector('#zero');
btn0.addEventListener('click', () => addCharToString('0'));

const btnPlus = document.querySelector('#add');
const btnMinus = document.querySelector('#subtract');
const btnMultiply = document.querySelector('#multiply');
const btnDivide = document.querySelector('#divide');

btnPlus.addEventListener('click', () => changeOperator('+'));
btnMinus.addEventListener('click', () => changeOperator('-'));
btnMultiply.addEventListener('click', () => changeOperator('*'));
btnDivide.addEventListener('click', () => changeOperator('/'));

const btnEqual = document.querySelector('#equal');
btnEqual.addEventListener('click', () =>
  operate(firstNum, secondNum, operator)
);

const btnClear = document.querySelector('#clear');
btnClear.addEventListener('click', () => clear());

const btnDel = document.querySelector('#delete');
btnDel.addEventListener('click', () => backspace());

const btnNeg = document.querySelector('#negative');
btnNeg.addEventListener('click', () => negative());

const btnDecimal = document.querySelector('#decimal');
btnDecimal.addEventListener('click', () => decimal());

window.addEventListener('keydown', (e) => {
  if (e.key === '1') {
    addCharToString('1');
  } else if (e.key === '2') {
    addCharToString('2');
  } else if (e.key === '3') {
    addCharToString('3');
  } else if (e.key === '4') {
    addCharToString('4');
  } else if (e.key === '5') {
    addCharToString('5');
  } else if (e.key === '6') {
    addCharToString('6');
  } else if (e.key === '7') {
    addCharToString('7');
  } else if (e.key === '8') {
    addCharToString('8');
  } else if (e.key === '9') {
    addCharToString('9');
  } else if (e.key === '0') {
    addCharToString('0');
  } else if (e.key === '*' || e.key === 'x') {
    changeOperator('*');
  } else if (e.key === '+') {
    changeOperator('+');
  } else if (e.key === '-') {
    changeOperator('-');
  } else if (e.key === '/') {
    changeOperator('/');
  } else if (e.key === '=') {
    operate(firstNum, secondNum, operator);
  } else if (e.key === 'Escape') {
    clear();
  } else if (e.key === 'Backspace') {
    backspace();
  } else if (e.key === '.') {
    decimal();
  }
});

//main

display.textContent = firstNum;
