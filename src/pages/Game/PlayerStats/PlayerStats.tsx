import EquipmentStats from "../EquipmentStats";
import SingleStat from "../SingleStat";

import { capitalize } from "@/utils/utils";
import { getPlayerUnitStats } from "@/utils/unit.utils";

import type { CharacterType, StatsId } from "@/types/characterTypes";
import { STATS_LABELS } from "@/constants/unitStats.constants";

type PlayerStatsProps = {
  selectedCharacter: CharacterType
}

const PlayerStats = ({ selectedCharacter }: PlayerStatsProps) => {
  if (!selectedCharacter) return null;

  const equipedItems = Object.entries(selectedCharacter.equipment)
  const playerStats = getPlayerUnitStats(selectedCharacter);
  
  const minDmg = playerStats.baseDmg
  const maxDmg = minDmg + playerStats.dmgDice 

  return (
    <div>
      <SingleStat label="Name: " value={selectedCharacter.name} />
      <SingleStat label="Class: " value={capitalize(selectedCharacter.class)} />

      <div>
        <span>Stats: </span>
        <div className="ml-3">          
          <SingleStat label="Damage: " value={`${minDmg}-${maxDmg}`} />
          { Object.entries(playerStats).map(stat => {
            const statsLabel = STATS_LABELS[stat[0] as StatsId]
            return statsLabel ? (
              <SingleStat label={statsLabel.label} percentage={statsLabel.percentage} value={stat[1]} key={stat[0]}/>
            ) : null
          })}
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