// Elementos del DOM
const board = document.querySelectorAll('.celda');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');
const clearScoresBtn = document.getElementById('limpiar');
const timerDisplay = document.getElementById('time');
const highScoresList = document.getElementById('highScores');

let currentPlayer = 'X';
let gameActive = true;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let startTime, intervalId;
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// Reconocimiento de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'es-ES';

// Mapear coordenadas habladas a índices del tablero
const coordenadasMap = {
    'a cero': 0, 'a uno': 1, 'a dos': 2,
    'b cero': 3, 'b uno': 4, 'b dos': 5,
    'c cero': 6, 'c uno': 7, 'c dos': 8
};

function startGame() {
    startTime = Date.now();
    intervalId = setInterval(updateTimer, 1000);
    restartBtn.addEventListener('click', resetGame);
    clearScoresBtn.addEventListener('click', clearHighScores);
    renderHighScores();
    startRecognition(); // Iniciar reconocimiento de voz
}

function startRecognition() {
    message.textContent = 'Diga una coordenada (por ejemplo: "A cero")';
    recognition.start();

    recognition.onresult = function (event) {
        const voiceInput = event.results[0][0].transcript.trim();
        const cellIndex = parseInt(voiceInput, 10) - 1; // Convertir a índice del tablero
        
        if (!isNaN(cellIndex) && cellIndex >= 0 && cellIndex <= 8) {
            if (gameBoard[cellIndex] === '') {
                makeMove(cellIndex, currentPlayer); // Realizar el movimiento
                checkWinner();
            } else {
                message.textContent = "La celda ya está ocupada.";
            }
        } else {
            message.textContent = "Por favor, di un número del 1 al 9.";
        }
    };
    

    recognition.onerror = () => {
        message.textContent = 'Error en el reconocimiento de voz. Intente de nuevo.';
        recognition.start(); // Reinicia el reconocimiento tras un error
    };

    recognition.onend = () => {
        if (gameActive) recognition.start(); // Reinicia el reconocimiento si el juego sigue activo
    };
}

function computerMove() {
    let emptyCells = [];
    gameBoard.forEach((cell, index) => {
        if (cell === '') emptyCells.push(index);
    });

    if (emptyCells.length === 0 || !gameActive) return;

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex, 'O');
    checkWinner();
}

function makeMove(index, player) {
    gameBoard[index] = player;
    board[index].textContent = player;
    board[index].classList.add('disabled');
    currentPlayer = player === 'X' ? 'O' : 'X';
    message.textContent = `Turno de: ${currentPlayer}`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            clearInterval(intervalId);
            const timeTaken = Math.floor((Date.now() - startTime) / 1000);
            if (gameBoard[a] === 'X') {
                message.textContent = `¡Ganaste en ${timeTaken} segundos!`;
                saveHighScore(timeTaken, 'X');
            } else {
                message.textContent = "¡Te ganó la computadora!";
            }
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        clearInterval(intervalId);
        message.textContent = "¡Es un empate!";
    }
}

function saveHighScore(time, player) {
    const playerName = player === 'X' ? prompt("¡Ganaste! Ingresa tu nombre:") : 'Computadora';
    if (!playerName) return;

    const newScore = { name: playerName, time, player, date: new Date().toLocaleString() };
    highScores.push(newScore);
    highScores.sort((a, b) => a.time - b.time);
    highScores = highScores.slice(0, 10);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    renderHighScores();
}

function renderHighScores() {
    highScoresList.innerHTML = highScores
        .map(score => `<li>${score.name} (${score.player}) - ${score.time} segundos (${score.date})</li>`)
        .join('');
}

function clearHighScores() {
    if (confirm("¿Estás seguro de borrar los mejores tiempos?")) {
        highScores = [];
        localStorage.removeItem('highScores');
        renderHighScores();
    }
}

function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = elapsedTime;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    board.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = '¡Comienza el juego!';
    clearInterval(intervalId);
    startGame();
}

// Inicia el juego al cargar
startGame();
