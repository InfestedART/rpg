import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import useDungeonEngine from './useDungeonEngine';

import './Dungeon.css';
import Tile from './Tile';

const Dungeon = () => {
  const navigate = useNavigate();
  const { board } = useDungeonEngine();

  const handleClick = () => {
    console.log('==> click!');
  }

  return (
    <div className='main-game'>
      <header className='page-header'>
        <h1 className='page-title'> DUNGEON </h1>
      </header>
      <div className='game-container'>
        <aside className='game-panel left'>
          <h2>ACTIONS</h2>   
          <div>
            <Button variant='primary' onClick={() => navigate('/game')} className='mt-3'>
              Leave Dungeon
            </Button>
          </div>
        </aside>
        <aside className='game-panel center'>
          <div className='dungeon-container'>
            <div className='dungeon'>
              {board.map((row, rowIndex) => (
                <div key={rowIndex} className='flex'>
                  {row.map((tile, tileIndex) => (
                    <Tile 
                      key={tileIndex}
                      terrain={tile.terrain}
                      piece={tile.content}
                      onClick={handleClick}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Dungeon