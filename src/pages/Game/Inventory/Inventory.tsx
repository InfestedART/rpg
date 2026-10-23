import { removeItemFromInventory, updateItems } from "@/api/characters"
import Button from "@/components/Button"
import Tooltip from "@/components/Tooltip"

import { ITEM_STATS } from "@/constants/itemStats.constants"
import { useCharacterStore } from "@/store/characterStore"
import type { CharacterResponse } from "@/types/characterTypes"
import type { ItemStatsType } from "@/types/itemTypes"
import { getItemDetails } from "@/utils/item.utils"
import { removeFromArray } from "@/utils/utils"

type InventoryProps = {
  inventory: string[]
}

const Inventory = ({ inventory }: InventoryProps) => {
  const { selectedCharacter, setSelectedCharacter } = useCharacterStore();
  if (!selectedCharacter) { return null; }

  const updateCharacter = (char: CharacterResponse) => {
    console.log(char);
    const updatedChar = {
      ...char,
      equipment: JSON.parse(char.equipment),
      inventory: JSON.parse(char.inventory),
    }
    setSelectedCharacter(updatedChar)
  }

  const handleEquip = async (item: ItemStatsType, itemId: string) => {
    const oldItem = selectedCharacter.equipment[item.slot]
    const updatedEquipment = {
      ...selectedCharacter.equipment,
      [item.slot]: itemId,
    }
    const updatedInventory = removeFromArray(selectedCharacter.inventory, itemId)
    if (oldItem) { updatedInventory.push(oldItem) }
    const char = await updateItems(selectedCharacter.id, updatedEquipment, updatedInventory)    
    updateCharacter(char)
  }

  const handleDrop = async (itemId: string) => {
    const updatedChar = await removeItemFromInventory(selectedCharacter.id, itemId, selectedCharacter.inventory)
    updateCharacter(updatedChar)
  }

  return (
    <div>
      {inventory.map(itemId => {
        const itemStats = ITEM_STATS[itemId]
        const details = getItemDetails(itemStats)
        // console.log('==> details: ', details)
        return (
          <div className="grid grid grid-cols-[2fr_1fr_1fr] px-1 py-2" key={itemId}>
            <div>
            <Tooltip content={<div><pre>{details}</pre></div>}>
            <span>{itemStats.name}</span>
            </Tooltip>
            </div>
            <div>
              <Button onClick={() => handleEquip(itemStats, itemId)} size="sm" variant="primary" >
                EQUIP
              </Button>
            </div>
            <div>
              <Button onClick={() => handleDrop(itemId)} size="sm" variant="primary" >
                DROP
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Inventory