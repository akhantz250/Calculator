let firstNum='0', secondNum='', operator, currentNum = 'first';

const add = function(a,b){
    return parseFloat(a)+parseFloat(b);
}

const subtract = function(a,b){
    return parseFloat(a) - parseFloat(b);
}

const multiply = function(a,b){
    return parseFloat(a) * parseFloat(b);
}

const divide =function(a,b){
    return parseFloat(a) / parseFloat(b);
}

function operate(a,b, op){
    let answer;
    if(op === ''){ 
        return 0;
    }
    if(secondNum === ''){ 
        b = a;
    }
    if(op === '+'){
        answer = add(a,b);
    }else if(op === '-'){
        answer = subtract(a,b);
    }else if(op === '*'){
        answer = multiply(a,b);
    }else if(op === '/'){
        if(b === '0'){
            secondNum = '';
            removePressed();
            operator = '';
            display.textContent = '🤯';
            currentNum = 'first';
            return 0;
        }else{
        answer = divide(a,b);
        }
    }
    if (answer > 999999999999 || answer < -999999999999){
        firstNum = '0';
        secondNum = '';
        removePressed();
        display.textContent = 'Math Error';
        currentNum = 'first';
        return 0;
    }
    firstNum = answer.toString();
    secondNum = '';
    removePressed();
    operator = '';
    (answer < 0) ? display.textContent = firstNum.slice(0,13) : display.textContent = firstNum.slice(0,12);
    currentNum = 'first';
}

const addCharToString = function(char){
    if(currentNum === 'first'){
        if(firstNum.startsWith('-')){
            if(firstNum === '-0'){
                firstNum = '-' + char;
                display.textContent = firstNum;
            }else if(firstNum.length < 13){
                firstNum = firstNum.concat(char);
                display.textContent = firstNum;
            }
        }else{
            if(firstNum === '0'){
                firstNum = char;
                display.textContent = firstNum;
            }else if(firstNum.length < 12){
                firstNum = firstNum.concat(char);
                display.textContent = firstNum;
            }
        }
    }else{ //currentNum === 'second'
        if(secondNum.startsWith('-')){
            if(secondNum === '-0'){
                secondNum = '-' + char;
                display.textContent = secondNum;
            }else if(secondNum.length < 13){
                secondNum = secondNum.concat(char);
                display.textContent = secondNum;
            }
        }else{
            if(secondNum === '0'){
                secondNum = char;
                display.textContent = secondNum;
            }else if(secondNum.length < 12){
                secondNum = secondNum.concat(char);
                display.textContent = secondNum;
            }
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

function backspace(){
    let a;
    if(firstNum.startsWith('-') || secondNum.startsWith('-')){
        a =1;
    }else{a=0;}

    if(currentNum === 'first'){
        
        (firstNum < 0) ? firstNum = firstNum.slice(0,13) : firstNum = firstNum.slice(0,12); //changes exact number to number with 12sf

        if(firstNum.length !== 1+a && firstNum.length !== 0+a){
            firstNum = firstNum.slice(0,-1);
            display.textContent = firstNum;
        }else if(firstNum.length === 1+a){
            firstNum.startsWith('-')? firstNum = '-0':firstNum = '0';
            display.textContent = firstNum;
        }else if(firstNum.length === 0+a){
            return 0;
        }
    }else if(currentNum === 'second'){

        (secondNum < 0) ? secondNum = secondNum.slice(0,13) : secondNum = secondNum.slice(0,12);

        if(secondNum.length === 0){
            secondNum = firstNum;
            (secondNum < 0) ? secondNum = secondNum.slice(0,13) : secondNum = secondNum.slice(0,12);
            secondNum = secondNum.slice(0,-1);
            display.textContent = secondNum;
        }else if(secondNum.length === 1+a){
            secondNum.startsWith('-')? secondNum ='-0': secondNum ='0';
            display.textContent = secondNum;
        }else if(secondNum.length !== 1+a && secondNum.length !== 0+a){
            secondNum = secondNum.slice(0,-1);
            display.textContent = secondNum;
        }
    }
}

function negative(){
    if(currentNum === 'first'){
        if(firstNum.startsWith('-')){
            firstNum = firstNum.slice(1);
            display.textContent = firstNum.slice(0,12);
        }else{
            firstNum = '-'.concat(firstNum);
            display.textContent = firstNum.slice(0,13);
        }
        
    }else if(currentNum === 'second'){
        if(secondNum.startsWith('-')){
            secondNum = secondNum.slice(1);
            display.textContent = secondNum.slice(0,13);
        }else if(secondNum === ''){
            secondNum ='-0';
        }else{
            secondNum = '-'.concat(secondNum);
            display.textContent = secondNum.slice(0,13);
        }
    }
}

//DOM
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
 btnEqual.addEventListener('click', () => operate(firstNum,secondNum,operator));

const btnClear = document.querySelector('#clear');
btnClear.addEventListener('click', () => clear());

const btnDel = document.querySelector('#delete');
btnDel.addEventListener('click', () => backspace());

const btnNeg = document.querySelector('#negative');
btnNeg.addEventListener('click', () => negative())

//main

display.textContent =firstNum;