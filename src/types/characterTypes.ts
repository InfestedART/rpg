export type CharClassType = 'soldier' | 'wizard' | 'ranger' | 'warrior' | 'bandit';
export type EnemyClassType = 'brigand' | 'skeleton' | 'rat' | 'dummy';
// export type AllyClassType = ''
export type EquipmentSlot = 'weapon1' | 'offhand' | 'helmet' | 'armour' | 'belt' | 'boots' | 'gloves' | 'trinket1' | 'trinket2' | 'quiver'

export interface CharacterType {
  id: number,
  name: string,
  class: CharClassType | EnemyClassType,
  level: number,
  exp: number,
  equipment: Record<EquipmentSlot, string | null>,
  gold: number,
  createdAt?: string,
}

export interface UnitStatsT {
  baseDmg: number,
  dmgDice: number,
  baseHp: number,
  moveSpeed: number,
  attackCount: number,
  bonusActions?: number,
  range: number,
  initiative: number,
  critChance?: number,
  evadeChance?: number,
  blockChance?: number,
  stunChance?: number,
  bleedChance?: number,
  equipment?: Partial<Record<EquipmentSlot, string | null>>,
}

export type EnemyWeaponPoolT = {
  slot: EquipmentSlot,
  weapons: string[],
  chance: number,
}