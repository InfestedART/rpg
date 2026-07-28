import type { SelectOption } from "@/components/Select/Select";
import type { Position } from "@/types/dungeon.types";

export const DIRECTION_MAP: Record<string, Position> = {
  ArrowUp:    { row: -1, col:  0 },
  ArrowDown:  { row:  1, col:  0 },
  ArrowLeft:  { row:  0, col: -1 },
  ArrowRight: { row:  0, col:  1 },
};

export const DUNGEON_SIZE: Record<string, number> = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14
}

export const DUNGEON_TYPE: string[] = [ 'fields', 'cave', 'dungeon']

export const DUNGEON_SIZE_OPTIONS: SelectOption[] = [
  { label: '6', value: 'xs'},
  { label: '8', value: 'sm'},
  { label: '10', value: 'md'},
]

export const DUNGEON_TYPE_OPTIONS: SelectOption[] = [
  { label: 'Fields', value: 'grass'},
  { label: 'Cave', value: 'land'},
  { label: 'Dungeon', value: 'stone'},
]