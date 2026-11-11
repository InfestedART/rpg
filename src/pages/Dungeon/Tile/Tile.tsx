import type { FloatingTextT, TileContent, TileTerrain } from '@/types/dungeon.types';
import './Tile.css';
import FloatingText from '@/components/FloatingText';

type TileProps = {
  terrain: TileTerrain;
  // status?: 'active' | 'enemyInRange' | 'objectInRange' | ''
  status: string;
  piece: TileContent;
  icon?: React.ReactNode;
  onClick?: () => void;
  floatingText?: FloatingTextT;
  removeFloatingText: (id: string) => void;
}

const Tile = ({
  terrain,
  status,
  piece,
  icon,
  onClick,
  floatingText,
  removeFloatingText
}: TileProps) => {
  const getPiece = (piece: TileContent) => {
    let label;
    switch(piece) {
      case 'player':  label = 'P'; break;
      case 'ally':    label = 'A'; break;
      case 'enemy':   label = 'E'; break;
      case 'obstacle': label = 'X'; break;
      case 'chest':   label = 'C'; break;
      case 'empty': 
      default: label = '';
    }
    return label;
  }

  // floatingText && console.log('==> tile', floatingText)

  return (
    <div className="relative">
      <div className={`tile ${terrain} ${status}`} onClick={onClick}>
        {icon || getPiece(piece)}
      </div>
      { floatingText && (
        <FloatingText
          type={floatingText.type}
          value={floatingText.value}
          onDone={() => removeFloatingText(floatingText.id)}
        />
      )}
    </div>
  )
} 

export default Tile;