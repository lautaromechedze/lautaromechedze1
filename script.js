const cardsArray = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🍉'];
let cardValues = [...cardsArray, ...cardsArray]; // Duplicamos las cartas
let cardsChosen = [];
let cardsChosenId = [];
let moves = 0;
let matchedCards = [];
let startTime, timerInterval;
let timerStarted = false; // Variable para controlar si el cronómetro ha comenzado
const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const winMessage = document.getElementById('winMessage');
const overlay = document.getElementById('overlay');

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

    // Iniciar el cronómetro en el primer clic
    if (!timerStarted) {
        startTimer();
        timerStarted = true; // Marcar que el cronómetro ha comenzado
    }

    if (cardsChosenId.length < 2 && !matchedCards.includes(cardId) && !cardsChosenId.includes(cardId)) {
        selected.textContent = cardValues[cardId];
        selected.classList.add('flipped');
        cardsChosen.push(cardValues[cardId]);
        cardsChosenId.push(cardId);
        if (cardsChosen.length === 2) {
            setTimeout(checkMatch, 500); // Verificar si hay un par
        }
    }
}

// Función para mostrar el mensaje de victoria
function showWinMessage() {
    winMessage.classList.add('show');
    overlay.classList.add('show');

    // Agregar efecto de desvanecimiento al mensaje de victoria
    winMessage.style.opacity = '1'; 
    setTimeout(() => {
        winMessage.style.opacity = '0'; // Comenzar a desvanecer
    }, 1000); // Esperar un segundo antes de comenzar a desvanecer

    // Esperar a que se desvanezca y luego reiniciar el juego
    setTimeout(() => {
        winMessage.classList.remove('show');
        overlay.classList.remove('show');
        resetGame(); // Reiniciar el juego
    }, 3000); // Tiempo total hasta reiniciar el juego
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
        clearInterval(timerInterval); // Detener el cronómetro
        showWinMessage();
    }
}

// Función para iniciar el cronómetro
function startTimer() {
    startTime = Date.now(); // Obtener el tiempo actual
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000); // Calcular el tiempo transcurrido
        const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0'); // Obtener minutos
        const seconds = String(elapsed % 60).padStart(2, '0'); // Obtener segundos
        timerDisplay.textContent = `Tiempo: ${minutes}:${seconds}`; // Mostrar el tiempo
    }, 1000);
}

// Función para reiniciar el juego
function resetGame() {
    moves = 0;
    movesDisplay.textContent = `Movimientos: ${moves}`;
    matchedCards = [];
    timerStarted = false; // Reiniciar el estado del cronómetro
    timerDisplay.textContent = 'Tiempo: 00:00'; // Reiniciar el cronómetro
    clearInterval(timerInterval); // Limpiar el intervalo del cronómetro
    createBoard(); // Crear el tablero nuevamente
}

// Iniciar el juego
createBoard();
