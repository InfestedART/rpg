import { ITEM_STATS } from "@/constants/itemStats.constants"
import type { ShieldStatsType, WeaponStatsType } from "@/types/itemTypes"

type EquipmentStatsProps = {
  itemId: string
}

const EquipmentStats = ({ itemId }:EquipmentStatsProps) => {
  const itemStats = ITEM_STATS[itemId]
  // console.log('==> Item', itemStats)
  let details = '';
  switch (itemStats.itemType) {
    case 'offhand': {
      const { blockChance, evadeChance } = itemStats as ShieldStatsType;
      if (blockChance) { details += `Chance to Block: ${blockChance*100}%` }
      if (evadeChance) { details += `Chance to Evade: ${evadeChance*100}%` }
      break;
    }
    case 'weapon': {
      const { baseDmg, dmgDice, stunChance } = itemStats as WeaponStatsType;
      details += `Damage: ${baseDmg}-${baseDmg + dmgDice}`
      if (stunChance) { details += `Chance to Stun: ${stunChance*100}%` }
      break;
    }
  }
  return (
    <div>
      <span className="ml-5">- {itemStats.name}</span>
      <span className="ml-4">{details}</span>
    </div>
  )
}

export default EquipmentStats