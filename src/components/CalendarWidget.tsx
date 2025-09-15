import React, { useState, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Event } from '../types/event';
import { WeekCalendar } from './WeekCalendar';
import { MonthCalendar } from './MonthCalendar';
import { EventListModal } from './EventListModal';

interface CalendarWidgetProps {
  events: Event[];
  currentView: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';
  onEventClick: (clickInfo: any) => void;
  onDateSelect: (selectInfo: any) => void;
  searchQuery?: string;
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  events,
  currentView,
  onEventClick,
  onDateSelect,
  searchQuery = ''
}) => {
  const [eventListModal, setEventListModal] = useState<{
    isOpen: boolean;
    date: string;
    events: Event[];
  }>({
    isOpen: false,
    date: '',
    events: []
  });

  // Фильтрация событий по поисковому запросу
  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) {
      return events;
    }

    const query = searchQuery.toLowerCase().trim();
    return events.filter(event => 
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query)
    );
  }, [events, searchQuery]);

  const handleDateClick = (date: string) => {
    console.log('CalendarWidget handleDateClick - received date:', date);
    
    // Создаем объект для совместимости с существующим API
    const selectInfo = {
      start: new Date(date + 'T09:00:00'),
      end: new Date(date + 'T09:30:00'),
      view: { calendar: { unselect: () => {} } }
    };
    
    console.log('CalendarWidget handleDateClick - created selectInfo:', selectInfo);
    onDateSelect(selectInfo);
  };

  const handleEventsClick = (date: string, dayEvents: Event[]) => {
    setEventListModal({
      isOpen: true,
      date,
      events: dayEvents
    });
  };

  const handleEditEvent = (event: Event) => {
    setEventListModal({ isOpen: false, date: '', events: [] });
    // Создаем объект для совместимости с существующим API
    const clickInfo = {
      event: {
        id: event.id,
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
        backgroundColor: event.backgroundColor,
        borderColor: event.borderColor,
        extendedProps: {
          description: event.description,
          category: event.category,
          participants: event.participants
        }
      }
    };
    onEventClick(clickInfo);
  };

  const handleCreateEventFromModal = (date: string) => {
    console.log('CalendarWidget handleCreateEventFromModal - received date:', date);
    
    // Создаем объект для совместимости с существующим API
    const selectInfo = {
      start: new Date(date + 'T09:00:00'),
      end: new Date(date + 'T09:30:00'),
      view: { calendar: { unselect: () => {} } }
    };
    
    console.log('CalendarWidget handleCreateEventFromModal - created selectInfo:', selectInfo);
    onDateSelect(selectInfo);
  };

  const renderCalendarView = () => {
    switch (currentView) {
      case 'timeGridWeek':
        return (
          <WeekCalendar
            events={filteredEvents}
            onDateClick={handleDateClick}
            onEventsClick={handleEventsClick}
          />
        );
      case 'dayGridMonth':
        return (
          <MonthCalendar
            events={filteredEvents}
            onDateClick={handleDateClick}
            onEventsClick={handleEventsClick}
          />
        );
      case 'timeGridDay':
      default:
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                headerToolbar={false}
                initialView={currentView}
                events={filteredEvents}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                select={onDateSelect}
                eventClick={onEventClick}
                height="600px"
                locale="ru"
                slotMinTime="08:00:00"
                slotMaxTime="20:00:00"
                allDaySlot={false}
                nowIndicator={true}
                eventDisplay="block"
                dayHeaderFormat={{ weekday: 'long', day: 'numeric' }}
                slotLabelFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                }}
                eventTimeFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                }}
                businessHours={{
                  daysOfWeek: [1, 2, 3, 4, 5],
                  startTime: '09:00',
                  endTime: '18:00',
                }}
                eventClassNames="rounded-lg shadow-sm"
                dayCellClassNames="hover:bg-gray-50 transition-colors"
                slotLabelClassNames="text-gray-500 text-sm"
                dayHeaderClassNames="text-gray-800 font-medium py-4"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div className="mb-8">
        {renderCalendarView()}
      </div>

      <EventListModal
        isOpen={eventListModal.isOpen}
        onClose={() => setEventListModal({ isOpen: false, date: '', events: [] })}
        date={eventListModal.date}
        events={eventListModal.events}
        onEditEvent={handleEditEvent}
        onCreateEvent={handleCreateEventFromModal}
      />
    </>
  );
};
