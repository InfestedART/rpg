import type { SelectOption } from "@/components/Select/Select";
import type { Position } from "@/types/dungeon.types";

export const DIRECTION_MAP: Record<string, Position> = {
  ArrowUp:    { row: -1, col:  0 },
  ArrowDown:  { row:  1, col:  0 },
  ArrowLeft:  { row:  0, col: -1 },
  ArrowRight: { row:  0, col:  1 },
};

export const DUNGEON_SIZE: Record<string, number> = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12
}

// export const DUNGEON_TYPE: string[] = [ 'fields', 'cave', 'dungeon']

export const DUNGEON_SIZE_OPTIONS: SelectOption[] = [
  { label: '6', value: 'sm'},
  { label: '8', value: 'md'},
  { label: '10', value: 'lg'},
]

export const DUNGEON_TYPE_OPTIONS: SelectOption[] = [
  { label: 'Fields', value: 'field'},
  { label: 'Cave', value: 'cave'},
  { label: 'Dungeon', value: 'dungeon'},
]