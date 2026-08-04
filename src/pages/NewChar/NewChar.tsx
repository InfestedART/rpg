import './NewChar.css'
import CharacterForm from './CharacterForm'
import { useGameStore } from '@/store/gameStore'
import { CLASS_STATS } from '@/constants/unitStats.constants';

const NewChar = () => {
  const { currentClass } = useGameStore();
  const classStats = currentClass && CLASS_STATS[currentClass]

  return (
    <div className='newchar'>

      <header className='page-header'>
        <h1 className='page-title'> CHARACTER CREATION </h1>
      </header>

      <div className='newchar-container'>
        <aside className='newchar-panel left'>
          <h2>STATS</h2>
          <CharacterForm />
        </aside>
        <section className='newchar-panel center'>
          <h2>PREVIEW</h2>
        </section>
        <aside className='newchar-panel rigth'>
          <h2>DETAILS</h2>
          <div>HP: {classStats.baseHp}</div>
          <div>Damage: {classStats.baseDmg}</div>
          <div>Move Speed: {classStats.moveSpeed}</div>
          <div>Initiative: {classStats.initiative}</div>
        </aside>
      </div>

    </div>
  )
}

export default NewChar