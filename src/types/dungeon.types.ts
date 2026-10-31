import type { CharClassType, EnemyClassType, EquipmentType } from "./characterTypes";
import type { ChestTier } from "./loot.types";

export type TileTerrain = 'land' | 'stone' | 'grass' | 'water'; 
export type TileContent = 'player' | 'ally' | 'enemy' | 'obstacle' | 'chest' | 'empty';
export type TileDecal = 'button' | 'spikes' | 'lava'

export type UnitType = Extract<TileContent, 'player' | 'ally' | 'enemy'>
export type ObjectType = Extract<TileContent, 'chest' | 'button'>

export interface Position {
  row: number;
  col: number;
}

export interface Tile {
  content: TileContent;
  terrain: TileTerrain;
  decal?: TileDecal;
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
  currentMana?: number,
  currentMS?: number,
  equipment?: Partial<EquipmentType>,
  status: UnitStatus[],
  position: Position,
  // loot?: Loot  // on enemy defeat
}

export interface UsableObject {
  type: TileContent,
  position: Position,
  chestTier?: ChestTier
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