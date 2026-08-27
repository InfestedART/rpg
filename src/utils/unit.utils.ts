import { SHIELD_STATS } from "@/constants/shieldStats.constants";
import { ALL_STATS } from "@/constants/unitStats.constants";
import { WEAPON_STATS } from "@/constants/weaponStats.constants";
import type { CharacterType, EquipmentSlot, UnitStatsT } from "@/types/characterTypes"

export const getPlayerUnitStats = (selectedCharacter: CharacterType): UnitStatsT => {
  const baseStats = ALL_STATS[selectedCharacter.class];

  const mainWeapon = selectedCharacter.equipment['weapon1']
  const offHand = selectedCharacter.equipment['offhand']
  const mainWeaponStats = mainWeapon ? WEAPON_STATS[mainWeapon] : WEAPON_STATS['unarmed']
  const offHandStats = offHand ? (SHIELD_STATS[offHand] || WEAPON_STATS[offHand]) : SHIELD_STATS['unarmed']

  // console.log('==>utils: ', baseStats, mainWeaponStats, offHand)

  return {
    ...baseStats,
    baseDmg: baseStats.baseDmg + mainWeaponStats.baseDmg,
    dmgDice: mainWeaponStats.name === 'Unarmed' ? baseStats.dmgDice : mainWeaponStats.dmgDice,
    critChance: (baseStats.critChance || 0) + (mainWeaponStats.bonusCritChance || 0) + (offHandStats.bonusCritChance || 0),
    range: baseStats.range + (mainWeaponStats.bonusRange || 0),
    bleedChance: mainWeaponStats.bleedChance || 0,
    blockChance: offHandStats?.blockChance || 0,
    evadeChance: offHandStats?.evadeChance || 0,
    stunChance: mainWeaponStats.stunChance || 0
  }
}

export const getUnitStats = (
  baseStats: UnitStatsT,
  equipment?: Partial<Record<EquipmentSlot, string | null>>
): UnitStatsT => {

  let additionalStats: Partial<UnitStatsT> = {}
  if (equipment) {
    // console.log('==> baseStats', baseStats, equipment)
    const mainWeapon = equipment['weapon1']
    const offHand = equipment['offhand']
    const mainWeaponStats = mainWeapon ? WEAPON_STATS[mainWeapon] : WEAPON_STATS['unarmed']
    const offHandStats = offHand ? (SHIELD_STATS[offHand] || WEAPON_STATS[offHand]) : SHIELD_STATS['unarmed']

    additionalStats.baseDmg = mainWeaponStats.baseDmg
    additionalStats.dmgDice = mainWeaponStats.dmgDice
    additionalStats.critChance = (baseStats.critChance || 0) + (mainWeaponStats.bonusCritChance || 0) + (offHandStats.bonusCritChance || 0),
    additionalStats.bleedChance = mainWeaponStats.bleedChance
    additionalStats.blockChance = offHandStats?.blockChance
    additionalStats.evadeChance = offHandStats?.evadeChance
    additionalStats.stunChance = mainWeaponStats.stunChance
  } else {
    additionalStats.critChance = baseStats.critChance
  }

  return {
    ...baseStats,
    ...additionalStats
  }
}