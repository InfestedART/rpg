import './Game.css';
import { useState } from 'react';

// import { useCharacterStore } from '@/store/characterStore';
import Button from '@/components/Button';
import CharStats from './CharStats';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const [ selectedAction, setSelectedAction ] = useState<string>('stats');
  // const { selectedCharacter } = useCharacterStore();
  const navigate = useNavigate();

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

  const getActions = () => actions.map(action => {
    const clickAction = action.value === 'dungeon' ?
      () => navigate('/dungeon') :
      () => setSelectedAction(action.value);

    return (
      <Button
        key={action.value}
        variant={selectedAction === action.value ? 'primary' : 'secondary'}
        onClick={clickAction}
        className='mt-3'
      >
        {action.label}
      </Button>
    )
  })

  return (
    <div className='main-game'>
      <header className='page-header'>
        <h1 className='page-title'> TOWN </h1>
      </header>
      <div className='game-container'>
        <aside className='game-panel left'>
          <h2>ACTIONS</h2>   
          <div>{getActions()}</div>
        </aside>
        <aside className='game-panel center'>
          <h2>CHARACTER</h2>
          {selectedAction === 'stats' && <CharStats />}
        </aside>
      </div>
    </div>
  )
}

export default Game