import React from 'react';
import { Calendar, Home, Users, Clock, Settings } from 'lucide-react';
import { UserProfile } from './UserProfile';

interface MobileNavbarProps {
  onSettingsClick?: () => void;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({ onSettingsClick }) => {
  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-30 border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-gray-800">Календарь</h1>
          </div>

          {/* User Profile */}
          <UserProfile onSettingsClick={onSettingsClick} />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <div className="flex items-center justify-around py-2">
          <button className="flex flex-col items-center gap-1 p-3 text-gray-500 hover:text-gray-700 transition-colors">
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Главная</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 p-3 text-gray-500 hover:text-gray-700 transition-colors">
            <Users className="w-5 h-5" />
            <span className="text-xs font-medium">Команда</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 p-3 text-indigo-500">
            <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Календарь</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 p-3 text-gray-500 hover:text-gray-700 transition-colors">
            <Clock className="w-5 h-5" />
            <span className="text-xs font-medium">Время</span>
          </button>
          
          <button 
            onClick={onSettingsClick}
            className="flex flex-col items-center gap-1 p-3 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs font-medium">Настройки</span>
          </button>
        </div>
      </div>
    </>
  );
};
