import type { ReactNode } from 'react';
import './SidebarSection.css'

type SidebarSectionProps = { 
  title: string;
  children: ReactNode
}

const SidebarSection = ({ title, children}: SidebarSectionProps) => {
  return (
    <fieldset className="sidebar-section">
      <legend className="sidebar-section__title">{title}</legend>
      <div className="sidebar-section__content">{children}</div>
    </fieldset>
  );
}

export default SidebarSection;