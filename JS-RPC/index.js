'use strict'

//DOM REF:
const elmComputerScore = document.querySelector('#computer-score')
console.log(elmComputerScore);  //REMOVE LATER

const elmUserScore = document.querySelector('#user-score')
console.log(elmUserScore); //REMOVE LATER

const elmAction = document.querySelector('#action')
const elmResultConteiner = document.querySelector('#results-conteiner')
console.log(elmResultConteiner); //REMOVE LATER

const elmUserChoise = document.querySelector('#user-choise')

const elmComputerSelection = document.querySelector('#computer-choise')

const elmPlayAgain = document.querySelector('#play-again')

//-----------------------



const useRock = 0;
const usePaper = 1;
const useScisors = 2;

const computersRound = 'computer wins, maybe next round';
const playersRound = 'you win, YAY!';

let userChoise = 0;
let computerSelection = 0;

let playerScore = 0;
let computerScore = 0;

let gameOver = false;

//---------------------------

function playAgain() {
    playerScore = 0;
    computerScore = 0;
    scoreStatus(playerScore, computerScore);
    elmAction.innerText = 'Choose your weapon!';
    elmResultConteiner.innerHTML = `
    <div class="user-choise">You chose: <span id="user-choise">?</span></div>
    <div class="computer-choise">Computer chose: <span id="computer-choise">?</span></div>
    `
    gameOver = false;
};

function playAgainDisplay() {
    if (!gameOver) {
        elmPlayAgain.innerText = "Start Over"
    } else { elmPlayAgain.innerText = "play again" }
}

function scoreCheck(playerScore, computerScore) {
    if (playerScore === 10) {
        gameOver = true;
        return elmAction.innerText = 'GAME OVER! YOU WON!'
    }
    if (computerScore === 10) {
        gameOver = true;
        return elmAction.innerText = 'GAME OVER! computer wins'
    }
};

function scoreStatus(playerScore, computerScore) {
    elmUserScore.innerText = playerScore;
    elmComputerScore.innerText = computerScore;
    playAgainDisplay()
};

function roundCheck() {
    console.log("User Choise:", userChoise);
    console.log("computer selection:", computerSelection);

    if (userChoise === computerSelection) {
        displayChoise()
        return elmAction.innerText = "It's a tie, let's go again"
    };
    if (
        (userChoise === useRock && computerSelection === usePaper)
        || (userChoise === usePaper && computerSelection === useScisors)
        || (userChoise === useScisors && computerSelection === useRock)
    ) {
        computerScore++
        elmAction.innerText = computersRound;
    }
    else {
        playerScore++
        elmAction.innerText = playersRound;
    }

    scoreCheck(playerScore, computerScore);
    scoreStatus(playerScore, computerScore);
    displayChoise()
};

function displayChoise() {
    const choices = ["Rock", "Paper", "Scissors"];
    const userChoiseText = choices[userChoise];
    const computerChoiseText = choices[computerSelection];

    elmUserChoise.innerText = userChoiseText;

    if (userChoise === computerSelection) {
        elmComputerSelection.innerText = computerChoiseText;
    } else {
        elmComputerSelection.innerText = computerChoiseText
    }

    /*  if (userChoise === useRock) {
         elmUserChoise.innerText = "ROCK"
     }
     else if (userChoise === usePaper) {
         elmUserChoise.innerText = "PAPER"
     }
     else if (userChoise === useScisors) {
         elmUserChoise.innerText = "SCISSORS"
     }
     if (computerSelection === useRock) {
         elmComputerSelection.innerText = "ROCK"
     }
     else if (computerSelection === usePaper) {
         elmComputerSelection.innerText = "PAPER"
     }
     else if (computerSelection === useScisors) {
         elmComputerSelection.innerText = "SCISSORS"
     } */
}


const removeDisable = elmPlayAgain.removeAttribute('disabled', true);

function rock() {
    if (gameOver) return;
    /* elmRock.classList.add('selected') */
    userChoise = useRock;
    computerSelection = Math.floor(Math.random() * 3);
    removeDisable;
    roundCheck();
};
function paper() {
    if (gameOver) return;
    userChoise = usePaper;
    computerSelection = Math.floor(Math.random() * 3);
    roundCheck();
};
function scissors() {
    if (gameOver) return;
    userChoise = useScisors;
    computerSelection = Math.floor(Math.random() * 3);
    roundCheck();
};