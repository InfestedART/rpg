import type { SlotType } from "./itemTypes";

export type CharClassType = 'soldier' | 'wizard' | 'ranger' | 'warrior' | 'bandit';
export type EnemyClassType = 'brigand' | 'skeleton' | 'rat' | 'dummy';
export type ObjectClassType = 'chest' | 'button';
// export type AllyClassType = ''

// export type EquipmentSlot = 'weapon' | 'offhand' | 'helmet' | 'armour' | 'belt' | 'boots' | 'gloves' | 'trinket1' | 'trinket2' | 'quiver'
export type EquipmentType = Record<SlotType, string | null>

export interface CharacterType {
  id: number,
  name: string,
  class: CharClassType | EnemyClassType,
  level: number,
  exp: number,
  equipment: EquipmentType,
  gold: number,
  createdAt?: string,
  inventory: string[],
}

export interface CharacterResponse {
   id: number,
  name: string,
  class: CharClassType | EnemyClassType,
  level: number,
  exp: number,
  equipment: string,
  gold: number,
  createdAt?: string,
  inventory: string, 
}

export interface AdditionalStatsT {
  baseDmg: number,
  dmgDice: number,
  moveSpeed: number,
  baseHp: number,
  critChance: number,
  range: number,
  attackCount: number,
  bonusActions?: number,
  initiative?: number,
  evadeChance?: number,
  blockChance?: number,
  stunChance?: number,
  bleedChance?: number,
  armor?: number,
  magicShield?: number,
  hazardProtection?: number,
  manaRegen?: number,
  mana?: number,
  stunProtection?: number,
  critProtection?: number,
}

export interface UnitStatsT extends AdditionalStatsT {
  equipment?: Partial<EquipmentType>,
  icon?: string,
}

export type EnemyWeaponPoolT = {
  slot: SlotType,
  weapons: string[],
  chance: number,
}



export type StatsId = 
  'baseHp' |
  // 'baseDmg' |
  // 'dmgDice' |
  'moveSpeed' |  
  'critChance' |
  'range' |
  'attackCount' |
  'bonusActions' |
  // 'initiative' |
  'evadeChance' |
  'blockChance' |
  'stunChance' |
  'bleedChance' |
  'armor' |
  'magicShield' |
  'hazardProtection' |
  'manaRegen' |
  'mana' |
  'stunProtection' |
  'critProtection'

export interface StatsLabelT {
  label: string,
  percentage: boolean,
}