export type CharClassType = 'soldier' | 'wizard' | 'ranger' | 'warrior' | 'bandit'

export type CharacterType = {
  id: number,
  name: string,
  class: CharClassType,
  equipment: string,
  moveSpeed: number,
  createdAt?: string,
}