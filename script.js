document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const resetButton = document.getElementById("resetButton");
    let currentPlayer = "X";
    let gameActive = true;
    let boardState = Array(9).fill("");

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const handleCellClick = (e) => {
        const cell = e.target;
        const cellIndex = parseInt(cell.getAttribute("data-index"));

        if (boardState[cellIndex] !== "" || !gameActive) {
            return;
        }

        boardState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        checkWinner();
        togglePlayer();
    };

    const checkWinner = () => {
        let roundWon = false;

        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (boardState[a] === "" || boardState[b] === "" || boardState[c] === "") {
                continue;
            }
            if (boardState[a] === boardState[b] && boardState[b] === boardState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (!boardState.includes("")) {
            statusText.textContent = "It's a draw!";
            gameActive = false;
            return;
        }
    };

    const togglePlayer = () => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    };

    const resetGame = () => {
        boardState = Array(9).fill("");
        cells.forEach(cell => cell.textContent = "");
        gameActive = true;
        currentPlayer = "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    };

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
});
