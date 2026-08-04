import { useState, useEffect, useRef, useCallback } from "react";

import { DIRECTION_MAP, DUNGEON_SIZE } from "@/constants/dungeon.contants";

import type { ActionType, Board, GameState, Position } from "@/types/dungeon.types";

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
} from "@/utils/dungeon.utils";
import { addGoldToCharacter } from "@/api/characters";
import { ALL_STATS } from "@/constants/unitStats.constants";

const useDungeonEngine = () => {
  // stores
  const { dungeonSize, dungeonType, initialBoard } = useDungeonStore();
  const { selectedCharacter } = useCharacterStore();
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
    const attackerStats = ALL_STATS[activePlayer.class]

    const criticalHit = Math.random() <= attackerStats.critChance;
    const baseDamage = attackerStats.baseDmg + randomNumber(1, attackerStats.dmgDice);
    const attackDmg = criticalHit ? baseDamage * 1.5 : baseDamage

    const remainingHp = targetUnit.currentHp - attackDmg
    const { [targetUnitId]: removed, ...remainingUnits } = gameState.units
    const newUnitList = remainingHp <= 0 ? remainingUnits : {
      ...gameState.units,
      [targetUnitId]: {
        ...targetUnit,
        currentHp: remainingHp
      }
    }

    const attackLog = 
      `${criticalHit ? 'CRITICAL HIT! ' : ''}` +
      `${activePlayer.name} attacks ${targetUnit.name} for ${attackDmg} dmg`;
    sendMessage(attackLog, criticalHit ? 'warning' : 'info');
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

  const getTargetsInRange = ({ row, col }: Position, player: number) => {
    // const attackRange = 1;  // temporal value
    // const interactRange = 1;
    const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
    const filteredDirections = directions.filter(([dirRow, dirCol]) => {
      return isInBounds({ row: row + dirRow, col: col + dirCol}, DUNGEON_SIZE[dungeonSize])
    })
    const unitRange: Position[] = filteredDirections.map(([dirRow, dirCol]) => {
      return {
         row: row + dirRow,
         col: col + dirCol,
      };
    })

    const targets: Position[] = [];
    const activeUnit = gameState.units[player].type; 
    const legalTargets: string[] = [];
    if (activeUnit === 'player' || activeUnit === 'ally') legalTargets.push('enemy', 'chest', 'button');
    if (activeUnit === 'enemy') legalTargets.push('player', 'ally'); 
     
    unitRange.forEach((pos) => {
      const potencialTarget = board[pos.row][pos.col].content;
      if (legalTargets.includes(potencialTarget))  {
        targets.push(pos);
      }
    })

    return targets;
  };

  const finishTurn = useCallback(() => {
    const unitsIds = Object.keys(gameState.units);
    const currentId = unitsIds.indexOf(String(gameState.currentPlayer));
    let next = Number(unitsIds[(currentId+1) % unitsIds.length]);

    const nextUnit = gameState.units[next];
    const targets = getTargetsInRange(nextUnit.position, next);
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
    
    const newBoard = board.map(r => [...r]);
    const newPosition: Position = {
      row: clamp(currentPosition.row + pos.row, 0, DUNGEON_SIZE[dungeonSize]-1),
      col: clamp(currentPosition.col + pos.col, 0, DUNGEON_SIZE[dungeonSize]-1),
    }

    const tempPosition = board[newPosition.row][newPosition.col] 
    const isOccupied = tempPosition.content !== 'empty'
    const isWalkable = tempPosition.terrain !== 'water' && tempPosition.terrain !== 'stone'
    if (isOccupied || !isWalkable) return

    const targets = getTargetsInRange(newPosition, currentPlayer);

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
    messages
  };
} 

export default useDungeonEngine;