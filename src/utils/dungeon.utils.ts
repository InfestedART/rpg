import { ALL_STATS } from "@/constants/classOptions";
import type { CharacterType } from "@/types/characterTypes";
import type { Board, GameState, InitialBoard, TileTerrain, Unit, Position, UsableObject, UnitType } from "@/types/dungeon.types";

export const isInBounds = (pos: Position, size: number) => (
  pos.row >= 0 && pos.row < size && pos.col >= 0 && pos.col < size
);

export const inititalizeGameState = (
  selectedCharacter: CharacterType | null,
  initialBoard: InitialBoard,
): GameState => {
  const playerStats = selectedCharacter ? ALL_STATS[selectedCharacter.class] : null;
  const units: Record<number, Unit> = {}
  const objects: Record<number, UsableObject> = {}

  for (const [key, value] of Object.entries(initialBoard)) {
    if (value.type === 'player' || value.type === 'enemy' || value.type === 'ally') {
      const unitStats = ALL_STATS[value.class || 'dummy']
      units[Number(key)] = {
        name: value.type === 'player' && selectedCharacter ? selectedCharacter.name : `${value.class || 'enemy'}_${key}`,
        type: value.type,
        class: value.class || 'dummy',
        currentHp: unitStats.baseHp,
        position: initialBoard[Number(key)].position
      }    
    }
    if (value.type === 'chest' || value.type === 'button') {
      objects[Number(key)] = {
        type: value.type,
        position: initialBoard[Number(key)].position
      }
    } 
  };

  return {
    units,
    objects,
    currentPlayer: 1,
    movesLeft: playerStats?.moveSpeed || 5,
    attacksLeft: playerStats?.attackCount || 1,
  } 
}

export const buildDungeon = (
  dungeonSize: number,
  dungeonType: TileTerrain,
  initialBoard: InitialBoard
) => {
  const board: Board = Array(dungeonSize).fill({ content: 'empty', terrain: dungeonType}).map(
    () => Array(dungeonSize).fill({ content: 'empty', terrain: dungeonType})
  );

  for (const value of Object.values(initialBoard)) {   
    board[Number(value.position.row)][Number(value.position.col)] = {
      content: value.type,
      terrain: dungeonType,
    }
  }

  return board;
}

export const getPieceId = (
  pos: Position,
  pieceList: Record<number, Unit | UsableObject>
): number | undefined => {
    for (const [id, piece] of Object.entries(pieceList)) {
      if (piece.position.col === pos.col && piece.position.row === pos.row) {
        return Number(id);
      }
    }
    return undefined;
}

export const isValidTarget = (pos: Position, targetList: Position[]) => {
  return targetList.some(target => target.col === pos.col && target.row === pos.row);
}

export const isEnemy = (pos: Position, unitList: Unit[], unitType: UnitType): boolean => {
  const playerIsHuman = unitType === 'player'|| unitType === 'ally';
  const enemiesInBoard = playerIsHuman
    ? Object.values(unitList).filter(unit => unit.type === 'enemy')
    : Object.values(unitList).filter(unit => unit.type === 'player' || unit.type === 'ally')

  return enemiesInBoard.some(
    enemy => enemy.position.col === pos.col && enemy.position.row === pos.row
  )
}

export const isObject = (pos: Position, objectList: UsableObject[] | undefined): boolean => {
  return objectList ? objectList.some(
    obj => obj.position.col === pos.col && obj.position.row === pos.row
  ) : false
}