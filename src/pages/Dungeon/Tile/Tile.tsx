import type { TileContent, TileTerrain } from '@/types/dungeon.types';
import './Tile.css';

type TileProps = {
  terrain: TileTerrain;
  // status?: 'active' | 'enemyInRange' | 'objectInRange' | ''
  status: string;
  piece: TileContent;
  onClick: () => void;
}

const Tile = ({ terrain, status, piece, onClick }: TileProps) => {
  const getPiece = (piece: TileContent) => {
    let label;
    switch(piece) {
      case 'player': label = 'P'; break;
      case 'ally': label = 'A'; break;
      case 'enemy': label = 'E'; break;
      case 'obstacle': label = 'X'; break;
      case 'object': label = 'O'; break;
      case 'empty': 
      default: label = '';
    }
    return label;
  }

  return (
    <div className={`tile ${terrain} ${status}`} onClick={onClick}>
      {getPiece(piece)}
    </div>
  )
} 

export default Tile;