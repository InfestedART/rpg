import { DIRECTION_MAP, DUNGEON_SIZE } from "@/constants/dungeon.contants";
import type { Board, GameState, Position } from "@/types/dungeon.types";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDungeonStore } from '@/store/dungeonStore';
import { useCharacterStore } from "@/store/characterStore";
import { buildDungeon, clamp, inititalizeGameState } from "@/utils/dungeon.utils";

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
  
  const boardRef = useRef<HTMLDivElement>(null);

  const handleTileClick = (pos: Position) => {
    setselectedTile({row: pos.row, col: pos.col});
  }

  const nextTurn = useCallback(() => {
    const playerCount = Object.keys(gameState.units).length;
    let nextPlayer = (gameState.currentPlayer % playerCount) + 1;
    console.log('==> gameState', gameState)

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

    newBoard[currentPosition.row][currentPosition.col] = {
      ...board[currentPosition.row][currentPosition.col],
      content: 'empty'
    };
    newBoard[newPosition.row][newPosition.col] = {
      ...board[newPosition.row][newPosition.col],
      content: currentPlayer === 1 ? 'player' : 'enemy'
    };

    setBoard(newBoard);
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

  return { board, gameState, nextTurn, selectedTile, handleTileClick, boardRef };
} 

export default useDungeonEngine;