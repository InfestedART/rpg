import { useState, type ReactNode } from 'react';

import './Tooltip.css'

type TooltipProps = {
  content: ReactNode
  children: ReactNode;
  delay?: number;
}

const Tooltip = ({ content, children, delay = 400 }: TooltipProps) => {
  const [visible, setVisible] = useState<boolean>(false)
  
  let timeout: ReturnType<typeof setTimeout>;

  const handleMouseEnter = () => {
    timeout = setTimeout(() => {
      setVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeout);
    setVisible(false);
  };

  return (
    <span
      className='tooltip-container'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible && (
        <span className='tooltip' role='tooltip'>
          {content}
        </span>
      )}
    </span>
  )
}

export default Tooltip