export type CharClassType = 'soldier' | 'wizard' | 'ranger' | 'warrior' | 'bandit';
export type EnemyClassType = 'brigand' | 'skeleton' | 'rat' | 'dummy';
// export type AllyClassType = ''
export type EquipmentSlot = 'weapon1' | 'weapon2' | 'helmet' | 'armour' | 'belt' | 'boots' | 'gloves' | 'trinket1' | 'trinket2' | 'quiver'

export type CharacterType = {
  id: number,
  name: string,
  class: CharClassType | EnemyClassType,
  level: number,
  exp: number,
  equipment: Record<EquipmentSlot, string | null>,
  moveSpeed: number,
  attackCount: number,
  gold: number,
  bonusActions?: number,
  createdAt?: string,
}

export type UnitStats = {
  baseDmg: number,
  dmgDice: number,
  baseHp: number,
  moveSpeed: number,
  attackCount: number,
  bonusActions?: number,
  initiative: number,
  critChance?: number,
  evadeChance?: number,
  blockChance?: number,
  stunChance?: number,
  bleedChance?: number,
  equipment?: Record<EquipmentSlot, string | null>,
}