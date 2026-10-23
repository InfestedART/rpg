import Tooltip from "@/components/Tooltip"
import { ITEM_STATS } from "@/constants/itemStats.constants"
import { getItemDetails } from "@/utils/item.utils"
import './EquipmentStats.css'

type EquipmentStatsProps = {
  slot: string,
  itemId: string,
}

const EquipmentStats = ({ slot, itemId }: EquipmentStatsProps) => {
  const itemStats = ITEM_STATS[itemId]

  const details = getItemDetails(itemStats)
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