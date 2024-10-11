const cardsArray = ['🪐', '🌌', '✨', '🌠', '🌍', '🌈', '🌊', '🌞'];
let cardValues = [...cardsArray, ...cardsArray]; // Duplicamos las cartas
let cardsChosen = [];
let cardsChosenId = [];
let moves = 0;
let matchedCards = [];
const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const winMessage = document.getElementById('winMessage');

// Cargar los sonidos
const clickSound = new Audio('click.mp3');
const successSound = new Audio('success.mp3');

// Función para crear el tablero de juego
function createBoard() {
    cardValues.sort(() => 0.5 - Math.random()); // Mezclar cartas
    gameBoard.innerHTML = ''; // Limpiar el tablero
    for (let i = 0; i < cardValues.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    }
}

// Función para voltear la carta
function flipCard() {
    const selected = this;
    const cardId = selected.getAttribute('data-id');

    if (cardsChosenId.length < 2 && !matchedCards.includes(cardId) && !cardsChosenId.includes(cardId)) {
        selected.textContent = cardValues[cardId];
        selected.classList.add('flipped');
        cardsChosen.push(cardValues[cardId]);
        cardsChosenId.push(cardId);
        clickSound.play(); // Reproducir sonido de clic

        if (cardsChosen.length === 2) {
            setTimeout(checkMatch, 500); // Verificar si hay un par
        }
    }
}

// Función para mostrar el mensaje de victoria
function showWinMessage() {
    winMessage.classList.add('show');
    successSound.play(); // Reproducir sonido de éxito

    // Reiniciar el juego con el botón
    document.getElementById('play-again').onclick = () => {
        clickSound.play(); // Reproducir sonido de clic
        winMessage.classList.remove('show'); // Ocultar el mensaje
        resetGame(); // Reiniciar el juego
    };
}


// Función para verificar si las cartas seleccionadas son iguales
function checkMatch() {
    const cards = document.querySelectorAll('.card');
    const [firstCardId, secondCardId] = cardsChosenId;

    if (cardsChosen[0] === cardsChosen[1]) {
        matchedCards.push(firstCardId, secondCardId);
        cards[firstCardId].classList.add('matched');
        cards[secondCardId].classList.add('matched');
        cards[firstCardId].removeEventListener('click', flipCard);
        cards[secondCardId].removeEventListener('click', flipCard);
    } else {
        cards[firstCardId].textContent = '';
        cards[secondCardId].textContent = '';
        cards[firstCardId].classList.remove('flipped');
        cards[secondCardId].classList.remove('flipped');
    }
    moves++;
    movesDisplay.textContent = `Movimientos: ${moves}`;
    cardsChosen = [];
    cardsChosenId = [];

    // Comprobar si el juego ha terminado
    if (matchedCards.length === cardValues.length) {
        showWinMessage();
    }
}

// Función para reiniciar el juego
function resetGame() {
    moves = 0;
    movesDisplay.textContent = `Movimientos: ${moves}`;
    matchedCards = [];
    createBoard(); // Crear el tablero nuevamente
}

// Iniciar el juego
createBoard();