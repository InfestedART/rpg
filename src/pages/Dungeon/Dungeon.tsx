import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useCharacterStore } from '@/store/characterStore';
import useDungeonEngine from './useDungeonEngine';
import Button from '@/components/Button';
import Tile from './Tile';

import './Dungeon.css';
import Sidebar from '@/components/Layout/Sidebar';


const Dungeon = () => {
  const navigate = useNavigate();
  const { board, boardRef, nextTurn, gameState, selectedTile, handleTileClick } = useDungeonEngine();
  const { selectedCharacter } = useCharacterStore();
  if (!selectedCharacter) return

  return (
    <div className='main-game'>
      <header className='page-header'>
        <h1 className='page-title'> DUNGEON </h1>
      </header>

      <Sidebar side='left' isOpen={true} title='ACTIONS'>
        <div className='dungeon-sidebar'>
          <div className='actions-container'>
              <div>Name: {selectedCharacter?.name}</div>          
              <div>Equipment: <br/> {selectedCharacter?.equipment}</div>              
          </div>
          <div className='buttons-container'>
              <Button variant='secondary' size='md' onClick={nextTurn}>
                Finish Turn
              </Button>
              <Button variant='primary' onClick={() => navigate('/game')} className='mt-4' size='md'>
                Leave Dungeon
              </Button>
            </div>
        </div>
      </Sidebar>
      
      <div className='main-container'>

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
                  {row.map((col, colIndex) => {
                    const currentPlayerPosition = gameState.units[gameState.currentPlayer].position;
                    const isActive = currentPlayerPosition.col === colIndex && currentPlayerPosition.row === rowIndex;
                    const isSelected = selectedTile?.row === rowIndex && selectedTile.col === colIndex;
                    const cls = clsx({
                      active: isActive,
                      selected: isSelected,
                    },
                      // col.terrain,
                      col.content
                    )
                    return (
                      <Tile 
                        key={`tile_${rowIndex}_${colIndex}`}
                        terrain={col.terrain}
                        piece={col.content}
                        status={cls}
                        onClick={() => handleTileClick({ row: rowIndex, col: colIndex })}
                      />
                    )
                  })}
                </div>
              ))}
            </div>

        </div>

      </div>

      <Sidebar side='right' isOpen={true} title='DETAILS'>
      </Sidebar>
    </div>
  )
}

export default Dungeon