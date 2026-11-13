import type { CharClassType } from "@/types/characterTypes";
import type { ChestTier, LootChanceType } from "@/types/loot.types";

/* export const ENEMY_LOOT_TABLE: Record<EnemyClassType, LootChanceType> = {
  dummy: {},
  rat: {},
  skeleton: {},
  brigand: {},
} */

export const PLAYER_STARTING_CHESTS: Record<CharClassType, ChestTier[]> = {
  'soldier': ['chest1A'],
  'ranger': ['chest1B'],
  'wizard': ['chest1C'],
  'warrior': ['chest1A', 'chest1B'],
  'bandit': ['chest1B'],
}

export const CHEST_LOOT_TABLE: Record<ChestTier, LootChanceType> = {
  'chest0': {
    goldChance: { chance: 1, goldBase: 1, goldDice: 0},
  },
  'chest1A': {
    goldChance: { chance: 1, goldBase: 3, goldDice: 5 },
    itemChance: { chance: 1, tier: 1, itemPool: ['gauntlets', 'helmet', 'greaves']}
  },
  'chest1B': {
    goldChance: { chance: 1, goldBase: 3, goldDice: 5 },
    itemChance: { chance: 1, tier: 1, itemPool: ['gloves', 'boots', 'headwear']}
  },
   'chest1C': {
    goldChance: { chance: 1, goldBase: 3, goldDice: 5 },
    itemChance: { chance: 1, tier: 1, itemPool: ['circlet', 'shoes', 'fingerless']}
  }, 
}