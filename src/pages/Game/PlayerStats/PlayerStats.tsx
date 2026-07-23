import { useCharacterStore } from '@/store/characterStore';

const CharStats = () => {
  const { selectedCharacter } = useCharacterStore();
  
  if (!selectedCharacter) return null;

  return (
    <div>
      <div>Name: {selectedCharacter.name}</div>
      <div>Class: {selectedCharacter.class}</div>
      <div>Equipment: {selectedCharacter.equipment}</div>
    </div>
  )
}

export default CharStats;