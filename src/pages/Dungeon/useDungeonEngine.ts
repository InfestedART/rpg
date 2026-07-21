import { DIRECTION_MAP, DUNGEON_SIZE } from "@/constants/dungeon.contants";
import type { ActionType, Board, GameState, Position } from "@/types/dungeon.types";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDungeonStore } from '@/store/dungeonStore';
import { useCharacterStore } from "@/store/characterStore";
import { buildDungeon, inititalizeGameState, isInBounds } from "@/utils/dungeon.utils";
import { clamp } from "@/utils/utils";

const useDungeonEngine = () => {
  const { dungeonSize, dungeonType, initialBoard } = useDungeonStore();
  const { selectedCharacter } = useCharacterStore();

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

  const isValidTarget = (pos: Position) => {
    return validTargets.some(target => target.col === pos.col && target.row === pos.row);
  }

  const isEnemy = (pos: Position) => {
    const unitsInBoard = gameState.units && Object.values(gameState.units)
    const enemiesInBoard = Object.values(unitsInBoard).filter(unit => unit.type === 'enemy')
    return enemiesInBoard.some(
      enemy => enemy.position.col === pos.col && enemy.position.row === pos.row
    )
  }

  const isObject = (pos: Position) => {
    const objectsInBoard = gameState.objects && Object.values(gameState.objects)
    return objectsInBoard?.some(
      obj => obj.position.col === pos.col && obj.position.row === pos.row
    )
  }

  const handleTileClick = (pos: Position) => {
    if (attacking && isValidTarget(pos) && isEnemy(pos)) {
      handleAttack();
    } else if (interacting && isValidTarget(pos) && isObject(pos)) {
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

  const handleAttack = () => {
    console.log('==> ATTACK')
    setAttacking(false);
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
    const playerCount = Object.keys(gameState.units).length;
    const nextPlayer = (gameState.currentPlayer % playerCount) + 1;
    const targets = getTargetsInRange(gameState.units[nextPlayer].position, nextPlayer);

    setValidTargets(targets);
    setGameState({
      ...gameState,
      currentPlayer: nextPlayer,
      movesLeft: 5,
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