

import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { faHome } from '@fortawesome/free-solid-svg-icons';

import type { NavbarButton } from "./Navbar/Navbar";
import Navbar from './Navbar';

import './Layout.css';

type LayoutProps = {}

const Layout = ({}: LayoutProps) => {
  const navigate = useNavigate();

  const navbarButtons: NavbarButton[] = [
    {
      label: 'HOME',
      action: () => navigate('/'),
      icon: faHome,
      iconPosition: 'left'
    }
  ];

    return(
      <div className="layout h-screen w-full flex flex-col">
        <Navbar navButtons={navbarButtons}  />

        <main className="flex-1 w-full p-6 overflow-auto">
          <div className='layout-container'>
            <Outlet />
          </div>
        </main>
      </div>
    )
}


export default Layout