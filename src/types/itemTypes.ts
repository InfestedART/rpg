import type { AdditionalStatsT } from "./characterTypes"

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'mythic' | 'unique'
export type DamageType = 'slash' | 'blunt' | 'pierce' | 'magic'

export type WeaponType = 'sword' | 'spear' | 'long_spear' | 'mace' | 'staff' | 'focus' | 'bow' | 'dagger' | 'trowing_knife' | 'long_sword' | 'hand_axe' | 'battle_axe' | 'heavy_mace' | 'crossbow' | 'fist'
export type ShieldType = 'shield' | 'cloak' | 'spellbook' | 'rapier' | 'none'
export type GlovesType = 'gloves' | 'gauntlets' | 'fingerless' 
export type BootsType = 'boots' | 'greaves' | 'shoes'
export type HelmetType = 'helmet' | 'headwear' | 'circlet'

export type SlotType = 'weapon' | 'offhand' | 'armor' | 'helmet' | 'boots' | 'gloves' | 'amulet' | 'accesory'

export interface ItemBaseStats {
  name: string,
  description?: string, // optional for now
  rarity: ItemRarity,
  slot: SlotType
  tier: number,
  bonusStats: ItemAdditionalStats
}

export type ItemAdditionalStats = Partial<AdditionalStatsT>

type StatBonus = Partial<Record<keyof ItemAdditionalStats, number>>   // wide, only used for summing
type Bonuses<K extends keyof ItemAdditionalStats> = Pick<StatBonus, K> 

export interface WeaponStatsType extends ItemBaseStats {
  itemClass: WeaponType,
  slot: 'weapon',
  quantityAllowed: 1 | 2,
  damageType: DamageType,
  bonusStats: Bonuses<'baseDmg' | 'dmgDice' | 'bleedChance' | 'stunChance' | 'range' | 'critChance'>
}

export interface ShieldStatsType extends ItemBaseStats {
  itemClass: ShieldType,
  slot: 'offhand',
  bonusStats: Bonuses<'evadeChance' | 'blockChance' | 'critChance'>

}

export interface GlovesStatsType extends ItemBaseStats {
  itemClass: GlovesType,
  slot: 'gloves',
  bonusStats: Bonuses<'magicShield' | 'armor' | 'critChance' | 'baseDmg' | 'range' | 'blockChance'>
}

export interface BootsStatsType extends ItemBaseStats {
  itemClass: BootsType,
  slot: 'boots',
  bonusStats: Bonuses<'moveSpeed' | 'evadeChance' | 'blockChance' | 'hazardProtection' | 'magicShield' | 'manaRegen' | 'armor'>

}

export interface HelmetStatsType extends ItemBaseStats {
  itemClass: HelmetType,
  slot: 'helmet',
  bonusStats: Bonuses<'evadeChance' | 'blockChance' | 'armor' | 'magicShield' | 'stunProtection' | 'critProtection' | 'mana'>

}

export type ItemStatsType = WeaponStatsType | ShieldStatsType | GlovesStatsType | BootsStatsType | HelmetStatsType

export interface EquipedItemsType {
  weapon?: WeaponStatsType,
  offhand?: ShieldStatsType,
  // armor?: 
  helmet?: HelmetStatsType,
  boots?: BootsStatsType,
  gloves?: GlovesStatsType,
  // amulet?: 
  // accesory?: 
}