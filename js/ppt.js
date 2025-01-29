document.addEventListener("DOMContentLoaded", () => {
  const choices = document.querySelectorAll(".choice");
  const playerChoiceDisplay = document
    .getElementById("player-choice")
    .querySelector("b");
  const computerChoiceDisplay = document
    .getElementById("computer-choice")
    .querySelector("b");
  const resultMessage = document.getElementById("result-message");
  const playerScoreDisplay = document.getElementById("player-score");
  const tieScoreDisplay = document.getElementById("tie-score");
  const computerScoreDisplay = document.getElementById("computer-score");
  const computerChoiceImg = document.getElementById("computer-choice-img");
  const jueguito1Button = document.getElementById("jueguito1");
  const jueguito2Button = document.getElementById("jueguito2");
  const restartButton = document.getElementById("restart");
  const checkStatusButton = document.getElementById("checkStatus");
  const manual = document.getElementById("manual");

  let playerScore = 0;
  let computerScore = 0;
  let tieScore = 0;

  const choicesArray = ["piedra", "papel", "tijeras"];
  const imagePaths = {
    piedra: "img/rock.png",
    papel: "img/paper.png",
    tijeras: "img/scissors.png",
  };

  function actualizarImagen(choice) {
    computerChoiceImg.src = imagePaths[choice];
    computerChoiceImg.alt = `Elección de la computadora: ${choice}`;
  }

  // Función para anunciar el estado del botón
  function announceButtonState(element) {
    speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance();

    if (element.classList.contains("choice")) {
      msg.text = `Botón para seleccionar ${element.dataset.choice}`;
    } else if (element === jueguito1Button) {
      msg.text = "Jueguito 1, tik-tak-toe.";
    } else if (element === jueguito2Button) {
      msg.text = "Jueguito 2, piedra, papel o tijeras.";
    } else if (element === restartButton) {
      msg.text = "Botón para reiniciar los puntajes en el marcador.";
    } else if (element === checkStatusButton) {
      msg.text = "Botón para revisar el marcador de puntos.";
    } else if (element === manual) {
      msg.text = "Enlace al manual de usuario.";
    }

    speechSynthesis.speak(msg);
  }

  function speakMessage(message) {
    const msg = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(msg);
  }

  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      choices.forEach((btn) => btn.disabled = true);
      const playerChoice = choice.dataset.choice;
      const computerChoice = choicesArray[Math.floor(Math.random() * 3)];

      playerChoiceDisplay.textContent = playerChoice;
      computerChoiceDisplay.textContent = computerChoice;

      actualizarImagen(computerChoice);

      let resultMessageText = "";
      if (playerChoice === computerChoice) {
        resultMessageText = "¡Ha empatado esta ronda!";
        tieScore++;
      } else if (
        (playerChoice === "piedra" && computerChoice === "tijeras") ||
        (playerChoice === "papel" && computerChoice === "piedra") ||
        (playerChoice === "tijeras" && computerChoice === "papel")
      ) {
        resultMessageText = "Ha ganado esta ronda!";
        playerScore++;
      } else {
        resultMessageText = "Ha perdido esta ronda.";
        computerScore++;
      }
      // Anuncio de las elecciones
      setTimeout(() => {
        choices.forEach((btn) => btn.disabled = false);
      }, 500);
      const playerMessage = `Ha elegido ${playerChoice}.`;
      const computerMessage = `La computadora eligió ${computerChoice}.`;
      speakMessage(playerMessage);
      speakMessage(computerMessage);

      resultMessage.textContent = resultMessageText;
      speakMessage(resultMessageText);

      playerScoreDisplay.textContent = playerScore;
      tieScoreDisplay.textContent = tieScore;
      computerScoreDisplay.textContent = computerScore;
    });

    // Evento para anunciar el nombre de la opción al pasar el mouse
    choice.addEventListener("mouseover", () => announceButtonState(choice));
    choice.addEventListener("focus", () => announceButtonState(choice));
  });

  function restart() {
    restartButton.disabled = true;
    if (playerScore == 0 && tieScore == 0 && computerScore == 0) {
      const msg = new SpeechSynthesisUtterance(
        "No se han jugado rondas, el marcador está en ceros, juegue mínimo una ronda para poder reiniciar el marcador. Presione enter para aceptar"
      );
      speechSynthesis.speak(msg);
      
      setTimeout(() => {
        alert(
          "No se han jugado rondas, el marcador está en ceros, juegue mínimo una ronda para poder reiniciar el marcador."
        );
        restartButton.disabled = false;
      }, 4000);
  
      return;
    }
  
    const msg = new SpeechSynthesisUtterance(
      "¿Está seguro de que desea reiniciar los puntajes registrados hasta el momento? Presione la tecla Enter si es así, de lo contrario presione la tecla escape."
    );
    speechSynthesis.speak(msg);
  
    setTimeout(() => {
      let confirmation = confirm(
        "¿Está seguro de que desea reiniciar los puntajes registrados hasta el momento?"
      );
  
      if (confirmation) {
        speechSynthesis.cancel();
        playerScore = 0;
        tieScore = 0;
        computerScore = 0;
        playerScoreDisplay.textContent = playerScore;
        tieScoreDisplay.textContent = tieScore;
        computerScoreDisplay.textContent = computerScore;
        
        const resetMsg = new SpeechSynthesisUtterance(
          "El marcador se ha reiniciado a 0. Presione enter para confirmar"
        );
        speechSynthesis.speak(resetMsg);
        setTimeout(() => {
          alert(
            "El marcador se ha reiniciado a 0."
          );
          restartButton.disabled = false;
        }, 2000);
      } else {
        speechSynthesis.cancel();
        const cancelMsg = new SpeechSynthesisUtterance(
          "Ha cancelado la operación de borrar todos los registros de mejores tiempos. Presione enter para confirmar."
        );
        speechSynthesis.speak(cancelMsg);
        setTimeout(() => {
          alert(
            "Ha cancelado la operación de borrar todos los registros de mejores tiempos."
          );
          restartButton.disabled = false;
        }, 2000);
      }
    }, 4000);
  }
  

  function checkMatchStats() {
    checkStatusButton.disabled = true
    let matchStatsMessage = "";
    if (playerScore == 0 && tieScore == 0 && computerScore == 0) {
      matchStatsMessage = "No se han jugado rondas, el marcador está en ceros";
    } else {
      if (playerScore == 1) {
        matchStatsMessage += `Ha ganado una ronda, `;
      } else if (playerScore > 1) {
        matchStatsMessage += `Ha ganado ${playerScore} rondas, `;
      } else {
        matchStatsMessage += "No ha ganado ninguna ronda, ";
      }

      if (tieScore == 1) {
        matchStatsMessage += `ha habido un empate,`;
      } else if (tieScore > 1) {
        matchStatsMessage += `ha habido ${tieScore} empates,`;
      } else {
        matchStatsMessage += `no ha habido empates`;
      }

      if (computerScore == 1) {
        matchStatsMessage += `y la computadora ha ganado una ronda.`;
      } else if (computerScore > 1) {
        matchStatsMessage += `y la computadora ha ganado ${computerScore} rondas.`;
      } else {
        matchStatsMessage += `y la computadora no ha ganado ninguna ronda.`;
      }
    }

    const msg = new SpeechSynthesisUtterance(matchStatsMessage);
    speechSynthesis.speak(msg);
    msg.onboundary = () =>{
      checkStatusButton.disabled = false;
    };
  }

  // Eventos para botones de otros juegos
  manual.addEventListener("mouseover", () => announceButtonState(manual));
  jueguito1Button.addEventListener("mouseover", () =>
    announceButtonState(jueguito1Button)
  );
  jueguito2Button.addEventListener("mouseover", () =>
    announceButtonState(jueguito2Button)
  );
  manual.addEventListener("focus", () => announceButtonState(manual));
  jueguito1Button.addEventListener("focus", () =>
    announceButtonState(jueguito1Button)
  );
  jueguito2Button.addEventListener("focus", () =>
    announceButtonState(jueguito2Button)
  );
  
  restartButton.addEventListener("mouseover", () =>
    announceButtonState(restartButton)
  );
  checkStatusButton.addEventListener("mouseover", () =>
    announceButtonState(checkStatusButton)
  );
  restartButton.addEventListener("focus", () =>
    announceButtonState(restartButton)
  );
  checkStatusButton.addEventListener("focus", () =>
    announceButtonState(checkStatusButton)
  );

  restartButton.addEventListener("click", restart);
  checkStatusButton.addEventListener("click", checkMatchStats);
});
