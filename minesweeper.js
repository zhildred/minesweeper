document.addEventListener('DOMContentLoaded', startGame)

function startGame () {
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
  document.getElementById('reset-button').addEventListener('click', resetBoard)

  generateBoard(5, 5, 5)

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

function generateBoard (rows, columns, mines) {
  board = { cells: [] }

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      board.cells.push( {
        row: i,
        col: j,
        isMine: false,
        hidden: true,
        isMarked: false,
      } )
    }
  }

  while (mines != 0) {
    randomCell = Math.floor(Math.random() * (rows * columns))

    if (!board.cells[randomCell].isMine) {
      board.cells[randomCell].isMine = true
      mines--
    }
  }

  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
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

//ADD a button and interface
function resetBoard () {
  var gameBoard = document.getElementsByClassName('board')[0]
  gameBoard.innerHTML = ''

  generateBoard(5, 5, 5)

  lib.initBoard()
}
