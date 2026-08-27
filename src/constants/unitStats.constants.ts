import type { CharClassType, EnemyClassType, UnitStatsT } from "@/types/characterTypes"

export const BASE_STATS = {
  attackCount: 1,
  bonusActions: 1,
  critChance: 0.10,
  dmgDice: 4,
}

export const CLASS_STATS: Record<CharClassType, UnitStatsT> = {
  soldier: { baseDmg: 2, baseHp: 22, moveSpeed: 4, initiative: 3, range: 1, ...BASE_STATS }, // total: 14
  wizard: { baseDmg: 0, baseHp: 15, moveSpeed: 3, initiative: 6, range: 1, ...BASE_STATS }, // total: 13
  ranger: { baseDmg: 1, baseHp: 18, moveSpeed: 5, initiative: 4, range: 1, ...BASE_STATS }, // total: 14
  warrior: { baseDmg: 2, baseHp: 20, moveSpeed: 4, initiative: 3, range: 1, ...BASE_STATS }, // total: 15
  bandit: { baseDmg: 1, baseHp: 18, moveSpeed: 5, initiative: 5, range: 1, ...BASE_STATS }, // total: 15
}

export const ENEMY_STATS: Record<EnemyClassType, UnitStatsT> = {
  brigand: { baseDmg: 3, dmgDice: 4, baseHp: 18, moveSpeed: 4, attackCount: 1, critChance: 0.1, initiative: 3, range: 1 },
  skeleton: { baseDmg: 2, dmgDice: 3, baseHp: 10, moveSpeed: 3, attackCount: 1, critChance: 0.15, initiative: 2, range: 1 }, 
  rat: { baseDmg: 1, dmgDice: 2, baseHp: 6, moveSpeed: 3, attackCount: 1, critChance: 0.1, initiative: 2, range: 1}, 
  dummy: { baseDmg: 1, dmgDice: 0, baseHp: 1, moveSpeed: 1, attackCount: 1, critChance: 0, initiative: 1, range: 1}, 
}

export const ALL_STATS: Record<CharClassType | EnemyClassType, UnitStatsT> = { ...CLASS_STATS, ...ENEMY_STATS}