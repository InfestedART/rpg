import Button from 'components/Button';
import './Sidebar.css';
import { useState } from 'react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export type SidebarSide = 'left' | 'right';

type SidebarProps = {
  title?: string;
  side: SidebarSide;
  children?: React.ReactNode;
  isOpen?: boolean;
}

const Sidebar = ({title, side, children, isOpen = true}: SidebarProps) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  const collapseIcon = side === 'left' ? faChevronLeft : faChevronRight;
  const expandIcon = side === 'left' ? faChevronRight : faChevronLeft;
  
  if (!open) {
    return (
      <div
        className={`sidebar-rail sidebar-rail-${side}`}
        onClick={() => setOpen(true)}
        aria-label={`Close ${side} sidebar`}
      >
        <Button 
          onClick={() => {}}
          variant={'ghost'}
          icon={expandIcon}
        />
      </div>

    );
  }

  return (
    <aside className={`sidebar sidebar-${side}`}>
      <div className="sidebar-header">
        {side === 'left' && <h2 className='sidebar-title'>{title}</h2>}
        <Button 
          onClick={() => setOpen(false)}
          aria-label={`Close ${side} sidebar`}
          variant={'ghost'}
          icon={collapseIcon}
        />
        {side === 'right' && <h2 className='sidebar-title'>{title}</h2>}
      </div>
      <div className="sidebar-content">
        {children}
      </div>
    </aside>
  )
}

export default Sidebar;