import type { Position } from "./dungeon.types";

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

export type GameStatus = 'playing' | 'check' | 'checkmate' | 'stalemate';

export type PromotionState = {
  row: number;
  col: number;
  color: PieceColor;
} | null;

export type EnPassantTarget = Position | null;