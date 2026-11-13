import type { EquipedItemsType, ItemAdditionalStats, ItemStatsType } from "@/types/itemTypes";
import { round } from "./utils";
import type { EquipmentType } from "@/types/characterTypes";
import { ITEM_STATS } from "@/constants/itemStats.constants";

export const getEquipmentStats = (equipment: Partial<EquipmentType>): EquipedItemsType => (
  Object.fromEntries(
    Object.entries(equipment)
      .filter(item => item[1] !== null)
      .map(item => [item[0], item[1] && ITEM_STATS[item[1]]])
  )
)

export const getItemDetails = (itemStats: ItemStatsType) => {
  // console.log('==> itemStats', itemStats)
  let details = '';
  const {
    blockChance,
    evadeChance,
    critChance,
    bleedChance,
    stunChance,
    range,
    armor,
    magicShield,
    moveSpeed,
    mana,
    manaRegen,
    stunProtection,
    critProtection,
    hazardProtection,
  } = itemStats.bonusStats as ItemAdditionalStats
  if (blockChance) { details += `Block Chance: +${round(blockChance*100, 2)}% \n` }
  if (evadeChance) { details += `Evade Chance: +${round(evadeChance*100, 2)}% \n` }
  if (critChance) { details += `Critical Chance: +${round(critChance*100, 2)}% \n` }
  if (bleedChance) { details += `Chance to Bleed: +${round(bleedChance*100, 2)}% \n` }
  if (stunChance) { details += `Stun Chance: +${round(stunChance*100, 2)}% \n` }
  if (moveSpeed) { details += `Bonus Move Speed: +${moveSpeed} \n`}
  if (mana) { details += `Bonus Mana: +${mana} \n`}
  if (manaRegen) { details += `Mana Regeneration: +${manaRegen} mana per movement \n`}
  if (armor) { details += `Armor (Damage reduction): ${armor} \n`}
  if (magicShield) { details += `Magic Shield: ${magicShield} \n`}
  if (range) { details += `Bonus Range: +${range} \n` }
  if (stunProtection) { details += `Chance to prevent Stun: +${round(stunProtection*100, 2)}% \n` }
  if (critProtection) { details += `Chance to prevent Criticals: +${round(critProtection*100, 2)}% \n` }
  if (hazardProtection) { details += `Ground Damage Prevented: +${hazardProtection} \n`}

  return details
}