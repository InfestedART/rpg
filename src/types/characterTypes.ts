export type CharClassType = 'soldier' | 'wizard' | 'ranger' | 'warrior' | 'bandit';
export type EnemyClassType = 'brigand' | 'skeleton' | 'rat' | 'dummy';
// export type AllyClassType = ''

export type CharacterType = {
  id: number,
  name: string,
  class: CharClassType | EnemyClassType
  equipment: string,
  moveSpeed: number,
  attackCount: number,
  createdAt?: string,
}