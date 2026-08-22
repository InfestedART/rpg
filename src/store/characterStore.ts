
import type { CharacterType } from '@/types/characterTypes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CharacterStore = {
  selectedCharacterId: number | null
  selectedCharacter: CharacterType | null
  setSelectedCharacterId: (id: number) => void
  setSelectedCharacter: (char: CharacterType) => void
}


export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set) => ({
      selectedCharacterId: null,
      setSelectedCharacterId: (id) => set({ selectedCharacterId: id }),
      selectedCharacter: null,
      setSelectedCharacter: (char) => set({ selectedCharacter: char }),
    }),
    {
      name: 'character-storage',
    }
  )
)