import PlayerIcon from "@/components/PlayerIcon"
import type { CharacterType, CharClassType, EnemyClassType, ObjectClassType } from "@/types/characterTypes"
import type { GameState, Position, TileContent } from "@/types/dungeon.types"
import { getObjectId, getUnitId } from "./dungeon.utils"
import UnitIcon from "@/components/UnitIcon"
import ObjectIcon from "@/components/ObjectIcon"

export const getPieceIcon = (
  tileContent: TileContent,
  position: Position,
  gameState: GameState,
  selectedCharacter: CharacterType
) => {
  const isTileAnObj = tileContent === 'chest' || tileContent=== 'button'
  const isTileAUnit = tileContent === 'ally' || tileContent === 'enemy'
  
  if (tileContent === 'player') {
    return <PlayerIcon size={40} name={selectedCharacter.class as CharClassType} />
  } else if (isTileAUnit) {
    const unitId = getUnitId(position, gameState)
    if (unitId) {
      return <UnitIcon size={40} name={gameState.units?.[unitId].class as EnemyClassType} />
    }
  } else if (isTileAnObj) {
    const objectId = getObjectId(position, gameState)
    if (objectId) {
      return <ObjectIcon size={40} name={gameState.objects?.[objectId].type as ObjectClassType} />
    }
  } else return null;
  
}