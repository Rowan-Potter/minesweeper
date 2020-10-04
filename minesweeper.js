document.addEventListener('DOMContentLoaded', startGame);
document.addEventListener("click", checkForWin);
document.addEventListener("contextmenu", checkForWin);

// Define your `board` object here!
var board = { cells: [] };
let boardSize = 6;

function newBoard() {
 for (let i = 0; i < boardSize; i++) {
   for (let j = 0; j < boardSize; j++) {
     board.cells.push({
       row: i,
       col: j,
       isMine: Math.random()>= 0.8,
       hidden: true,
       isMarked: false,
     });
   }
 }
}

function startGame () {
//create a loop, loop should loop through contents of board.
  newBoard();
  lib.initBoard();
  for (let i = 0; i < board.cells.length; i++) {
    countSurroundingMines(board.cells[i]);
  }
}


// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
   let boardWhite = 0;
   let boardMarks = 0;
   for (let i = 0; i < board.cells.length; i++) {
     if (board.cells[i].isMine == true && board.cells[i].isMarked == true) {
       boardMarks++;
     }
     if (board.cells[i].isMine == false && board.cells[i].hidden == false) {
       boardWhite++;
     }
   }
   if (boardWhite + boardMarks == board.cells.length) {
     lib.displayMessage("You Win!");
   }

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  let counter = 0;
  for (let i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine == true) {
      counter++;
    }
  }
  cell.surroundingMines = counter;
}
