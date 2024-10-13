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

const settingsBtn = document.getElementById('settings-btn');
const settingsMenu = document.getElementById('settings-menu');
const closeSettingsBtn = document.getElementById('close-settings');
const volumeControl = document.getElementById('volume-control');
const bgSelector = document.getElementById('bg-selector');

// Mostrar/ocultar el menú de configuración
settingsBtn.onclick = () => {
    settingsMenu.style.display = 'block';
};

closeSettingsBtn.onclick = () => {
    settingsMenu.style.display = 'none';
};

// Ajustar el volumen de los sonidos
volumeControl.oninput = (e) => {
    const volume = e.target.value;
    clickSound.volume = volume;
    successSound.volume = volume;
};

// Cambiar el fondo del juego
bgSelector.onchange = (e) => {
    const bgValue = e.target.value;
    if (bgValue === 'fondo1') {
        document.body.style.backgroundImage = "url('A_vibrant_and_colorful_abstract_background_for_a_m3.png')";
    } else if (bgValue === 'fondo2') {
        document.body.style.backgroundImage = "url('A_vibrant_and_colorful_abstract_background_for_a_m2.png')";
    } else {
        document.body.style.backgroundImage = "url('A_vibrant_and_colorful_abstract_background_for_a_m.png')";
    }
};

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    confettiContainer.style.display = 'block'; // Mostrar el contenedor de confeti

    for (let i = 0; i < 100; i++) { // Cambia la cantidad de confeti si lo deseas
        const confettiPiece = document.createElement('div');
        confettiPiece.classList.add('confetti-piece');
        confettiPiece.style.backgroundColor = getRandomColor(); // Color aleatorio
        confettiPiece.style.left = Math.random() * 100 + 'vw'; // Posición aleatoria
        confettiPiece.style.animationDuration = Math.random() * 3 + 2 + 's'; // Duración aleatoria
        confettiPiece.style.opacity = Math.random(); // Opacidad aleatoria
        confettiContainer.appendChild(confettiPiece);
    }

    setTimeout(() => {
        confettiContainer.style.display = 'none'; // Ocultar confeti después de un tiempo
        confettiContainer.innerHTML = ''; // Limpiar confeti
    }, 3000); // Cambia el tiempo si es necesario
}

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

// Función para mostrar el mensaje de victoria
function showWinMessage() {
    winMessage.classList.add('show');
    successSound.play(); // Reproducir sonido de éxito

    // Mostrar el contenedor de confeti
    const confettiContainer = document.getElementById('confetti');
    confettiContainer.style.display = 'block'; // Mostrar el contenedor

    // Aquí puedes llamar a la función de confeti
    createConfetti(); // Asumiendo que tienes una función para generar el confeti

    // Reiniciar el juego con el botón
    document.getElementById('play-again').onclick = () => {
        clickSound.play(); // Reproducir sonido de clic
        winMessage.classList.remove('show'); // Ocultar el mensaje
        confettiContainer.style.display = 'none'; // Ocultar confeti al reiniciar
        resetGame(); // Reiniciar el juego
    };
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