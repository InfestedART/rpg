import { DIRECTION_MAP, DUNGEON_SIZE } from "@/constants/dungeon.contants";
import type { ActionType, Board, GameState, UsableObject, Position, Unit, UnitType } from "@/types/dungeon.types";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDungeonStore } from '@/store/dungeonStore';
import { useCharacterStore } from "@/store/characterStore";
import { buildDungeon, getPieceId, inititalizeGameState, isEnemy, isInBounds, isObject, isValidTarget } from "@/utils/dungeon.utils";
import { clamp } from "@/utils/utils";
import { ALL_STATS } from "@/constants/classOptions";


const useDungeonEngine = () => {
  // stores
  const { dungeonSize, dungeonType, initialBoard } = useDungeonStore();
  const { selectedCharacter } = useCharacterStore();

  // state
  const [selectedTile, setselectedTile] = useState<Position | null>(null)
  const [gameState, setGameState] = useState<GameState>(
    inititalizeGameState(selectedCharacter, initialBoard)
  )
  const [board, setBoard] = useState<Board>(
    buildDungeon(DUNGEON_SIZE[dungeonSize || 'md'], dungeonType, initialBoard)
  );
  const [validTargets, setValidTargets] = useState<Position[]>([])
  const [interacting, setInteracting] = useState<boolean>(false)
  const [attacking, setAttacking] = useState<boolean>(false)
  
  const boardRef = useRef<HTMLDivElement>(null);

  const activePlayer = gameState.units[gameState.currentPlayer];
  const unitsInBoard = gameState.units && Object.values(gameState.units);
  const objectsInBoard = gameState.objects && Object.values(gameState.objects);
  
  // console.log('==> initialState', gameState);

  const handleTileClick = (pos: Position) => {
    if (attacking && isValidTarget(pos, validTargets) && isEnemy(pos, unitsInBoard, activePlayer.type)) {
      handleAttack(pos);
    } else if (interacting && isValidTarget(pos, validTargets) && isObject(pos, objectsInBoard)) {
      handleInteract();
    } else {
      setselectedTile({row: pos.row, col: pos.col});
    }
  }

  const handleAction = (action: ActionType) => {
    setselectedTile(null)
    if (action === 'interact') setInteracting(true)
      else if (action === 'attack') setAttacking(true)
  }

  const cancelAction = () => {
    setInteracting(false);
    setAttacking(false);
  }

  const handleAttack = (pos: Position) => {
    const targetUnitId = getPieceId(pos, gameState.units);
    if (!targetUnitId) {
      console.error('==> No Target Unit');
      return;
    }
    const targetUnit = gameState.units[targetUnitId]
    const attackerStats = ALL_STATS[activePlayer.class]

    const remainingHp = targetUnit.currentHp - attackerStats.baseDmg
    const { [targetUnitId]: removed, ...remainingUnits } = gameState.units
    const newUnitList = remainingHp <= 0 ? remainingUnits : {
      ...gameState.units,
      [targetUnitId]: {
        ...targetUnit,
        currentHp: remainingHp
      }
    }
    if (remainingHp <= 0) {
       const newBoard = board.map(r => [...r]);
      newBoard[targetUnit.position.row][targetUnit.position.col] = {
        ...board[targetUnit.position.row][targetUnit.position.col],
        content: 'empty'
      };
      setBoard(newBoard);
    }

    console.log(`==> ${activePlayer.name} attacks ${targetUnit.name} for ${attackerStats.baseDmg} dmg`);
    setAttacking(false);
    setGameState({
      ...gameState,
      attacksLeft: gameState.attacksLeft - 1,
      units: newUnitList
    })
    boardRef.current?.focus();
  }

  const handleInteract = () => {
    console.log('==> OPEN')
    setInteracting(false);
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

  const nextTurn = useCallback(() => {
    const unitsIds = Object.keys(gameState.units);
    const currentId = unitsIds.indexOf(String(gameState.currentPlayer));
    let next = Number(unitsIds[(currentId+1) % unitsIds.length]);

    const nextUnit = gameState.units[next];
    const targets = getTargetsInRange(nextUnit.position, next);
    const nextUnitStats = ALL_STATS[nextUnit.class]

    setValidTargets(targets);
    setAttacking(false);
    setInteracting(false);
    setGameState({
      ...gameState,
      currentPlayer: next,
      movesLeft: nextUnitStats.moveSpeed,
      attacksLeft: nextUnitStats.attackCount,
    })     
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

    const isOccupied = board[newPosition.row][newPosition.col].content !== 'empty'
    if (isOccupied) return

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
    setAttacking(false);
    setInteracting(false);
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
    if (DIRECTION_MAP[ev.key] && gameState.movesLeft > 0 && !attacking && !interacting) {
      ev.preventDefault();
      movePlayer(DIRECTION_MAP[ev.key])
    }
  }, [movePlayer]);

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
    nextTurn,
    selectedTile,
    interacting,
    attacking,
    handleAction,
    cancelAction,
    handleTileClick,
    validTargets,
    boardRef
  };
} 

export default useDungeonEngine;