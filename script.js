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
//   const startBtn = document.querySelector('.start-btn-container')

  const render = () => {
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
            } else {
              status.textContent = `${winner} wins!`
            }
            resetBtn.addEventListener('click', () => {
              gameBoard.resetBoard()
              render()
            })
          } else {
            gameController.switchPlayer()
          }
        }
      }
    })
  })

  return { render }
})()

displayController.render()
