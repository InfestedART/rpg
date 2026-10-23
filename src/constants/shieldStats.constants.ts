import type { ShieldStatsType } from "@/types/itemTypes";

export const SHIELD_STATS: Record<string, ShieldStatsType> = {
  'unarmed': {
    name: 'unarmed',
    itemClass: 'none',
    slot: 'offhand',
    rarity: 'common',
    tier: 1,
    bonusStats: {}
  },
  'shield_0': {
    name: 'Short Shield',
    itemClass: 'shield',
    slot: 'offhand',    
    rarity: 'common',
    tier: 1,
    bonusStats: {
      blockChance: 0.20,
    }
  },
  'cloak_0': {
    name: 'Linen Cloak',
    itemClass: 'cloak',
    slot: 'offhand',    
    rarity: 'common',
    tier: 1,
    bonusStats: {
      evadeChance: 0.20,
    }
   },
   'spellbook_0': {
      name: 'Apprentice Tome',
      itemClass: 'spellbook',
      slot: 'offhand',
      rarity: 'uncommon',
      tier: 1,
      bonusStats: {},
      // spellPrepared: [ 'magic_bolt' ]
   },
  'rapier_0': {
    name: 'Simple Rapier',
    itemClass: 'rapier',
    slot: 'offhand',    
    rarity: 'common',
    tier: 1,
    bonusStats: {
      blockChance: 0.20,
    }
    // chance to counter attack
    // chance to crit
  },
}  