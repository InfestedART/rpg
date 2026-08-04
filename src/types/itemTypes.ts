export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'mythic' | 'unique'
export type DamageType = 'slash' | 'blunt' | 'pierce' | 'magic'

export type WeaponType = 'sword' | 'spear' | 'long_spear' | 'mace' | 'staff' | 'focus' | 'bow' | 'dagger' | 'trowing_knife' | 'long_sword' | 'hand_axe' | 'battle_axe' | 'heavy_mace' | 'crossbow'
export type ShieldType = 'shield' | 'cloak' | 'spellbook' | 'rapier'
export type ItemType = 'weapon' | 'offhand' | 'armor' | 'helmet' | 'boots' | 'gloves' | 'ring' | 'amulet'

export interface BaseStats {
  name: string,
  rarity: ItemRarity,
  quantityAllowed: number,  // 1 | 2
  itemType: ItemType
}

export interface WeaponStatsType extends BaseStats {
  baseDmg: number,
  dmgDice: number,
  itemClass: WeaponType,
  weight: '0H' | '1H' | '2H',
  damageType: DamageType,
  bonusRange?: number,
  bonusCritChance?: number,
  stunChance?: number,
  bleedChance?: number,
}

export interface ShieldStatsType extends BaseStats {
  name: string
  quantityAllowed: 1,
  itemClass: ShieldType
  blockChance?: number,
  evadeChance?: number

}