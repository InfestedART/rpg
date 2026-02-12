import Button from 'components/Button';
import './Sidebar.css';

export type SidebarButton = {
  label: string;
  action: () => void;
}

type SidebarProps = {
  sidebarBtns: SidebarButton[];
  closeSidebar: () => void;
  isOpen: boolean;
}

const Sidebar = ({sidebarBtns, closeSidebar, isOpen}: SidebarProps) => {
  return (
    <aside
      className={`
        sidebar
        fixed top-14 right-0
        h-[calc(100%-3.5rem)] w-64
        transform transition-transform duration-300 ease-in-out
        z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="p-4">
        <Button
          onClick={() => closeSidebar()}
          className="btn-close m-0 text-xs p-0"
        >
          X
        </Button>
          {
            sidebarBtns.map((btn: SidebarButton) => (
                <Button onClick={btn.action}>{btn.label}</Button>
            ))
          }
      </div>
    </aside>
  )
}

export default Sidebar;