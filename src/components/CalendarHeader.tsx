import React from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { UserProfile } from './UserProfile';

interface CalendarHeaderProps {
  currentView: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';
  onViewChange: (view: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSettingsClick?: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentView,
  onViewChange,
  searchQuery,
  onSearchChange,
  onSettingsClick
}) => {
  return (
    <>
      {/* Main Header - Hidden on mobile */}
      <div className="hidden lg:flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Календарь</h1>
          <p className="text-gray-500">Август 2024</p>
        </div>
        
        <UserProfile onSettingsClick={onSettingsClick} />
      </div>

      {/* Calendar Controls Header */}
      <div className="p-4 lg:p-6 border-b border-gray-100 mt-16 lg:mt-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6">
            {/* View Toggle */}
            <div className="bg-gray-100 rounded-xl p-1 flex w-full">
              <button
                onClick={() => onViewChange('timeGridDay')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'timeGridDay'
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                День
              </button>
              <button
                onClick={() => onViewChange('timeGridWeek')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'timeGridWeek'
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Неделя
              </button>
              <button
                onClick={() => onViewChange('dayGridMonth')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'dayGridMonth'
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Месяц
              </button>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between w-full">
              <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                <ChevronLeft className="w-4 h-4 text-gray-500" />
              </button>
              <button className="px-4 py-1 bg-indigo-500/10 rounded-lg text-sm font-medium text-indigo-500 mx-auto">
                Сегодня
              </button>
              <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск событий"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full lg:w-64 pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </>
  );
};