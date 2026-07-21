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
  const {
    board,
    boardRef,
    nextTurn,
    gameState,
    selectedTile,
    validTargets,
    handleAction,
    cancelAction,
    interacting,
    attacking,
    handleTileClick
  } = useDungeonEngine();
  const { selectedCharacter } = useCharacterStore();
  if (!selectedCharacter) return

  const activePlayer = gameState.units[gameState.currentPlayer];
  const playerIsHuman = activePlayer.type === 'player'|| activePlayer.type === 'ally'
  const objectsInBoard = gameState.objects && Object.values(gameState.objects);
  const unitsInBoard = gameState.units && Object.values(gameState.units);
  const enemiesInBoard = playerIsHuman
    ? Object.values(unitsInBoard).filter(unit => unit.type === 'enemy')
    : Object.values(unitsInBoard).filter(unit => unit.type === 'player' || unit.type === 'ally')

  // console.log('==> gameState', enemiesInBoard)

  //@TODO:  move this to utils or engine
  const objectsInRange = validTargets.filter(target =>
    objectsInBoard?.some(
      obj =>
        obj.position.col === target.col &&
        obj.position.row === target.row
    )
  ).length;

  const enemiesInRange = validTargets.filter(target =>
    enemiesInBoard?.some(
      obj =>
        obj.position.col === target.col &&
        obj.position.row === target.row
    )
  ).length;

  const interactAction = () => interacting ? cancelAction() : handleAction('interact');
  const attackAction = () => attacking ? cancelAction() : handleAction('attack');

  return (
    <div className='main-game'>
      <header className='page-header'>
        <h1 className='page-title dungeon-title'> DUNGEON </h1>
      </header>

      <Sidebar side='left' isOpen={true} title='ACTIONS'>
        <div className='dungeon-sidebar'>
          <div className='actions-container'>
              <div>Name: {activePlayer?.name}</div>          
              <div>HP: {activePlayer.currentHp}</div>
              <div>Position: {activePlayer.position.col}, {activePlayer.position.row}</div>
              <div className={gameState.movesLeft < 1 ? 'red-text' : ''}>
                Moves Left: {gameState.movesLeft}
              </div>
              <div className={gameState.attacksLeft < 1 ? 'red-text' : ''}>
                Attacks Left: {gameState.attacksLeft}
              </div>
          </div>
          <div className='buttons-container'>
            {objectsInRange > 0 && (
              <Button
                variant='secondary'
                disabled={attacking}
                className='mt-2'
                size='md'
                onClick={() => interactAction()}
              >
                {interacting ? 'Cancel Action' : 'Interact'}
              </Button>
            )}
            {enemiesInRange > 0 && (
              <Button
                variant='secondary'
                disabled={interacting || gameState.attacksLeft < 1}
                className='mt-2'
                size='md'
                onClick={() => attackAction()}
                >
                {attacking ? 'Cancel Attack' : 'Attack'}
              </Button>
            )}   
            <Button variant='secondary' className='mt-2' size='md' onClick={nextTurn}>
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
            <div className='dungeon'>
              {board.map((row, rowIndex) => (
                <div key={rowIndex} className='flex'>
                  {row.map((col, colIndex) => {
                    const currentPlayerPosition = gameState.units[gameState.currentPlayer].position;
                    const isActive = currentPlayerPosition.col === colIndex && currentPlayerPosition.row === rowIndex;
                    const isSelected = selectedTile?.row === rowIndex && selectedTile.col === colIndex;
                    const inRange = validTargets.some(target => target.row === rowIndex && target.col === colIndex);

                    const canInteract = interacting && (col.content === 'button' || col.content === 'chest');
                    const canAttack = attacking && (playerIsHuman ? col.content === 'enemy' : (col.content === 'player' || col.content === 'ally'))
                    const isValid = canInteract || canAttack;

                    const cls = clsx({
                      active: isActive,
                      selected: isSelected,
                      ['in-range']: inRange,
                      valid: inRange && isValid,
                    },
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