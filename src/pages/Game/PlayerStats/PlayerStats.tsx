import type { CharacterType } from "@/types/characterTypes";
import EquipmentStats from "../EquipmentStats";
import { capitalize, round } from "@/utils/utils";
import SingleStat from "../SingleStat";
import { getPlayerUnit } from "@/utils/unit.utils";

type PlayerStatsProps = {
  selectedCharacter: CharacterType
}

const PlayerStats = ({ selectedCharacter }: PlayerStatsProps) => {
  if (!selectedCharacter) return null;

  const equipedItems = Object.entries(selectedCharacter.equipment)
  const playerStats = getPlayerUnit(selectedCharacter);
  
  const minDmg = playerStats.baseDmg
  const maxDmg = minDmg + playerStats.dmgDice
  const { critChance, evadeChance, blockChance, stunChance, bleedChance } = playerStats

  return (
    <div>
      <SingleStat label="Name: " value={selectedCharacter.name} />
      <SingleStat label="Class: " value={capitalize(selectedCharacter.class)} />

      <div>
        <span>Stats: </span>
        <div className="ml-3">
          <SingleStat label="Damage: " value={`${minDmg}-${maxDmg}`} />
          { critChance && critChance > 0 && <SingleStat label="Critical Strike Chance: " value={`${critChance}%`} /> }
          { evadeChance && evadeChance > 0 && <SingleStat label="Chance to Evade: " value={`${round(evadeChance*100, 2)}%`} /> }
          { blockChance && blockChance > 0 && <SingleStat label="Chance to Block: " value={`${round(blockChance*100, 2)}%`} /> }
          { stunChance && stunChance > 0 && <SingleStat label="Chance to Stun: " value={`${round(stunChance*100, 2)}%`} /> }
          { bleedChance && bleedChance > 0 && <SingleStat label="Chance to cause Bleeding: " value={`${round(bleedChance*100, 2)}%`} /> }
        </div>
      </div>

      <div>
        <span>Equipment: </span> 
        <div className="ml-3">
          {equipedItems.map(([slot, item]) => (
            item ? <EquipmentStats slot={slot} itemId={item} key={slot}/> : null
          ))}
        </div>
      </div>

      <div>
        <SingleStat label="Gold: " value={`${selectedCharacter.gold}`} />
      </div>
    </div>
  )
}

export default PlayerStats;