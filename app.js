
// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    //console.log('clicked via delegation')
    window.location.reload();
  }
});


// Listen for guess
guessBtn.addEventListener('click', function () {
  console.log('guess button clicked')
  let guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check winning num
  if (guess === winningNum) {

    // Game over, win
    gameOver(true, `${winningNum} is correct, YOU WIN!`);

  } else {
    guessesLeft -= 1;

    if (guessesLeft === 0) {

      // Game over, lost
      gameOver(false, `Game over, You lost. The correct number was ${winningNum}`);

    } else {

      //Game continues - answer wrong
      guessInput.style.borderColor = 'red';
      guessesLeft.value = '';
      setMessage(`${guess} is not correct. ${guessesLeft} guesses left`, 'red');
    }
  }

});

// Game over 
function gameOver(won, msg) {
  guessInput.disabled = true;

  // set color to red or green
  const color = (won === true) ? 'green' : 'red';

  guessInput.style.borderColor = color
  setMessage(msg, color);

  // Play again
  guessBtn.value = 'Play Again';
  guessBtn.className = 'play-again';
}

function getRandomNum(min, max) {
  return Math.floor((Math.random() * (max - min + 1) + min));
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}