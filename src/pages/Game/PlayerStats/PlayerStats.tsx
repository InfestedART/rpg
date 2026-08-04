import type { CharacterType } from "@/types/characterTypes";
import EquipmentStats from "../EquipmentStats";

type PlayerStatsProps = {
  selectedCharacter: CharacterType
}


const PlayerStats = ({ selectedCharacter }: PlayerStatsProps) => {
  if (!selectedCharacter) return null;
  console.log('==> selectedCharacter:', selectedCharacter.equipment);

  return (
    <div>
      <div>Name: {selectedCharacter.name}</div>
      <div>Class: {selectedCharacter.class}</div>
      <div>Equipment: 
         {selectedCharacter.equipment.map(item => (
          <EquipmentStats itemId={item} key={item}/>
         ))}
      </div>
      <div>Gold: {selectedCharacter.gold}</div>
    </div>
  )
}

export default PlayerStats;