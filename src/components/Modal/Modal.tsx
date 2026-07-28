import  { type ReactNode, useEffect } from "react";
import './Modal.css';

type ModalProps = {
  isOpen: boolean
  onClose: () => void,
  title?: string,
  children: ReactNode;
};

const Modal = (props: ModalProps) => {
  const { isOpen, onClose, title, children } = props;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='modal-overlay' onClick={() => onClose()}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className='modal-header'>
            <h3 className='modal-title'>{title}</h3>
          </div>
        )}
        <div className='modal-body'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal