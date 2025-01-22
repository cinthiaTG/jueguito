document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".celda");

    // Función para verificar si el navegador soporta SpeechSynthesis
    function isSpeechSynthesisAvailable() {
        return typeof speechSynthesis !== "undefined" && typeof SpeechSynthesisUtterance !== "undefined";
    }

    // Función para verificar el estado de la celda
    function checkCellState(cell) {
        const index = cell.dataset.index;
        const cellValue = board[index];
        let message = "";

        if (cellValue === null) {
            message = "La celda está vacía";
        } else if (cellValue === "X") {
            message = "Celda ocupada por X";
        } else if (cellValue === "O") {
            message = "Celda ocupada por O";
        }

        if (isSpeechSynthesisAvailable()) {
            speakMessage(message); // Solo habla si está disponible la síntesis de voz
        } else {
            console.log(message); // En caso de no ser compatible, muestra el mensaje en la consola
        }
    }

    // Función para que el navegador lea en voz alta el mensaje
    function speakMessage(message) {
        const utterance = new SpeechSynthesisUtterance(message);
        speechSynthesis.speak(utterance);
    }

    // Array para almacenar el estado del tablero
    let board = Array(9).fill(null);

    // Evento de clic en las celdas
    cells.forEach(cell => {
        cell.addEventListener("click", (e) => {
            checkCellState(e.target);
        });
    });
});
