const cardsArray = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🍉'];
let cards = [...cardsArray, ...cardsArray]; // Duplicar las cartas para hacer parejas
let firstCard = null;
let secondCard = null;
let moves = 0;
let lockBoard = false; // Evita que se puedan voltear más cartas mientras se chequean dos

const memoryBoard = document.getElementById('memory-board');
const movesCounter = document.getElementById('moves');

// Mezclar cartas
cards = cards.sort(() => 0.5 - Math.random());

// Crear el tablero con cartas
cards.forEach(cardValue => {
    const cardElement = createCard(cardValue);
    memoryBoard.appendChild(cardElement);
});

function createCard(cardValue) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.value = cardValue;
    cardElement.addEventListener('click', flipCard);
    return cardElement;
}

function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.innerText = this.dataset.value;

    if (!firstCard) {
        // Si no hay una carta volteada, guarda esta como la primera
        firstCard = this;
    } else {
        // Segunda carta volteada
        secondCard = this;
        lockBoard = true; // Bloquea el tablero mientras se chequean las cartas
        checkMatch();
    }
}

function checkMatch() {
    moves++;
    movesCounter.innerText = `Movimientos: ${moves}`;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        // Si coinciden, marcarlas como "matched"
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetCards();
        checkIfGameWon(); // Llamamos la función para verificar si todas las cartas están emparejadas
    } else {
        // Si no coinciden, voltea ambas de nuevo
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerText = '';
            secondCard.innerText = '';
            resetCards();
        }, 1000);
    }
}

function checkIfGameWon() {
    const matchedCards = document.querySelectorAll('.matched');
    if (matchedCards.length === cards.length) {
        setTimeout(() => {
            alert(`¡Felicidades! Completaste el juego en ${moves} movimientos.`);
            resetGame();
        }, 500);
    }
}

function resetGame() {
    // Reiniciar el juego
    memoryBoard.innerHTML = ''; // Vaciar el tablero
    moves = 0;
    movesCounter.innerText = `Movimientos: 0`;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    
    // Reordenar las cartas y volver a crearlas
    cards = cards.sort(() => 0.5 - Math.random());
    cards.forEach(cardValue => {
        const cardElement = createCard(cardValue);
        memoryBoard.appendChild(cardElement);
    });
}

function resetCards() {
    // Reinicia las variables para las cartas
    firstCard = null;
    secondCard = null;
    lockBoard = false; // Desbloquea el tablero para la siguiente jugada
}
