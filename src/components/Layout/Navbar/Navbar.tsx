import './Navbar.css';
import Button from "../../Button";

export type NavbarButton = {
  label: string;
  action: () => void;
}

type NavbarProps = {
  navButtons: NavbarButton[];
  sidebarAction: () => void;
}

const Navbar = ({navButtons, sidebarAction}: NavbarProps) => {
  return(
    <nav className="navbar w-full h-14 flex items-center justify-between px-4 z-40">
      <div className='navbar-container'>
        <div className="left-side">
          {navButtons.map((btn: NavbarButton) => (
            <>
              <Button onClick={btn.action} key={btn.label}>
                {btn.label}
              </Button>
            </>
          ))}
        </div>
        <div className="right-side">
          <Button onClick={sidebarAction}>Open Sidebar</Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar