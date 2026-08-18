import { ALL_STATS } from "@/constants/unitStats.constants";
import SingleStat from "@/pages/Game/SingleStat";
import { useCharacterStore } from "@/store/characterStore";
import type { GameState, Unit } from "@/types/dungeon.types";
import { capitalize } from "@/utils/utils";

type UnitStatsProps = {
  unit: Unit,
  gameState: GameState,
  isActive: boolean
}

const UnitStats = ({ unit, gameState, isActive }: UnitStatsProps) => {
  const stats = ALL_STATS[unit.class];
  const { selectedCharacter } = useCharacterStore();

  const isPlayer = unit.type === 'player' && unit.name === selectedCharacter?.name;
  console.log('==> stats', stats)
  // isPlayer && console.log('==> unit', selectedCharacter.equipment)
  return (
    <div>
      <div><span>Name:</span> <span> {unit.name}</span></div>
      <div><span>Class:</span> <span> {capitalize(unit.class)} </span></div>
      <div><span>HP: </span> <span>{unit.currentHp}/{stats.baseHp}</span> </div>
      {isActive && (
        <div className="mt-2">
          <div>Position: {unit.position.col}, {unit.position.row}</div>
          <div className={gameState.movesLeft < 1 ? 'red-text' : ''}>
            Moves Left: {gameState.movesLeft}
          </div>
          <div className={gameState.attacksLeft < 1 ? 'red-text' : ''}>
            Attacks Left: {gameState.attacksLeft}
          </div>
          {unit.type === 'player' && (
            <div className={gameState.bonusActionsLeft < 1 ? 'red-text' : ''}>
              Bonus Actions Left: {gameState.bonusActionsLeft}
          </div>
          )}
        </div>
      )}
      {isPlayer && (
        <div className="mt-2">
          <span>STATS: </span>
            <div className='ml-2'>
              <SingleStat label="Critical Strike Chance: " value={'0'} />
            </div>
        </div>
      )}
    </div>
  )
}

export default UnitStats;