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

    // Función que anuncia el estado de la celda o botón cuando se pasa el mouse por encima
    function announceCellState(element) {
        const textContent = element.textContent; // El contenido actual del elemento
        const msg = new SpeechSynthesisUtterance(); // Crea un mensaje de voz

        // Verifica si el elemento es una celda o un botón y anuncia el estado
        if (element.classList.contains("celda")) {
            // Si es una celda
            if (textContent === "O") {
                msg.text = `La celda ${element.dataset.index} está ocupada por O.`;
            } else if (textContent === "X") {
                msg.text = `La celda ${element.dataset.index} está ocupada por X.`;
            } else {
                msg.text = `La celda ${element.dataset.index} está vacía.`;
            }
        } else if (element === restartButton) {
            // Si es el botón de reiniciar
            msg.text = "Botón de reiniciar.";
        } else if (element === clearButton) {
            // Si es el botón de borrar registros
            msg.text = "Botón de borrar registros.";
        } 

        // Reproduce el mensaje de voz
        speechSynthesis.speak(msg);
    }

    // Función para iniciar el juego
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

    // Función para actualizar el temporizador
    function updateTimer() {
        timer++;
        timerElement.textContent = timer;
    }

    // Función para verificar si hay un ganador
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

    // Función que maneja el clic en una celda
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

        // Cambiar al jugador contrario si la jugada es de un jugador
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (currentPlayer === "O") computerMove();
    }

    // Función para que la computadora haga una jugada
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

        currentPlayer = "X"; // Retorna el control al jugador
    }

    // Función para guardar el mejor tiempo
    function saveHighScore(time) {
        let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScores.push(time);
        highScores.sort((a, b) => a - b);
        highScores = highScores.slice(0, 10); // Mantener solo los mejores 10 tiempos
        localStorage.setItem("highScores", JSON.stringify(highScores));
        displayHighScores();
    }

    // Función para mostrar los mejores tiempos
    function displayHighScores() {
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScoresList.innerHTML = highScores
            .map(score => `<li>${score} segundos</li>`)
            .join("");
    }

    // Función para borrar los mejores tiempos
    function clearHighScores() {
        localStorage.removeItem("highScores");
        displayHighScores();
    }

    // Agregar eventos a las celdas
    cells.forEach(cell => {
        cell.addEventListener("mouseover", () => {
            announceCellState(cell); // Anunciar el estado de la celda
        });
        cell.addEventListener("click", handleCellClick); // Manejar el clic en la celda
    });

    // Agregar eventos a los botones
    restartButton.addEventListener("mouseover", () => {
        announceCellState(restartButton); // Anunciar el estado del botón de reiniciar
    });

    clearButton.addEventListener("mouseover", () => {
        announceCellState(clearButton); // Anunciar el estado del botón de borrar registros
    });

    // Agregar eventos a los botones
    restartButton.addEventListener("click", startGame);
    clearButton.addEventListener("click", clearHighScores);

    // Agregar evento para el cuerpo (fuera del tablero)
    document.body.addEventListener("mouseover", () => {
        announceCellState(document.body); // Anunciar cuando estamos fuera del tablero
    });

    // Inicializar
    startGame();
    displayHighScores();
});
