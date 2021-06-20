//these are all possible winning combination for the game.
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const xMarker = "X";
const oMarker = "O";

const allCells = document.querySelectorAll("[data-cell]");
const gameBoard = document.getElementById("game-board");
const restartGame = document.getElementById("restart-game");
let currentTurn;
let xclass;
startGame();
restartGame.addEventListener("click", startGame);

function startGame() {
  console.log("here");
  allCells.forEach((cell) => {
    cell.classList.remove(xMarker);
    cell.classList.remove(oMarker);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
}

function handleClick(e) {
  cells = e.target;
  console.log(cells);
  const currentClass = xclass ? oMarker : xMarker;
  placeMarker(cells, currentClass);
  if (checkWin(currentClass)) {
    calculateResults(false);
  } else if (checkDraw()) {
    calculateResults(true);
  } else {
    changeTurns();
  }
}

function placeMarker(cell, currentClass) {
  cell.classList.add(currentClass);
}

function checkWin(currentClass) {
  return winningCombos.some((combination) => {
    return combination.every((index) => {
      return allCells[index].classList.contains(currentClass);
    });
  });
}

function changeTurns() {
  xclass = !xclass;
}

function calculateResults(draw) {
  if (draw) {
    alert("Draw!");
    startGame();
  } else {
    alert(`${xclass ? "O's" : "X's"} Wins! Game will restart shortly!`);
    startGame();
  }
}

function checkDraw() {
  return [...allCells].every((cell) => {
    return cell.classList.contains(xMarker) || cell.classList.contains(oMarker);
  });
}
