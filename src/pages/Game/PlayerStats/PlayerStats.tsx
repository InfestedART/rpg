import type { CharacterType } from "@/types/characterTypes";
import EquipmentStats from "../EquipmentStats";
import { capitalize, round } from "@/utils/utils";
import { ALL_STATS } from "@/constants/unitStats.constants";
import { WEAPON_STATS } from "@/constants/weaponStats.constants";
import { SHIELD_STATS } from "@/constants/shieldStats.constants";
import SingleStat from "../SingleStat";

type PlayerStatsProps = {
  selectedCharacter: CharacterType
}

const PlayerStats = ({ selectedCharacter }: PlayerStatsProps) => {
  if (!selectedCharacter) return null;

  const equipedItems = Object.values(selectedCharacter.equipment)
  const baseStats = ALL_STATS[selectedCharacter.class];

  const mainWeapon = selectedCharacter.equipment['weapon1']
  const offHand = selectedCharacter.equipment['weapon2']

  const mainWeaponStats = mainWeapon ? WEAPON_STATS[mainWeapon] : WEAPON_STATS['unarmed']
  const offHandStats = offHand ? SHIELD_STATS[offHand] : SHIELD_STATS['unarmed']

  // console.log('==> stats', baseStats, mainWeaponStats, offHand)
  
  const minDmg = baseStats.baseDmg + mainWeaponStats.baseDmg
  const maxDmg = minDmg + mainWeaponStats.dmgDice
  const rawCritChance = (baseStats.critChance || 0) + (mainWeaponStats.bonusCritChance || 0)
  const critChance = round(rawCritChance*100, 2)

  const blockChance = offHandStats?.blockChance || 0
  const evadeChance = offHandStats?.evadeChance || 0
  const stunChance = mainWeaponStats.stunChance || 0
  const bleedChance = mainWeaponStats.bleedChance || 0

  return (
    <div>
      <SingleStat label="Name: " value={selectedCharacter.name} />
      <SingleStat label="Class: " value={capitalize(selectedCharacter.class)} />

      <div>
        <span>Stats: </span>
        <div className="ml-3">
          <SingleStat label="Damage: " value={`${minDmg}-${maxDmg}`} />
          { critChance > 0 && <SingleStat label="Critical Strike Chance: " value={`${critChance}%`} /> }
          { evadeChance > 0 && <SingleStat label="Chance to Evade: " value={`${evadeChance}%`} /> }
          { blockChance > 0 && <SingleStat label="Chance to Block: " value={`${critChance}%`} /> }
          { stunChance > 0 && <SingleStat label="Chance to Stun: " value={`${stunChance}%`} /> }
          { bleedChance > 0 && <SingleStat label="Chance to cause Bleeding: " value={`${bleedChance}%`} /> }
        </div>
      </div>

      <div>
        <span>Equipment: </span> 
        {equipedItems.map(item => (
          item ? <EquipmentStats itemId={item} key={item}/> : null
        ))}
      </div>

      <div>
        <SingleStat label="Gold: " value={`${selectedCharacter.gold}`} />
      </div>
    </div>
  )
}

export default PlayerStats;