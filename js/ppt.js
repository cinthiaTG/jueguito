document.addEventListener("DOMContentLoaded", () => {
  const choices = document.querySelectorAll(".choice");
  const playerChoiceDisplay = document.getElementById("player-choice").querySelector("b");
  const computerChoiceDisplay = document.getElementById("computer-choice").querySelector("b");
  const resultMessage = document.getElementById("result-message");
  const playerScoreDisplay = document.getElementById("player-score");
  const computerScoreDisplay = document.getElementById("computer-score");
  const computerChoiceImg = document.getElementById("computer-choice-img");
  const jueguito1Button = document.getElementById("jueguito1");
  const jueguito2Button = document.getElementById("jueguito2");

  let playerScore = 0;
  let computerScore = 0;

  const choicesArray = ["piedra", "papel", "tijera"];
  const imagePaths = {
    piedra: "img/rock.png",
    papel: "img/paper.png",
    tijera: "img/scissors.png",
  };

  function actualizarImagen(choice){
    computerChoiceImg.src = imagePaths[choice];
    computerChoiceImg.alt = `Elección de la computadora: ${choice}`;
  }

  // Función para anunciar el estado del botón
  function announceButtonState(element) {
    speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance();

    if (element.classList.contains("choice")) {
      msg.text = `Seleccionar ${element.dataset.choice}`;
    } else if (element === jueguito1Button) {
      msg.text = "Jueguito 1, tik-tak-toe.";
    } else if (element === jueguito2Button) {
      msg.text = "Jueguito 2, piedra, papel o tijeras.";
    }

    speechSynthesis.speak(msg);
  }

  function speakMessage(message) {
    const msg = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(msg);
  }

  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      const playerChoice = choice.dataset.choice;
      const computerChoice = choicesArray[Math.floor(Math.random() * 3)];

      playerChoiceDisplay.textContent = playerChoice;
      computerChoiceDisplay.textContent = computerChoice;

      actualizarImagen(computerChoice);

      let resultMessageText = "";
      if (playerChoice === computerChoice) {
        resultMessageText = "¡Es un empate!";
      } else if (
        (playerChoice === "piedra" && computerChoice === "tijera") ||
        (playerChoice === "papel" && computerChoice === "piedra") ||
        (playerChoice === "tijera" && computerChoice === "papel")
      ) {
        resultMessageText = "¡Ganaste!";
        playerScore++;
      } else {
        resultMessageText = "Perdiste.";
        computerScore++;
      }

      resultMessage.textContent = resultMessageText;
      speakMessage(resultMessageText);

      playerScoreDisplay.textContent = playerScore;
      computerScoreDisplay.textContent = computerScore;

      // Anuncio de las elecciones
      const playerMessage = `Elegiste ${playerChoice}.`;
      const computerMessage = `La computadora eligió ${computerChoice}.`;
      speakMessage(playerMessage);
      speakMessage(computerMessage);
    });

    // Evento para anunciar el nombre de la opción al pasar el mouse
    choice.addEventListener("mouseover", () => announceButtonState(choice));
  });

  // Eventos para botones de otros juegos
  jueguito1Button.addEventListener("mouseover", () =>
    announceButtonState(jueguito1Button)
  );
  jueguito2Button.addEventListener("mouseover", () =>
    announceButtonState(jueguito2Button)
  );
});
