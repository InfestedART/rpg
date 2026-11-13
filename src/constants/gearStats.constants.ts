import type { BootsStatsType, GlovesStatsType, HelmetStatsType } from "@/types/itemTypes";

export const GLOVES_STATS: Record<string, GlovesStatsType> = {
  'gloves_0': {
    name: 'Hide Gloves',
    rarity: 'common',
    slot: 'gloves',
    itemClass: 'gloves',
    tier: 1,
    bonusStats: {
      magicShield: 1,
    }
  },
  'gauntlets_0': {
    name: 'Bronze Gauntlets',
    rarity: 'common',
    slot: 'gloves',
    itemClass: 'gauntlets',    
    tier: 1,
    bonusStats: {
      armor: 1,
    }
  },
  'fingerless_0': {
    name: 'Linen Gloves',
    rarity: 'common',
    slot: 'gloves',
    itemClass: 'fingerless',    
    tier: 1,
    bonusStats: {
      critChance: 0.05,
    }
  },
}

export const BOOTS_STATS: Record<string, BootsStatsType> = {
  'boots_0': {
    name: 'Hide Boots',
    rarity: 'common',
    slot: 'boots',
    itemClass: 'boots',
    tier: 1,
    bonusStats: {
      moveSpeed: 1,
    }
  },
  'greaves_0': {
    name: 'Bronze Greaves',
    rarity: 'common',
    slot: 'boots',
    itemClass: 'greaves',    
    tier: 1,
    bonusStats: {
      hazardProtection: 1,
    }
  },
  'shoes_0': {
    name: 'Linen Shoes',
    rarity: 'common',
    slot: 'boots',
    itemClass: 'shoes',    
    tier: 1,
    bonusStats: {
      manaRegen: 1,
    }
  },
  'greaves_1': {
    name: 'Iron Greaves',
    rarity: 'common',
    slot: 'boots',
    itemClass: 'greaves',    
    tier: 2,
    bonusStats: {
      hazardProtection: 2,
      armor: 1
    }
  },
}

export const HELMET_STATS: Record<string, HelmetStatsType> = {
  'helmet_0': {
    name: 'Bronze Helmet',
    rarity: 'common',
    slot: 'helmet',
    itemClass: 'helmet',
    tier: 1,
    bonusStats: {
      stunProtection: 0.5,
    }
  },
  'headwear_0': {
    name: 'Linen Hood',
    rarity: 'common',
    slot: 'helmet',
    itemClass: 'headwear',    
    tier: 1,
    bonusStats: {
      magicShield: 1,
    }
  },
  'circlet_0': {
    name: 'Wizard Cap',
    rarity: 'common',
    slot: 'helmet',
    itemClass: 'circlet',    
    tier: 1,
    bonusStats: {
      mana: 5,
    }
  }
}