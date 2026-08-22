
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDungeonStore } from '@/store/dungeonStore';
import Button from '@/components/Button';
import Select from '@/components/Select';
import PlayerStats from './PlayerStats';
import './Game.css';

import { DUNGEON_SIZE, DUNGEON_SIZE_OPTIONS, DUNGEON_TYPE_OPTIONS } from '@/constants/dungeon.contants';
import Sidebar from '@/components/Layout/Sidebar';
import Input from '@/components/Input';
import type { InitialBoard, Position, TileTerrain } from '@/types/dungeon.types';
import { useCharacterStore } from '@/store/characterStore';
import type { EnemyClassType } from '@/types/characterTypes';
import SidebarSection from '@/components/Layout/Sidebar/SidebarSection';
import { getCharacterById } from '@/api/characters';

// TODO: move these to constants
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
  const navigate = useNavigate();
  const {
    dungeonSize,
    setDungeonSize,
    dungeonType,
    setDungeonType,
    initialBoard,
    setInitialBoard
  } = useDungeonStore();
  const { selectedCharacterId, selectedCharacter, setSelectedCharacter } = useCharacterStore();

  const enemyCount =  Object.values(initialBoard).filter(({ type }) => ['enemy'].includes(type)).length;
  const [ selectedAction, setSelectedAction ] = useState<string>('stats');
  const [ enemyAmout, setEnemyAmount ] = useState<number>(enemyCount || 1);

  useEffect(() => {
    if (!selectedCharacterId) { navigate('/') }
    else {
      const fetchCharacter = async () => {
        try {
          const char = await getCharacterById(selectedCharacterId)
          setSelectedCharacter({
            ...char,
            equipment: JSON.parse(char.equipment)
          });
        } catch (err) {
          console.error('Failed to load character', err);
        }
      }
      fetchCharacter();
    }
    
  }, [selectedCharacterId])

  // console.log('==> selected character:', selectedCharacter, selectedCharacterId)

  const initialPlayerPos: InitialBoard = {
  1: {
      type: 'player',
      class: selectedCharacter?.class ?? "dummy",
      position: { row: 0, col: 0 }
    }
  }

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
    const createEnemy = (pos: Position, enemyClass: EnemyClassType) => ({
      type: 'enemy',
      class: enemyClass,
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
        2: createEnemy({ row: size-1, col: size-1 }, 'brigand')
      },
      2: {
        2: createEnemy({ row: size-1, col: Math.floor(size/2)-1 }, 'skeleton'),
        3: createEnemy({ row: Math.floor(size/2)-1, col: size-1 }, 'skeleton'),
      },
      3: {
        2: createEnemy({ row: size-1, col: 0 }, 'rat'),
        3: createEnemy({ row: 0, col: size-1 }, 'rat'),
        4: createEnemy({ row: size-1, col: size-1 }, 'rat'),
      }
    }

    const newBoard = {
      ...initialPlayerPos,
      ...chestPosition,
      ...boards[amount] ?? boards[1],
    } 
    setInitialBoard(newBoard as InitialBoard)
  }

  const enterDungeon = () => {
    updateBoardState(DUNGEON_SIZE[dungeonSize], enemyAmout);
    navigate('/dungeon')
  }

  return (
    <div className='main-game town'>
      <header className='page-header'>
        <h1 className='page-title'> TOWN </h1>
      </header>

      <Sidebar side='left' title='ACTIONS' retractable={false}>  
        <SidebarSection title='ACTIONS'>
          {getActions()}
        </SidebarSection>

        <SidebarSection title='DUNGEON'>
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
          <Button variant='secondary' className='mt-3' onClick={enterDungeon}>
            ENTER DUNGEON
          </Button>
        </SidebarSection>
      </Sidebar>

      <div className='game-container'>
        <aside className='game-panel center'>
          <h2>CHARACTER</h2>
          {selectedCharacter 
            && selectedAction === 'stats'
            && <PlayerStats selectedCharacter={selectedCharacter} />
          }
        </aside>
      </div>
    </div>
  )
}

export default Game