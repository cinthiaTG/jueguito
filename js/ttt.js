document.addEventListener("DOMContentLoaded", () => {
  const juegito1Button = document.getElementById("jueguito1");
  const juegito2Button = document.getElementById("jueguito2");

  // Función que anuncia el estado de la casilla o botón cuando se pasa el mouse por encima
  function announceCellState(element) {
    speechSynthesis.cancel();
    const textContent = element.textContent; // El contenido actual del elemento
    const msg = new SpeechSynthesisUtterance(); // Crea un mensaje de voz

    if (element === juegito1Button) {
      msg.text = "Jueguito 1, tik-tak-toe.";
    } else if (element === juegito2Button) {
      msg.text = "Jueguito 2, piedra, papel o tijeras.";
    }

    speechSynthesis.speak(msg);
  }

  function wellcome(){
    const msg = new SpeechSynthesisUtterance("Bienvenido al manual de usuario del jueguito 1 | Tic tac toe");
    speechSynthesis.speak(msg);
  }

  // Eventos para botones
  juegito1Button.addEventListener("mouseover", () =>
    announceCellState(juegito1Button)
  );
  juegito2Button.addEventListener("mouseover", () =>
    announceCellState(juegito2Button)
  );
  manual.addEventListener("mouseover", () => announceCellState(manual));

  wellcome();
});
