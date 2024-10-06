const cardsArray = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🍉'];
let cardValues = [...cardsArray, ...cardsArray]; // Duplicamos las cartas
let cardsChosen = [];
let cardsChosenId = [];
let moves = 0;
let matchedCards = [];
const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const winMessage = document.createElement('div');
winMessage.id = 'winMessage';
winMessage.textContent = '¡Felicidades! ¡Has ganado!';
document.body.appendChild(winMessage);

const overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);

function createBoard() {
    cardValues.sort(() => 0.5 - Math.random()); // Mezclar cartas
    for (let i = 0; i < cardValues.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    }
}

function flipCard() {
    const selected = this;
    const cardId = selected.getAttribute('data-id');

    if (cardsChosenId.length < 2 && !matchedCards.includes(cardId) && !cardsChosenId.includes(cardId)) {
        selected.textContent = cardValues[cardId];
        selected.classList.add('flipped');
        cardsChosen.push(cardValues[cardId]);
        cardsChosenId.push(cardId);
        if (cardsChosen.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function showWinMessage() {
    winMessage.classList.add('show');
    overlay.classList.add('show');

    // Agregar clase de desvanecimiento para el mensaje de victoria
    winMessage.style.opacity = '1'; 
    setTimeout(() => {
        winMessage.style.opacity = '0'; // Comenzar a desvanecer
    }, 1000); // Esperar un segundo antes de comenzar a desvanecer

    // Esperar a que se desvanecen y luego reiniciar el juego
    setTimeout(() => {
        winMessage.classList.remove('show');
        overlay.classList.remove('show');
        resetGame();
    }, 3000); // Tiempo total hasta reiniciar el juego
}

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
    
    cardsChosen = [];
    cardsChosenId = [];
    moves++;
    movesDisplay.textContent = `Movimientos: ${moves}`;

    if (matchedCards.length === cardValues.length) {
        setTimeout(() => {
            showWinMessage(); // Mostrar cartel de victoria
        }, 500); // Tiempo de espera antes de mostrar el mensaje
    }
}

function resetGame() {
    matchedCards = [];
    moves = 0;
    movesDisplay.textContent = `Movimientos: ${moves}`;
    gameBoard.innerHTML = '';

    // Reiniciar el juego después de un pequeño retraso
    setTimeout(() => {
        createBoard();
    }, 300); // Tiempo de espera para eliminar las cartas
}

createBoard();
