import type { Position } from '@/types/dungeon.types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type DungeonStore = {
  dungeonSize: string;
  initialPosition: Position;
  dungeonType: string;
  setDungeonSize: (dungeonSize: string) => void;
  setInititalPosition: (position: Position) => void;
  setDungeonType: (dungeonType: string) => void;
}

export const useDungeonStore = create<DungeonStore>()(
  persist(
    (set) => ({
      dungeonSize: 'md',
      setDungeonSize: (size) => set({ dungeonSize: size }),
      initialPosition: { row: 0, col: 0 },
      setInititalPosition: (position) => set({ initialPosition: position}),
      dungeonType: 'field',
      setDungeonType: (type) => set({ dungeonType: type }),
    }),
    {
      name: 'dungeon-storage',
    }
  )
)