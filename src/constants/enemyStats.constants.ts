import type { EnemyClassType, UnitStatsT } from "@/types/characterTypes";

export const ENEMY_STATS: Record<EnemyClassType, UnitStatsT> = {
  dummy: { baseDmg: 1, dmgDice: 0, baseHp: 1, moveSpeed: 1, attackCount: 1, critChance: 0, initiative: 1, range: 1}, 
  rat: {
    baseDmg: 1,
    dmgDice: 2,
    baseHp: 6,
    moveSpeed: 3,
    attackCount: 1,
    critChance: 0.1,
    initiative: 2,
    range: 1,
    icon: 'rat'
  }, 
  skeleton: {
    baseDmg: 2,
    dmgDice: 3,
    baseHp: 10,
    moveSpeed: 3,
    attackCount: 1,
    critChance: 0.15,
    initiative: 2,
    range: 1,
    icon: 'skeleton1'
  }, 
  brigand: {
    baseDmg: 0 ,
    dmgDice: 4,
    baseHp: 15,
    moveSpeed: 4,
    attackCount: 1,
    critChance: 0.1,
    initiative: 3,
    range: 1,
    icon: 'brigand'
  },
}