// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listenenrs to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "submit"){
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter"){
             checkAnswer();
        }
    })                              // Listens for "Enter" key, if pressed launches "checkAnswer()"
    runGame("addition");
})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 * (this comment will appear when hovering over function name anywhere in code)
 */
function runGame (gameType) {

    document.getElementById("answer-box").value = "";   // Clears "answer-box" from previous answer
    document.getElementById("answer-box").focus();      // Places cursor in "answer-box"

    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1,num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1,num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;   // Stops game from running and print in console for debugging
    }
}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array.
 */
function checkAnswer () {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];     // Sets isCorrect as "true" or "false"

    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Awwww.... You answered ${userAnswer}. The correct answer was: ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);       // Runs the next game, calculatedAnswer[1] = current gamemode (addition/subtract... )
}

/**
 * Gets the operands and the operator directly from the DOM,
 * and returns the correct answer.
 */
function calculateCorrectAnswer () {
    let operand1 = parseInt(document.getElementById("operand1").innerText);     // Makes sure returned number is integer and not string
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else {
        alert (`Unimplemented operator: ${operator}`);
        throw `Unimplemented operator: ${operator}. Aborting!`;
    }
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore () {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer () {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion (operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion (operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
                                                    //if op1 > op2 return op1, otherwise return op2
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
                                                    //if op1 > op2 return op2, otherwise return op1
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion (operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}