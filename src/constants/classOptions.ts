import type { SelectOptions } from "@/types/game.types"

export const CLASS_OPTIONS: SelectOptions[] = [
  { label: 'Soldier', value: 'soldier' },
  { label: 'Wizard',  value: 'wizard' },
  { label: 'Ranger',  value: 'ranger' },
  { label: 'Warrior', value: 'warrior' },
  { label: 'Bandit', value: 'bandit' },
]

 export const WEAPONS_BY_CLASS: Record<string, SelectOptions[]> = {
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
    // { value: 'dual_weapons', label: 'Dual Melee Weapons' },
  ],
  bandit: [
    { value: 'crossbow', label: 'One handed Crossbow'},
    { value: 'cloak_dagger', label: 'Cloak and Dagger'},
    { value: 'dual_daggers', label: 'Dual daggers' },
  ]
}

export const ARMOUR_BY_CLASS: Record<string, SelectOptions>  = {
  soldier: { value: 'chainmail', label: 'Chainmail'},
  wizard: { value: 'padded', label: 'Padded Armour'},
  ranger: { value: 'robes', label: 'Acolyte Robes'},
  warrior: { value: 'Hide', label: 'hide Armour'},
  bandit: { value: 'leather', label: 'Leather Armorr'},
}

 export const STARTING_WEAPONS: Record<string, string[]> = {
  sword_shield: ['sword_0', 'shield_0'],
  spear_shield: ['spear_0', 'shield_0'],
  mace_shield: ['mace_0', 'shield_0'],
  staff: ['staff_0'],
  spellbook_focus: ['spellbook_0', 'focus_0'],
  bow_arrows: ['bow_0', 'quiver_0'],
  dual_daggers: ['dagger_0', 'dagger_0'],
  trowing_knives: ['t-knives_0', 'cloak_0'],
  sword_rapier: ['sword_0', 'rapier_0'],
  '2h_sword': ['longsword_0'],
  battle_axe: ['longaxe_0'],
  '2h_mace': ['longmace_0'],
  crossbow: ['crossbow_0'],
  cloak_dagger: ['dagger_0', 'cloak_0'],
}