document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".celda");
    const restartButton = document.getElementById("restart");
    const clearButton = document.getElementById("limpiar");
    const timerElement = document.getElementById("time");
    const highScoresList = document.getElementById("highScores");
    const messageElement = document.getElementById("message");

    let board = Array(9).fill(null);
    let currentPlayer = "X"; // Player is "X", Computer is "O"
    let gameActive = true;
    let timer = 0;
    let interval;

    // Initialize game
    function startGame() {
        board.fill(null);
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("winner");
        });
        currentPlayer = "X";
        gameActive = true;
        messageElement.textContent = "";
        timer = 0;
        updateTimer();
        clearInterval(interval);
        interval = setInterval(updateTimer, 1000);
    }

    // Update timer
    function updateTimer() {
        timer++;
        timerElement.textContent = timer;
    }

    // Check winner
    function checkWinner() {
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

        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return combo;
            }
        }

        return null;
    }

    // Handle click on a cell
    function handleCellClick(e) {
        const index = e.target.dataset.index;
        if (board[index] || !gameActive) return;

        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        const winningCombo = checkWinner();
        if (winningCombo) {
            gameActive = false;
            winningCombo.forEach(idx => cells[idx].classList.add("winner"));
            messageElement.textContent = `${currentPlayer} gana en ${timer} segundos!`;
            clearInterval(interval);
            saveHighScore(timer);
            return;
        }

        if (!board.includes(null)) {
            gameActive = false;
            messageElement.textContent = "¡Empate!";
            clearInterval(interval);
            return;
        }

        // Switch to computer if player is done
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (currentPlayer === "O") computerMove();
    }

    // Computer makes a move
    function computerMove() {
        if (!gameActive) return;

        let availableIndices = board.map((val, idx) => (val === null ? idx : null)).filter(idx => idx !== null);
        let randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        board[randomIndex] = currentPlayer;
        cells[randomIndex].textContent = currentPlayer;

        const winningCombo = checkWinner();
        if (winningCombo) {
            gameActive = false;
            winningCombo.forEach(idx => cells[idx].classList.add("winner"));
            messageElement.textContent = `${currentPlayer} gana en ${timer} segundos!`;
            clearInterval(interval);
            return;
        }

        if (!board.includes(null)) {
            gameActive = false;
            messageElement.textContent = "¡Empate!";
            clearInterval(interval);
            return;
        }

        currentPlayer = "X"; // Return control to player
    }

    // Save high score
    function saveHighScore(time) {
        let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScores.push(time);
        highScores.sort((a, b) => a - b);
        highScores = highScores.slice(0, 10); // Keep top 10 scores
        localStorage.setItem("highScores", JSON.stringify(highScores));
        displayHighScores();
    }

    // Display high scores
    function displayHighScores() {
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScoresList.innerHTML = highScores
            .map(score => `<li>${score} segundos</li>`)
            .join("");
    }

    // Clear high scores
    function clearHighScores() {
        localStorage.removeItem("highScores");
        displayHighScores();
    }

    // Attach event listeners
    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", startGame);
    clearButton.addEventListener("click", clearHighScores);

    // Initialize
    startGame();
    displayHighScores();
});
