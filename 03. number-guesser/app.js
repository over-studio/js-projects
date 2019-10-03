/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = 2,
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
guessBtn.addEventListener('click', function(e) {
    let guess = parseInt(guessInput.value);

    // Validate
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        return;
    }

    // Check if won
    if(guess === winningNum) {
        // Disable input
        guessInput.disabled = true;
        // Change border color
        guessInput.style.borderColor = 'green';
        // Set message
        setMessage(`${winningNum} is correct, YOU WIN!`, 'green');
    } else {
        // Test if we can play again
        if(guessesLeft > 1) {
            // Decrement guesses left
            guessesLeft--;
            // Game over - try again
            gameOver(false,
                     'red',
                     'black',
                     `Wrong answer, try again! ${guessesLeft} guess left`,
                     function() { mesaage.style.display = 'none'; }
                    );
        } else {
            // Game over - lost
            gameOver(true,
                     'red',
                     'red',
                     `Game Over, you lost. The correct number was ${winningNum}.`
                    );
        }
    }


});

// Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

// Game over
function gameOver(inputStatus, color, borderColor, msg, callBack) {
    // Enable/Disable input
    guessInput.disabled = inputStatus;
    // Change border color
    guessInput.style.borderColor = borderColor;
    // Set message
    setMessage(msg, color);
    // CallBack function
    setTimeout(callBack, 3000);
}