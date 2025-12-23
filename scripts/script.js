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

    const player1 = Player("Player", "X");
    const player2 = Player("Computer", "O");
    const isSinglePlayer = true;

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

        if (isSinglePlayer && activePlayer.getMark() === "O") {
            const boardCopy = [...Gameboard.getBoard()];
            
            const aiMove = getBestMove(boardCopy);
            Gameboard.setMark(aiMove, "O");

            result = checkWinner();
            if (result || checkTie()) {
              gameOver = true;
              return;
        }

        switchPlayer();
    }
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
        isSinglePlayer,
        winningCombinations,
    };
})();

/*
    Evaluate Board function
*/
const evaluateBoard = (board) => {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }

  if (board.every(cell => cell !== "")) {
    return "tie";
  }

  return null;
};

// getAvailableMoves
const getAvailableMoves = (board) => {
  const moves = [];

  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      moves.push(i);
    }
  }

  return moves;
};

//Minimax
const minimax = (board, isMaximizing) => {
  const result = evaluateBoard(board);
  if (result !== null) {
    if (result === "O") return 10;
    if (result === "X") return -10;
    if (result === "tie") return 0;
  }

  const moves = getAvailableMoves(board);

  if (isMaximizing) {
    let bestScore = -Infinity;

    for (let move of moves) {
      board[move] = "O";
      const score = minimax(board, false);
      board[move] = "";
      bestScore = Math.max(score, bestScore);
    }

    return bestScore;
  } else {
    let bestScore = Infinity;

    for (let move of moves) {
      board[move] = "X";
      const score = minimax(board, true);
      board[move] = "";
      bestScore = Math.min(score, bestScore);
    }

    return bestScore;
  }
};

// getting the best move for AI

const getBestMove = (board) => {
  let bestScore = -Infinity;
  let move = null;

  for (let index of getAvailableMoves(board)) {
    board[index] = "O";
    const score = minimax(board, false);
    board[index] = "";

    if (score > bestScore) {
      bestScore = score;
      move = index;
    }
  }

  return move;
};




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

            if (mark === "X") square.classList.add("x");
            if (mark === "O") square.classList.add("o");

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