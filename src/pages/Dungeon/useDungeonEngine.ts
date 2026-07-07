import { DUNGEON_SIZE } from "@/constants/dungeon.contants";
import type { Board } from "@/types/dungeon.types";
import { useState, useEffect, useRef } from "react";

const buildDungeon = (size: number) => {
  const board: Board = Array(size).fill({ content: 'empty', terrain: 'land'}).map(
    () => Array(size).fill({ content: 'empty', terrain: 'land'})
  );
  board[0][0] = {content: 'player', terrain: 'land'}
  return board;
}

const useDungeonEngine = () => {
  const [board, setBoard] = useState<Board>(buildDungeon(DUNGEON_SIZE['md']))
  const boardRef = useRef<HTMLDivElement>(null);

  return { board, boardRef };
} 

export default useDungeonEngine;