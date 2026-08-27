import type { ReactNode } from 'react';
import './Hover.css';

interface HoverProps {
  children: ReactNode;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  enabled?: boolean,
  className?: string;
}

const Hover = ({
  children,
  onHoverStart,
  onHoverEnd,
  enabled = true,
  className = '',
}: HoverProps) => {
  return enabled ? (
    <span
      className={`hover-container ${className}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      {children}
    </span>
  ) : children
}

export default Hover