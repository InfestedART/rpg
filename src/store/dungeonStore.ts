import type { InitialBoard, TileTerrain } from '@/types/dungeon.types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type DungeonStore = {
  dungeonSize: string;
  dungeonType: TileTerrain;
  initialBoard: InitialBoard;
  setDungeonSize: (dungeonSize: string) => void;
  setDungeonType: (dungeonType: TileTerrain) => void;
  setInitialBoard: (InitialBoard: InitialBoard) => void;
}

export const useDungeonStore = create<DungeonStore>()(
  persist(
    (set) => ({
      dungeonSize: 'md',
      dungeonType: 'land',
      initialBoard: {
        1: {
          type: 'player',
          position: { row: 0, col: 0 }
        }
      },
      setDungeonSize: (size) => set({ dungeonSize: size }),
      setDungeonType: (type) => set({ dungeonType: type }),
      setInitialBoard: (board) =>  set({ initialBoard: board})
    }),
    {
      name: 'dungeon-storage',
    }
  )
)