import type { CharClassType, EnemyClassType, UnitStats } from "@/types/characterTypes"

export const CLASS_OPTIONS = [
  {
    label: 'Soldier',
    value: 'soldier'
  },
  {
    label: 'Wizard',
    value: 'wizard'
  },
  {
    label: 'Ranger',
    value: 'ranger'
  },
  {
    label: 'Warrior',
    value: 'warrior'
  },
  {
    label: 'Bandit',
    value: 'bandit'
  }
]

 export const WEAPONS_BY_CLASS = {
  soldier: [
    { value: 'sword_shield', label: 'Sword and Shield' },
    { value: 'spear_shield', label: 'Spear and Shield' },
    { value: 'mace_shield', label: 'Mace and Shield' },
  ],
  wizard: [
    { value: 'staff', label: 'Runed Staff'},
    { value: 'spellbook_focus', label: 'Spellbook and Focus'},
  ],
  ranger: [
    { value: 'bow_arrows', label: 'Bow and Arrows' },
    { value: 'dual_daggers', label: 'Dual daggers' },
    { value: 'trowing_knives', label: 'Throwing Knives' },
  ],
  warrior: [
    { value: 'sword_rapier', label: 'Sword and Rapier' },
    { value: '2h_sword', label: 'Two handed Sword' },
    { value: 'battle_axe', label: 'Battle Axe' },
    { value: '2h_mace', label: 'Two handed Mace' },
    { value: 'dual_weapons', label: 'Dual Melee Weapons' },
  ],
  bandit: [
    { value: '1h_crossbow', label: 'One handed Crossbow'},
    { value: 'cloak_dagger', label: 'Cloak and Dagger'},
    { value: 'dual_daggers', label: 'Dual daggers' },
  ]
}

export const ARMOUR_BY_CLASS = {
  soldier: { value: 'chainmail', label: 'Chainmail'},
  wizard: { value: 'padded', label: 'Padded Armour'},
  ranger: { value: 'robes', label: 'Acolyte Robes'},
  warrior: { value: 'Hide', label: 'hide Armour'},
  bandit: { value: 'leather', label: 'Leather Armorr'},
}

export const BASE_STATS = {
  attackCount: 1,
  bonusActions: 1,
  critChance: 0.15
}

export const CLASS_STATS: Record<CharClassType, UnitStats> = {
  soldier: { baseDmg: 3, baseHp: 23, moveSpeed: 4, initiative: 3, ...BASE_STATS }, // total: 14
  wizard: { baseDmg: 6, baseHp: 15, moveSpeed: 3, initiative: 6, ...BASE_STATS }, // total: 13
  ranger: { baseDmg: 4, baseHp: 18, moveSpeed: 5, initiative: 4, ...BASE_STATS }, // total: 14
  warrior: { baseDmg: 6, baseHp: 20, moveSpeed: 4, initiative: 3, ...BASE_STATS }, // total: 15
  bandit: { baseDmg: 4, baseHp: 18, moveSpeed: 5, initiative: 5, ...BASE_STATS }, // total: 15
}

export const ENEMY_STATS: Record<EnemyClassType, UnitStats> = {
  brigand: { baseDmg: 4, baseHp: 15, moveSpeed: 4, attackCount: 1, critChance: 0.15, initiative: 3 },
  skeleton: { baseDmg: 2, baseHp: 8, moveSpeed: 3, attackCount: 1, critChance: 0.1, initiative: 2 }, 
  rat: { baseDmg: 2, baseHp: 5, moveSpeed: 3, attackCount: 1, critChance: 0.1, initiative: 2}, 
  dummy: { baseDmg: 1, baseHp: 1, moveSpeed: 1, attackCount: 1, critChance: 0, initiative: 1}, 
}

export const ALL_STATS: Record<CharClassType | EnemyClassType, UnitStats> = { ...CLASS_STATS, ...ENEMY_STATS}