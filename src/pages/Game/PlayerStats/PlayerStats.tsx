import EquipmentStats from "../EquipmentStats";
import SingleStat from "../SingleStat";

import { capitalize } from "@/utils/utils";
import { getPlayerUnitStats } from "@/utils/unit.utils";

import type { CharacterType } from "@/types/characterTypes";

type PlayerStatsProps = {
  selectedCharacter: CharacterType
}

const PlayerStats = ({ selectedCharacter }: PlayerStatsProps) => {
  if (!selectedCharacter) return null;

  const equipedItems = Object.entries(selectedCharacter.equipment)
  const playerStats = getPlayerUnitStats(selectedCharacter);
  const { critChance, evadeChance, blockChance, stunChance, bleedChance } = playerStats
  
  const minDmg = playerStats.baseDmg
  const maxDmg = minDmg + playerStats.dmgDice 

  return (
    <div>
      <SingleStat label="Name: " value={selectedCharacter.name} />
      <SingleStat label="Class: " value={capitalize(selectedCharacter.class)} />

      <div>
        <span>Stats: </span>
        <div className="ml-3">
          <SingleStat label="HP: " value={playerStats.baseHp} />
          <SingleStat label="Damage: " value={`${minDmg}-${maxDmg}`} />
          { playerStats.range > 1 && <SingleStat label="Attack Range: " value={playerStats.range} /> }
          { <SingleStat label="Critical Strike Chance: " value={critChance} percentage /> }
          { <SingleStat label="Chance to Evade: " value={evadeChance} percentage /> }
          { <SingleStat label="Chance to Block: " value={blockChance} percentage /> }
          { <SingleStat label="Chance to Stun: " value={stunChance} percentage /> }
          { <SingleStat label="Chance to cause Bleeding: " value={bleedChance} percentage /> }
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