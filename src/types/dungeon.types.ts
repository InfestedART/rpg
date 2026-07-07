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
