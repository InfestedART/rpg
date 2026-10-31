import PlayerIcon from "@/components/BoardIcons/PlayerIcon"
import type { CharacterType, CharClassType, EnemyClassType, ObjectClassType } from "@/types/characterTypes"
import type { GameState, Position, Tile } from "@/types/dungeon.types"
import { getObjectId, getUnitId } from "./dungeon.utils"
import UnitIcon from "@/components/BoardIcons/UnitIcon"
import ObjectIcon from "@/components/BoardIcons/ObjectIcon"
import TerrainIcon from "@/components/BoardIcons/TerrainIcon"
import { TILE_SIZE } from "@/constants/dungeon.contants"

export const getPieceIcon = (
  tile: Tile,
  position: Position,
  gameState: GameState,
  selectedCharacter: CharacterType
) => {
  const { content, decal } = tile
  const tileSize = TILE_SIZE

  const isTileAnObj = content === 'chest'
  const isTileAUnit = content === 'ally' || content === 'enemy'
  const isTileATrap = decal === 'spikes'
  
  if (content === 'player') {
    return <PlayerIcon size={40} name={selectedCharacter.class as CharClassType} />
  } else if (isTileAUnit) {
    const unitId = getUnitId(position, gameState)
    if (unitId) {
      return <UnitIcon size={tileSize} name={gameState.units?.[unitId].class as EnemyClassType} />
    }
  } else if (isTileAnObj) {
    const objectId = getObjectId(position, gameState)
    if (objectId) {
      return <ObjectIcon size={tileSize} name={gameState.objects?.[objectId].type as ObjectClassType} />
    }
  } else if (isTileATrap) {
    // console.log('==> trap', position.row, position.col, tile)
    return <TerrainIcon size={tileSize} name={decal} />;
  } else return null;
  
}