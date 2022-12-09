
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-del]');
const numbersButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const prevOperand = document.querySelector('.previous');
const currentOperand = document.querySelector('.current');

class Calculator {
    constructor(currentOp, prevOp) {
        this.currentOp = currentOp;
        this.prevOp = prevOp;
        this.clear();
    }

    clear() {
        this.currentOp = '';
        this.prevOp = '';
        this.operator = undefined;
    }

    appendNumber(number) {
        if (number === '.' && this.currentOp.includes('.')) {
            console.log('if')
            return;
        }
        console.log('number', number.toString())
        this.currentOp = this.currentOp + number.toString();
    }

    delete() {
        this.currentOp = this.currentOp.toString().slice(0, -1);
    }

    compute() {
        let computeResult;
        let prev = parseFloat(this.prevOp);
        let current = parseFloat(this.currentOp);
        if (!prev || !current) {
            return;
        }

        switch (this.operator) {
            case '+':
                computeResult = prev + current;
               break;
            case '-':
                computeResult = prev - current;
                break;
            case '÷':
                computeResult = prev / current;
                break;
            case '*':
                computeResult = prev * current;
                break;
            default:
                return;
        }

        this.currentOp = computeResult;
        this.operator = undefined;
        this.prevOp = '';

    }

    selectOperator(operator) {
        if (!this.currentOp) {
            return;
        }
        if (this.prevOp) {
            this.compute();
        }
        this.operator = operator;
        this.prevOp = this.currentOp;
        this.currentOp = '';
    }

    getDisplayedNumber(number) {
        let integerDisplayed;
        let numberToString = number.toString();
        console.log('numberToString', numberToString);
        let integerNumber = parseFloat(numberToString.split('.')[0]);
        let decimalPart = numberToString.split('.')[1];

        if (isNaN(integerNumber)) {
            integerDisplayed = '';
        } else {
            integerDisplayed = integerNumber.toLocaleString('en')
        }

        if (decimalPart) {
            return `${integerDisplayed}.${decimalPart}`
        } else {
            return integerDisplayed;
        }
    }

    updateDisplay() {
        currentOperand.innerText = this.getDisplayedNumber(this.currentOp);
        if (this.operator) {
            prevOperand.innerText = `${this.getDisplayedNumber(this.prevOp)} ${this.operator}`;
        } else {
            prevOperand.innerText = '';
        }
    }
};

const calculator = new Calculator(currentOperand, prevOperand);

numbersButtons.forEach((number) => {
    number.addEventListener('click', (evt) => {
        console.log('clicl')
        evt.preventDefault();
        calculator.appendNumber(number.innerText);
        calculator.updateDisplay()
    })
})

operatorButtons.forEach((operator) => {
    operator.addEventListener('click', (evt) => {
        evt.preventDefault();
        calculator.selectOperator(operator.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    calculator.compute();
    calculator.updateDisplay();
})
allClearButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    calculator.delete();
    calculator.updateDisplay();
})