import { useState, useEffect, useRef, useCallback } from "react";

import { DIRECTION_MAP, DIRECTIONS, DUNGEON_SIZE } from "@/constants/dungeon.contants";

import type { ActionType, Board, GameState, Position, UnitStatus } from "@/types/dungeon.types";

import { useDungeonStore } from '@/store/dungeonStore';
import { useCharacterStore } from "@/store/characterStore";

import useMessageLog from "./MessageBox/useMessageLog";

import { clamp, randomNumber } from "@/utils/utils";
import {
  buildDungeon,
  getUnitId,
  inititalizeGameState,
  isPieceAnEnemy,
  isInBounds,
  isPieceAnObject,
  isValidTarget,
  getEnemiesInRange,
  getObjectsInRange,
  getObjectId,
  getLegalTargets,
  getPositionInDirection,
} from "@/utils/dungeon.utils";
import { addGoldToCharacter } from "@/api/characters";
import { ALL_STATS } from "@/constants/unitStats.constants";
import { getPlayerUnitStats, getUnitStats } from "@/utils/unit.utils";
import type { MessageLogType } from "@/types/game.types";
import type { CharacterType } from "@/types/characterTypes";

type DungeonEngine = {
  board: Board,
  gameState: GameState,
  finishTurn: () => void,
  selectedTile: Position | null,
  isInteracting: boolean,
  isAttacking: boolean,
  handleAction: (action: ActionType) => void,
  cancelAction: () => void,
  handleTileClick: (pos: Position) => void,
  validTargets: Position[],
  boardRef: React.RefObject<HTMLDivElement | null>,
  messages: MessageLogType[],
  showAttackRange: (show: boolean) => void,
}

