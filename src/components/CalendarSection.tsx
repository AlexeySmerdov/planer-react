import React from 'react';
import { Event } from '../types/event';
import { CalendarHeader } from './CalendarHeader';
import { CalendarWidget } from './CalendarWidget';

interface CalendarSectionProps {
  currentView: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';
  onViewChange: (view: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  events: Event[];
  onEventClick: (clickInfo: any) => void;
  onDateSelect: (selectInfo: any) => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  currentView,
  onViewChange,
  searchQuery,
  onSearchChange,
  events,
  onEventClick,
  onDateSelect
}) => {
  return (
    <>
      <CalendarHeader
        currentView={currentView}
        onViewChange={onViewChange}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      <CalendarWidget
        events={events}
        currentView={currentView}
        onEventClick={onEventClick}
        onDateSelect={onDateSelect}
        searchQuery={searchQuery}
      />
    </>
  );
};
