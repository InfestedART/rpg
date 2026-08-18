import { STARTING_WEAPONS } from "@/constants/classOptions";
import { characterSchema } from "@/schemas/character.schema";
import type { EquipmentSlot } from "@/types/characterTypes";
import type { z } from "zod";

type CharacterFormData = z.infer<typeof characterSchema>

const baseUrl = 'http://localhost:3001';

export const getAllCharacters = async () => {
  const response = await fetch(baseUrl + '/characters')

  if (!response.ok) {
    throw new Error('Failed to fetch characters')
  }

  return response.json()
}

export const createCharacter = async (data: CharacterFormData) => {
  const emptyEquipment: Record<EquipmentSlot, string | null> = {
    weapon1: null,
    weapon2: null,
    helmet: null,
    armour: null,
    belt: null,
    boots: null,
    gloves: null,
    trinket1: null,
    trinket2: null,
    quiver: null,
  };

  const equipment: Record<EquipmentSlot, string | null> = {
    ...emptyEquipment,
    weapon1: STARTING_WEAPONS[data.equipment][0] ?? null,
    weapon2: STARTING_WEAPONS[data.equipment][1] ?? null,
  };

  const newData = {
    ...data,
    equipment: JSON.stringify(equipment)
  } 

  const response = await fetch(baseUrl + '/characters', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newData),
}) 

if (!response.ok) {
  throw new Error('Failed to save character');
}

return response.json() 
}

export const deleteCharacter = async (id: number) => {
  const response = await fetch(`${baseUrl}/characters/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete character with id ' + id);
  }
}

export const getCharacterById = async (id: number) => {
  const response = await fetch(`http://localhost:3001/characters/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch character with id ' + id)
  }
  return response.json()
}

export const addGoldToCharacter = async (id: number, goldAmount: number) => {
  const response = await fetch(`${baseUrl}/characters/${id}/add_gold/${goldAmount}`, {
    method: 'PATCH',
  })
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error ?? `Failed to add ${goldAmount} gold to character with id ${id}`);
  }
  return response.json()
}