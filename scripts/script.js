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
            return false; 
        }

        switchPlayer();
        return true;
    };

    return {
        playRound,
        getActivePlayer,
    };
})();