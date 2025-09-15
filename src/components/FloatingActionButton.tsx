import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick?: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
    >
      <Plus className="w-5 h-5 text-white" />
    </button>
  );
};