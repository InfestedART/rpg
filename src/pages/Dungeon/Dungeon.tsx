import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

import { getEnemiesInRange, getObjectsInRange } from '@/utils/dungeon.utils';
import { useCharacterStore } from '@/store/characterStore';
import useDungeonEngine from './useDungeonEngine';

import Button from '@/components/Button';
import Sidebar from '@/components/Layout/Sidebar';
import SidebarSection from '@/components/Layout/Sidebar/SidebarSection';
import Hover from '@/components/Hover';

import UnitStats from './UnitStats';
import TileInfo from './TileInfo';
import Tile from './Tile';
import MessageBox from './MessageBox';

import './Dungeon.css';

const Dungeon = () => {
  const navigate = useNavigate();
  const {
    board,
    boardRef,
    finishTurn,
    gameState,
    selectedTile,
    validTargets,
    handleAction,
    cancelAction,
    isInteracting,
    isAttacking,
    handleTileClick,
    messages,
    showAttackRange,
  } = useDungeonEngine();
  const { selectedCharacter } = useCharacterStore();
  if (!selectedCharacter) return null;

  const activePlayer = gameState.units[gameState.currentPlayer];
  const playerIsHuman = activePlayer.type === 'player'|| activePlayer.type === 'ally'
  const objectsInRange = getObjectsInRange(gameState, validTargets)
  const enemiesInRange = getEnemiesInRange(activePlayer, gameState, validTargets);

  const handleInteract = () => isInteracting ? cancelAction() : handleAction('interact');
  const handleAttack = () => isAttacking ? cancelAction() : handleAction('attack');

  // const interactDisabled = objectsInRange < 1 && (isAttacking || gameState.bonusActionsLeft < 1)
  const attackDisabled = enemiesInRange < 1 
    || isInteracting 
    || gameState.attacksLeft < 1 
    || activePlayer.status.indexOf('stunned') > 0

  // console.log('==> gameState', gameState)

  return (
    <div className='main-game'>
      <header className='page-header'>
        <h1 className='page-title dungeon-title'> DUNGEON </h1>
      </header>

      <Sidebar side='left' isOpen={true} title='ACTIONS'>
        <div className='dungeon-sidebar'>
          <SidebarSection title="PLAYER INFO">
            <UnitStats unit={activePlayer} gameState={gameState} isActive={true} />
          </SidebarSection>
          <SidebarSection title="ACTIONS">
            {objectsInRange > 0 && (
              <Button
                variant='secondary'
                disabled={isAttacking || gameState.bonusActionsLeft < 1}
                className='mt-2'
                size='md'
                onClick={() => handleInteract()}
              >
                {isInteracting ? '[C]ancel Action' : 'Us[E] Object'}
              </Button>
            )}
            <Hover
              onHoverStart={() => showAttackRange(true)}
              onHoverEnd={() => showAttackRange(false)}
              enabled={!isAttacking}
            >
              <Button
                variant='secondary'
                disabled={attackDisabled}
                className='mt-2 w-full'
                size='md'
                onClick={() => {
                  showAttackRange(false)
                  handleAttack()
                }}
                >
                {isAttacking ? '[C]ancel Attack' : '[A]ttack'}
              </Button> 
            </Hover>
            
            <Button variant='secondary' className='mt-2' size='md' onClick={finishTurn}>
              Finish [T]urn
            </Button>
            <Button variant='primary' onClick={() => navigate('/game')} className='mt-4' size='md'>
               Leave Dungeon
            </Button>
          </SidebarSection>
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

                    const canInteract = isInteracting && (col.content === 'button' || col.content === 'chest');
                    const canAttack = isAttacking && (
                      playerIsHuman ? col.content === 'enemy' : (col.content === 'player' || col.content === 'ally')
                    )
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
                      <Hover
                        enabled={isActive}
                        onHoverStart={() => showAttackRange(true)}
                        onHoverEnd={() => showAttackRange(false)}
                      >
                        <Tile 
                          key={`tile_${rowIndex}_${colIndex}`}
                          terrain={col.terrain}
                          piece={col.content}
                          status={cls}
                          onClick={() => handleTileClick({ row: rowIndex, col: colIndex })}
                        />
                      </Hover>
                    )
                  })}
                </div>
              ))}
            </div>

        </div>

      </div>

      <Sidebar side='right' isOpen={true} title='DETAILS'>
        <div className='dungeon-sidebar'>
          {selectedTile          
            ? (
              <SidebarSection title="Tile Info">
                <TileInfo selectedTile={selectedTile} gameState={gameState} board={board} />
              </SidebarSection>
          ) : <div />
          }
          <SidebarSection title="Message Log">
            <MessageBox messages={messages} />
          </SidebarSection>
          
        </div>
      </Sidebar>
    </div>
  )
}

export default Dungeon