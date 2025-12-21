const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const setMark = (index, mark) => {
        if (board[index] !== "") return false;
        board[index] = mark;
        return true;
    };

    const reset = () => {
        board.fill("");
    };

    return {
        getBoard,
        setMark,
        reset,
    };
})();

const Player = (name, mark) => {
    const getName = () => name;
    
    const getMark = () => mark;

    return {
        getName,
        getMark,
    };
};

const GameController = (function () {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");

    let activePlayer = player1;

    const switchPlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const getActivePlayer = () => activePlayer;

    const playRound = (index) => {
        const success = Gameboard.setMark(index, activePlayer.getMark());
        if (!success) {
            return; 
        }

        const winner = checkWinner();
        if (winner) {
            console.log(`${activePlayer.getName()} wins the round!🥳`);
            return;
        }

        if (checkTie()) {
            console.log("Its a tie.👔");
            return;
        }

        switchPlayer();
    };

    const winningCombinations = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]
    ];

    const checkWinner = () => {
        const board = Gameboard.getBoard();

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;

            if (
                board[a] && board[a] === board[b] && board[a] == board[c]
            ) {
                return board[a];
            }
        }

        return null;
    };

    const checkTie = () => {
        return Gameboard.getBoard().every(cell => cell !== "");
    };

    return {
        playRound,
        getActivePlayer,
    };
})();

const DisplayController = (function () {
    const boardElement = document.getElementById("gameboard");
    const render = () => {
        boardElement.innerHTML = "";
        const board = Gameboard.getBoard();

        board.forEach((mark) => {
            const square = document.createElement("div");
            square.classList.add("square");
            square.textContent = mark;
            boardElement.appendChild(square);
        });
    };

    return {
        render,
    };
})();