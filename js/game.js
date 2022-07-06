let icons = [];
let selectedCards = [];
let totalCards = 24;
let minutes = 0;
let seconds = 0;
let intervalId;
let time = document.getElementById('time-game');
let textGame = document.getElementById('text-game');
let buttonGame = document.getElementById('button-game');
textGame.innerHTML = "🤗 Bienvenido 🤗"

// Función para establecer los iconos
function setIcons() {
  icons = [
    '<i class="fas fa-star"></i>',
    '<i class="fas fa-meteor"></i>',
    '<i class="fas fa-guitar"></i>',
    '<i class="fas fa-drum"></i>',
    '<i class="fas fa-code"></i>',
    '<i class="fas fa-music"></i>',
    '<i class="fas fa-money-bill"></i>',
    '<i class="fas fa-cat"></i>',
    '<i class="fas fa-plane"></i>',
    '<i class="fas fa-gamepad"></i>',
    '<i class="fas fa-dice-three"></i>',
    '<i class="fas fa-ghost"></i>',
  ];
}

// Función para inciar el juego
function startGame() {
  textGame.innerHTML = "Tiempo de juego";
  buttonGame.style.cursor = "no-drop";
  buttonGame.setAttribute('disabled', '');
  generateBoard();
}

// Función para generar el tablero de juego
function generateBoard() {
  startTime(true);
  setIcons();
  selectedCards = [];
  const board = document.getElementById('board');
  const cards = [];
  for (let x = 0; x < totalCards ; x++) {
    cards.push(`
    <div class="card-area" onclick="selectCard(${x})">
      <div class="card" id="card${x}">
        <div class="face-card back" id="back-face${x}">
          ${icons[0]}
        </div>
        <div class="face-card front">
          <i class="fas fa-question"></i>
        </div>
      </div>
    </div>
    `);
    if(x%2==1) {
      icons.splice(0, 1);
    }
  }
  cards.sort(() => Math.random() - 0.5);
  board.innerHTML = cards.join(" ");
}

// Función para seleccionar tarjeta
function selectCard(idCard) {
  let card = document.getElementById(`card${idCard}`);
  if (card.style.transform != "rotateY(180deg)") {
    card.style.transform = "rotateY(180deg)"
    selectedCards.push(idCard);
  }

  if (selectedCards.length == 2) {
    removeSelectedCards(selectedCards);
    selectedCards = [];
  }
}

// Funciones para eliminar las cartas seleccionadas
function removeSelectedCards(cardsSelected) {
  setTimeout(() => {
    let backCard1 = document.getElementById(`back-face${cardsSelected[0]}`);
    let backCard2 = document.getElementById(`back-face${cardsSelected[1]}`);
    if (backCard1.innerHTML != backCard2.innerHTML) {
      let card1 = document.getElementById(`card${cardsSelected[0]}`);
      let card2 = document.getElementById(`card${cardsSelected[1]}`);

      card1.style.transform = "rotateY(0deg)";
      card2.style.transform = "rotateY(0deg)";
    } else {
      backCard1.style.background = "gray";
      backCard2.style.background = "gray";
    }

    if (endGame()) {
      textGame.innerHTML = `Terminaste con un tiempo de ${minutes} minuto/s con ${seconds - 1} segundo/s`;
      time.innerHTML = "😎 Terminaste 😎";
      buttonGame.style.cursor = "pointer";
      buttonGame.removeAttribute('disabled', '');
      clearInterval(intervalId);
    }
  }, 1000);
}

// Función del control del tiempo
function startTime() {
  minutes = 0;
  seconds = 0;
  time.innerHTML = "00:00"
    setTimeout(() => {
      intervalId = setInterval(() => {        
          if (seconds < 10) {
            time.innerHTML = `0${minutes}:0${seconds}`;
          }else {
            time.innerHTML = `0${minutes}:${seconds}`;
          }
      
          if (seconds > 59) {
            seconds = 0;
            time.innerHTML = `0${minutes = minutes + 1}:0${seconds}`;
          }
      
          if (minutes >= 10) {
            time.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
          }
          seconds++;
      }, 1000);
    }, 3000);
}

// Función para finalizar el juego
function endGame() {
  for (let x = 0; x < totalCards; x++) {
    let backCard = document.getElementById(`back-face${x}`);
    if (backCard.style.background != 'gray') {
      return false;
    }
  }
  return true;
}