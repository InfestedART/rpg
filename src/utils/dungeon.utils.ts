import { CLASS_STATS } from "@/constants/classOptions";
import type { CharacterType } from "@/types/characterTypes";
import type { Board, GameState, InitialBoard, TileTerrain, Unit, Object, Position } from "@/types/dungeon.types";

export const isInBounds = (pos: Position, size: number) => (
  pos.row >= 0 && pos.row < size && pos.col >= 0 && pos.col < size
);

export const inititalizeGameState = (
  selectedCharacter: CharacterType | null,
  initialBoard: InitialBoard,
): GameState => {
  const playerStats = selectedCharacter ? CLASS_STATS[selectedCharacter.class] : null;
  const units: Record<number, Unit> = {}
  const objects: Record<number, Object> = {}

  for (const [key, value] of Object.entries(initialBoard)) {
    if (value.type === 'player' || value.type === 'enemy' || value.type === 'ally') {
      units[Number(key)] = {
        name: value.type === 'player' && selectedCharacter ? selectedCharacter.name : `enemy_${key}`,
        type: value.type,
        currentHp: value.type === 'player' ? 15 : 6,
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