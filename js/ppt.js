document.addEventListener("DOMContentLoaded", () => {
    const choices = document.querySelectorAll(".choice");
    const playerChoiceDisplay = document.getElementById("player-choice").querySelector("span");
    const computerChoiceDisplay = document.getElementById("computer-choice").querySelector("span");
    const resultMessage = document.getElementById("result-message");
    const playerScoreDisplay = document.getElementById("player-score");
    const computerScoreDisplay = document.getElementById("computer-score");
    const computerChoiceVisual = document.getElementById("computer-choice-visual");
  
    let playerScore = 0;
    let computerScore = 0;
  
    const choicesArray = ["piedra", "papel", "tijera"];
  
    choices.forEach((choice) => {
      choice.addEventListener("click", () => {
        const playerChoice = choice.dataset.choice;
        const computerChoice = choicesArray[Math.floor(Math.random() * 3)];
  
        playerChoiceDisplay.textContent = playerChoice;
        computerChoiceDisplay.textContent = computerChoice;
  
        // Actualiza la visualización de la computadora
        computerChoiceVisual.textContent = `${computerChoice}`;
  
        if (playerChoice === computerChoice) {
          resultMessage.textContent = "¡Es un empate!";
        } else if (
          (playerChoice === "piedra" && computerChoice === "tijera") ||
          (playerChoice === "papel" && computerChoice === "piedra") ||
          (playerChoice === "tijera" && computerChoice === "papel")
        ) {
          resultMessage.textContent = "¡Ganaste!";
          playerScore++;
        } else {
          resultMessage.textContent = "Perdiste.";
          computerScore++;
        }
  
        playerScoreDisplay.textContent = playerScore;
        computerScoreDisplay.textContent = computerScore;
      });
    });
  });
  