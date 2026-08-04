// export type WeaponType =  'sword' | 'spear' | 'long_spear' | 'mace' | 'staff' | 'focus' | 'bow' | 'dagger' | 'trowing_knife' | 'rapier' | 'long_sword' | 'hand_axe' | 'battle_axe' | 'heavy_mace' | 'crossbow'

import type { WeaponStatsType } from "@/types/itemTypes";

export const WEAPON_STATS: Record<string, WeaponStatsType> = {
  'sword_0': {
    baseDmg: 3, dmgDice: 6, name: 'Short Sword', quantityAllowed: 1, weight: '1H', type: 'sword', rarity: 'common', bonusCritChance: 0.05,
   },

}  