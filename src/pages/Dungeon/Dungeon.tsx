import { useNavigate } from 'react-router-dom';
import { useCharacterStore } from '@/store/characterStore';
import useDungeonEngine from './useDungeonEngine';
import Button from '@/components/Button';
import Tile from './Tile';

import './Dungeon.css';

const Dungeon = () => {
  const navigate = useNavigate();
  const { board, boardRef, gameState, handleTileClick } = useDungeonEngine();
  const { selectedCharacter } = useCharacterStore();
  if (!selectedCharacter) return

  return (
    <div className='main-game'>
      <header className='page-header'>
        <h1 className='page-title'> DUNGEON </h1>
      </header>
      <div className='main-container'>

        <aside className='game-panel left'>
          <h2>ACTIONS</h2>
          <div>
            <div>{selectedCharacter?.name}</div>          
            <div>Equipment: <br/> {selectedCharacter?.equipment}</div>
          </div>
          <div>
            <Button variant='primary' onClick={() => navigate('/game')} className='mt-3' size='md'>
              Leave Dungeon
            </Button>
          </div>
        </aside>

        <aside className='game-panel center'>
          <div
            className='dungeon-container'
            ref={boardRef}
            tabIndex={0}
            aria-label="Game Dungeon — use arrow keys to move the piece"
          >
            <div className='m-0 p-0'>Current Player: {gameState.currentPlayer}</div>
            <div className='m-0 p-0'>Moves Left: {gameState.movesLeft}</div>

            <div className='dungeon'>
              {board.map((row, rowIndex) => (
                <div key={rowIndex} className='flex'>
                  {row.map((col, colIndex) => (
                    <Tile 
                      key={`tile_${rowIndex}_${colIndex}`}
                      terrain={col.terrain}
                      piece={col.content}
                      onClick={() => handleTileClick({ row: rowIndex, col: colIndex })}
                    />
                  ))}
                </div>
              ))}
            </div>

          </div>
        </aside>

        <aside className='game-panel rigth'>
          <h2>DETAILS</h2> 
        </aside>

      </div>
    </div>
  )
}

export default Dungeon