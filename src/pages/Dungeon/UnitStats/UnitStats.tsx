import { ALL_STATS } from "@/constants/classOptions";
import type { GameState, Unit } from "@/types/dungeon.types";

type UnitStatsProps = {
  unit: Unit,
  gameState: GameState,
  isActive: boolean
}

const UnitStats = ({ unit, gameState, isActive }: UnitStatsProps) => {
  return (
    <div>
      <div>Name: {unit.name}</div>          
      <div>Class: {unit.class}</div>
      <div>HP: {unit.currentHp}/{ALL_STATS[unit.class].baseHp} </div>      
      <div>Attack Damage: {ALL_STATS[unit.class].baseDmg} </div>
      {isActive && (
        <div className="mt-3">
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
    </div>
  )
}

export default UnitStats;