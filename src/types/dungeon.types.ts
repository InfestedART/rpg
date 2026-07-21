export type TileContent = 'player' | 'ally' | 'enemy' | 'obstacle' | 'chest' | 'button' | 'empty';
export type TileTerrain = 'land' | 'stone' | 'grass' | 'water'; // add others

export type UnitType = Extract<TileContent, 'player' | 'ally' | 'enemy'>
export type ObjectType = Extract<TileContent, 'chest' | 'button'>

export interface Position {
  row: number;
  col: number;
}

export interface Tile {
  content: TileContent;
  terrain: TileTerrain;
}

export type Board = Tile[][];

export type PieceStatus = 'alive' | 'dead' | 'removed'  // buff, debuff?

type Piece = {
  type: TileContent,
  position: Position
}

export type InitialBoard = Record<number, Piece>

export interface Unit {
  name: string,
  type: UnitType,
  // status: PieceStatus,
  currentHp: number,
  position: Position
}

export interface Object {
  type: TileContent,
  position: Position,
}

export interface GameState {
  units: Record<number, Unit>;
  objects?: Record<number, Object>;
  currentPlayer: number;
  movesLeft: number;
}

export type ActionType = 'attack' | 'interact';