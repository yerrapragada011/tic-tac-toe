const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', '']

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
  }

  return { getBoard, markCell, checkWinner, resetBoard }
})()
