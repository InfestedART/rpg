import type { CharClassType, EnemyClassType, UnitStats } from "@/types/characterTypes"

export const BASE_STATS = {
  attackCount: 1,
  bonusActions: 1,
  critChance: 0.10,
  dmgDice: 4
}

export const CLASS_STATS: Record<CharClassType, UnitStats> = {
  soldier: { baseDmg: 3, baseHp: 22, moveSpeed: 4, initiative: 3, ...BASE_STATS }, // total: 14
  wizard: { baseDmg: 1, baseHp: 15, moveSpeed: 3, initiative: 6, ...BASE_STATS }, // total: 13
  ranger: { baseDmg: 2, baseHp: 18, moveSpeed: 5, initiative: 4, ...BASE_STATS }, // total: 14
  warrior: { baseDmg: 3, baseHp: 20, moveSpeed: 4, initiative: 3, ...BASE_STATS }, // total: 15
  bandit: { baseDmg: 2, baseHp: 18, moveSpeed: 5, initiative: 5, ...BASE_STATS }, // total: 15
}

export const ENEMY_STATS: Record<EnemyClassType, UnitStats> = {
  brigand: { baseDmg: 3, dmgDice: 4, baseHp: 13, moveSpeed: 4, attackCount: 1, critChance: 0.15, initiative: 3 },
  skeleton: { baseDmg: 2, dmgDice: 3, baseHp: 8, moveSpeed: 3, attackCount: 1, critChance: 0.1, initiative: 2 }, 
  rat: { baseDmg: 1, dmgDice: 2, baseHp: 5, moveSpeed: 3, attackCount: 1, critChance: 0.1, initiative: 2}, 
  dummy: { baseDmg: 1, dmgDice: 0, baseHp: 1, moveSpeed: 1, attackCount: 1, critChance: 0, initiative: 1}, 
}

export const ALL_STATS: Record<CharClassType | EnemyClassType, UnitStats> = { ...CLASS_STATS, ...ENEMY_STATS}