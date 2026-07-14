import './Layout.css';

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { faHome } from '@fortawesome/free-solid-svg-icons';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import type { NavbarButton } from './Navbar/Navbar';
import type { SidebarButton } from './Sidebar/Sidebar';

const navigate = useNavigate();

const navbarButtons: NavbarButton[] = [
  {
    label: 'HOME',
    action: () => navigate('/'),
    icon: faHome,
    iconPosition: 'left'
  }
];

const sidebarButtons: SidebarButton[] = [
  {
    label: 'ITEM 1',
    action: () => console.log('click 1')
  },
];

type LayoutProps = {}

const Layout = (props: LayoutProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [leftOpen, setLeftOpen] = useState<boolean>(false);
    const [rightOpen, setRightOpen] = useState<boolean>(false);

    return(
      <div className="layout h-screen w-full flex flex-col">
        <Navbar
          navButtons={navbarButtons}
          sidebarAction={() => setIsOpen(true)}
        />

        <main className="flex-1 w-full p-6 overflow-auto">
          <div className='layout-container'>
            <Outlet />
          </div>
        </main>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}

        <Sidebar
          sidebarBtns={sidebarButtons}
          isOpen={isOpen}
          closeSidebar={() => setIsOpen(false)}
        />

      </div>
    )
}


export default Layout