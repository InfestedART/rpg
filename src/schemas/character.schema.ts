import type { EquipmentType } from '@/types/characterTypes'
import { z } from 'zod'

export const equipmentSchema = z.object({
  weapon: z.string().nullable(),
  offhand: z.string().nullable(),
  armor: z.string().nullable(),
  helmet: z.string().nullable(),
  boots: z.string().nullable(),
  gloves: z.string().nullable(),
  amulet: z.string().nullable(),
  accessory: z.string().nullable(),
})

export const emptyEquipment: EquipmentType = {
  weapon: null,
  offhand: null,
  armor: null,
  helmet: null,
  boots: null,
  gloves: null,
  amulet: null,
  accessory: null,
}

export const characterSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(32, "Name too long"),
  
  class: z.enum(['soldier', 'wizard', 'ranger', 'warrior', 'bandit']),

  equipment: z.string(),
  inventory: z.array(z.string()).default([]),
  gold: z.number().default(0),
  level: z.number().default(1),
  exp: z.number().default(0),
  createdAt: z.string().optional(),
})