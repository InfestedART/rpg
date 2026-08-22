import { z } from 'zod'

export const characterSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(32, "Name too long"),
  
  class: z.enum(['soldier', 'wizard', 'ranger', 'warrior', 'bandit']),

  equipment: z.string().min(1, "Select at least one item"),
  gold: z.number().default(0),
})