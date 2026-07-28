 export type DamageType = 'slash' | 'blunt' | 'pierce' | 'magic'
 
 export const WEAPONS_STATS = {
   sword: { baseDmg: 3, range: 1, dmgType: 'slash', critChance: 0.1 },
   spear: { baseDmg: 2, range: 2, dmgType: 'slash', critChance: 0.1 },
   long_spear: { baseDmg: 3, range: 2, dmgType: 'slash', critChance: 0.1 },
   mace: { baseDmg: 3, range: 1, dmgType: 'blunt', critChance: 0.1 },
   staff: { baseDmg: 2, range: 2, dmgType: 'slash', critChance: 0.1 },
   focus: { baseDmg: 0, range: 3, dmgType: 'magic', critChance: 0.1 },
   bow: { baseDmg: 2, range: 5, dmgType: 'pierce', critChance: 0.15 },
   dagger: { baseDmg: 2, range: 1, dmgType: 'slash', critChance: 0.2 },
   trowing_knife: { baseDmg: 2, range: 3, dmgType: 'slash', critChance: 0.1 },
   rapier: { baseDmg: 2, range: 1, dmgType: 'slash', critChance: 0.15 },
   long_sword: { baseDmg: 3, range: 2, dmgType: 'slash', critChance: 0.1 },
   hand_axe: { baseDmg: 3, range: 1, dmgType: 'slash', critChance: 0.12 },
   battle_axe: { baseDmg: 3, range: 2, dmgType: 'slash', critChance: 0.12 },
   heavy_mace: { baseDmg: 3, range: 2, dmgType: 'blunt', critChance: 0.1 },
   crossbow: { baseDmg: 3, range: 3, dmgType: 'pierce', critChance: 0.1 },
 }
