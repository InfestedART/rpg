import { SHIELD_STATS } from "@/constants/shieldStats.constants";
import { ALL_STATS } from "@/constants/unitStats.constants";
import { WEAPON_STATS } from "@/constants/weaponStats.constants";
import type { CharacterType, EquipmentSlot, UnitStats } from "@/types/characterTypes"
import { round } from "./utils";

export const getPlayerUnit = (selectedCharacter: CharacterType): UnitStats => {
  const baseStats = ALL_STATS[selectedCharacter.class];

  const mainWeapon = selectedCharacter.equipment['weapon1']
  const offHand = selectedCharacter.equipment['weapon2']
  const mainWeaponStats = mainWeapon ? WEAPON_STATS[mainWeapon] : WEAPON_STATS['unarmed']
  const offHandStats = offHand ? SHIELD_STATS[offHand] : SHIELD_STATS['unarmed']

  const critChance = (baseStats.critChance || 0) + (mainWeaponStats.bonusCritChance || 0)
  const bleedChance = mainWeaponStats.bleedChance || 0
  const blockChance = offHandStats?.blockChance || 0
  const evadeChance = offHandStats?.evadeChance || 0
  const stunChance = mainWeaponStats.stunChance || 0

  return {
    baseHp: baseStats.baseHp,
    attackCount: baseStats.attackCount,
    moveSpeed: baseStats.moveSpeed,
    bonusActions: baseStats.bonusActions,
    initiative: baseStats.initiative,
    baseDmg: baseStats.baseDmg + mainWeaponStats.baseDmg,
    dmgDice: mainWeaponStats.name === 'Unarmed' ? baseStats.dmgDice : mainWeaponStats.dmgDice,
    critChance: round(critChance*100, 2),
    bleedChance: round(bleedChance*100, 2),
    blockChance: round(blockChance*100, 2),
    evadeChance: round(evadeChance*100, 2),
    stunChance: round(stunChance*100, 2),
  }
}

export const getUnitStats = (
  baseStats: UnitStats,
  equipment: Record<EquipmentSlot, string | null>
) => {
  return {

  }
}