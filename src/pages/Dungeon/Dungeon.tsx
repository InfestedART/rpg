import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
  const [leftOpen, setLeftOpen] = useState<boolean>(true)
  if (!selectedCharacter) return

  return (
    <div className='main-game'>
      <header className='page-header'>
        <h1 className='page-title'> DUNGEON </h1>
      </header>

      <Sidebar side='left' isOpen={leftOpen}>
        SIDEBAR
      </Sidebar>
      
      <div className='main-container'>

        <aside className='game-panel left'>
          <h2>ACTIONS</h2>
          <div className='actions-container'>
            <div className='details'>
              <div>{selectedCharacter?.name}</div>          
              <div>Equipment: <br/> {selectedCharacter?.equipment}</div>
            </div>
            <div className='buttons'>
              <Button variant='secondary' size='md' disabled={gameState.movesLeft > 0} onClick={nextTurn}>
                Finish Turn
              </Button>
              <Button variant='primary' onClick={() => navigate('/game')} className='mt-4' size='md'>
                Leave Dungeon
              </Button>
            </div>
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
                  {row.map((col, colIndex) => {
                    const currentPlayerPosition = gameState.positions[gameState.currentPlayer]
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
        </aside>

        <aside className='game-panel rigth'>
          <h2>DETAILS</h2> 
        </aside>

      </div>
    </div>
  )
}

export default Dungeon