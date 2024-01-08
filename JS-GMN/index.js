'use strict'

// reference html elements:
// ------------------------
// again button, check button, guess input, last guess, 
// message area, score value, high-score value
const elmCheckButton = document.querySelector('#checkButton');
const elmGuessInput = document.querySelector('#guessInput');
const elmLastGuess = document.querySelector('.number')
const elmMassegeArea = document.querySelector('.message');
const elmScoreValue = document.querySelector('.score');
const elmHighScoreValue = document.querySelector('.highscore');

const elmBody = document.querySelector('body')

// initialize variables:
// ---------------------
// score, high-score, secret number
let score = 100;
let highScore = 0;
let secretNum = Math.trunc((Math.random() * 20) + 1);


// cheat code:
// -----------
// log the secret number - REMOVE LATER !!!!!!!
console.log(secretNum);


function again() {
  // 1. reset variable (except high-score)
  score = 100;
  elmScoreValue.innerText = score;
  // 2. reset html texts
  elmLastGuess.innerText = '?';
  elmMassegeArea.innerText = 'Start guessing...';
  // 3. reset bg-color
  document.body.style.backgroundColor = '#222';
  // 4. generate new secret number
  secretNum = Math.trunc((Math.random() * 20) + 1);
  console.log(secretNum);
  elmCheckButton.disabled = false;
};

function check() {
  /*

      get guess

      !guess ?

        message
        lastguess element = '?'
        return

      guess = secret ?

        message
        lastguess element = guess
        score > highscore ? highscore = score
        bg-color = green

      else 

        message (too high \ too low)
        lastguess element = guess
        bg-color = red
        reduce 10 points

        score <= 0  ? 
          message 'you lost'
        
  */
  const userInput = Number(elmGuessInput.value);

  if ((userInput > 20) || (userInput <= 0)) {
    document.body.style.backgroundColor = '#222';
    elmMassegeArea.innerText = 'Please entre a numer between 1 and 20';
    elmLastGuess.innerText = '?';
    return;
  };

  if (userInput < secretNum) {
    document.body.style.backgroundColor = '#aa2727';
    elmMassegeArea.innerText = 'Too Low';
    elmLastGuess.innerText = `${userInput}`;
    score -= 10;
    checkScore();
  };

  if (userInput > secretNum) {
    document.body.style.backgroundColor = '#aa2727';
    elmMassegeArea.innerText = 'Too High';
    elmLastGuess.innerText = `${userInput}`;
    score -= 10;
    checkScore();
  };

  if (userInput === secretNum) {
    elmMassegeArea.innerText = 'YOU WON!';
    elmLastGuess.innerText = `${userInput}`;

    document.body.style.backgroundColor = 'green';
    elmCheckButton.disabled = true;

    if (score > highScore) {
      highScore = score;
    }
  };

  elmGuessInput.value = "";

  elmScoreValue.innerText = score;
  elmHighScoreValue.innerText = highScore;
};

function checkScore() {
  if (score <= 0) {
    elmMassegeArea.innerText = 'YOU LOST';
    document.body.style.backgroundColor = '#aa2727';
    elmCheckButton.disabled = true;
  };
};