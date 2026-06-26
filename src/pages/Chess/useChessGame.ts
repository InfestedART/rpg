import { useState } from 'react';
import { INITIAL_BOARD, INITIAL_CASTLING_RIGHTS } from '@/constants/chessConstants';
import type {
  Board,
  PieceColor,
  PieceType,
  CastlingRights,
  Position,
  PromotionState,
  GameStatus,
  EnPassantTarget,
} from '@/types/chessTypes';

const isInBounds = (row: number, col: number) => row >= 0 && row < 8 && col >= 0 && col < 8;

const isPromotionSquare = (row: number, color: PieceColor) =>
  (color === 'white' && row === 0) || (color === 'black' && row === 7);

// --- PIECE MOVEMENTS ---

const getPawnMoves = (
  board: Board,
  row: number,
  col: number,
  color: PieceColor,
  enPassantTarget: EnPassantTarget
): Position[] => {
  const moves: Position[] = [];
  const direction = color === 'white' ? -1 : 1;
  const startRow = color === 'white' ? 6 : 1;

  if (isInBounds(row + direction, col) && !board[row + direction][col]) {
    moves.push({ row: row + direction, col })

    if (row === startRow && !board[row + direction * 2][col]) {
      moves.push({ row: row + direction * 2, col });
    }
  }

  for (const diagCol of [-1, 1]) {
    const newRow = row + direction;
    const newCol = col + diagCol;
    // Diagonal capture
    if (isInBounds(newRow, newCol) && board[newRow][newCol]?.color !== color && board[newRow][newCol]) {
      moves.push({ row: newRow, col: newCol });
    }
    // En passant capture
    if (enPassantTarget && enPassantTarget.row === newRow && enPassantTarget.col === newCol) {
      moves.push({ row: newRow, col: newCol });
    }
  }

  return moves;
}

const getSlidingMoves = (
  board: Board,
  row: number,
  col: number,
  color: PieceColor,
  directions: number[][],
): Position[] => {
  const moves: Position[] = [];

  for (const dir of directions) {
    const [ dirRow, dirCol ] = dir;
    let newRow = row + dirRow
    let newCol = col + dirCol
    
    while (isInBounds(newRow, newCol)) {
      if (board[newRow][newCol]) {
        if (board[newRow][newCol]?.color !== color) {
          moves.push({ row: newRow, col: newCol }); // capture
        }
        break;
      }
      moves.push({ row: newRow, col: newCol });
      newRow += dirRow;
      newCol += dirCol;
    }
  }
  return moves;
}

const getStepMoves = (
  board: Board,
  row: number,
  col: number,
  color: PieceColor,
  directions: number[][]
): Position[] => {
  const filteredDirections = directions.filter(([dirRow, dirCol]) => {
    return isInBounds(row + dirRow, col + dirCol) && board[row + dirRow][col + dirCol]?.color !== color
  })
  const newPosition = filteredDirections.map(([dirRow, dirCol]) => ({
    row: row + dirRow,
    col: col + dirCol
  }))
  return newPosition;
}

export const getValidMoves = (
  board: Board,
  row: number,
  col: number,
  enPassantTarget: EnPassantTarget = null
): Position[] => {
  const piece = board[row][col];
  if (!piece) return [];

  const bishopDirections = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
  const rookDirections = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  const kingDirections = [[1, 1], [1, -1], [-1, 1], [-1, -1], [0, 1], [0, -1], [1, 0], [-1, 0]];
  const knightDirections = [
    [2, 1], [2, -1],
    [1, 2], [1, -2],
    [-2, 1], [-2, -1],
    [-1, 2], [-1, -2]
  ];

  switch (piece.type) {
    case 'pawn': return getPawnMoves(board, row, col, piece.color, enPassantTarget);
    case 'rook': return getSlidingMoves(board, row, col, piece.color, rookDirections);
    case 'bishop': return getSlidingMoves(board, row, col, piece.color, bishopDirections);
    case 'knight': return getStepMoves(board, row, col, piece.color, knightDirections);
    case 'queen': return getSlidingMoves(
      board, row, col, piece.color, rookDirections.concat(bishopDirections)
    );
    case 'king': return getStepMoves(board, row, col, piece.color, kingDirections);
    default: return [];
  }
};

// O-O CASTLING LOGIC O-O

const pathIsClear = (board: Board, row: number, fromCol: number, toCol: number): boolean => {
  const step = toCol > fromCol ? 1 : -1;
  for (let c = fromCol + step; c !== toCol; c += step) {
    if (board[row][c]) return false;
  }
  return true;
};

const pathIsSafe = (board: Board, color: PieceColor, row: number, cols: number[]): boolean => {
  const opponent: PieceColor = color === 'white' ? 'black' : 'white';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c]?.color !== opponent) continue;
      const attacks = getValidMoves(board, r, c);
      for (const col of cols) {
        if (attacks.some(a => a.row === row && a.col === col)) return false;
      }
    }
  }
  return true;
};

