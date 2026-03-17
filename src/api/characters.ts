import { characterSchema } from "@/schemas/character.schema";
import type { z } from "zod";

type CharacterFormData = z.infer<typeof characterSchema>

export const getAllCharacters = async () => {
  const response = await fetch('http://localhost:3001/characters')

  if (!response.ok) {
    throw new Error('Failed to fetch characters')
  }

  return response.json()
}

export const createCharacter = async (data: CharacterFormData) => {
    const response = await fetch('http://localhost:3001/characters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to save character');
  }

}