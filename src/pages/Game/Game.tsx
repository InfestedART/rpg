
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDungeonStore } from '@/store/dungeonStore';
import Button from '@/components/Button';
import Select from '@/components/Select';
import CharStats from './CharStats';
import './Game.css';

import { DUNGEON_SIZE_OPTIONS, DUNGEON_TYPE_OPTIONS } from '@/constants/dungeon.contants';

const Game = () => {
  const [ selectedAction, setSelectedAction ] = useState<string>('stats');
  const { dungeonSize, setDungeonSize, dungeonType, setDungeonType } = useDungeonStore();
  const navigate = useNavigate();

  const actions = [
    {
      value: 'stats',
      label: 'Character Stats'
    },
    {
      value: 'inventory',
      label: 'Inventory',
    }
  ]

  const getActions = () => actions.map(action => (
    <Button
      key={action.value}
      variant={selectedAction === action.value ? 'primary' : 'secondary'}
      onClick={() => setSelectedAction(action.value)}
      className='mt-3'
    >
      {action.label}
    </Button>
  ))

  const handleSizeChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setDungeonSize(ev.target.value)
  }

  const handleTypeChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setDungeonType(ev.target.value)
  }

  return (
    <div className='main-game'>
      <header className='page-header'>
        <h1 className='page-title'> TOWN </h1>
      </header>
      <div className='game-container'>
        <aside className='game-panel left'>
          <h2>ACTIONS</h2>   
          <div>
            {getActions()}
            <h4 className='mt-4'><u>Dungeon</u></h4>
            <Select
              label='Dungeon Size'
              name='d_size'
              options={DUNGEON_SIZE_OPTIONS}
              onChange={handleSizeChange}
              inputSize='sm'
              value={dungeonSize}
            />
            <Select
              label='Dungeon Type'
              name='d_type'
              options={DUNGEON_TYPE_OPTIONS}
              onChange={handleTypeChange}
              inputSize='sm'
              value={dungeonType}
            />
            <Button variant='secondary' className='mt-3' onClick={() => navigate('/dungeon')}>
              ENTER DUNGEON
            </Button>
          </div>
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