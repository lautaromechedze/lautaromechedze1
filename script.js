const cardsArray = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🍉'];
let cardValues = [...cardsArray, ...cardsArray]; // Duplicamos las cartas
let cardsChosen = [];
let cardsChosenId = [];
let moves = 0;
let matchedCards = [];
const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');

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

function checkMatch() {
    const cards = document.querySelectorAll('.card');
    const [firstCardId, secondCardId] = cardsChosenId;

    if (cardsChosen[0] === cardsChosen[1]) {
        matchedCards.push(firstCardId, secondCardId);
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
        resetGame(); // Llama a resetGame sin mostrar un mensaje
    }
}

function resetGame() {
    setTimeout(() => {
        matchedCards = [];
        moves = 0;
        movesDisplay.textContent = `Movimientos: ${moves}`;
        gameBoard.innerHTML = '';
        createBoard();
    }, 3000);
}

createBoard();
