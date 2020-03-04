document.addEventListener('DOMContentLoaded', startGame)

var board = {
  cells: [
    {row: 0, col: 0, isMine: true, hidden: true},
    {row: 0, col: 1, isMine: false, hidden: true},
    {row: 0, col: 2, isMine: false, hidden: true},
    {row: 1, col: 0, isMine: false, hidden: true},
    {row: 1, col: 1, isMine: true, hidden: true},
    {row: 1, col: 2, isMine: false, hidden: true},
    {row: 2, col: 0, isMine: false, hidden: true},
    {row: 2, col: 1, isMine: true, hidden: true},
    {row: 2, col: 2, isMine: false, hidden: true}]
}

function startGame () {
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)

  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

function checkForWin () {
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
      return
    }

    if (!board.cells[i].isMine && board.cells[i].hidden) {
      return
    }
  }

  lib.displayMessage('You win!')
}

function countSurroundingMines (cell) {
  var surroundingCells = getSurroundingCells(cell.row, cell.col)

  var mineCount = 0

  for (var i = 0; i < surroundingCells.length; i++) {
    if (surroundingCells[i].isMine) {
      mineCount++
    }
  }

  return mineCount
}

