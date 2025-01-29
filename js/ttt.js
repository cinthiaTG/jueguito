document.addEventListener("DOMContentLoaded", () => {
  const juegito1Button = document.getElementById("jueguito1");
  const juegito2Button = document.getElementById("jueguito2");
  const manual = document.getElementById("manual");
  const hearAllButton = document.getElementById("hearAll");
  const hearWelcomeButton = document.getElementById("hearWelcome");
  const hearHowToPlayButton = document.getElementById("hearHowToPlay");
  const hearBasicRulesButton = document.getElementById("hearBasicRules");
  const voiceNavigatorButton = document.getElementById("voiceNavigator");
  const interactionButton = document.getElementById("interaction");
  const characteristicsButton = document.getElementById("characteristics");
  const tipsButton = document.getElementById("tips");

  // Función que anuncia el estado de la casilla o botón cuando se pasa el mouse por encima
  function announceCellState(element) {
    speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(); // Crea un mensaje de voz

    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find(
      (voice) => voice.lang === "es-ES" && voice.name.includes("Pablo")
    );
    if (selectedVoice) {
      msg.voice = selectedVoice;
    }

    if (element === juegito1Button) {
      msg.text = "Jueguito 1, tik-tak-toe.";
    } else if (element === juegito2Button) {
      msg.text = "Jueguito 2, piedra, papel o tijeras.";
    } else if (element === hearAllButton) {
      msg.text = "Escuchar manual completo.";
    } else if (element === hearWelcomeButton) {
      msg.text = "Escuchar sección de bienvenida.";
    } else if (element === hearHowToPlayButton) {
      msg.text = "Escuchar todas las secciones en cómo jugar.";
    } else if (element === hearBasicRulesButton) {
      msg.text = "Escuchar sección de reglas básicas.";
    } else if (element === voiceNavigatorButton) {
      msg.text = "Escuchar sección de navegación por voz.";
    } else if (element === interactionButton) {
      msg.text = "Escuchar sección de interacción y jugabilidad.";
    } else if (element === characteristicsButton) {
      msg.text = "Escuchar sección de características del juego.";
    } else if (element === tipsButton) {
      msg.text = "Escuchar sección de recomendaciones y consejos.";
    } else if (element === manual) {
      msg.text = "Volver al jueguito 1 | Tik tak toe";
    } 
    speechSynthesis.speak(msg);
  }

  function hearManual(element) {
    speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance();

    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find(
      (voice) => voice.lang === "es-ES" && voice.name.includes("Pablo")
    );
    if (selectedVoice) {
      msg.voice = selectedVoice;
    }

    if (element.id === "hearAll") {
      msg.text = "Manual de usuario.";
      msg.text = " ¡Bienvenido al Jueguito 1 | Tic-tac-toe! Este es un clásico juego de tres en raya (también conocido como gato), diseñado especialmente para personas ciegas, con integración de mensajes de voz que facilitan la navegación y el juego. Aunque está pensado para ser accesible, cualquier persona puede disfrutarlo, ya sea con o sin discapacidad visual.";
      msg.text = " Reglas Básicas. El objetivo es alinear tres de tus símbolos (X u O) en una fila, columna o diagonal antes de que lo haga la computadora. Tú jugarás como 'X' y la computadora como 'O'. Si el tablero se llena sin un ganador, el juego terminará en empate.";
      msg.text += " Navegación por voz. La aplicación te guiará con mensajes de voz en cada etapa del juego, brindando una experiencia accesible. Las voces se activan en: las celdas del tablero, anunciando si están vacías o ocupadas y, en su caso, qué símbolo las ocupa; los botones principales, como Reiniciar y Borrar Registro; los mensajes clave del juego, como el turno de la computadora, el resultado de la partida (ganaste, perdiste o empate) y otros anuncios importantes.";
      msg.text +=
        " Interacción y Jugabilidad. Haz clic en una celda vacía para realizar tu movimiento. La computadora jugará automáticamente después de ti. Los mensajes de voz te informarán sobre el estado del tablero y los movimientos de la computadora. Al finalizar la partida, se anunciará el resultado y podrás hacer clic en opciones para reiniciar el juego o borrar tu registro de tiempos.";
      msg.text +=
        " Características del juego. Para los amantes de los retos, el juego incluye un temporizador que mide cuánto tiempo te lleva completar cada partida. Si logras ganar, el tiempo de la partida se guardará automáticamente en un historial, así podrás desafiarte a ti mismo y tratar de superarlo en futuras partidas. Pero si deseas comenzar desde cero o simplemente limpiar ese historial, puedes hacerlo fácilmente utilizando la opción Borrar Registro.";
      msg.text +=
        " Recomendaciones y Consejos. Para sacar el máximo provecho del Jueguito 1 | Tic Tac Toe, es importante prestar atención a los mensajes de voz. Estos te mantendrán informado sobre el estado actual del tablero y los movimientos de la computadora, ayudándote a planificar tus estrategias. Por ejemplo, si la computadora está a punto de completar una fila, columna o diagonal, puedes bloquear su jugada y dar un giro a la partida. Si en algún momento el juego no responde como esperas, un simple reinicio de la página debería solucionarlo. También recuerda que puedes limpiar el historial de tiempos en cualquier momento con el botón dedicado.";
    } else if (element.id === "hearWelcome") {
      msg.text = "¡Bienvenido al Jueguito 1 | Tic-tac-toe! Este es un clásico juego de tres en raya (también conocido como gato), diseñado especialmente para personas ciegas, con integración de mensajes de voz que facilitan la navegación y el juego. Aunque está pensado para ser accesible, cualquier persona puede disfrutarlo, ya sea con o sin discapacidad visual.";
    } else if (element.id === "hearHowToPlay") {
      msg.text = "Reglas Básicas. El objetivo es alinear tres de tus símbolos (X o O) en una fila, columna o diagonal antes de que lo haga la computadora. Tú jugarás como 'X' y la computadora como 'O'. Si el tablero se llena sin un ganador, el juego terminará en empate.";
      msg.text += " Navegación por voz. La aplicación te guiará con mensajes de voz en cada etapa del juego, brindando una experiencia accesible. Las voces se activan en: las celdas del tablero, anunciando si están vacías o ocupadas y, en su caso, qué símbolo las ocupa; los botones principales, como Reiniciar y Borrar Registro; los mensajes clave del juego, como el turno de la computadora, el resultado de la partida (ganaste, perdiste o empate) y otros anuncios importantes.";
      msg.text +=
        " Interacción y Jugabilidad. Haz clic en una celda vacía para realizar tu movimiento. La computadora jugará automáticamente después de ti. Los mensajes de voz te informarán sobre el estado del tablero y los movimientos de la computadora. Al finalizar la partida, se anunciará el resultado y podrás hacer clic en opciones para reiniciar el juego o borrar tu registro de tiempos.";
      msg.text +=
        " Características del juego. Para los amantes de los retos, el juego incluye un temporizador que mide cuánto tiempo te lleva completar cada partida. Si logras ganar, el tiempo de la partida se guardará automáticamente en un historial, así podrás desafiarte a ti mismo y tratar de superarlo en futuras partidas. Pero si deseas comenzar desde cero o simplemente limpiar ese historial, puedes hacerlo fácilmente utilizando la opción Borrar Registro.";
      msg.text +=
        " Recomendaciones y Consejos. Para sacar el máximo provecho del Jueguito 1 | Tic Tac Toe, es importante prestar atención a los mensajes de voz. Estos te mantendrán informado sobre el estado actual del tablero y los movimientos de la computadora, ayudándote a planificar tus estrategias. Por ejemplo, si la computadora está a punto de completar una fila, columna o diagonal, puedes bloquear su jugada y dar un giro a la partida. Si en algún momento el juego no responde como esperas, un simple reinicio de la página debería solucionarlo. También recuerda que puedes limpiar el historial de tiempos en cualquier momento con el botón dedicado.";
    } else if (element.id === "hearBasicRules") {
      msg.text = "El objetivo es alinear tres de tus símbolos (X o O) en una fila, columna o diagonal antes de que lo haga la computadora. Tú jugarás como 'X' y la computadora como 'O'. Si el tablero se llena sin un ganador, el juego terminará en empate.";
    } else if (element.id === "voiceNavigator") {
      msg.text = "La aplicación te guiará con mensajes de voz en cada etapa del juego, brindando una experiencia accesible. Las voces se activan en: las celdas del tablero, anunciando si están vacías o ocupadas y, en su caso, qué símbolo las ocupa; los botones principales, como Reiniciar y Borrar Registro; los mensajes clave del juego, como el turno de la computadora, el resultado de la partida (ganaste, perdiste o empate) y otros anuncios importantes.";
    } else if (element.id === "interaction") {
      msg.text =
        "Haz clic en una celda vacía para realizar tu movimiento. La computadora jugará automáticamente después de ti. Los mensajes de voz te informarán sobre el estado del tablero y los movimientos de la computadora. Al finalizar la partida, se anunciará el resultado y podrás hacer clic en opciones para reiniciar el juego o borrar tu registro de tiempos.";
    } else if (element.id === "characteristics") {
      msg.text =
        "Para los amantes de los retos, el juego incluye un temporizador que mide cuánto tiempo te lleva completar cada partida. Si logras ganar, el tiempo de la partida se guardará automáticamente en un historial, así podrás desafiarte a ti mismo y tratar de superarlo en futuras partidas. Pero si deseas comenzar desde cero o simplemente limpiar ese historial, puedes hacerlo fácilmente utilizando la opción Borrar Registro.";
    } else if (element.id === "tips") {
      msg.text =
        "Para sacar el máximo provecho del Jueguito 1 | Tic Tac Toe, es importante prestar atención a los mensajes de voz. Estos te mantendrán informado sobre el estado actual del tablero y los movimientos de la computadora, ayudándote a planificar tus estrategias. Por ejemplo, si la computadora está a punto de completar una fila, columna o diagonal, puedes bloquear su jugada y dar un giro a la partida. Si en algún momento el juego no responde como esperas, un simple reinicio de la página debería solucionarlo. También recuerda que puedes limpiar el historial de tiempos en cualquier momento con el botón dedicado.";
    }

    speechSynthesis.speak(msg);
  }

  function wellcome() {
    const msg = new SpeechSynthesisUtterance(
      "Bienvenido al manual de usuario del jueguito 1 | Tic tac toe"
    );

    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find(
      (voice) => voice.lang === "es-ES" && voice.name.includes("Pablo")
    );
    if (selectedVoice) {
      msg.voice = selectedVoice;
    }
    
    speechSynthesis.speak(msg);
  }

  // Eventos para botones
  juegito1Button.addEventListener("mouseover", () =>
    announceCellState(juegito1Button)
  );
  juegito2Button.addEventListener("mouseover", () =>
    announceCellState(juegito2Button)
  );
  juegito1Button.addEventListener("mouseover", () =>
    announceCellState(juegito1Button)
  );
  juegito2Button.addEventListener("mouseover", () =>
    announceCellState(juegito2Button)
  );
  hearAllButton.addEventListener("mouseover", () =>
    announceCellState(hearAllButton)
  );
  hearWelcomeButton.addEventListener("mouseover", () =>
    announceCellState(hearWelcomeButton)
  );
  hearHowToPlayButton.addEventListener("mouseover", () =>
    announceCellState(hearHowToPlayButton)
  );
  hearBasicRulesButton.addEventListener("mouseover", () =>
    announceCellState(hearBasicRulesButton)
  );
  voiceNavigatorButton.addEventListener("mouseover", () =>
    announceCellState(voiceNavigatorButton)
  );
  interactionButton.addEventListener("mouseover", () =>
    announceCellState(interactionButton)
  );
  characteristicsButton.addEventListener("mouseover", () =>
    announceCellState(characteristicsButton)
  );
  tipsButton.addEventListener("mouseover", () => announceCellState(tipsButton));

  juegito1Button.addEventListener("focus", () =>
    announceCellState(juegito1Button)
  );
  juegito2Button.addEventListener("focus", () =>
    announceCellState(juegito2Button)
  );
  juegito1Button.addEventListener("focus", () =>
    announceCellState(juegito1Button)
  );
  juegito2Button.addEventListener("focus", () =>
    announceCellState(juegito2Button)
  );
  hearAllButton.addEventListener("focus", () =>
    announceCellState(hearAllButton)
  );
  hearWelcomeButton.addEventListener("focus", () =>
    announceCellState(hearWelcomeButton)
  );
  hearHowToPlayButton.addEventListener("focus", () =>
    announceCellState(hearHowToPlayButton)
  );
  hearBasicRulesButton.addEventListener("focus", () =>
    announceCellState(hearBasicRulesButton)
  );
  voiceNavigatorButton.addEventListener("focus", () =>
    announceCellState(voiceNavigatorButton)
  );
  interactionButton.addEventListener("focus", () =>
    announceCellState(interactionButton)
  );
  characteristicsButton.addEventListener("focus", () =>
    announceCellState(characteristicsButton)
  );
  tipsButton.addEventListener("focus", () => announceCellState(tipsButton));

  document.getElementById("hearAll").addEventListener("click", () => {
    hearManual(hearAllButton);
  });

  document.getElementById("hearWelcome").addEventListener("click", () => {
    hearManual(hearWelcomeButton);
  });

  document.getElementById("hearHowToPlay").addEventListener("click", () => {
    hearManual(hearHowToPlayButton);
  });

  document.getElementById("hearBasicRules").addEventListener("click", () => {
    hearManual(hearBasicRulesButton);
  });

  document.getElementById("voiceNavigator").addEventListener("click", () => {
    hearManual(voiceNavigatorButton);
  });

  document.getElementById("interaction").addEventListener("click", () => {
    hearManual(interactionButton);
  });

  document.getElementById("characteristics").addEventListener("click", () => {
    hearManual(characteristicsButton);
  });

  document.getElementById("tips").addEventListener("click", () => {
    hearManual(tipsButton);
  });

  manual.addEventListener("mouseover", () => announceCellState(manual));

  wellcome();
});
