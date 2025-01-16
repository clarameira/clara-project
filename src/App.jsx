import { useState, useEffect } from 'react';
import './App.css';

const boardSize = 8; // Tamanho do tabuleiro (8x8 padrão)

function App() {
  const initializeBoard = () => {
    const board = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(null));

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < boardSize; col++) {
        if ((row + col) % 2 !== 0) board[row][col] = 'B'; // Peças pretas
      }
    }

    for (let row = boardSize - 3; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        if ((row + col) % 2 !== 0) board[row][col] = 'W'; // Peças brancas
      }
    }

    return board;
  };

  const [board, setBoard] = useState(initializeBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('W');
  const [gameOver, setGameOver] = useState(false);

  const isValidMove = (startRow, startCol, endRow, endCol) => {
    if (board[endRow][endCol] !== null) return false;

    const direction = currentPlayer === 'W' ? -1 : 1;
    const rowDiff = endRow - startRow;
    const colDiff = Math.abs(endCol - startCol);

    if (rowDiff === direction && colDiff === 1) return true;

    if (rowDiff === 2 * direction && colDiff === 2) {
      const jumpedRow = (startRow + endRow) / 2;
      const jumpedCol = (startCol + endCol) / 2;
      return board[jumpedRow][jumpedCol] !== null && board[jumpedRow][jumpedCol] !== currentPlayer;
    }

    return false;
  };

  const getValidMoves = (row, col, player) => {
    const direction = player === 'W' ? -1 : 1;
    const moves = [];

    // Verifica movimentos simples
    if (isValidMove(row, col, row + direction, col - 1)) moves.push([row + direction, col - 1]);
    if (isValidMove(row, col, row + direction, col + 1)) moves.push([row + direction, col + 1]);

    // Verifica capturas
    if (isValidMove(row, col, row + 2 * direction, col - 2)) moves.push([row + 2 * direction, col - 2]);
    if (isValidMove(row, col, row + 2 * direction, col + 2)) moves.push([row + 2 * direction, col + 2]);

    return moves;
  };

  const handleCellClick = (row, col) => {
    if (currentPlayer === 'B') return; // Jogador preto é controlado automaticamente

    if (selectedPiece) {
      const [startRow, startCol] = selectedPiece;

      if (isValidMove(startRow, startCol, row, col)) {
        const newBoard = board.map((row) => [...row]);
        newBoard[row][col] = currentPlayer;
        newBoard[startRow][startCol] = null;

        if (Math.abs(row - startRow) === 2) {
          const jumpedRow = (startRow + row) / 2;
          const jumpedCol = (startCol + col) / 2;
          newBoard[jumpedRow][jumpedCol] = null;
        }

        setBoard(newBoard);
        setSelectedPiece(null);
        setCurrentPlayer('B');
      } else {
        setSelectedPiece(null);
      }
    } else if (board[row][col] === currentPlayer) {
      setSelectedPiece([row, col]);
    }
  };

  // Função que move a peça preta automaticamente
  const handleBlackMove = () => {
    let moved = false;
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        if (board[row][col] === 'B') {
          const moves = getValidMoves(row, col, 'B');
          if (moves.length > 0) {
            const [endRow, endCol] = moves[0]; // Move para o primeiro movimento válido
            const newBoard = board.map((r) => [...r]);
            newBoard[endRow][endCol] = 'B';
            newBoard[row][col] = null;

            if (Math.abs(endRow - row) === 2) {
              const jumpedRow = (row + endRow) / 2;
              const jumpedCol = (col + endCol) / 2;
              newBoard[jumpedRow][jumpedCol] = null;
            }

            setBoard(newBoard);
            setCurrentPlayer('W'); // Muda para o jogador branco após o movimento
            moved = true;
            break;
          }
        }
      }
      if (moved) break;
    }
  };

  // UseEffect para mover a peça preta automaticamente após o movimento da peça branca
  useEffect(() => {
    if (currentPlayer === 'B' && !gameOver) {
      setTimeout(() => {
        handleBlackMove();
      }, 500); // Espera meio segundo para simular o movimento automático
    }
  }, [currentPlayer, gameOver]);

  return (
    <div className="game-container">
      <h1>Uma Dama Como Eu</h1>
      <h2>Jogador(a): {currentPlayer === 'W' ? 'Branco' : 'Preto'}</h2>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected =
              selectedPiece &&
              selectedPiece[0] === rowIndex &&
              selectedPiece[1] === colIndex;
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${(rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark'} ${
                  isSelected ? 'selected' : ''
                }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell && <div className={`piece ${cell === 'W' ? 'white' : 'black'}`}></div>}
              </div>
            );
          })
        )}
      </div>
      <div className="name">Maria Clara Meira</div>
    </div>
  );
}

export default App;
