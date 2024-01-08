'use strict'

const cells = document.querySelectorAll("td")
let currentPlayer = "X";
let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const row = Math.floor(i / 3);
    const col = i % 3;
    console.log("loop is working");
}

function handleClick(row, col) {
    let correntIndex = gameBoard[row][col];
    if (correntIndex === '' && !checkWinner()) {
        gameBoard[row][col] = currentPlayer;
        updateGame(row, col); //update display with current user chois
        checkWinner(); //check if ther is a winner or full board
        togglePlayer(); //next player turn

    }
    console.log("handleClick functioning");
}

function updateGame(row, col) {
    const cell = document.querySelector(`#cell${row}${col}`);
    cell.innerText = gameBoard[row][col];
    cell.classList.add(currentPlayer);
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (
            (
                gameBoard[i][0] != ''
                && gameBoard[i][0] === gameBoard[i][1]
                && gameBoard[i][0] === gameBoard[i][2]
            ) || (
                gameBoard[0][i] != ''
                && gameBoard[0][i] === gameBoard[1][i]
                && gameBoard[0][i] === gameBoard[2][i]
            )
        ) {

            alert(`${currentPlayer} wins !`);
            return true;
        }
    }

    if (
        (
            gameBoard[0][0] !== ''
            && gameBoard[0][0] === gameBoard[1][1]
            && gameBoard[1][1] === gameBoard[2][2]
        ) || (
            gameBoard[0][2] != ''
            && gameBoard[0][2] === gameBoard[1][1]
            && gameBoard[1][1] === gameBoard[2][0]
        )
    ) {
        alert(`${currentPlayer} wins!`)
        return true;
    }
    if (isBoardFull()) {
        alert("its a tie !")
        return true;
    }
}

function resetGame() {
    gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        /*   const row = Math.floor(i / 3);
          const col = i % 3; */
        cell.innerText = '';
        cell.classList.remove('X', 'O');
    }
}

function isBoardFull() {
    for (let i = 0; i < gameBoard.length; i++) {
        const row = gameBoard[i];
        if (row.includes('')) {
            return false;
        }
    }
    return true;
}

function togglePlayer() {
    if (
        currentPlayer === "X"
    ) {
        currentPlayer = "O"
    } else { currentPlayer = "X" }
    console.log("Current player is now:", currentPlayer);
}

//--EVENT LISTENERS
cells.forEach((cell, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    cell.addEventListener("click", () => handleClick(row, col));
})

