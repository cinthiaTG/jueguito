document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".celda");
  const restartButton = document.getElementById("restart");
  const clearButton = document.getElementById("limpiar");
  const checkStatusButton = document.getElementById("checkStatus");
  const checkHighScoresButton = document.getElementById("checkHighScores");
  const juegito1Button = document.getElementById("jueguito1");
  const juegito2Button = document.getElementById("jueguito2");
  const timerElement = document.getElementById("time");
  const highScoresList = document.getElementById("highScores");
  const messageElement = document.getElementById("message");
  const manual = document.getElementById("manual");

  let board = Array(9).fill(null);
  let currentPlayer = "X"; // Player is "X", Computer is "O"
  let gameActive = true;
  let timer = 0;
  let interval;
  let firstMove = true;

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
    } else if (element === checkHighScoresButton) {
      msg.text = "Botón para escuchar los mejores tiempos registrados.";
    } else if (element === juegito1Button) {
      msg.text = "Jueguito 1, tik-tak-toe.";
    } else if (element === juegito2Button) {
      msg.text = "Jueguito 2, piedra, papel o tijeras.";
    } else if (element === manual) {
      msg.text = "Enlace al manual de usuario.";
    }

    speechSynthesis.speak(msg);
  }

  function initialiceGame() {
    board.fill(null);
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("winner");
    });
    firstMove = true;
    currentPlayer = "X";
    messageElement.textContent = "";
    timer = -1;
    clearInterval(interval);
    updateTimer();
  }

  // Función para iniciar el juego
  function startGame() {
    const msg = new SpeechSynthesisUtterance(
      "Se ha iniciado una nueva partida"
    );
    speechSynthesis.speak(msg);
    initialiceGame();
    gameActive = true;
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
    if (firstMove) {
      startGame();
    }
    firstMove = false;

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
      messageElement.textContent = `Acaba de ganar, tiempo total de la partida: ${timer} segundos!`;
      clearInterval(interval);
      saveHighScore(timer);

      // Anuncio de victoria
      const msg = new SpeechSynthesisUtterance(
        `Acaba de ganar, tiempo total de la partida: ${timer} segundos`
      );
      speechSynthesis.speak(msg);
      return;
    }

    if (!board.includes(null)) {
      gameActive = false;
      messageElement.textContent = "¡El juego ha resultado en un empate!";
      clearInterval(interval);

      // Anuncio de empate
      const msg = new SpeechSynthesisUtterance(
        "¡El juego ha resultado en un empate!"
      );
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

      messageElement.textContent = `La computadora ganó, tiempo total de la partida: ${timer} segundos!`;
      clearInterval(interval);

      // Anuncio de victoria de la computadora
      const msg = new SpeechSynthesisUtterance(
        `La computadora ganó, tiempo total de la partida: ${timer} segundos`
      );
      speechSynthesis.speak(msg);
      return;
    }

    if (!board.includes(null)) {
      gameActive = false;
      messageElement.textContent = "¡El juego ha resultado en un empate!";
      clearInterval(interval);

      // Anuncio de empate
      const msg = new SpeechSynthesisUtterance(
        "¡El juego ha resultado en un empate!"
      );
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
    const msg = new SpeechSynthesisUtterance(
      "Ha borrado todos los registros existentes de mejores tiempos"
    );
    speechSynthesis.speak(msg);

    localStorage.removeItem("highScores");
    displayHighScores();
  }

  // Función para revisar el estado actual de la partida
  function checkGameStatus() {
    const isBoardEmpty = board.every((cell) => cell === null);
    if (isBoardEmpty) {
      const msg = new SpeechSynthesisUtterance(
        "No es posible verificar el estado de la partida, no ha iniciado una partida. Presione enter para confirmar"
      );
      speechSynthesis.speak(msg);
      msg.onend = () => {
        alert(
          "No es posible verificar el estado de la partida, no ha iniciado una partida."
        );
      };
    } else {
      const winningCombo = checkWinner();
      let gameStatusMessage = `El tiempo al presionar el botón fue de ${timer} segundos.`;

      if (winningCombo) {
        gameStatusMessage = messageElement.textContent;
        return;
      }

      const occupiedCells = board
        .map((value, index) => (value ? `Casilla ${index}: ${value}` : null))
        .filter((item) => item !== null)
        .join(", ");
      if (occupiedCells) {
        gameStatusMessage += `Las casillas ocupadas son: ${occupiedCells}.`;
      } else {
        gameStatusMessage += "No hay casillas ocupadas.";
      }

      const msg = new SpeechSynthesisUtterance(gameStatusMessage);
      speechSynthesis.speak(msg);
    }
  }

  // Función para borrar los mejores tiempos con confirmación
  function clearListConfirmation() {
    if (highScoresList.innerHTML.trim() === "") {
      const msg = new SpeechSynthesisUtterance(
        "No hay registros de mejores tiempos, pruebe ganando una partida para establecer un puesto en el registro. Presione enter para confirmar"
      );
      speechSynthesis.speak(msg);
      msg.onend = () => {
        alert(
          "No hay registros de mejores tiempos, pruebe ganando una partida para establecer un puesto en el registro"
        );
      };
      return;
    }
    const msg = new SpeechSynthesisUtterance(
      "¿Está seguro de que desea borrar todos los mejores tiempos registrados?  Presione la tecla Enter si es así, de lo contrario presione la tecla escape."
    );
    speechSynthesis.speak(msg);
    let confirmation;

    msg.onend = () => {
      confirmation = confirm(
        "¿Está seguro de que desea borrar todos los mejores tiempos registrados?"
      );

      if (confirmation) {
        clearHighScores();
      } else {
        const msg = new SpeechSynthesisUtterance(
          "Ha cancelado la operación de borrar todos los registros de mejores tiempos"
        );
        speechSynthesis.speak(msg);
      }
    };
  }

  // Función para reiniciar la partida con confirmación
  function restartConfirmation() {
    const isBoardEmpty = board.every((cell) => cell === null);

    if (isBoardEmpty) {
      const msg = new SpeechSynthesisUtterance(
        "No hay ninguna partida por reiniciar, pruebe iniciando una primero. Presione enter para confirmar"
      );
      speechSynthesis.speak(msg);
      msg.onend = () => {
        alert(
          "No hay ninguna partida por reiniciar, pruebe iniciando una primero."
        );
      };
      return;
    } else if (!(messageElement.textContent == "") || timer <= 0) {
      console.log(messageElement.textContent);
      
      initialiceGame();
      const msg = new SpeechSynthesisUtterance("Partida reiniciada con éxito.");
      speechSynthesis.speak(msg);
      return;
    }

    const msg = new SpeechSynthesisUtterance(
      "Hay una partida en curso, ¿Está seguro de que desea reiniciar la partida? Presione la tecla Enter si es así, de lo contrario presione la tecla escape."
    );
    speechSynthesis.speak(msg);
    let confirmation;

    msg.onend = () => {
      confirmation = confirm(
        "Hay una partida en curso ¿Está seguro de que desea reiniciar la partida?"
      );
      console.log(confirmation);

      let content = "";
      if (confirmation) {
        content = "Ha confirmado el reinicio de la partida. Partida reiniciada";
        initialiceGame();
      } else {
        content = "Ha cancelado la operación de reinicio de la partida.";
      }

      // Mensaje de voz según la respuesta del usuario
      const responseMsg = new SpeechSynthesisUtterance(content);
      speechSynthesis.speak(responseMsg);
    };
  }

  function checkHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    if (highScores.length === 0) {
      const msg = new SpeechSynthesisUtterance(
        "No hay mejores tiempos registrados hasta el momento."
      );
      speechSynthesis.speak(msg);
      msg.onend = () => {
        alert("No hay mejores tiempos registrados hasta el momento.");
      };
      return;
    }

    const sortedHighScores = [...highScores].sort((a, b) => a - b); // Orden descendiente
    let highScoresMessage =
      "Los mejores tiempos registrados del primero al último son: ";

    sortedHighScores.forEach((score, index) => {
      highScoresMessage += `Posición ${index + 1}: ${score} segundos. `;
    });

    highScoresMessage += "Fin de la lista de posiciones"

    const msg = new SpeechSynthesisUtterance(highScoresMessage);
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
  checkHighScoresButton.addEventListener("mouseover", () =>
    announceCellState(checkHighScoresButton)
  );
  juegito1Button.addEventListener("mouseover", () =>
    announceCellState(juegito1Button)
  );
  juegito2Button.addEventListener("mouseover", () =>
    announceCellState(juegito2Button)
  );
  manual.addEventListener("mouseover", () =>
    announceCellState(manual)
  );
  clearButton.addEventListener("click", clearListConfirmation);
  checkStatusButton.addEventListener("click", checkGameStatus);
  restartButton.addEventListener("click", restartConfirmation);
  checkHighScoresButton.addEventListener("click", checkHighScores);

  // Inicializar
  initialiceGame();
  displayHighScores();
});
