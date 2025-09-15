import React from 'react';
import { LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const UserProfile: React.FC = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="flex items-center gap-4">
      <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
        <Settings className="w-4 h-4 text-gray-500" />
      </button>
      
      <div className="relative group">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center cursor-pointer">
          <span className="text-white text-sm font-medium">
            {getInitials(currentUser?.displayName)}
          </span>
        </div>
        
        {/* Dropdown Menu */}
        <div className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="font-medium text-gray-800">{currentUser?.displayName || 'Пользователь'}</p>
            <p className="text-sm text-gray-500">{currentUser?.email}</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};
