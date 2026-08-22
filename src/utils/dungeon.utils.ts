import { ALL_STATS } from "@/constants/unitStats.constants";
import type { CharacterType, EnemyClassType } from "@/types/characterTypes";
import type { Board, GameState, InitialBoard, TileTerrain, Unit, Position, UsableObject } from "@/types/dungeon.types";
import { randomNumber, selectRandomItem } from "./utils";
import { ENEMY_WEAPON_POOL } from "@/constants/enemy.constants";

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

  for (const [key, piece] of Object.entries(initialBoard)) {
    if (piece.type === 'player' || piece.type === 'enemy' || piece.type === 'ally') {
      const unitStats = ALL_STATS[piece.class || 'dummy']
      units[Number(key)] = {
        name: piece.type === 'player' && selectedCharacter ? selectedCharacter.name : `${piece.class || 'enemy'}_${key}`,
        type: piece.type,
        class: piece.class || 'dummy',
        currentHp: unitStats.baseHp,
        position: initialBoard[Number(key)].position,
        status: []
      }    
    }
    if (piece.type === 'enemy' && piece.class) {
       const weaponPool = ENEMY_WEAPON_POOL[(piece.class as EnemyClassType)]
       if (weaponPool) {
        const hasWeapon = Math.random() < weaponPool.chance
        if (hasWeapon) {
          const enemyWeapon = selectRandomItem(weaponPool.weapons)
          units[Number(key)].equipment = { [weaponPool.slot]: enemyWeapon}
        }
       }
    }
    if (piece.type === 'chest' || piece.type === 'button') {
      objects[Number(key)] = {
        type: piece.type,
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
    bonusActionsLeft: playerStats?.bonusActions || 1,
  } 
}

const addWaterToBoard = (dungeonSize: number, board: Board): Board => {
  const waterDirection = randomNumber(1, 2);
  if (waterDirection % 2 === 0) {
    board[1][Math.floor(dungeonSize*0.67)] = {
      content: board[1][Math.floor(dungeonSize*0.67)].content,
      terrain: 'water'
    }
  } else {
    board[Math.floor(dungeonSize*0.67)][1] = {
      content: board[Math.floor(dungeonSize*0.67)][1].content,
      terrain: 'water'
    } 
  }
  
  return board
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

  const finalBoard = randomNumber(1, 2) % 2 === 0 ? addWaterToBoard(dungeonSize, board) : board
  return finalBoard;
}

export const getUnitsInBoard = (gameState: GameState) => gameState.units && Object.values(gameState.units);
export const getObjectsInBoard = (gameState: GameState) => gameState.objects && Object.values(gameState.objects);
export const getEnemiesInBoard = (activePlayer: Unit, gameState: GameState) => {
  const playerIsHuman = activePlayer.type === 'player'|| activePlayer.type === 'ally';
  const unitsInBoard = getUnitsInBoard(gameState);
  return playerIsHuman
    ? Object.values(unitsInBoard).filter(unit => unit.type === 'enemy')
    : Object.values(unitsInBoard).filter(unit => unit.type === 'player' || unit.type === 'ally')
}

export const getObjectsInRange = (gameState: GameState, validTargets: Position[]) => {
  const objectsInBoard = getObjectsInBoard(gameState);
  return validTargets.filter(target =>
    objectsInBoard?.some(
      obj =>
        obj.position.col === target.col &&
        obj.position.row === target.row
    )
  ).length;
}

export const getEnemiesInRange = (activePlayer: Unit, gameState: GameState, validTargets: Position[]) => {
  const enemiesInBoard = getEnemiesInBoard(activePlayer, gameState);
  return validTargets.filter(target =>
    enemiesInBoard?.some(
      obj =>
        obj.position.col === target.col &&
        obj.position.row === target.row
    )
  ).length;
}

export const getUnitId = (pos: Position, gameState: GameState): number | undefined => {
  for (const [id, piece] of Object.entries(gameState.units)) {
    if (piece.position.col === pos.col && piece.position.row === pos.row) return Number(id);
  }
  return undefined;
}

export const getObjectId = (pos: Position, gameState: GameState): number | undefined => {
  if (!gameState.objects) return undefined;
  for (const [id, piece] of Object.entries(gameState.objects)) {
    if (piece.position.col === pos.col && piece.position.row === pos.row) return Number(id);
  }
  return undefined;
}

export const isValidTarget = (pos: Position, validTargets: Position[]): boolean => {
  return validTargets.some(target => target.col === pos.col && target.row === pos.row);
}

export const isPieceAnObject = (pos: Position, gameState: GameState): boolean => {
  const objectList = getObjectsInBoard(gameState);
  return objectList ? objectList.some(
    obj => obj.position.col === pos.col && obj.position.row === pos.row
  ) : false
}

export const isPieceAUnit =  (pos: Position, gameState: GameState): boolean => {
  const unitList = getUnitsInBoard(gameState);
  return unitList ? unitList.some(
    obj => obj.position.col === pos.col && obj.position.row === pos.row
  ) : false
}

export const isPieceAnEnemy = (pos: Position, gameState: GameState, activePlayer: Unit): boolean => {
  const playerIsHuman = activePlayer.type === 'player'|| activePlayer.type === 'ally';
  const unitList = getUnitsInBoard(gameState);
  const enemiesInBoard = playerIsHuman
    ? Object.values(unitList).filter(unit => unit.type === 'enemy')
    : Object.values(unitList).filter(unit => unit.type === 'player' || unit.type === 'ally')

  return enemiesInBoard.some(
    enemy => enemy.position.col === pos.col && enemy.position.row === pos.row
  )
}