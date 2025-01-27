document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".celda");
  const restartButton = document.getElementById("restart");
  const clearButton = document.getElementById("limpiar");
  const checkStatusButton = document.getElementById("checkStatus");
  const juegito1Button = document.getElementById("jueguito1");
  const juegito2Button = document.getElementById("jueguito2");
  const timerElement = document.getElementById("time");
  const highScoresList = document.getElementById("highScores");
  const messageElement = document.getElementById("message");

  let board = Array(9).fill(null);
  let currentPlayer = "X"; // Player is "X", Computer is "O"
  let gameActive = true;
  let timer = 0;
  let interval;

  // Función que anuncia el estado de la casilla o botón cuando se pasa el mouse por encima
  function announceCellState(element) {
    speechSynthesis.cancel();
    const textContent = element.textContent; // El contenido actual del elemento
    const msg = new SpeechSynthesisUtterance(); // Crea un mensaje de voz

    if (element.classList.contains("celda")) {
      if (textContent === "O") {
        msg.text = `La casilla ${element.dataset.index} está ocupada por O.`;
      } else if (textContent === "X") {
        msg.text = `La casilla ${element.dataset.index} está ocupada por X.`;
      } else {
        msg.text = `La casilla ${element.dataset.index} está vacía.`;
      }
    } else if (element === restartButton) {
      msg.text = "Botón para reiniciar partida.";
    } else if (element === clearButton) {
      msg.text = "Botón para borrar registros de mejores tiempos.";
    } else if (element === checkStatusButton) {
      msg.text = "Botón para revisar el estado actual de la partida.";
    } else if (element === juegito1Button) {
      msg.text = "Jueguito 1, tik-tak-toe.";
    } else if (element === juegito2Button) {
      msg.text = "Jueguito 2, piedra, papel o tijeras.";
    }

    speechSynthesis.speak(msg);
  }

  // Función para iniciar el juego
  function startGame() {
    const msg = new SpeechSynthesisUtterance('Se ha iniciado una nueva partida');
    speechSynthesis.speak(msg);

    board.fill(null);
    cells.forEach((cell) => {
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
    timerElement.textContent = `${timer}`;
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
      [2, 4, 6],
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return combo;
      }
    }

    return null;
  }

  // Función que maneja el clic en una casilla
  function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    const msgComputadora = new SpeechSynthesisUtterance(
      `Colocó X en la casilla ${index}.`
    );
    speechSynthesis.speak(msgComputadora);

    const winningCombo = checkWinner();
    if (winningCombo) {
      gameActive = false;
      winningCombo.forEach((idx) => cells[idx].classList.add("winner"));
      messageElement.textContent = `Acaba de ganar, tiempo total del juego: ${timer} segundos!`;
      clearInterval(interval);
      saveHighScore(timer);

      // Anuncio de victoria
      const msg = new SpeechSynthesisUtterance(
        `Acaba de ganar, tiempo total del juego: ${timer} segundos`
      );
      speechSynthesis.speak(msg);
      return;
    }

    if (!board.includes(null)) {
      gameActive = false;
      messageElement.textContent = "¡El juego ha resultado en un empate!";
      clearInterval(interval);

      // Anuncio de empate
      const msg = new SpeechSynthesisUtterance("¡El juego ha resultado en un empate!");
      speechSynthesis.speak(msg);
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer === "O") computerMove();
  }

  // Función para que la computadora haga una jugada
  function computerMove() {
    if (!gameActive) return;

    let availableIndices = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((idx) => idx !== null);
    let randomIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];
    board[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;

    const msgComputadora = new SpeechSynthesisUtterance(
      `La computadora colocó O en la casilla ${randomIndex}.`
    );
    speechSynthesis.speak(msgComputadora);

    const winningCombo = checkWinner();
    if (winningCombo) {
      gameActive = false;
      winningCombo.forEach((idx) => cells[idx].classList.add("winner"));

      messageElement.textContent = `La computadora ganó, tiempo total del juego: ${timer} segundos!`;
      clearInterval(interval);

      // Anuncio de victoria de la computadora
      const msg = new SpeechSynthesisUtterance(
        `La computadora ganó, tiempo total del juego: ${timer} segundos`
      );
      speechSynthesis.speak(msg);
      return;
    }

    if (!board.includes(null)) {
      gameActive = false;
      messageElement.textContent = "¡El juego ha resultado en un empate!";
      clearInterval(interval);

      // Anuncio de empate
      const msg = new SpeechSynthesisUtterance("¡El juego ha resultado en un empate!");
      speechSynthesis.speak(msg);
      return;
    }

    currentPlayer = "X";
  }

  // Función para guardar el mejor tiempo
  function saveHighScore(time) {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(time);
    highScores.sort((a, b) => a - b);
    highScores = highScores.slice(0, 10);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayHighScores();
  }

  // Función para mostrar los mejores tiempos
  function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScoresList.innerHTML = highScores
      .map((score) => `<li>${score} segundos</li>`)
      .join("");
  }

  // Función para borrar los mejores tiempos
  function clearHighScores() {
    const msg = new SpeechSynthesisUtterance('Ha borrado todos los registros existentes de mejores tiempos');
    speechSynthesis.speak(msg);

    localStorage.removeItem("highScores");
    displayHighScores();
  }

  // Función para revisar el estado actual del juego
  function checkGameStatus() {
    const winningCombo = checkWinner();
    let gameStatusMessage = `El tiempo al presionar el botón fue de ${timer} segundos.`;
    
    const occupiedCells = board
      .map((value, index) => (value ? `Casilla ${index}: ${value}` : null))
      .filter((item) => item !== null)
      .join(", ");
    if (winningCombo) {
        gameStatusMessage = messageElement.textContent;
    } else if (occupiedCells) {
      gameStatusMessage += `Las casillas ocupadas son: ${occupiedCells}.`;
    } else {
      gameStatusMessage += "No hay casillas ocupadas.";
    }

    const msg = new SpeechSynthesisUtterance(gameStatusMessage);
    speechSynthesis.speak(msg);
  }

  // Agregar eventos a las casillas
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", () => announceCellState(cell));
    cell.addEventListener("click", handleCellClick);
  });

  // Eventos para botones
  restartButton.addEventListener("mouseover", () =>
    announceCellState(restartButton)
  );
  clearButton.addEventListener("mouseover", () =>
    announceCellState(clearButton)
  );
  checkStatusButton.addEventListener("mouseover", () =>
    announceCellState(checkStatusButton)
  );
  juegito1Button.addEventListener("mouseover", () =>
    announceCellState(juegito1Button)
  );
  juegito2Button.addEventListener("mouseover", () =>
    announceCellState(juegito2Button)
  );
  restartButton.addEventListener("click", startGame);
  clearButton.addEventListener("click", clearHighScores);
  checkStatusButton.addEventListener("click", checkGameStatus);
  

  // Inicializar
  startGame();
  displayHighScores();
});
