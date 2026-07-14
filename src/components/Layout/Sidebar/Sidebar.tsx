import Button from 'components/Button';
import './Sidebar.css';
import { useState } from 'react';

export type SidebarSide = 'left' | 'right';

type SidebarProps = {
  side: SidebarSide;
  children?: React.ReactNode;
  isOpen?: boolean;
}

const Sidebar = ({side, children, isOpen = true}: SidebarProps) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  const collapseIcon = side === 'left' ? '‹' : '›';
  const expandIcon = side === 'left' ? '›' : '‹';
  
  if (!open) {
    return (
      <button
        className={`sidebar-rail sidebar-rail-${side}`}
        onClick={() => setOpen(true)}
        aria-label={`Open ${side} sidebar`}
      >
        <span className="sidebar-rail-icon">{expandIcon}</span>
      </button>
    );
  }

  return (
    <aside className={`sidebar sidebar-${side}`}>
      <div className="sidebar-header">
        <button
          className="sidebar-toggle"
          onClick={() => setOpen(false)}
          aria-label={`Close ${side} sidebar`}
        >
          {collapseIcon}
        </button>
      </div>
      <div className="sidebar-content">{children}</div>
    </aside>
  )
}

export default Sidebar;