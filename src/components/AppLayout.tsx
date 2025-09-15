import React from 'react';
import { Sidebar } from './Sidebar';
import { MobileNavbar } from './MobileNavbar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <MobileNavbar />
      
      <div className="lg:ml-20 px-4 lg:px-8 pb-20 lg:pb-8">
        {children}
      </div>
    </div>
  );
};
