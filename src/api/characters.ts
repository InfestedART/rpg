import { STARTING_WEAPONS } from "@/constants/classOptions";
import { characterSchema } from "@/schemas/character.schema";
import type {  EquipmentType } from "@/types/characterTypes";
import type { SlotType } from "@/types/itemTypes";
import { removeFromArray } from "@/utils/utils";
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
  const emptyEquipment: Record<SlotType, string | null> = {
    weapon: null,
    offhand: null,
    helmet: null,
    armor: null,
    boots: null,
    gloves: null,
    amulet: null,
    accesory: null
  };

  const equipment: Record<SlotType, string | null> = {
    ...emptyEquipment,
    weapon: STARTING_WEAPONS[data.equipment][0] ?? null,
    offhand: STARTING_WEAPONS[data.equipment][1] ?? null,
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

export const updateEquipment = async (id: number, equipment: EquipmentType) => {
  // console.log('==> update_equipment', id, equipment)
  const response = await fetch(
    `${baseUrl}/characters/${id}/update_equipment`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ equipment }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error ?? `Failed to update equipment for character with id ${id}`);
  }
  return response.json()
}

export const updateInventory = async (id: number, inventory: string[]) => {
  const response = await fetch(
    `${baseUrl}/characters/${id}/update_inventory`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inventory }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error ?? `Failed to update inventory for character ${id}`);
  }

  return response.json();
}


export const updateItems = async (id: number, equipment: EquipmentType, inventory: string[]) => {
  // console.log('==> update_equipment', id, equipment)
  const response = await fetch(
    `${baseUrl}/characters/${id}/update_items`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ equipment, inventory }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error ?? `Failed to update character with id ${id}`);
  }
  return response.json()
}

export const addItemToInventory = async (id: number, newItem: string, inventory: string[]) => {
  return updateInventory(id, [...inventory, newItem]);
}

export const removeItemFromInventory = async (id: number, deletedItem: string, inventory: string[]) => {
  return updateInventory(id, removeFromArray(inventory, deletedItem));
}