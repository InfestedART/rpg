import type { CharacterType } from "@/types/characterTypes";

type PlayerStatsProps = {
  selectedCharacter: CharacterType
}


const PlayerStats = ({ selectedCharacter }: PlayerStatsProps) => {
  if (!selectedCharacter) return null;
  // console.log('==> selectedCharacter:', selectedCharacter);

  return (
    <div>
      <div>Name: {selectedCharacter.name}</div>
      <div>Class: {selectedCharacter.class}</div>
      <div>Equipment: {selectedCharacter.equipment}</div>
      <div>Gold: {selectedCharacter.gold}</div>
    </div>
  )
}

export default PlayerStats;