export const getCastlingMoves = (board: Board, row: number, col: number, castlingRights: CastlingRights): Position[] => {
  const piece = board[row][col];
  if (piece?.type !== 'king') return [];

  const moves: Position[] = [];
  const color = piece.color;

  const kingSide  = color === 'white' ? castlingRights.whiteKingSide  : castlingRights.blackKingSide;
  const queenSide = color === 'white' ? castlingRights.whiteQueenSide : castlingRights.blackQueenSide;

  if (isKingInCheck(board, color)) return [];

  if (kingSide && pathIsClear(board, row, 4, 7) && pathIsSafe(board, color, row, [4, 5, 6])) {
    moves.push({ row, col: 6 });
  }

  if (queenSide && pathIsClear(board, row, 4, 0) && pathIsSafe(board, color, row, [4, 3, 2])) {
    moves.push({ row, col: 2 });
  }

  return moves;
};

const updateCastlingRights = (rights: CastlingRights, fromRow: number, fromCol: number): CastlingRights => {
  const next = { ...rights };

  // King moved
  if (fromRow === 7 && fromCol === 4) { next.whiteKingSide = false; next.whiteQueenSide = false; }
  if (fromRow === 0 && fromCol === 4) { next.blackKingSide = false; next.blackQueenSide = false; }

  // Rook moved
  if (fromRow === 7 && fromCol === 7) next.whiteKingSide  = false;
  if (fromRow === 7 && fromCol === 0) next.whiteQueenSide = false;
  if (fromRow === 0 && fromCol === 7) next.blackKingSide  = false;
  if (fromRow === 0 && fromCol === 0) next.blackQueenSide = false;

  return next;
};

// --- GAME STATUS ---

const findKing = (board: Board, color: PieceColor): Position | null => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece?.type === 'king' && piece.color === color) {
        return { row, col };
      }
    }
  }
  return null;
};

export const isKingInCheck = (board: Board, color: PieceColor): boolean => {
  const opponent: PieceColor = color === 'white' ? 'black' : 'white';
  const kingPos = findKing(board, color);
  if (!kingPos) return false;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col]?.color !== opponent) continue;
      const moves = getValidMoves(board, row, col);
      if (moves.some(move => move.row === kingPos.row && move.col === kingPos.col)) return true;
    }
  }

  return false;
}

const moveLeavesKingInCheck = (board: Board, from: Position, to: Position, color: PieceColor): boolean => {
  const newBoard = board.map(newRow => [...newRow]);
  newBoard[to.row][to.col] = newBoard[from.row][from.col];
  newBoard[from.row][from.col] = null;
  return isKingInCheck(newBoard, color);
};

const moveLeavesKingInCheckEnPassant = (
  board: Board,
  from: Position,
  to: Position,
  capturedPawnPos: Position,
  color: PieceColor
): boolean => {
  const newBoard = board.map(r => [...r]);
  newBoard[to.row][to.col] = newBoard[from.row][from.col];
  newBoard[from.row][from.col] = null;
  newBoard[capturedPawnPos.row][capturedPawnPos.col] = null; // remove captured pawn
  return isKingInCheck(newBoard, color);
};

export const getLegalMoves = (
  board: Board,
  row: number,
  col: number,
  castlingRights: CastlingRights,
  enPassantTarget: EnPassantTarget = null
): Position[] => {
  const piece = board[row][col];
  if (!piece) return [];

  const candidateMoves = getValidMoves(board, row, col, enPassantTarget);

  const regular = candidateMoves.filter(to => {
    const isEnPassantMove =
      piece.type === 'pawn' &&
      enPassantTarget &&
      to.row === enPassantTarget.row &&
      to.col === enPassantTarget.col &&
      !board[to.row][to.col];

    if (isEnPassantMove) {
      const capturedPawnPos = { row, col: to.col };
      return !moveLeavesKingInCheckEnPassant(board, { row, col }, to, capturedPawnPos, piece.color);
    }

    return !moveLeavesKingInCheck(board, { row, col }, to, piece.color);
  })

  const castling = piece.type === 'king' ? getCastlingMoves(board, row, col, castlingRights) : [];
  return [...regular, ...castling];
};


const hasAnyLegalMoves = (
  board: Board,
  color: PieceColor,
  castlingRights: CastlingRights,
  enPassantTarget: EnPassantTarget
): boolean => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (
        board[row][col]?.color === color &&
        getLegalMoves(board, row, col, castlingRights, enPassantTarget).length > 0
      ) {
        return true;
      } 
    }
  }
  return false;
};

export const getGameStatus = (
  board: Board,
  currentTurn: PieceColor,
  castlingRights: CastlingRights,
  enPassantTarget: EnPassantTarget = null
) => {
  const inCheck = isKingInCheck(board, currentTurn);
  const hasLegal = hasAnyLegalMoves(board, currentTurn, castlingRights, enPassantTarget);

  if (!hasLegal && inCheck)  return 'checkmate';
  if (!hasLegal && !inCheck) return 'stalemate';
  if (inCheck)               return 'check';
  return 'playing';
};

