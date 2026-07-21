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

export const CLASS_STATS = {
  soldier: { baseDmg: 4, baseHp: 25, moveSpeed: 4, attackCount: 1, initiative: 3}, // total: 14
  wizard: { baseDmg: 2, baseHp: 15, moveSpeed: 3, attackCount: 1, initiative: 6 }, // total: 13
  ranger: { baseDmg: 3, baseHp: 15, moveSpeed: 5, attackCount: 1, initiative: 4}, // total: 14
  warrior: { baseDmg: 5, baseHp: 20, moveSpeed: 4, attackCount: 1, initiative: 3}, // total: 15
  bandit: { baseDmg: 3, baseHp: 15, moveSpeed: 5, attackCount: 1, initiative: 5}, // total: 15
}