const useDungeonEngine = (): DungeonEngine => {
  // stores
  const { dungeonSize, dungeonType, initialBoard } = useDungeonStore();
  const { selectedCharacter } = useCharacterStore();
  // if (!selectedCharacter) return {};
  const { messages, sendMessage } = useMessageLog();

  // state
  const [selectedTile, setselectedTile] = useState<Position | null>(null)
  const [gameState, setGameState] = useState<GameState>(
    inititalizeGameState(selectedCharacter, initialBoard)
  )
  const [board, setBoard] = useState<Board>(
    buildDungeon(DUNGEON_SIZE[dungeonSize || 'md'], dungeonType, initialBoard)
  );
  const [validTargets, setValidTargets] = useState<Position[]>([])
  const [isInteracting, setIsInteracting] = useState<boolean>(false)
  const [isAttacking, setIsAttacking] = useState<boolean>(false)
  
  const boardRef = useRef<HTMLDivElement>(null);

  const activePlayer = gameState.units[gameState.currentPlayer];  
  // console.log('==> initialState', gameState);

  const handleTileClick = (pos: Position) => {
    if (isAttacking && isValidTarget(pos, validTargets) && isPieceAnEnemy(pos, gameState, activePlayer)) {
      handleAttack(pos);
    } else if (isInteracting && isValidTarget(pos, validTargets) && isPieceAnObject(pos, gameState)) {
      handleInteract(pos);
    } else {
      setselectedTile({row: pos.row, col: pos.col});
    }
  }

  const handleAction = (action: ActionType) => {
    setselectedTile(null)
    if (action === 'interact') setIsInteracting(true)
      else if (action === 'attack') setIsAttacking(true)
  }

  const cancelAction = () => {
    setIsInteracting(false);
    setIsAttacking(false);
  }

  const handleAttack = (pos: Position) => {
    const targetUnitId = getUnitId(pos, gameState);
    if (!targetUnitId) {
      console.error('==> No Target Unit');
      return;
    }
    const targetUnit = gameState.units[targetUnitId]
    const attackerStats = activePlayer.type === 'player' 
      ? getPlayerUnitStats(selectedCharacter as CharacterType)  //TODO: fallout if !selectedCharacter
      : getUnitStats(ALL_STATS[activePlayer.class])
    const targetStats = targetUnit.type === 'player' 
      ? getPlayerUnitStats(selectedCharacter as CharacterType)
      : getUnitStats(ALL_STATS[targetUnit.class])

    const baseDamage = attackerStats.baseDmg + randomNumber(1, attackerStats.dmgDice);

    const criticalHit = Math.random() <= (attackerStats.critChance || 0);
    const blocked = Math.random() <= (targetStats.blockChance || 0);
    const evaded = Math.random() <= (targetStats.evadeChance || 0);

    let attackDmg = criticalHit ? baseDamage * 1.5 : baseDamage
    if (blocked) { attackDmg = attackDmg * 0.5 }

    // STATUS CHANGE
    const targetStatus: UnitStatus[] = []

    if (attackerStats.stunChance) {
      if (Math.random() <= attackerStats.stunChance) { targetStatus.push('stunned') }
    }
    if (attackerStats.stunChance) {
      if (Math.random() <= attackerStats.stunChance) { targetStatus.push('bleeding') }
    }

    // TARGET IS DEAD?
    const remainingHp = evaded ? 0 : targetUnit.currentHp - attackDmg
    const { [targetUnitId]: removed, ...remainingUnits } = gameState.units
    const newUnitList = remainingHp <= 0 ? remainingUnits : {
      ...gameState.units,
      [targetUnitId]: {
        ...targetUnit,
        currentHp: remainingHp,
        status: targetStatus
      }
    }

    // ATTACK LOG
    const specialLog = criticalHit || blocked || evaded || targetStatus.length > 0
    let attackLog = ''
    if (criticalHit) { attackLog += 'CRITICAL HIT! ' }
    if (blocked) { attackLog += 'BLOCKED! ' }
    if (targetStatus.indexOf('stunned') > -1) { attackLog += 'STUN! '}
    if (targetStatus.indexOf('bleeding') > -1) { attackLog += 'OPEN WOUNDS! '}
    attackLog +=  `${activePlayer.name} attacks ${targetUnit.name} for ${attackDmg} dmg. `;
    if (blocked) { attackLog += '(Half Damage)'}
    if (targetStatus.indexOf('stunned') > -1) { attackLog += `${targetUnit.name} is stunned. ` }
    if (targetStatus.indexOf('bleeding') > -1) { attackLog += `${targetUnit.name} is bleeding. ` }

    if (evaded) { attackLog = `EVADED! ${targetUnit.name} dodged ${activePlayer.name}'s attack` }
    sendMessage(attackLog, specialLog ? 'warning' : 'info');

    const newGameState = {
      ...gameState,
      attacksLeft: gameState.attacksLeft - 1,
      units: newUnitList
    }

    if (remainingHp <= 0) {
      sendMessage(`${activePlayer.name} killed ${targetUnit.name}!`, 'important');
      const newBoard = board.map(r => [...r]);
      newBoard[targetUnit.position.row][targetUnit.position.col] = {
        ...board[targetUnit.position.row][targetUnit.position.col],
        content: 'empty'
      };
      checkDungeonComplete(newGameState)
      setBoard(newBoard);
    }    
    
    setIsAttacking(false);
    setGameState(newGameState)
    boardRef.current?.focus();
  }

  const handleInteract = (pos: Position) => {
    const targetObjId = getObjectId(pos, gameState);
    if (!targetObjId || !gameState.objects) {
      console.error('==> No Target Object');
      return;
    }
    const targetObject = gameState.objects[targetObjId]
    const newBoard = board.map(r => [...r]);
    newBoard[targetObject.position.row][targetObject.position.col] = {
      ...board[targetObject.position.row][targetObject.position.col],
      content: 'empty'
    };
    const { [targetObjId]: removed, ...remainingObjects } = gameState.objects
    const newGameState = {
      ...gameState,
      bonusActionsLeft: gameState.bonusActionsLeft - 1,
      objects: remainingObjects
    }

    const goldAmount = randomNumber(1, 10) + 4;
    selectedCharacter && addGoldToCharacter(selectedCharacter?.id, goldAmount) // add async?
    sendMessage(`You found ${goldAmount} gold in the Chest`, 'info');

    checkDungeonComplete(newGameState)
    setBoard(newBoard);
    setIsInteracting(false);
    setGameState(newGameState) ; 
    boardRef.current?.focus();
  }

  const checkDungeonComplete = (newGameState: GameState):boolean => {
    const remainingPieces = { ...newGameState.units, ...newGameState.objects }
    const playerStillAlive = Object.values(remainingPieces).find(
      piece => piece.type === 'player'
    )
    if (!playerStillAlive) {
      sendMessage('GAME OVER, You Dead', 'error');
      return true
    }
    if (
      Object.values(remainingPieces).length === 1 &&
      Object.values(remainingPieces)[0].type === 'player'
    ) {
      sendMessage('Dungeon Complete', 'important');
      return true
    } 
    else {
      return false
    }
  }

  const getFilteredDirections = (pos: Position) => DIRECTIONS.filter(([dirRow, dirCol]) => (
    isInBounds({ row: pos.row + dirRow, col: pos.col + dirCol}, DUNGEON_SIZE[dungeonSize])
  ))

  const getUnitAttackRange = ({ row, col }: Position, player: number) => {
    const activeUnit = gameState.units[player]
    const filteredDirections = getFilteredDirections({ row, col });
    const targets: Position[] = [];
    const activeUnitStats = activeUnit.type === 'player' 
      ? getPlayerUnitStats(selectedCharacter as CharacterType)
      : getUnitStats(ALL_STATS[activeUnit.class])
    const legalTargets= getLegalTargets(activeUnit.type, 'enemy');
    const obstacles = ['chest', 'wall']
    
    for (const dir of filteredDirections) {
      const [ dirRow, dirCol ] = dir;
      let newRow = row + dirRow
      let newCol = col + dirCol
      let rangeLimit = 1
      
      while (isInBounds({row: newRow, col: newCol}, DUNGEON_SIZE[dungeonSize]) && rangeLimit <= activeUnitStats.range) {
        const tile = board[newRow][newCol]
        if (tile) {
          if (obstacles.includes(tile.content)) break;
          if (legalTargets.includes(tile.content)) {
            targets.push({ row: newRow, col: newCol });
            break;
          }
        }
        targets.push({ row: newRow, col: newCol });
        newRow += dirRow;
        newCol += dirCol;
        rangeLimit++;
      }
    }
    return targets;
  };

  const getTargetsInRange = (pos: Position, player: number, targetType: 'enemy' | 'object') => {
    const activeUnit = gameState.units[player]
    const filteredDirections = getFilteredDirections(pos);
    const targets: Position[] = [];
    const activeUnitStats = activeUnit.type === 'player' 
      ? getPlayerUnitStats(selectedCharacter as CharacterType)
      : getUnitStats(ALL_STATS[activeUnit.class])
    const unitRange = targetType === 'enemy' ? activeUnitStats.range : 1
    const legalTargets = getLegalTargets(activeUnit.type, targetType)
    const obstacles = targetType === 'enemy' ? ['chest', 'wall'] : []
    
    for (const dir of filteredDirections) {
      // const path: Position[] = [];
      for (let distance = 1; distance <= unitRange; distance++) {
        const position = getPositionInDirection(pos, dir, distance);
        if (!isInBounds(position, DUNGEON_SIZE[dungeonSize])) { break; }
        // path.push(position);

        const tile = board[position.row][position.col]
        if (tile) {
          if (obstacles.includes(tile.content)) { break; }
          if (legalTargets.includes(tile.content)) {
            targets.push(position);
          }
          // break;
        }
      }
    }
    return targets;
  }

  const getValidTargets = (pos: Position, player: number) => ([
    ...getTargetsInRange(pos, player, 'enemy'),
    ...getTargetsInRange(pos, player, 'object'),
  ]);

  const showAttackRange = (show: boolean) => {
    const currentPlayer = gameState.currentPlayer;
    const currentPosition = gameState.units[currentPlayer].position;
    const targets = show 
      ? getUnitAttackRange(currentPosition, currentPlayer)
      : getValidTargets(currentPosition, currentPlayer)
    setValidTargets(targets);
  }

  const finishTurn = useCallback(() => {
    const unitsIds = Object.keys(gameState.units);
    const currentId = unitsIds.indexOf(String(gameState.currentPlayer));
    let next = Number(unitsIds[(currentId+1) % unitsIds.length]);

    const nextUnit = gameState.units[next];
    const targets = getValidTargets(nextUnit.position, next);
    const nextUnitStats = ALL_STATS[nextUnit.class]
    const newGameState = {
      ...gameState,
      currentPlayer: next,
      movesLeft: nextUnitStats.moveSpeed,
      attacksLeft: nextUnitStats.attackCount,
      bonusActionsLeft: nextUnitStats.bonusActions || 1,
    }
    if (nextUnit.type === 'enemy' || nextUnit.type === 'ally') {
      newGameState.bonusActionsLeft = 0;
    }

    setValidTargets(targets);
    setIsAttacking(false);
    setIsInteracting(false);
    setGameState(newGameState);     
    boardRef.current?.focus();
  }, [gameState])

  const movePlayer = useCallback((pos: Position) => {
    const currentPlayer = gameState.currentPlayer;
    const currentPosition = gameState.units[currentPlayer].position;

    const unitStatus = gameState.units[currentPlayer].status
    const isBleeding = unitStatus.indexOf('bleeding') > -1
    
    const newBoard = board.map(r => [...r]);
    const newPosition: Position = {
      row: clamp(currentPosition.row + pos.row, 0, DUNGEON_SIZE[dungeonSize]-1),
      col: clamp(currentPosition.col + pos.col, 0, DUNGEON_SIZE[dungeonSize]-1),
    }

    const tempPosition = board[newPosition.row][newPosition.col] 
    const isOccupied = tempPosition.content !== 'empty'
    const isWalkable = tempPosition.terrain !== 'water'
    const isStunned = unitStatus.indexOf('stunned') > -1
    if (isOccupied || !isWalkable || isStunned) return
    
    const targets = getValidTargets(newPosition, currentPlayer);

    newBoard[currentPosition.row][currentPosition.col] = {
      ...board[currentPosition.row][currentPosition.col],
      content: 'empty'
    };
    newBoard[newPosition.row][newPosition.col] = {
      ...board[newPosition.row][newPosition.col],
      content: currentPlayer === 1 ? 'player' : 'enemy'
    };

    setBoard(newBoard);
    setValidTargets(targets);
    setIsAttacking(false);
    setIsInteracting(false);
    setGameState({
      ...gameState,
      movesLeft: gameState.movesLeft - 1,
      units: {
        ...gameState.units,
        [currentPlayer]: {
          ...gameState.units[currentPlayer],
          position: newPosition,
          currentHp: isBleeding 
            ? gameState.units[currentPlayer].currentHp - 1 
            : gameState.units[currentPlayer].currentHp
        }
      },
    })
  }, [gameState])

  const handleKeyDown = useCallback((ev: KeyboardEvent) => {
    if (DIRECTION_MAP[ev.key] && gameState.movesLeft > 0 && !isAttacking && !isInteracting) {
      ev.preventDefault();
      movePlayer(DIRECTION_MAP[ev.key])
    }

    const enemiesInRange = getEnemiesInRange(activePlayer, gameState, validTargets);    
    if(enemiesInRange && (ev.key === 'a' || ev.key === 'A')) {
      ev.preventDefault();
      setIsAttacking(true);      
    }

    const objectsInRange = getObjectsInRange(gameState, validTargets);
    if(objectsInRange && (ev.key === 'e' || ev.key === 'E')) {
      ev.preventDefault();
      setIsInteracting(true);      
    }

    if ((isAttacking || isInteracting) && (ev.key === 'Escape' || ev.key === 'c' || ev.key === 'C')) {
      ev.preventDefault();
      cancelAction();
    }

    if (ev.key === 't' || ev.key === 'T') {
      ev.preventDefault();
      finishTurn();
    }
  }, [movePlayer, cancelAction, finishTurn, setIsAttacking, setIsInteracting]);

  useEffect(() => {
    const dungeonElement = boardRef.current;
    if (!dungeonElement) return;
    dungeonElement.addEventListener("keydown", handleKeyDown);
    return () => dungeonElement.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown]);

  useEffect(() => {
    boardRef.current?.focus();
  }, []);

  return {
    board,
    gameState,
    finishTurn,
    selectedTile,
    isInteracting,
    isAttacking,
    handleAction,
    cancelAction,
    handleTileClick,
    validTargets,
    boardRef,
    messages,
    showAttackRange,
  };
} 

export default useDungeonEngine;