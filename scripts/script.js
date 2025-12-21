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
    let gameOver = false;

    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");

    let activePlayer = player1;

    const switchPlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const getActivePlayer = () => activePlayer;

    const playRound = (index) => {
        if (gameOver) return;

        const success = Gameboard.setMark(index, activePlayer.getMark());
        if (!success) {
            return; 
        }

        const winner = checkWinner();
        if (winner) {
            gameOver = true;
            console.log(`${activePlayer.getName()} wins the round!🥳`);
            return;
        }

        if (checkTie()) {
            gameOver = true;
            console.log("Its a tie.👔");
            return;
        }

        switchPlayer();
    };

    const reset = () => {
        Gameboard.reset(),
        activePlayer = player1;
        gameOver = false;
    }

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
        reset,
        checkWinner,
        checkTie,
    };
})();

const DisplayController = (function () {
    const statusText = document.getElementById("status");
    const restartButton = document.getElementById("restart");
    const boardElement = document.getElementById("gameboard");
    const render = () => {
        boardElement.innerHTML = "";
        const board = Gameboard.getBoard();

        board.forEach((mark, index) => {
            const square = document.createElement("div");
            square.classList.add("square");
            square.textContent = mark;

            square.addEventListener("click", () => {
                GameController.playRound(index);
                render();
            });

            boardElement.appendChild(square);
        });  
        
        const winner = GameController.checkWinner();

        if (winner) {
            statusText.textContent = `${winner} wins. 🏆`;
        } 
        else if (GameController.checkTie()) {
            statusText.textContent = "It's a tie. 👔";
        }
        else {
            statusText.textContent = `${GameController.getActivePlayer().getName()}'s turn.`;
        }
    };

    restartButton.addEventListener("click", () => {
        GameController.reset();
        render();
    });

    return {
        render,
    };
})();

DisplayController.render();