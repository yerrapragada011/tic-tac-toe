const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', '']
  const status = document.querySelector('.status')

  const getBoard = () => [...board]

  const markCell = (index, marker) => {
    if (board[index] === '') {
      board[index] = marker
      return true
    }
    return false
  }

  const checkWinner = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (const condition of winConditions) {
      const [a, b, c] = condition
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }

    if (!board.includes('')) {
      return 'tie'
    }

    return null
  }

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = ''
    }
    status.textContent = ''
  }

  return { getBoard, markCell, checkWinner, resetBoard }
})()

const gameController = (() => {
  let currentPlayer = 'X'

  const getCurrentPlayer = () => currentPlayer

  const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
  }

  return { getCurrentPlayer, switchPlayer }
})()

const displayController = (() => {
  const cells = document.querySelectorAll('.cell')
  const status = document.querySelector('.status')
  const resetBtn = document.getElementById('reset')
  const startBtn = document.getElementById('start')
  const boardDisplay = document.getElementById('board')
  const resetBtnDisplay = document.querySelector('.reset-btn-container')
  const startBtnDisplay = document.querySelector('.start-btn-container')
  const playerTurn = document.querySelector('.player-turn')
  let player1 = ''
  let player2 = ''

  const getPlayerNames = () => {
    player1 = prompt('Enter name for player 1: ')
    player2 = prompt('Enter name for player 2: ')
    render()
  }

  const render = () => {
    playerTurn.textContent = `${
      gameController.getCurrentPlayer() === 'X' ? player1 : player2
    }'s turn`
    const board = gameBoard.getBoard()
    cells.forEach((cell, index) => {
      cell.textContent = board[index]
      cell.classList.remove('cross', 'circle')
      if (board[index] === 'X') {
        cell.classList.add('cross')
      } else if (board[index] === 'O') {
        cell.classList.add('circle')
      }
    })
  }

  const setDisabled = () => {
    cells.forEach((cell) => {
      cell.style.pointerEvents = 'none'
    })
  }

  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      if (!cell.textContent) {
        const index = cell.dataset.index
        const currentPlayer = gameController.getCurrentPlayer()
        if (gameBoard.markCell(index, currentPlayer)) {
          render()
          const winner = gameBoard.checkWinner()
          if (winner) {
            if (winner === 'tie') {
              status.textContent = `It's a tie!`
              setDisabled()
            } else {
              const winningPlayer = winner === 'X' ? player1 : player2
              status.textContent = `${winningPlayer} wins!`
              setDisabled()
            }
          } else {
            gameController.switchPlayer()
            render()
          }
        }
      }
    })
  })

  resetBtn.addEventListener('click', () => {
    gameBoard.resetBoard()
    boardDisplay.style.display = 'none'
    resetBtnDisplay.style.display = 'none'
    startBtnDisplay.style.display = 'grid'
    playerTurn.style.display = 'none'
  })

  startBtn.addEventListener('click', () => {
    getPlayerNames()
    boardDisplay.style.display = 'grid'
    resetBtnDisplay.style.display = 'grid'
    startBtnDisplay.style.display = 'none'
    playerTurn.style.display = 'grid'
  })

  return { render }
})()

displayController.render()
