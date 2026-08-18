import { ITEM_STATS } from "@/constants/itemStats.constants"
import type { ShieldStatsType, WeaponStatsType } from "@/types/itemTypes"
import './EquipmentStats.css'
import Tooltip from "@/components/Tooltip"

type EquipmentStatsProps = {
  itemId: string,
}

const EquipmentStats = ({ itemId }: EquipmentStatsProps) => {
  const itemStats = ITEM_STATS[itemId]
  // console.log('==> Item', itemStats)
  let details = '';
  switch (itemStats.itemType) {
    case 'offhand': {
      const { blockChance, evadeChance } = itemStats as ShieldStatsType;
      if (blockChance) { details += `Block Chance: ${Math.round(blockChance*1000)/10}%` }
      if (evadeChance) { details += `Evade Chance: ${Math.round(evadeChance*1000)/10}%` }
      break;
    }
    case 'weapon': {
      const { baseDmg, dmgDice, stunChance } = itemStats as WeaponStatsType;
      details += `${baseDmg}-${baseDmg + dmgDice} dmg`
      if (stunChance) { details += `Stun Chance: ${Math.round(stunChance*1000)/10}%` }
      break;
    }
  }
  return (
    <div>
      <Tooltip content={<div>{details}</div>}>
        <span className="ml-3">{itemStats.name}</span>
      </Tooltip>
    </div> 
  )
}

export default EquipmentStats