import './Layout.css';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from './Navbar';
import type { NavbarButton } from './Navbar/Navbar';
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';
import type { SidebarButton } from './Sidebar/Sidebar';

type LayoutProps = {
}

const Layout = (props: LayoutProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const navbarButtons: NavbarButton[] = [
      {
        label: 'HOME',
        action: () => navigate('/')
      }
    ];

    const sidebarButtons: SidebarButton[] = [
      {
        label: 'ITEM 1',
        action: () => console.log('click 1')
      },
      {
        label: 'ITEM 2',
        action: () => console.log('click 2')
      },
    ];

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

      {/* <aside
        className={`
          fixed top-14 right-0
          h-[calc(100%-3.5rem)] w-64
          bg-gray-700 text-white
          transform transition-transform duration-300 ease-in-out
          z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="mb-4 text-sm bg-gray-700 px-2 py-1 rounded"
          >
            Close
          </button>

          <h2 className="font-semibold mb-4">Sidebar</h2>

          <ul className="space-y-2">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      </aside> */}

      </div>
    )
}


export default Layout