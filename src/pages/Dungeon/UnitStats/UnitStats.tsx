import { ALL_STATS } from "@/constants/unitStats.constants";
import type { GameState, Unit, UnitStatus } from "@/types/dungeon.types";

import { useCharacterStore } from "@/store/characterStore";
import { getPlayerUnitStats, getUnitStats } from "@/utils/unit.utils";
import { capitalize } from "@/utils/utils";

import SingleStat from "@/pages/Game/SingleStat";
import EquipmentStats from "@/pages/Game/EquipmentStats";
import Tooltip from "@/components/Tooltip";
import { STATUS_DESCRIPTIONS } from "@/constants/game.constants";

type UnitStatsProps = {
  unit: Unit,
  gameState: GameState,
  isActive: boolean
}

const UnitStats = ({ unit, gameState, isActive }: UnitStatsProps) => {
  const baseStats = ALL_STATS[unit.class];
  const { selectedCharacter } = useCharacterStore();

  const isPlayer = unit.type === 'player' && unit.name === selectedCharacter?.name;
  const unitStats = isPlayer ? getPlayerUnitStats(selectedCharacter) : getUnitStats(baseStats, unit.equipment)
  const equipment = isPlayer ? selectedCharacter?.equipment : unit.equipment

  const isStunned = unit.status.indexOf('stunned') > -1
  const movesLeft = isStunned ? 0 : gameState.movesLeft;
  const attacksLeft = isStunned ? 0 : gameState.attacksLeft;

  // console.log('==> stats', unitStats, unit)

  const getUnitStatus = (status: UnitStatus[]) => {
    return (
      <div>
        <span>STATUS: </span>
         {status.map(debuff => (
          <Tooltip content={<div>{STATUS_DESCRIPTIONS[debuff]}</div>}>
            <span>{debuff}</span>
          </Tooltip>
         ))} 
      </div>
    )
  }

  return (
    <div>
      <SingleStat label={'Name: '} value={unit.name} />
      <SingleStat label={'Class: '} value={capitalize(unit.class)} />
      <SingleStat label={'HP: '} value={`${unit.currentHp}/${baseStats.baseHp}`} />
      {isActive && (
        <div className="mt-2">
          <SingleStat label={'Position: '} value={`${unit.position.col}, ${unit.position.row}`} />          
          {unit.status.length > 0 && getUnitStatus(unit.status)}
          <div className={movesLeft < 1 ? 'red-text' : ''}>
            Moves Left: {movesLeft} {isStunned && `(Stunned)`}
          </div>
          <div className={attacksLeft < 1 ? 'red-text' : ''}>
            Attacks Left: {attacksLeft} {isStunned && `(Stunned)`}
          </div>
          {unit.type === 'player' && (
            <div className={gameState.bonusActionsLeft < 1 ? 'red-text' : ''}>
              Bonus Actions Left: {gameState.bonusActionsLeft}
          </div>
          )}
        </div>
      )}
      <div className="mt-2">
        <span>STATS: </span>
          <div className='ml-2'>
            <SingleStat label="Damage: " value={`${unitStats.baseDmg}-${unitStats.baseDmg + unitStats.dmgDice}`} />
            { <SingleStat label="Critical Strike Chance: " value={unitStats.critChance} percentage /> }
            { <SingleStat label="Chance to Evade: " value={unitStats.evadeChance} percentage /> }
            { <SingleStat label="Chance to Block: " value={unitStats.blockChance} percentage /> }
            { <SingleStat label="Chance to Stun: " value={unitStats.stunChance} percentage /> }
            { <SingleStat label="Chance to cause Bleeding: " value={unitStats.bleedChance} percentage /> }
          </div>
      </div>
      {equipment && (
        <div>
          <span>EQUIPMENT</span>
          {Object.entries(equipment).map(([slot, item]) => (
            item ? <EquipmentStats slot={slot} itemId={item} key={slot}/> : null
          ))}
        </div>
      )}

    </div>
  )
}

export default UnitStats;