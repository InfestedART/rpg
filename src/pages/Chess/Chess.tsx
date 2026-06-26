import useChessGame from './useChessGame';
import { UNICODE_PIECES, FILES, RANKS, STATUS_MESSAGES } from '@/constants/chessConstants';
// import { isKingInCheck } from './useChessGame';
import type { Square } from '@/types/chessTypes';
import ChessModal from './ChessModal';
import './Chess.css';
import { useState } from 'react';

const Chess = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const {
    board,
    currentTurn,
    selected,
    gameStatus,
    handleSquareClick,
    isValidMove,
    resetGame,
    pendingPromotion,
    handlePromotion
  } = useChessGame();

  const kingInCheck = gameStatus === 'check' || gameStatus === 'checkmate';

  const findKingSquare = () => {
    if (!kingInCheck) return null;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece?.type === 'king' && piece.color === currentTurn) return `${row}-${col}`;
      }
    }
    return null;
  };

  const kingSquareKey = findKingSquare();

  const renderPiece = (square: Square) => {
    if (!square) return null;
    const key = square.type;
    return (
      <span className={`piece ${square.color}`}>
        {UNICODE_PIECES[key]}
      </span>
    );
  };

  const getSquareClassName = (row: number, col: number) => {
    const isLight = (row + col) % 2 === 0;
    const isSelected = selected?.row === row && selected?.col === col;
    const isValid = isValidMove(row, col);
    const isCapture  = isValid && !!board[row][col];
    const isKingCheck = `${row}-${col}` === kingSquareKey;

    return [
      'square',
      isLight ? 'light' : 'dark',
      isSelected ? 'selected' : '',
      isValid && !isCapture ? 'valid-move' : '',
      isCapture ? 'valid-capture' : '',
      isKingCheck ? 'king-in-check'  : '',
    ].filter(Boolean).join(' ');
  };

  const isGameOver = gameStatus === 'checkmate' || gameStatus === 'stalemate';
  const statusMessage = STATUS_MESSAGES[gameStatus];

  return (
    <div className="chess-panel">
      <div className='chess-container'>
        <div className='chess-board'>

        {statusMessage && (
          <div className={`status-banner ${gameStatus}`}>
            {statusMessage}
            {isGameOver && (
              <span className='status-subtext'>
                {gameStatus === 'checkmate'
                  ? ` ${currentTurn === 'white' ? 'Black' : 'White'} wins!`
                  : ' No legal moves left.'}
              </span>
            )}
          </div>
        )}

        <div className='turn-indicator'>
          <span className={`turn-dot ${currentTurn}`} />
          {currentTurn.charAt(0).toUpperCase() + currentTurn.slice(1)}'s turn
        </div>

          {board.map((row, rowIndex) => (
            <div key={rowIndex} className='flex'>
              <div className='rank-label'>{RANKS[rowIndex]}</div> 
              {row.map((square, colIndex) => {
                return (
                  <div
                    key={colIndex}
                    className={getSquareClassName(rowIndex, colIndex)}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                    >
                    {renderPiece(square)}
                  </div>
                );
              })}           
            </div>
          ))}

          <div className='file-labels'>
            <div className='rank-label-spacer' />
            {FILES.map(file => (
              <div key={file} className='file-label'>{file}</div>
            ))}
          </div>

          <button className='reset-btn' onClick={resetGame}>
            New Game
          </button>

        </div>

        {pendingPromotion && (
          <ChessModal
            color={pendingPromotion.color}
            onSelect={handlePromotion}
          />
        )}

      </div>
    </div>
  )
}

export default Chess