// --- MAIN HOOK ---

const useChessGame = () => {
  const [board, setBoard]               = useState<Board>(INITIAL_BOARD());
  const [currentTurn, setCurrentTurn]   = useState<PieceColor>('white');
  const [selected, setSelected]         = useState<Position | null>(null);
  const [validMoves, setValidMoves]   = useState<Position[]>([]);
  const [gameStatus, setGameStatus]   = useState<GameStatus>('playing');
  const [castlingRights, setCastlingRights]   = useState<CastlingRights>(INITIAL_CASTLING_RIGHTS);
  const [enPassantTarget, setEnPassantTarget] = useState<EnPassantTarget>(null);

  const [pendingPromotion, setPendingPromotion] = useState<PromotionState>(null);
  const [prePromotionBoard, setPrePromotionBoard] = useState<Board | null>(null);
  const isValidMove = (row: number, col: number) => 
    validMoves.some(move => move.row === row && move.col === col);

  const resetGame = () => {
    setBoard(INITIAL_BOARD());
    setCurrentTurn('white');
    setSelected(null);
    setValidMoves([]);
    setGameStatus('playing');
    setCastlingRights(INITIAL_CASTLING_RIGHTS);
    setPendingPromotion(null);
    setPrePromotionBoard(null);
    setEnPassantTarget(null);
  };

  const handleSquareClick = (row: number, col: number) => {
    if (gameStatus === 'checkmate' || gameStatus === 'stalemate') return;
    if (pendingPromotion) return; // block clicks while modal is open

    const clickedPiece = board[row][col];

    // Case 1: No Piece Selected
    if (!selected) {
      if (clickedPiece?.color === currentTurn) {
        setSelected({ row, col });
        setValidMoves(getLegalMoves(board, row, col, castlingRights, enPassantTarget));
      }
      return;
    } 

    // Case 2: Deselect if clicks the same square
    if (selected.row === row && selected.col === col) {
      setSelected(null);
      setValidMoves([]);
      return;
    }

    // Case 3: Clicking another own piece — switch selection
    if (clickedPiece?.color === currentTurn) {
      setSelected({ row, col });
      setValidMoves(getLegalMoves(board, row, col, castlingRights, enPassantTarget));
      return;
    }

    // Case 4: Move to a valid square
    if (isValidMove(row, col)) {
      const newBoard = board.map(r => [...r]);
      const piece = newBoard[selected.row][selected.col];

      const isEnPassant =
        piece?.type === 'pawn' &&
        enPassantTarget &&
        row === enPassantTarget.row &&
        col === enPassantTarget.col &&
        !board[row][col];
      
      let captured = newBoard[row][col] ?? undefined;

      if (isEnPassant) {
        const capturedPawnRow = selected.row;
        captured = newBoard[capturedPawnRow][col] ?? undefined;
        newBoard[capturedPawnRow][col] = null;
      }

      const isCastle = piece?.type === 'king' && Math.abs(col - selected.col) === 2;

      if (isCastle) {
        const isKingSide = col === 6;
        const rookFromCol = isKingSide ? 7 : 0;
        const rookToCol   = isKingSide ? 5 : 3;
        newBoard[row][rookToCol]   = newBoard[row][rookFromCol];
        newBoard[row][rookFromCol] = null;
      }

      newBoard[row][col] = board[selected.row][selected.col];
      newBoard[selected.row][selected.col] = null;

      if (piece?.type === 'pawn' && isPromotionSquare(row, piece.color)) {
        setPrePromotionBoard(newBoard);
        setBoard(newBoard);
        setPendingPromotion({ row, col, color: piece.color });
        return;
      }

      const nextTurn: PieceColor = currentTurn === 'white' ? 'black' : 'white';
      const newRights = updateCastlingRights(castlingRights, selected.row, selected.col);
      const status = getGameStatus(newBoard, nextTurn, castlingRights);

      setBoard(newBoard);
      setCurrentTurn(nextTurn);
      setSelected(null);
      setValidMoves([]);
      setCastlingRights(newRights);
      setGameStatus(status);
    }
  }

  const handlePromotion = (pieceType: PieceType) => {
    if (!pendingPromotion || !prePromotionBoard) return;
    
    const { row, col, color } = pendingPromotion;
    const promotedBoard = prePromotionBoard.map(r => [...r]);
    promotedBoard[row][col] = { type: pieceType, color };

    const nextTurn: PieceColor = color === 'white' ? 'black' : 'white';
    const newRights = castlingRights;
    const newStatus = getGameStatus(promotedBoard, nextTurn, newRights);

    setBoard(promotedBoard);
    setCurrentTurn(nextTurn);
    setGameStatus(newStatus);
    setPendingPromotion(null);
    setPrePromotionBoard(null);
  }

  return {
    board,
    currentTurn,
    selected,
    validMoves,
    gameStatus,
    handleSquareClick,
    handlePromotion,
    isValidMove,
    resetGame,
    pendingPromotion,
    enPassantTarget
  };
}

export default useChessGame;