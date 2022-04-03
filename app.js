let firstNum='0', secondNum='', operator, currentNum = 'first';

const add = function(a,b){
    return a+b;
}

const subtract = function(a,b){
    return a-b;
}

const multiply = function(a,b){
    return a*b;
}

const divide =function(a,b){
    return a/b;
}

function operate(a,b, operation){
    const answer = operation(parseFloat(a),parseFloat(b));
    firstNum = answer.toString();
    b = '';
    return answer;
}

const addCharToString = function(char){
    if(currentNum === 'first'){
        if(firstNum === '0'){
            firstNum ='1';
            display.textContent = firstNum;
        }else if(firstNum.length < 12){
            firstNum = firstNum.concat(char);
            display.textContent = firstNum;
        }
    }else{
        if(secondNum.length < 12){
            secondNum = secondNum.concat(char);
            display.textContent = secondNum;
        }
    } 
}


const changeOperator = function(char){
    currentNum='second';
    removePressed();
    switch(char){
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
            operate ='';
    }
}

function removePressed(){
    btnMultiply.classList.remove('pressed');
    btnDivide.classList.remove('pressed');
    btnPlus.classList.remove('pressed');
    btnMinus.classList.remove('pressed');
    btnDivide.classList.add('buttoncolored');
    btnPlus.classList.add('buttoncolored');
    btnMinus.classList.add('buttoncolored');
    btnMultiply.classList.add('buttoncolored');
}

function clear(){
    removePressed();
    firstNum='0';
    secondNum = '';
    currentNum = 'first'
    operator = '';
    display.textContent = firstNum;
}

const display = document.querySelector('.display');

const btn1 = document.querySelector('#one');
btn1.addEventListener('click',() => addCharToString('1'));

const btn2 = document.querySelector('#two');
btn2.addEventListener('click',() => addCharToString('2'));

const btn3 = document.querySelector('#three');
btn3.addEventListener('click',() => addCharToString('3'));

const btn4 = document.querySelector('#four');
btn4.addEventListener('click',() => addCharToString('4'));

const btn5 = document.querySelector('#five');
btn5.addEventListener('click',() => addCharToString('5'));

const btn6 = document.querySelector('#six');
btn6.addEventListener('click',() => addCharToString('6'));

const btn7 = document.querySelector('#seven');
btn7.addEventListener('click',() => addCharToString('7'));

const btn8 = document.querySelector('#eight');
btn8.addEventListener('click',() => addCharToString('8'));

const btn9 = document.querySelector('#nine');
btn9.addEventListener('click',() => addCharToString('9'));

const btn0 = document.querySelector('#zero');
btn0.addEventListener('click',() => addCharToString('0'));

const btnPlus = document.querySelector('#add');
const btnMinus = document.querySelector('#subtract');
const btnMultiply = document.querySelector('#multiply');
const btnDivide = document.querySelector('#divide');

btnPlus.addEventListener('click',() => changeOperator('+'));
btnMinus.addEventListener('click',() => changeOperator('-'));
btnMultiply.addEventListener('click',() => changeOperator('*'));
btnDivide.addEventListener('click',() => changeOperator('/'));

const btnEqual = document.querySelector('#equal');
// btnEqual.addEventListener('click', () =>{
//     operate(first,second,operator)

// })

const btnClear = document.querySelector('#clear');
btnClear.addEventListener('click', () => clear());