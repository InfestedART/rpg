import type { UnitStatus } from "@/types/dungeon.types";

export const STATUS_DESCRIPTIONS: Partial<Record<UnitStatus, string>> = {  // TODO: remove Partial when all status are implemented
  bleeding: 'This unit will take damage on every Move',
  stunned: 'This unit cannot move or attack',
  blessed: 'This unit rolls with advantage', // takes the better result of two rolls
  cursed: 'This unit rolls with disadvantage', // takes the worst result of two rolls
}