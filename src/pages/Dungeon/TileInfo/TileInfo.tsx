import type { Board, GameState, Position } from "@/types/dungeon.types";
import { getObjectId, getUnitId, isPieceAnObject, isPieceAUnit } from "@/utils/dungeon.utils";
import UnitStats from "../UnitStats";

type TileInfoProps = {
  selectedTile: Position
  gameState: GameState
  board: Board
}

type PieceInfoProps = {
  tilePosition: Position
  gameState: GameState
}

const ObjectInfo = ({ tilePosition, gameState }: PieceInfoProps) => {
  const objId = getObjectId(tilePosition, gameState)
  if (!objId) return null;
  const objPiece = gameState.objects?.[objId]

  return <div>Object Type: {objPiece && objPiece.type}</div>
}

const UnitInfo = ({ tilePosition, gameState }: PieceInfoProps) => {
  const unitId = getUnitId(tilePosition, gameState)
  if (!unitId) return null;

  return (
    <UnitStats
      unit={gameState.units[unitId]} 
      gameState={gameState} 
      isActive={false} 
    />
  )
}

const TileInfo = ({ selectedTile, gameState, board }: TileInfoProps ) => {  
  const tile = board[selectedTile.row][selectedTile.col];
  const isTileEmpty = tile.content === 'empty';

  return (
    <div>
      <div className="terrain-info mb-5">
        <div>Position: {selectedTile.col}, {selectedTile.col}</div>
        <div>Terrain: {tile.terrain}</div>
      </div>
      {!isTileEmpty && isPieceAnObject(selectedTile, gameState) && (
        <ObjectInfo tilePosition={selectedTile} gameState={gameState} />
      )}
      {!isTileEmpty && isPieceAUnit(selectedTile, gameState) && (
        <UnitInfo tilePosition={selectedTile} gameState={gameState} />
      )}
    </div>
  )
}

export default TileInfo;