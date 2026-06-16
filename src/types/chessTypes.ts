export type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
export type PieceColor = 'white' | 'black';

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
}

export type Square = ChessPiece | null;
export type Board = Square[][];

export interface CastlingRights {
  whiteKingSide:  boolean;
  whiteQueenSide: boolean;
  blackKingSide:  boolean;
  blackQueenSide: boolean;
}

export interface Position {
  row: number;
  col: number;
}

export type GameStatus = 'playing' | 'check' | 'checkmate' | 'stalemate';

export type PromotionState = {
  row: number;
  col: number;
  color: PieceColor;
} | null;

export interface MoveRecord {
  piece:      ChessPiece;
  from:       string;       // e.g. "e2"
  to:         string;       // e.g. "e4"
  captured?:  ChessPiece;
  isCastle?:  'kingside' | 'queenside';
  isCheck?:   boolean;
  notation:   string;       // e.g. "e4", "Nf3", "O-O"
}