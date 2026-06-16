import type { ChessPiece, PieceType, CastlingRights } from '@/types/chessTypes';

export const UNICODE_PIECES: Record<string, string> = {
  king:   '♚',
  queen:  '♛',
  rook:   '♜',
  bishop: '♝',
  knight: '♞',
  pawn:   '♟',
};

const backRank: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

export const INITIAL_BOARD = (): (ChessPiece | null)[][] => {
  const board: (ChessPiece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));

  backRank.forEach((type, col) => {
    board[0][col] = { type, color: 'black' };
    board[7][col] = { type, color: 'white' };
  });

  for (let col = 0; col < 8; col++) {
    board[1][col] = { type: 'pawn', color: 'black' };
    board[6][col] = { type: 'pawn', color: 'white' };
  }

  return board;
};

export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

export const STATUS_MESSAGES = {
  check:     '⚠️ Check!',
  checkmate: '🏆 Checkmate!',
  stalemate: '🤝 Stalemate!',
  playing:   null,
};

export const INITIAL_CASTLING_RIGHTS: CastlingRights = {
  whiteKingSide:  true,
  whiteQueenSide: true,
  blackKingSide:  true,
  blackQueenSide: true,
};