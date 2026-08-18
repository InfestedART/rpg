import type { ShieldStatsType } from "@/types/itemTypes";

export const SHIELD_STATS: Record<string, ShieldStatsType> = {
  'unarmed': {
    name: 'unarmed',
    itemClass: 'none',
    itemType: 'offhand',
    quantityAllowed: 1,
    rarity: 'common'
  },
  'shield_0': {
    name: 'Short Shield',
    itemClass: 'shield',
    itemType: 'offhand',
    quantityAllowed: 1,
    blockChance: 0.3333,
    rarity: 'common'
  },
  'cloak_0': {
    name: 'Simple Cloak',
    itemClass: 'cloak',
    itemType: 'offhand',
    quantityAllowed: 1,
    evadeChance: 0.3333,
    rarity: 'common'
   },
   'spellbook_0': {
      name: 'Simple Cloak',
      itemClass: 'spellbook',
      itemType: 'offhand',
      quantityAllowed: 1,
      rarity: 'uncommon'
      // spellPrepared: [ 'magic_shield' ]
   },
  'rapier_0': {
    name: 'Simple Rapier',
    itemClass: 'rapier',
    itemType: 'offhand',
    quantityAllowed: 1,
    blockChance: 0.25,
    rarity: 'common'
    // chance to counter attack
    // chance to crit
  },
}  