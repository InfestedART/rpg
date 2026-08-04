export type WeaponType =  'sword' | 'spear' | 'long_spear' | 'mace' | 'staff' | 'focus' | 'bow' | 'dagger' | 'trowing_knife' | 'rapier' | 'long_sword' | 'hand_axe' | 'battle_axe' | 'heavy_mace' | 'crossbow'

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'mythic' | 'unique'

export interface WeaponStatsType {
  name: string,
  type: WeaponType,
  baseDmg: number,
  dmgDice: number,
  weight: '0H' | '1H' | '2H',
  quantityAllowed: number,  // 1 | 2
  rarity: ItemRarity,
  bonusRange?: number,
  bonusCritChance?: number,
}