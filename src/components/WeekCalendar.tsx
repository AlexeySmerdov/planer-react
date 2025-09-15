import React, { useEffect, useRef } from 'react';
import { Event } from '../types/event';
import { formatEventTime } from '../utils/eventHelpers';

interface WeekCalendarProps {
  events: Event[];
  onDateClick: (date: string) => void;
  onEventsClick: (date: string, events: Event[]) => void;
}

export const WeekCalendar: React.FC<WeekCalendarProps> = ({
  events,
  onDateClick,
  onEventsClick
}) => {
  const today = new Date();
  const startOfWeek = new Date(today);
  
  // Исправляем логику вычисления начала недели
  const dayOfWeek = today.getDay();
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Понедельник = 0
  startOfWeek.setDate(today.getDate() - daysToSubtract);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const todayRef = useRef<HTMLDivElement>(null);

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.start.includes(dateStr));
  };

  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const dayEvents = getEventsForDate(date);
    
    console.log('Date clicked:', dateStr, 'Date object:', date);
    
    if (dayEvents.length > 0) {
      onEventsClick(dateStr, dayEvents);
    } else {
      onDateClick(dateStr);
    }
  };

  const handleEventClick = (event: Event, date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    onEventsClick(dateStr, [event]);
  };

  const handleAddEventClick = (date: Date, e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    const dateStr = date.toISOString().split('T')[0];
    console.log('Add event clicked for date:', dateStr, 'Original date object:', date);
    onDateClick(dateStr);
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const getDayName = (date: Date) => {
    return date.toLocaleDateString('ru-RU', { weekday: 'long' });
  };

  // Автоматическая прокрутка к текущему дню при монтировании компонента
  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="space-y-4">
        {weekDays.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          const hasEvents = dayEvents.length > 0;
          const isTodayDate = isToday(date);

          return (
            <div
              key={index}
              ref={isTodayDate ? todayRef : null}
              className={`
                border rounded-xl p-4 transition-all
                ${isTodayDate ? 'bg-indigo-50 border-indigo-200' : 'border-gray-200 hover:border-gray-300'}
              `}
            >
              {/* Заголовок дня */}
              <div 
                onClick={() => handleDateClick(date)}
                className="flex items-center justify-between mb-3 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    ${isTodayDate ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-800'}
                  `}>
                    {date.getDate()}
                  </div>
                  <div>
                    <h3 className={`
                      font-medium capitalize
                      ${isTodayDate ? 'text-indigo-600' : 'text-gray-800'}
                    `}>
                      {getDayName(date)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {hasEvents && (
                    <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
                      {dayEvents.length} событий
                    </span>
                  )}
                  <div 
                    onClick={(e) => handleAddEventClick(date, e)}
                    className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <span className="text-gray-500 text-sm">+</span>
                  </div>
                </div>
              </div>

              {/* События дня */}
              <div className="space-y-2">
                {dayEvents.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    onClick={() => handleEventClick(event, date)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    style={{ borderLeft: `4px solid ${event.backgroundColor}` }}
                  >
                    <div className="flex-shrink-0">
                      <div className="text-sm font-medium text-gray-800">
                        {formatEventTime(event.start)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {Math.round((new Date(event.end).getTime() - new Date(event.start).getTime()) / (1000 * 60))} мин
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 truncate">
                        {event.title}
                      </h4>
                      {event.description && (
                        <p className="text-sm text-gray-500 truncate">
                          {event.description}
                        </p>
                      )}
                    </div>

                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: event.backgroundColor }}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
