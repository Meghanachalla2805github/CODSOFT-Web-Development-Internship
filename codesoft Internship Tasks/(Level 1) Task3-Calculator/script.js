// script.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));

    let currentInput = '0';
    let previousInput = '';
    let operator = null;

    const updateDisplay = () => {
        display.innerText = currentInput;
    };

    const handleNumber = (value) => {
        if (currentInput === '0' || currentInput === '') {
            currentInput = value;
        } else {
            currentInput += value;
        }
    };

    const handleOperator = (value) => {
        if (operator && previousInput !== '' && currentInput !== '') {
            currentInput = String(calculate(previousInput, currentInput, operator));
        }
        operator = value;
        previousInput = currentInput;
        currentInput = '';
    };

    const calculate = (a, b, operator) => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);

        switch (operator) {
            case '+':
                return numA + numB;
            case '-':
                return numA - numB;
            case '*':
                return numA * numB;
            case '/':
                return numA / numB;
            default:
                return b;
        }
    };

    const handleEqual = () => {
        if (operator && previousInput !== '' && currentInput !== '') {
            currentInput = String(calculate(previousInput, currentInput, operator));
            operator = null;
            previousInput = '';
        }
    };

    const handleClear = () => {
        currentInput = '0';
        previousInput = '';
        operator = null;
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (!isNaN(value) || value === '.') {
                handleNumber(value);
            } else if (['+', '-', '*', '/'].includes(value)) {
                handleOperator(value);
            } else if (value === '=') {
                handleEqual();
            } else if (value === 'C') {
                handleClear();
            }

            updateDisplay();
        });
    });

    updateDisplay();
});
