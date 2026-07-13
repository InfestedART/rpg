import type { CharClassType } from '@/types/characterTypes'
import type { WeaponType } from '@/types/itemTypes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type GameStore = {
  currentClass: CharClassType
  currentWeapon: WeaponType | ''
  setCurrentClass: (charClass: CharClassType) => void
  setCurrentWeapon: (weapon: WeaponType) => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      currentClass: 'soldier',
      currentWeapon: '',
      setCurrentClass: (charClass) => set({ currentClass: charClass }),
      setCurrentWeapon: (weapon) => set({ currentWeapon: weapon }),
    }),
    {
      name: 'game-storage',
    }
  )
)