import type { CharClassType, EnemyClassType, EquipmentSlot } from "./characterTypes";

export type TileTerrain = 'land' | 'stone' | 'grass' | 'water'; 
export type TileContent = 'player' | 'ally' | 'enemy' | 'obstacle' | 'chest' | 'button' | 'empty';

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

export type PieceStatus = 'alive' | 'dead' | 'removed'

type Piece = {
  type: TileContent,
  position: Position,
  class?: CharClassType | EnemyClassType,
}

export type InitialBoard = Record<number, Piece>

export interface Unit {
  name: string,
  type: UnitType,
  class: CharClassType | EnemyClassType, 
  currentHp: number,
  equipment?: Partial<Record<EquipmentSlot, string | null>>,
  status: UnitStatus[],
  position: Position,
  // loot?: Loot  // on enemy defeat
}

export interface UsableObject {
  type: TileContent,
  position: Position,
  // loot?: Loot
}

export interface GameState {
  units: Record<number, Unit>;
  objects?: Record<number, UsableObject>;
  currentPlayer: number;
  movesLeft: number;
  attacksLeft: number;
  bonusActionsLeft: number;
}

export type ActionType = 'attack' | 'interact';

export type Debuff = 'stunned' | 'bleeding' | 'poisoned' | 'frozen' | 'slowed' | 'cursed' | 'shocked' | 'ignited'
export type Buff = 'hasted' | 'blessed' | 'flying'
export type UnitStatus = Debuff | Buff