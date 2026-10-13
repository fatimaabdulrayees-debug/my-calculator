
const display = document.getElementById("display");
let expression = "";

function updateDisplay() {
    display.value = expression || "0";
}

function appendValue(value) {
    expression += value;
    updateDisplay();
}

function clearDisplay() {
    expression = "";
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        if (!expression) return;

        // Allow only basic arithmetic characters
        if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
            throw new Error("Invalid input");
        }

        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        expression = String(
            Math.round((result + Number.EPSILON) * 1e10) / 1e10
        );

        updateDisplay();
    } catch {
        display.value = "Error";
        expression = "";
    }
}
