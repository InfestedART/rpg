export type CharClassType = 'soldier' | 'wizard' | 'ranger' | 'warrior' | 'bandit'

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