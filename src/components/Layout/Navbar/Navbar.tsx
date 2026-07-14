import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/Button';

import './Navbar.css';

type IconPosition = 'left' | 'right';

export type NavbarButton = {
  label?: string;
  action: () => void;
  icon?: IconDefinition;
  iconPosition?: IconPosition;
}

type NavbarProps = {
  navButtons: NavbarButton[];
  title?: string;
}

const Navbar = ({navButtons, title}: NavbarProps) => {
  return(
    <nav className="navbar w-full h-14 flex items-center justify-between px-4 z-40">
      <div className='navbar-container'>
        <div className="navbar-icons">
          {navButtons.map((btn: NavbarButton) => (
            <Button
              onClick={btn.action}
              key={btn.label}
              icon={btn.icon}
              iconPosition={btn.iconPosition}
            >
              {btn.label && btn.label}
            </Button>
          ))}
        </div>
        { title && <span className="navbar-title">{title}</span> }
      </div>
    </nav>
  );
}

export default Navbar