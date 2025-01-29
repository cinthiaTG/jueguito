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
  const solutionsButton = document.getElementById("solutions");

  // Función que anuncia el estado de la casilla o botón cuando se pasa el mouse por encima
  function announceCellState(element) {
    speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(); // Crea un mensaje de voz
    if (element === juegito1Button) {
      msg.text = "Jueguito 1, tik-tak-toe.";
    } else if (element === juegito2Button) {
      msg.text = "Jueguito 2. piedra, papel o tijeras.";
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
    } else if (element === solutionsButton) {
      msg.text = "Escuchar sección de solución de problemas.";
    } else if (element === manual) {
      msg.text = "Volver al jueguito 2. Piedra, papel o Tijeras.";
    }
    speechSynthesis.speak(msg);
  }

  function hearManual(element) {
    speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance();

    if (element === hearAllButton) {
      msg.text = "Manual de usuario.";
      msg.text +=
        " ¡Bienvenido a Jueguito 2. Piedra, papel o tijeras! Este clásico juego de 'Piedra, Papel o Tijera' ha sido diseñado para ofrecer una experiencia divertida, accesible y desafiante para todos. Con una interfaz intuitiva y mensajes de voz integrados, cualquier persona, ya sea con o sin discapacidad visual, puede disfrutar del juego. A continuación, te explicamos cómo funciona y cómo puedes empezar a jugar.";
      msg.text +=
        " Reglas básicas. El objetivo es vencer a la computadora seleccionando una opción que supere la suya según las siguientes reglas: Piedra vence a Tijera, Tijera vence a Papel, y Papel vence a Piedra. Si ambos seleccionan la misma opción, el resultado será un empate. Cada victoria suma un punto al jugador correspondiente. ¡Gana quien logre la mayor cantidad de puntos!";
      msg.text +=
        " Navegación por voz. Para garantizar una experiencia inclusiva, el juego integra mensajes de voz que te guían en cada etapa. Estos mensajes se activan al seleccionar una opción (Piedra, Papel o Tijera), mostrar el resultado del turno (ganaste, perdiste o empate), e informar las puntuaciones actuales de ambos jugadores. Si utilizas un lector de pantalla, el juego es totalmente compatible y te mantendrá informado en todo momento.";
      msg.text +=
        " Interacción y jugabilidad. Selecciona una opción: Piedra, Papel o Tijera. La computadora elegirá automáticamente su jugada. Observa los resultados en pantalla y escucha los mensajes de voz: Tu elección, Elección de la computadora, Resultado del turno. Las puntuaciones se actualizarán después de cada ronda.";
      msg.text +=
        " Características del juego. Puntuación Automática: El sistema lleva un registro automático de los puntos de ambos jugadores. Mensajes de Voz: Diseñado para personas ciegas, los mensajes te informan cada detalle importante del juego. Interfaz Visual Intuitiva: Incluye botones grandes y claros para cada opción. Imágenes Representativas: Cada elección de la computadora se muestra con una imagen relacionada.";
      msg.text +=
        " Recomendaciones y consejos. Planifica tus Movimientos: Aunque el juego es de azar, puedes observar patrones en las elecciones de la computadora. Escucha los Mensajes de Voz: Estos te mantendrán informado del estado del juego y de las jugadas de la computadora. Reinicia si es Necesario: Si el juego presenta algún problema, simplemente recarga la página para reiniciar. Diviértete: Recuerda que el objetivo principal es disfrutar del juego.";
      msg.text +=
        " Solución de problemas. Si experimentas dificultades, considera lo siguiente: Problema de Audio: Asegúrate de que el volumen de tu dispositivo esté activado y que la función de voz esté habilitada. Error en la Interfaz: Recarga la página para reiniciar el juego. Problemas con los Controles: Verifica que estés haciendo clic en las opciones correctas.";
    } else if (element === hearWelcomeButton) {
      msg.text =
        "¡Bienvenido a Jueguito 2. Piedra, papel o tijeras! Este clásico juego de 'Piedra, Papel o Tijera' ha sido diseñado para ofrecer una experiencia divertida, accesible y desafiante para todos. Con una interfaz intuitiva y mensajes de voz integrados, cualquier persona, ya sea con o sin discapacidad visual, puede disfrutar del juego. A continuación, te explicamos cómo funciona y cómo puedes empezar a jugar.";
    } else if (element === hearHowToPlayButton) {
      msg.text =
        "Reglas básicas. El objetivo es vencer a la computadora seleccionando una opción que supere la suya según las siguientes reglas: Piedra vence a Tijera, Tijera vence a Papel, y Papel vence a Piedra. Si ambos seleccionan la misma opción, el resultado será un empate. Cada victoria suma un punto al jugador correspondiente. ¡Gana quien logre la mayor cantidad de puntos!";
      msg.text +=
        "Navegación por voz. Para garantizar una experiencia inclusiva, el juego integra mensajes de voz que te guían en cada etapa. Estos mensajes se activan al seleccionar una opción (Piedra, Papel o Tijera), mostrar el resultado del turno (ganaste, perdiste o empate), e informar las puntuaciones actuales de ambos jugadores. Si utilizas un lector de pantalla, el juego es totalmente compatible y te mantendrá informado en todo momento.";
      msg.text +=
        "Interacción y jugabilidad. Selecciona una opción: Piedra, Papel o Tijera. La computadora elegirá automáticamente su jugada. Observa los resultados en pantalla y escucha los mensajes de voz: Tu elección, Elección de la computadora, Resultado del turno. Las puntuaciones se actualizarán después de cada ronda.";
      msg.text +=
        "Características del juego. Puntuación Automática: El sistema lleva un registro automático de los puntos de ambos jugadores. Mensajes de Voz: Diseñado para personas ciegas, los mensajes te informan cada detalle importante del juego. Interfaz Visual Intuitiva: Incluye botones grandes y claros para cada opción. Imágenes Representativas: Cada elección de la computadora se muestra con una imagen relacionada.";
      msg.text +=
        "Recomendaciones y consejos. Planifica tus Movimientos: Aunque el juego es de azar, puedes observar patrones en las elecciones de la computadora. Escucha los Mensajes de Voz: Estos te mantendrán informado del estado del juego y de las jugadas de la computadora. Reinicia si es Necesario: Si el juego presenta algún problema, simplemente recarga la página para reiniciar. Diviértete: Recuerda que el objetivo principal es disfrutar del juego.";
      msg.text +=
        "Solución de problemas. Si experimentas dificultades, considera lo siguiente: Problema de Audio: Asegúrate de que el volumen de tu dispositivo esté activado y que la función de voz esté habilitada. Error en la Interfaz: Recarga la página para reiniciar el juego. Problemas con los Controles: Verifica que estés haciendo clic en las opciones correctas.";
    } else if (element === hearBasicRulesButton) {
      msg.text =
        "El objetivo es vencer a la computadora seleccionando una opción que supere la suya según las siguientes reglas: Piedra vence a Tijera, Tijera vence a Papel, y Papel vence a Piedra. Si ambos seleccionan la misma opción, el resultado será un empate. Cada victoria suma un punto al jugador correspondiente. ¡Gana quien logre la mayor cantidad de puntos!";
    } else if (element === voiceNavigatorButton) {
      msg.text =
        "Para garantizar una experiencia inclusiva, el juego integra mensajes de voz que te guían en cada etapa. Estos mensajes se activan al seleccionar una opción (Piedra, Papel o Tijera), mostrar el resultado del turno (ganaste, perdiste o empate), e informar las puntuaciones actuales de ambos jugadores. Si utilizas un lector de pantalla, el juego es totalmente compatible y te mantendrá informado en todo momento.";
    } else if (element === interactionButton) {
      msg.text =
        "Selecciona una opción: Piedra, Papel o Tijera. La computadora elegirá automáticamente su jugada. Observa los resultados en pantalla y escucha los mensajes de voz: Tu elección, Elección de la computadora, Resultado del turno. Las puntuaciones se actualizarán después de cada ronda.";
    } else if (element === characteristicsButton) {
      msg.text =
        "Puntuación Automática: El sistema lleva un registro automático de los puntos de ambos jugadores. Mensajes de Voz: Diseñado para personas ciegas, los mensajes te informan cada detalle importante del juego. Interfaz Visual Intuitiva: Incluye botones grandes y claros para cada opción. Imágenes Representativas: Cada elección de la computadora se muestra con una imagen relacionada.";
    } else if (element === tipsButton) {
      msg.text =
        "Planifica tus Movimientos: Aunque el juego es de azar, puedes observar patrones en las elecciones de la computadora. Escucha los Mensajes de Voz: Estos te mantendrán informado del estado del juego y de las jugadas de la computadora. Reinicia si es Necesario: Si el juego presenta algún problema, simplemente recarga la página para reiniciar. Diviértete: Recuerda que el objetivo principal es disfrutar del juego.";
    } else if (element === solutionsButton) {
      msg.text =
        "Si experimentas dificultades, considera lo siguiente: Problema de Audio: Asegúrate de que el volumen de tu dispositivo esté activado y que la función de voz esté habilitada. Error en la Interfaz: Recarga la página para reiniciar el juego. Problemas con los Controles: Verifica que estés haciendo clic en las opciones correctas.";
    }

    speechSynthesis.speak(msg);
  }

  function wellcome() {
    const msg = new SpeechSynthesisUtterance(
      "Bienvenido al manual de usuario del jueguito 2. Piedra, papel o tijeras"
    );
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
  solutionsButton.addEventListener("mouseover", () =>
    announceCellState(solutionsButton)
  );

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
  solutionsButton.addEventListener("focus", () =>
    announceCellState(solutionsButton)
  );

  hearAllButton.addEventListener("click", () => {
    hearManual(hearAllButton);
  });

  hearWelcomeButton.addEventListener("click", () => {
    hearManual(hearWelcomeButton);
  });

  hearHowToPlayButton.addEventListener("click", () => {
    hearManual(hearHowToPlayButton);
  });

  hearBasicRulesButton.addEventListener("click", () => {
    hearManual(hearBasicRulesButton);
  });

  voiceNavigatorButton.addEventListener("click", () => {
    hearManual(voiceNavigatorButton);
  });

  interactionButton.addEventListener("click", () => {
    hearManual(interactionButton);
  });

  characteristicsButton.addEventListener("click", () => {
    hearManual(characteristicsButton);
  });

  tipsButton.addEventListener("click", () => {
    hearManual(tipsButton);
  });
  solutionsButton.addEventListener("click", () => {
    hearManual(solutionsButton);
  });

  manual.addEventListener("mouseover", () => announceCellState(manual));
  manual.addEventListener("focus", () => announceCellState(manual));

  wellcome();
});
