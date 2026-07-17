

import { Outlet, useNavigate } from "react-router-dom";
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

        <main className="layout-container">
            <Outlet />
        </main>
      </div>
    )
}


export default Layout