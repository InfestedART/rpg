export type TileContent = 'player' | 'ally' | 'enemy' | 'obstacle' | 'object' | 'empty';
export type TileTerrain = 'land' | 'grass' | 'water'; // add others

export interface Position {
  row: number;
  col: number;
}

export interface Tile {
  content: TileContent;
  terrain: TileTerrain;
}

export type Board = Tile[][];

export type PieceStatus = 'alive' | 'death' | 'removed'

export interface Player {
  name: string,
  type: TileContent,
  status: PieceStatus,
}

export interface DungeonState {
  players: Record<number, Player>;
  size: string;   // DungeonSize
}

export interface GameState {
  positions: Record<number, Position>;
  currentPlayer: number;
  movesLeft: number;
}

