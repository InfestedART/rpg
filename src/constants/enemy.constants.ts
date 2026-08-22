import type { EnemyClassType, EnemyWeaponPoolT } from "@/types/characterTypes";

export const ENEMY_WEAPON_POOL: Partial<Record<EnemyClassType, EnemyWeaponPoolT>> = {
  brigand: { slot: 'weapon1', weapons: ['dagger_0', 'axe_0', 'mace_0'], chance: 1 }
}