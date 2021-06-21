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

//An x and o marker that will act as tracker for who is playing

const xMarker = "X";
const oMarker = "O";
//retrieves the data cells that are applied to the .cells divs in index.html

const allCells = document.querySelectorAll("[data-cell]");
const gameBoard = document.getElementById("game-board");
const restartGame = document.getElementById("restart-game");
//variables for the current turn and current css class applied
let currentTurn;
let xclass;

startGame();

//adding click event listener that calls start game function to the reset game button
restartGame.addEventListener("click", startGame);

// gets all the cells from the document and iterates over them in a forEach loop
// A forEach loop is an array method that executes a custom callback function on each item in an array.
// to start the game we reset all of the cells in the list of divs to empty.
// we then remove the event listener click we placed on the cells so they can be clicked again and add it back
function startGame() {
  allCells.forEach((cell) => {
    cell.classList.remove(xMarker);
    cell.classList.remove(oMarker);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
}
// handles the click event that happens when you click on a cell
// starts by grabbing the e.target (event api target)
// then set the current class on the cells check for xclass which if it is there the next class will be O if it
// is not there then we stay on the X xlass. true ? do something Else : do something else
// once we determine a current class and the target cell we then place a marker on the tic tac toe board either "x" or "o"
// everytime we click we check for win or draw based on the value and the position of the value in each cell
// if there is no win we then check for draw else we just swap turns. from "x" to "o"
function handleClick(e) {
  cells = e.target;
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
// the place marker function takes a cell from the event target and the current class which is "x" or "o"
// it then adds the class to that cell using .add()
function placeMarker(cell, currentClass) {
  cell.classList.add(currentClass);
}
// checks for win by using the winning combos array defined in the beginning of this file.
// if the winning combos array returns true for any part of it, it then returns true using .some()
// .some() tests whether at least one element in the array passes the test implemented by the provided function.
// it then grabs every combination that returns true and check that they allCells contain the currentClass returns true
// this is why check win can take a true or false argument.
function checkWin(currentClass) {
  return winningCombos.some((combination) => {
    return combination.every((index) => {
      return allCells[index].classList.contains(currentClass);
    });
  });
}
// takes the xclass and turns it into a non truth value using a ! operator commonly known as a bang operator
function changeTurns() {
  xclass = !xclass;
}
// calculates the results of each game
// once they are calulated it resets the game.
// this function receives its values from the check for wins conditional inside the handle click function
function calculateResults(draw) {
  if (draw) {
    alert("Draw!");
    startGame();
  } else {
    alert(`${xclass ? "O's" : "X's"} Wins! Game will restart shortly!`);
    startGame();
  }
}
// takes the value of all cells array using a spread operator
// you use the spread operator whenever you need to retrieve more than one value or all the values
// we then check every cell to see if they are filled with "xMarker" or oMarker the "||" is how you say "or" in JS
function checkDraw() {
  return [...allCells].every((cell) => {
    return cell.classList.contains(xMarker) || cell.classList.contains(oMarker);
  });
}
