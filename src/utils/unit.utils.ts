import { ALL_STATS } from "@/constants/unitStats.constants";
import type { CharacterType, EquipmentType, UnitStatsT } from "@/types/characterTypes"
import type { ItemAdditionalStats, ItemBaseStats } from "@/types/itemTypes";
import { getEquipmentStats } from "./item.utils";

export function calculateFullStats(baseStats: UnitStatsT, equipment: Partial<EquipmentType>): UnitStatsT {
  const result = { ...baseStats }
  const equipmentStats = getEquipmentStats(equipment)

  Object.values(equipmentStats).forEach((item: ItemBaseStats) => {
    for (const key of Object.keys(item.bonusStats) as (keyof ItemAdditionalStats)[]) {
      if (!item) continue
      item.bonusStats[key] && (result[key] = (result[key] || 0) + item.bonusStats[key])
    }
  })
  return result
}

export const getPlayerUnitStats = (selectedCharacter: CharacterType): UnitStatsT => {
  const baseStats = ALL_STATS[selectedCharacter.class];
  return calculateFullStats(baseStats, selectedCharacter.equipment)
}

export const getUnitStats = (baseStats: UnitStatsT, equipment?: Partial<EquipmentType>): UnitStatsT => {
  return equipment ? calculateFullStats(baseStats, equipment) : baseStats
}