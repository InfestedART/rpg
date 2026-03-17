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

export const deleteCharacter = async (id: number) => {
  const response = await fetch(`http://localhost:3001/characters/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete character');
  }
}

export const getCharacterById = async (id: number) => {
  const response = await fetch(`http://localhost:3001/characters/${id}`)
  console.log('==> response', response);

  if (!response.ok) {
    throw new Error('Failed to fetch character with id' + id)
  }

  return response.json()
}