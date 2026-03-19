import './Game.css';
import { useState } from 'react';

// import { useCharacterStore } from '@/store/characterStore';
import Button from '@/components/Button';
import CharStats from './CharStats';

const Game = () => {
  const [ selectedAction, setSelectedAction ] = useState<string>('stats');
  // const { selectedCharacter } = useCharacterStore();

  const actions = [
    {
      value: 'stats',
      label: 'Character Stats'
    },
    {
      value: 'inventory',
      label: 'Inventory',
    },
    {
      value: 'dungeon',
      label: 'Enter Dungeon',
    }
  ]

  const getActions = () => (
    <div>
      {actions.map(action => (
        <Button
          variant={selectedAction === action.value ? 'primary' : 'secondary'}
          onClick={() => setSelectedAction(action.value)}
          className='mt-3'
        >
          {action.label}
        </Button>
      ))}
    </div>
  )

  return (
    <div className='main-game'>
      <header className='page-header'>
        <h1 className='page-title'> GAME </h1>
      </header>
      <div className='game-container'>
        <aside className='game-panel left'>
          <h2>ACTIONS</h2>   
          {getActions()}
        </aside>
        <aside className='game-panel center'>
          <h2>GAME</h2>
          {selectedAction === 'stats' && <CharStats />}
        </aside>
      </div>
    </div>
  )
}

export default Game