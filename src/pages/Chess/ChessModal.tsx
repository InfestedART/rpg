import { UNICODE_PIECES } from '@/constants/chessConstants';
import type { PieceColor, PieceType } from '@/types/chessTypes';
import Modal from '@/components/Modal';
// import { useState } from 'react';

interface ChessModalProps {
  color: PieceColor;
  onSelect: (piece: PieceType) => void;
  // isOpen: boolean;
}

const PROMOTION_PIECES: PieceType[] = ['queen', 'rook', 'bishop', 'knight'];

const ChessModal = ({ color, onSelect }: ChessModalProps) => {
  return (
    <Modal isOpen onClose={() => console.log('==> closing...')} title='Promote your pawn'>
      <div className='promotion-options'>
        {PROMOTION_PIECES.map((piece: PieceType) => (
          <button
            key={piece}
            className='promotion-btn'
            onClick={() => onSelect(piece)}
          >
            <span className={`promotion-piece ${color}`}>
              {UNICODE_PIECES[piece]}
            </span>
            <span className='promotion-label'>
              {piece.charAt(0).toUpperCase() + piece.slice(1)}
            </span>
          </button>
        ))}
      </div>      
    </Modal>
  )
}

export default ChessModal