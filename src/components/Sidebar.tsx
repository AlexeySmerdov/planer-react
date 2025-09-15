import React from 'react';
import { Calendar, Home, Users, Clock, Settings, MoreHorizontal } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <div className="hidden lg:block fixed left-0 top-0 w-20 h-full bg-white shadow-lg z-10">
      <div className="p-4">
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mb-8">
          <Calendar className="w-4 h-4 text-white" />
        </div>
        
        <div className="space-y-4">
          <div className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer">
            <Home className="w-5 h-5" />
          </div>
          <div className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer">
            <Users className="w-4 h-4" />
          </div>
          <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center">
            <Calendar className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer">
            <Clock className="w-4 h-4" />
          </div>
          <div className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer">
            <Settings className="w-4 h-4" />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4">
        <div className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer">
          <MoreHorizontal className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
