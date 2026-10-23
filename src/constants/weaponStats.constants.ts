import type { WeaponStatsType } from "@/types/itemTypes";

export const WEAPON_STATS: Record<string, WeaponStatsType> = {
  'unarmed': {
    name: 'Unarmed',
    damageType: 'blunt',
    quantityAllowed: 2,
    itemClass: 'fist',
    slot: 'weapon',
    rarity: 'common',    
    tier: 1,
    bonusStats: {
      baseDmg: 0,
      dmgDice: 0,
      critChance: 0,
    }
  },
  'sword_0': {
    name: 'Short Sword',
    damageType: 'slash',
    quantityAllowed: 2,
    itemClass: 'sword',
    slot: 'weapon',
    rarity: 'common',    
    tier: 1,
    bonusStats: {
      baseDmg: 3,
      dmgDice: 5,
      critChance: 0.05,
    }
  },
  'spear_0': {
    name: 'Short Spear',
    damageType: 'pierce',
    quantityAllowed: 1,
    itemClass: 'spear',
    slot: 'weapon',
    rarity: 'common',        
    tier: 1,
    bonusStats: {
      baseDmg: 2,
      dmgDice: 6,
      critChance: 0.05, 
      range: 1,
    }
  },
  'mace_0': {
    name: 'Club',
    damageType: 'blunt',
    quantityAllowed: 2,
    itemClass: 'mace',
    slot: 'weapon',
    rarity: 'common',    
    tier: 1,
    bonusStats: {
      baseDmg: 3,
      dmgDice: 5,
      stunChance: 0.15,
    }
  },
  'axe_0': {
    name: 'Hand Axe',
    damageType: 'slash',
    quantityAllowed: 2,
    itemClass: 'sword',
    slot: 'weapon',
    rarity: 'common',    
    tier: 1,
    bonusStats: {
      baseDmg: 3,
      dmgDice: 5,
      bleedChance: 0.1,
    }
  },
  'staff_0': {
    name: 'Short Staff',
    damageType: 'blunt',
    quantityAllowed: 1,
    itemClass: 'staff',
    slot: 'weapon',
    rarity: 'common',        
    tier: 1,
    bonusStats: {
      baseDmg: 0,
      dmgDice: 8,
      critChance: 0.05,
      // range: 1,
    }
  },
  'focus_0': {
    name: 'Wooden Wand',
    damageType: 'magic',
    quantityAllowed: 1,
    itemClass: 'focus',
    slot: 'weapon',
    rarity: 'common',    
    tier: 1,
    bonusStats: {
      baseDmg: 0,
      dmgDice: 10,
      range: 2,
    }
  },
  'bow_0': {
    name: 'Short Bow',
    damageType: 'pierce',
    quantityAllowed: 1,
    itemClass: 'bow',
    slot: 'weapon',
    rarity: 'common',    
    tier: 1,
    bonusStats: {
      baseDmg: 1,
      dmgDice: 6,
      range: 3,
    }
  },
  'dagger_0': {
    name: 'Shiv',
    damageType: 'slash',
    quantityAllowed: 2,
    itemClass: 'dagger',
    slot: 'weapon',
    rarity: 'common',    
    tier: 1,
    bonusStats: {
      baseDmg: 2,
      dmgDice: 4,
      critChance: 0.15,
    }
  },
  't-knife_0': {
    name: 'Shiv',
    damageType: 'slash',
    quantityAllowed: 2,
    itemClass: 'dagger',
    slot: 'weapon',
    rarity: 'common',    
    tier: 1,
    bonusStats: {
      baseDmg: 0,
      dmgDice: 4,
      critChance: 0.1,
      range: 2,
    }
  },
  'longsword_0': {
    name: 'Long Sword',
    damageType: 'slash',
    quantityAllowed: 2,
    itemClass: 'sword',
    slot: 'weapon',
    rarity: 'common',    
    tier: 1,
    bonusStats: {
      baseDmg: 2,
      dmgDice: 7,
      critChance: 0.05,
    }
  },
  'longaxe_0': {
    name: 'Long Sword',
    damageType: 'slash',
    quantityAllowed: 1,
    itemClass: 'sword',
    slot: 'weapon',
    rarity: 'common',    
    tier: 1,
    bonusStats: {
      baseDmg: 1,
      dmgDice: 9,
      bleedChance: 0.1,
    }
  },
  'longmace_0': {
    name: 'Maul',
    damageType: 'blunt',
    quantityAllowed: 1,
    itemClass: 'mace',
    slot: 'weapon',
    rarity: 'common',    
    tier: 1,
    bonusStats: {
      baseDmg: 0,
      dmgDice: 10,
      stunChance: 0.2,
    }
  },
  'crossbow_0': {
    name: 'Simple Crossbow',
    damageType: 'pierce',
    quantityAllowed: 1,
    itemClass: 'crossbow',
    slot: 'weapon',
    rarity: 'common',    
    tier: 1,
    bonusStats: {
      baseDmg: 1,
      dmgDice: 5,
      range: 2,
      critChance: 0.1,
    }
  },
}  