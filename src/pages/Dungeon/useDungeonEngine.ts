import { DIRECTION_MAP, DUNGEON_SIZE } from "@/constants/dungeon.contants";
import type { Board, GameState, Position } from "@/types/dungeon.types";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDungeonStore } from '@/store/dungeonStore';
import { useCharacterStore } from "@/store/characterStore";
import { CLASS_STATS } from "@/constants/classOptions";

// todo: move these functions to utils folder
const buildDungeon = (size: number, initialPosition: Position, enemyPosition: Position) => {
  const board: Board = Array(size).fill({ content: 'empty', terrain: 'land'}).map(
    () => Array(size).fill({ content: 'empty', terrain: 'land'})
  );
  board[initialPosition.row][initialPosition.col] = {content: 'player', terrain: 'land'}
  board[enemyPosition.row][enemyPosition.col] = {content: 'enemy', terrain: 'land'}
  return board;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

const useDungeonEngine = () => {
  const { dungeonSize, initialPosition } = useDungeonStore();
  const { selectedCharacter } = useCharacterStore();
  const playerStats = selectedCharacter ? CLASS_STATS[selectedCharacter.class] : null;
  const enemyPosition: Position = { row: DUNGEON_SIZE[dungeonSize]-1, col: DUNGEON_SIZE[dungeonSize]-1}
  const initialGameState: GameState = {
    positions: {
      1: initialPosition,
      2: enemyPosition
    },
    currentPlayer: 1,
    movesLeft: playerStats?.moveSpeed || 0,
  }

  const [selectedTile, setselectedTile] = useState<Position | null>(null)
  const [gameState, setGameState] = useState<GameState>(initialGameState)
  const [board, setBoard] = useState<Board>(
    buildDungeon(DUNGEON_SIZE[dungeonSize || 'md'], initialPosition, enemyPosition)
  );
  
  const boardRef = useRef<HTMLDivElement>(null);

  const handleTileClick = (pos: Position) => {
    console.log('==> click!', `${pos.row}, ${pos.col}`);
    setselectedTile({row: pos.row, col: pos.col});
  }

  const movePlayer = useCallback((pos: Position) => {
    const currentPlayer = gameState.currentPlayer;
    const currentPosition = gameState.positions[currentPlayer];
    const playerCount = Object.keys(gameState.positions).length;
    
    const newBoard = board.map(r => [...r]);
    const newPosition: Position = {
      row: clamp(gameState.positions[currentPlayer].row + pos.row, 0, DUNGEON_SIZE[dungeonSize] -1),
      col: clamp(gameState.positions[currentPlayer].col + pos.col, 0, DUNGEON_SIZE[dungeonSize] -1),
    }

    console.log('==> gameState', gameState);

    const isOccupied = board[newPosition.row][newPosition.col].content !== 'empty'
    if (isOccupied) return

    newBoard[currentPosition.row][currentPosition.col] = {
      ...board[currentPosition.row][currentPosition.col],
      content: 'empty'
    };
    newBoard[newPosition.row][newPosition.col] = {
      ...board[newPosition.row][newPosition.col],
      content: currentPlayer === 1 ? 'player' : 'enemy'
    };

    const nextTurn = gameState.movesLeft - 1 === 0;
    const nextPlayer = (currentPlayer % playerCount) + 1;

    setBoard(newBoard);
    setGameState({
      currentPlayer: nextTurn ? nextPlayer : currentPlayer,
      movesLeft: nextTurn ? 3 : gameState.movesLeft - 1,
      positions: {
        ...gameState.positions,
        [currentPlayer]: newPosition
      }
    })
  }, [gameState])

  const handleKeyDown = useCallback((ev: KeyboardEvent) => {
    if (DIRECTION_MAP[ev.key] && gameState.movesLeft > 0) {
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

  return { board, gameState, selectedTile, handleTileClick, boardRef };
} 

export default useDungeonEngine;