
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDungeonStore } from '@/store/dungeonStore';
import Button from '@/components/Button';
import Select from '@/components/Select';
import CharStats from './CharStats';
import './Game.css';

import { DUNGEON_SIZE, DUNGEON_SIZE_OPTIONS, DUNGEON_TYPE_OPTIONS } from '@/constants/dungeon.contants';
import Sidebar from '@/components/Layout/Sidebar';
import Input from '@/components/Input';
import type { InitialBoard, Position, TileTerrain } from '@/types/dungeon.types';

// TODO: move these to constants
const initialPlayerPos: InitialBoard = {
  1: {
      type: 'player',
      position: { row: 0, col: 0}
    }
  }

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

const Game = () => {
  const {
    dungeonSize,
    setDungeonSize,
    dungeonType,
    setDungeonType,
    initialBoard,
    setInitialBoard
  } = useDungeonStore();
  const navigate = useNavigate();

  const [ selectedAction, setSelectedAction ] = useState<string>('stats');
  const enemyCount =  Object.values(initialBoard).filter(({ type }) => ['enemy'].includes(type)).length;
  const [ enemyAmout, setEnemyAmount ] = useState<number>(enemyCount || 1);

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
    setDungeonSize(ev.target.value);
    updateBoardState(DUNGEON_SIZE[ev.target.value], enemyAmout);
  }

  const handleTypeChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setDungeonType(ev.target.value as TileTerrain)
  }

  const handleEnemyChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setEnemyAmount(Number(ev.target.value));
    updateBoardState(DUNGEON_SIZE[dungeonSize], Number(ev.target.value));
  }

  const updateBoardState = (size: number, amount: number) => {  
    const createEnemy = (pos: Position) => ({
      type: 'enemy',
      position: pos,
    })

    const chestPosition: InitialBoard = {
      [amount+2]: {
        type: 'chest',
        position: { row: Math.floor(size/2), col: Math.floor(size/2)}
      }
    }

    const boards: Record<number, Record<number, InitialBoard>> = {
      1: {
        2: createEnemy({ row: size-1, col: size-1 })
      },
      2: {
        2: createEnemy({ row: size-1, col: Math.floor(size/2)-1 }),
        3: createEnemy({ row: Math.floor(size/2)-1, col: size-1 }),
      },
      3: {
        2: createEnemy({ row: size-1, col: 0 }),
        3: createEnemy({ row: 0, col: size-1 }),
        4: createEnemy({ row: size-1, col: size-1 }),
      }
    }

    const newBoard = {
      ...initialPlayerPos,
      ...chestPosition,
      ...boards[amount] ?? boards[1],
    } 
    setInitialBoard(newBoard as InitialBoard)
  }

  return (
    <div className='main-game'>
      <header className='page-header'>
        <h1 className='page-title'> TOWN </h1>
      </header>

      <Sidebar side='left' title='ACTIONS'>  
        <div>
          {getActions()}
          <h4 className='mt-5'>DUNGEON</h4>
          <Input
            label='Enemies'
            type='number'
            min={1} max={3}
            value={enemyAmout}
            onChange={handleEnemyChange}
          />
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
      </Sidebar>

      <div className='game-container'>
        <aside className='game-panel center'>
          <h2>CHARACTER</h2>
          {selectedAction === 'stats' && <CharStats />}
        </aside>
      </div>
    </div>
  )
}

export default Game