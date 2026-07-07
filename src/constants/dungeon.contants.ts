import type { Position } from "@/types/dungeon.types";

export const DUNGEON_SIZE: Record<string, number> = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12
}

export const DIRECTION_MAP: Record<string, Position> = {
  ArrowUp:    { row: -1, col:  0 },
  ArrowDown:  { row:  1, col:  0 },
  ArrowLeft:  { row:  0, col: -1 },
  ArrowRight: { row:  0, col:  1 },
};