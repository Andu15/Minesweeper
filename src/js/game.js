const finalScoreElement = document.querySelector("#finalScore");
const gameBoardElement = document.querySelector(".game-board");
const errorMessageElement = document.querySelector("#error-message");
const btnNewGameElement = document.querySelector(".btn-new-game");
const bombsTotalCounter = document.querySelector(".bombs-total-counter");
const bombsFoundCounter = document.querySelector(".bombs-found-counter");

const gridsNumber = JSON.parse(sessionStorage.getItem('gridsNumber'));
const totalGrids = Math.pow(gridsNumber, 2);

const gameBoardArray = [];
const scoreUnit = totalGrids / gridsNumber;
let score = 0;
let countBombs;

let isActivateGame = true;

fillBoard();
createBoxDinamic();

function createBoxDinamic() {
  let buttonElemnts = "";

  for (let i = 0; i < totalGrids; i++) {
    buttonElemnts += `<button id=${i} class="box"></button>`;
  }

  gameBoardElement.innerHTML = buttonElemnts;

  // const gridSize = Math.sqrt(totalGrids);
  gameBoardElement.style.gridTemplateColumns = `repeat(${gridsNumber}, 1fr)`;
  gameBoardElement.style.gridTemplateRows = `repeat(${gridsNumber}, 1fr)`;

  const boxButtonElements = document.querySelectorAll(".box");

  if(isActivateGame){
    boxButtonElements.forEach((boxElement) => {
      boxElement.addEventListener("click", requestCoordinates);
    });
  }
}

// Crea una función que rellene de manera aleatoria la matriz del tablero, donde se pueda determinar el número de bombas a colocar.
function fillBoard() {
  const BombsNumber = gridsNumber;
  gameBoardArray.length = totalGrids; // Reiniciar la matriz del tablero

  // Rellenar la matriz del tablero con espacios vacíos
  for (let i = 0; i < totalGrids; i++) {
    gameBoardArray[i] = " ";
  }
  // Colocar las bombas de manera aleatoria
  let placedBombs = 0;
  while (placedBombs < BombsNumber) {
    const bombsRandomPosition = Math.floor(Math.random() * totalGrids);

    if (gameBoardArray[bombsRandomPosition] !== "💣") {
      gameBoardArray[bombsRandomPosition] = "💣";
      placedBombs++;
    }
  }
  countBombs = placedBombs;
  bombsTotalCounter.textContent = placedBombs;
}

// solicitar coordenadas
function requestCoordinates(event) {
  getCoordinates(event.target.id)
}

// convertir el indice en coordenadas
function getCoordinates(index) {
  const x = (index % gridsNumber) + 1;
  const y = Math.floor(index / gridsNumber) + 1;
  validateCoordinates(x, y);
}

// determine si las coordenadas serián válidas para el tamaño de tu tablero de juego
function validateCoordinates(x, y) {
  validateBombPositions(x, y)
}

//evalúe si en la posición de la matriz ingresada por coordenadas hay una bomba o no y le indique al usuario con un alert si exploto una bomba, en caso de que no lo haga deberá pedir otra coordenada.
function validateBombPositions(x, y) {
  let indexInArray = (x + gridsNumber * (y - 1)) - 1;
  findBoxElement(indexInArray);

  if (gameBoardArray[indexInArray] === "💣") {
    countBombs--
    finalScoreElement.textContent = score;
    errorMessageElement.textContent = "Exploto la bomba, perdiste";
    isActivateGame = false;
    disableButtons();
  } else {
    score += scoreUnit;
    finalScoreElement.textContent = score;
    const adjacentBombCount = countAdjacentBombs(x, y);
    errorMessageElement.textContent = `No hay bomba. Bombas adyacentes: ${adjacentBombCount}`;
  }

  // if (countBombs === 0) {
  //   disableButtons();
  //   return;
  // }
}

// Crea una función que determine el número de bombas adyacentes a la coordenada que se acaba de ingresar.
function countAdjacentBombs(x, y) {
  const bombSymbol = "💣";
  
  let count = 0;

  // Coordenadas adyacentes (8 direcciones)
  const adjacentCoordinates = [
    { dx: -1, dy: -1 },  // Arriba izquierda
    { dx: 0, dy: -1 },   // Arriba
    { dx: 1, dy: -1 },   // Arriba derecha
    { dx: -1, dy: 0 },   // Izquierda
    { dx: 1, dy: 0 },    // Derecha
    { dx: -1, dy: 1 },   // Abajo izquierda
    { dx: 0, dy: 1 },    // Abajo
    { dx: 1, dy: 1 },    // Abajo derecha
  ];

  for (let i = 0; i < adjacentCoordinates.length; i++) {
    const { dx, dy } = adjacentCoordinates[i];

    const newX = x + dx;
    const newY = y + dy;

    if (newX >= 1 && newX <= gridsNumber && newY >= 1 && newY <= gridsNumber) {
      const indexInArray = (newX - 1) + gridsNumber * (newY - 1);

      if (gameBoardArray[indexInArray] === bombSymbol) {
        count++;
      }
    }
  }

  return count;
}

// función para desactivar botones
function disableButtons() {
  toggleBoxElements(true)
}

// función para activar una nueva partida
function activateGame() {
  // score = 0;
  // clearBoxes();
  // finalScoreElement.textContent = score;
  // errorMessageElement.textContent = "";
  // createBoxDinamic();
  location.reload();
}

// función para recorrer el nodo de elementos
function toggleBoxElements(bolean) {
  const boxButtonElements = document.querySelectorAll(".box");

  boxButtonElements.forEach((boxElement) => {
    boxElement.disabled = bolean;
  });
}

// funcion para encontrar el elemento seleccionado
function findBoxElement(index) {
  const boxButtonElements = document.querySelectorAll(".box");

  boxButtonElements.forEach((box) => {
    if (Number(box.id) === Number(index)) {
      box.disabled = true;
      box.textContent = gameBoardArray[index] === "💣" ? gameBoardArray[index] : "ⓧ"
    }
  });
}

function clearBoxes() {
  const boxButtonElements = document.querySelectorAll(".box");

  boxButtonElements.forEach((boxElement) => {
    boxElement.textContent = "";
    boxElement.disabled = false;
  });
}

btnNewGameElement.addEventListener("click", activateGame);