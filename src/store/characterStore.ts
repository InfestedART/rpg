
import type { CharacterType } from '@/types/characterTypes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CharacterStore = {
  selectedCharacter: CharacterType | null
  setSelectedCharacter: (char: CharacterType) => void
}

/* export const useCharacterStore = create(
  persist(
    (set) => ({
      selectedCharacter: null,
      setSelectedCharacter: (char: Character) => set({ selectedCharacter: char }),
    }),
    {
      name: 'character-storage',
    }
  )
) */

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set) => ({
      selectedCharacter: null,
      setSelectedCharacter: (char) => set({ selectedCharacter: char }),
    }),
    {
      name: 'character-storage',
    }
  )
)