import { useState, useEffect, useRef, useCallback } from "react";

import { DIRECTION_MAP, DIRECTIONS, DUNGEON_SIZE } from "@/constants/dungeon.contants";

import type { ActionType, Board, GameState, Position, Unit, UnitStatus, UsableObject } from "@/types/dungeon.types";

import { useDungeonStore } from '@/store/dungeonStore';
import { useCharacterStore } from "@/store/characterStore";

import useMessageLog from "./MessageBox/useMessageLog";

import { clamp, randomNumber, rollChance, selectRandomItem } from "@/utils/utils";
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
import { addGoldToCharacter, addItemToInventory } from "@/api/characters";
import { ALL_STATS } from "@/constants/unitStats.constants";
import { getPlayerUnitStats, getUnitStats } from "@/utils/unit.utils";
import type { MessageLogType } from "@/types/game.types";
import type { CharacterType } from "@/types/characterTypes";
import { CHEST_LOOT_TABLE } from "@/constants/lootTables.constants";
import { ITEM_STATS } from "@/constants/itemStats.constants";

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
  const [selectedTile, setSelectedTile] = useState<Position | null>(null)
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
  const getPlayerStats = (unit: Unit) => unit.type === 'player' 
    ? getPlayerUnitStats(selectedCharacter as CharacterType)  //TODO: fallout if !selectedCharacter
    : getUnitStats(ALL_STATS[unit.class], unit.equipment)

  const handleTileClick = (pos: Position) => {
    if (isAttacking && isValidTarget(pos, validTargets) && isPieceAnEnemy(pos, gameState, activePlayer)) {
      handleAttack(pos);
    } else if (isInteracting && isValidTarget(pos, validTargets) && isPieceAnObject(pos, gameState)) {
      handleInteract(pos);
    } else {
      setSelectedTile({row: pos.row, col: pos.col});
    }
  }

  const handleAction = (action: ActionType) => {
    setSelectedTile(null)
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
    const attackerStats = getPlayerStats(activePlayer)
    const targetStats = getPlayerStats(targetUnit)

    const baseDamage = attackerStats.baseDmg + randomNumber(1, attackerStats.dmgDice);

    const criticalHit = rollChance(attackerStats.critChance);
    const blocked = rollChance(targetStats.blockChance);
    const evaded = rollChance(targetStats.evadeChance);

    let attackDmg = criticalHit ? baseDamage * 1.5 : baseDamage
    if (blocked) { attackDmg = attackDmg * 0.5 }
    if (targetStats.armor) { attackDmg -= targetStats.armor}

    // STATUS CHANGE
    const targetStatus: UnitStatus[] = []
    if (rollChance(targetStats.stunChance)) { targetStatus.push('stunned') }
    if (rollChance(targetStats.bleedChance)) { targetStatus.push('bleeding') }

    // TARGET IS DEAD?
    let remainingMs = 0
    if (targetUnit.currentMS) {
      remainingMs = Math.max(targetUnit.currentMS - attackDmg, 0)
      attackDmg = Math.max(attackDmg - targetUnit.currentMS, 0)
      targetUnit.currentMS = remainingMs
    }
    const remainingHp = evaded ? targetUnit.currentHp : targetUnit.currentHp - attackDmg
    
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

    if (targetObject && targetObject.type === 'chest') {
      generateChestLoot(targetObject)
    }

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
    const activeUnitStats = getPlayerStats(activeUnit)
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
    const activeUnitStats = getPlayerStats(activeUnit)
    const unitRange = targetType === 'enemy' ? activeUnitStats.range : 1
    const legalTargets = getLegalTargets(activeUnit.type, targetType)
    const obstacles = targetType === 'enemy' ? ['chest', 'wall'] : []
    
    for (const dir of filteredDirections) {
      for (let distance = 1; distance <= unitRange; distance++) {
        const position = getPositionInDirection(pos, dir, distance);
        if (!isInBounds(position, DUNGEON_SIZE[dungeonSize])) { break; }

        const tile = board[position.row][position.col]
        if (tile) {
          if (obstacles.includes(tile.content)) { break; }
          if (legalTargets.includes(tile.content)) {
            targets.push(position);
          }
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
    const currentPosition = gameState.units[currentPlayer]?.position;
    const targets = show 
      ? getUnitAttackRange(currentPosition, currentPlayer)
      : getValidTargets(currentPosition, currentPlayer)
    setValidTargets(targets);
  }

  const generateChestLoot = (targetObject: UsableObject) => {
      const lootTable = CHEST_LOOT_TABLE[targetObject.chestTier || 'chest0']
      if (selectedCharacter && lootTable.goldChance) {
        const { goldBase, goldDice } = lootTable.goldChance;
        const goldAmount =  goldBase + randomNumber(1, goldDice)
        addGoldToCharacter(selectedCharacter?.id, goldAmount)
        sendMessage(`You found ${goldAmount} gold in the Chest`, 'info');
      }
      if (selectedCharacter && lootTable.itemChance) {
        const { chance, itemPool, magicChance, tier } = lootTable.itemChance
        if (rollChance(chance)) {
          const allItems = Object.entries(ITEM_STATS)
          const itemType = selectRandomItem(itemPool)
          const isMagic = rollChance(magicChance)
          const elligibleItems = allItems.filter(item => {
            return item[1].tier === tier && item[1].itemClass === itemType
          })
          const chosenItem = selectRandomItem(elligibleItems)
          const itemId = chosenItem[0]

          console.log('==> LOOT:', itemId, isMagic && 'magic', selectedCharacter);
          addItemToInventory(selectedCharacter.id, itemId, selectedCharacter.inventory || [])
          sendMessage(`You found a ${chosenItem[1].name} in the Chest`, 'info');
        }
      }
  }

  const finishTurn = useCallback(() => {
    const unitsIds = Object.keys(gameState.units);
    const currentId = unitsIds.indexOf(String(gameState.currentPlayer));
    let next = Number(unitsIds[(currentId+1) % unitsIds.length]);

    const nextUnit = gameState.units[next];
    const targets = getValidTargets(nextUnit.position, next);
    const nextUnitStats = getPlayerStats(nextUnit)
    const newGameState = {
      ...gameState,
      currentPlayer: next,
      movesLeft: nextUnitStats.moveSpeed,
      attacksLeft: nextUnitStats.attackCount,
      bonusActionsLeft: nextUnitStats.bonusActions || 1,
    }

    if (nextUnitStats.magicShield) { gameState.units[next].currentMS = nextUnitStats.magicShield  }
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
    const activeUnit = gameState.units[currentPlayer]
    const currentPosition = activeUnit?.position;
    const activeUnitStats = getPlayerStats(activeUnit)

    const unitStatus = activeUnit?.status
    const isBleeding = unitStatus?.indexOf('bleeding') > -1
    
    const newBoard = board.map(r => [...r]);
    const newPosition: Position = {
      row: clamp(currentPosition.row + pos.row, 0, DUNGEON_SIZE[dungeonSize]-1),
      col: clamp(currentPosition.col + pos.col, 0, DUNGEON_SIZE[dungeonSize]-1),
    }

    let damageTaken = 0;
    if (board[newPosition.row][newPosition.col].decal === 'spikes') {
      damageTaken = 2 - (activeUnitStats.hazardProtection || 0)
    }
    if (isBleeding) { damageTaken += 1 }
            
    let remainingMs = 0
    if (activeUnit.currentMS) {
      remainingMs = Math.max(activeUnit.currentMS - damageTaken, 0)
      damageTaken = Math.max(damageTaken - activeUnit.currentMS, 0)
      activeUnit.currentMS = remainingMs
    }
    const remainingHp = activeUnit.currentHp - damageTaken
    
    const { [currentPlayer]: removed, ...remainingUnits } = gameState.units
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
      units: remainingHp > 0 ? {
        ...gameState.units,
        [currentPlayer]: {
          ...activeUnit,
          position: newPosition,
          currentHp: remainingHp,
        }
      } : remainingUnits,
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