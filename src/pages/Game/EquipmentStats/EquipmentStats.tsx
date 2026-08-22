import { ITEM_STATS } from "@/constants/itemStats.constants"
import type { ShieldStatsType, WeaponStatsType } from "@/types/itemTypes"
import './EquipmentStats.css'
import Tooltip from "@/components/Tooltip"
import { round } from "@/utils/utils"

type EquipmentStatsProps = {
  slot: string,
  itemId: string,
}

const EquipmentStats = ({ slot, itemId }: EquipmentStatsProps) => {
  const itemStats = ITEM_STATS[itemId]
  // console.log('==> Item', itemStats)

  let details = '';
  switch (itemStats.itemType) {
    case 'offhand': {
      const { blockChance, evadeChance } = itemStats as ShieldStatsType;
      if (blockChance) { details += `Block Chance: +${round(blockChance*100, 2)}% \n` }
      if (evadeChance) { details += `Evade Chance: +${round(evadeChance*100, 2)}% \n` }
      break;
    }
    case 'weapon': {
      const { baseDmg, dmgDice, stunChance, bonusCritChance, bleedChance } = itemStats as WeaponStatsType;
      details += `Damage: ${baseDmg}-${baseDmg + dmgDice} \n`
      if (bonusCritChance) { details += `Critical Chance: +${round(bonusCritChance*100, 2)}% \n` }
      if (bleedChance) { details += `Chance to Bleed: +${round(bleedChance*100, 2)}% \n` }
      if (stunChance) { details += `Stun Chance: +${round(stunChance*100, 2)}% \n` }
      break;
    }
  }
  return (
    <div>
      <span>{slot}: </span>
      <Tooltip content={<div><pre>{details}</pre></div>}>
        <span className="ml-3">{itemStats.name}</span>
      </Tooltip>
    </div> 
  )
}

export default EquipmentStats