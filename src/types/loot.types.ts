import type { BootsType, GlovesType, HelmetType, ShieldType, WeaponType } from "./itemTypes"

export type ItemPoolType = WeaponType | ShieldType | GlovesType | BootsType | HelmetType

export type ChestTier = 
  'chest0' | 
  'chest1A' | 'chest1B' | 'chest1C'


interface GoldChanceType {
  chance: number,
  goldBase: number,
  goldDice: number,
}

interface ItemChanceType {
  chance: number,
  itemPool: ItemPoolType[],
  tier: number,
  magicChance?: number,
}

export type LootChanceType = 
  | { goldChance?: GoldChanceType, itemChance: ItemChanceType }
  | { goldChance: GoldChanceType, itemChance?: ItemChanceType }