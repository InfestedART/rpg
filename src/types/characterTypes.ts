export type CharClassType = 'soldier' | 'wizard' | 'ranger' | 'warrior' | 'bandit';
export type EnemyClassType = 'brigand' | 'skeleton' | 'rat' | 'dummy';
// export type AllyClassType = ''

export type CharacterType = {
  id: number,
  name: string,
  class: CharClassType | EnemyClassType
  equipment: string[],
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
  critChance: number,
}