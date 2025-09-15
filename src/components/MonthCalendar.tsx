import React from 'react';
import { Event } from '../types/event';

interface MonthCalendarProps {
  events: Event[];
  onDateClick: (date: string) => void;
  onEventsClick: (date: string, events: Event[]) => void;
}

export const MonthCalendar: React.FC<MonthCalendarProps> = ({
  events,
  onDateClick,
  onEventsClick
}) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Первый день месяца
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  // Последний день месяца
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  
  // Начинаем с понедельника предыдущей недели
  const startDate = new Date(firstDayOfMonth);
  const dayOfWeek = firstDayOfMonth.getDay();
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startDate.setDate(firstDayOfMonth.getDate() - daysToSubtract);

  // Создаем массив всех дней для отображения (6 недель)
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.start.includes(dateStr));
  };

  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const dayEvents = getEventsForDate(date);
    
    if (dayEvents.length > 0) {
      onEventsClick(dateStr, dayEvents);
    } else {
      onDateClick(dateStr);
    }
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth;
  };

  const renderEventDots = (dayEvents: Event[]) => {
    const maxDots = 4;
    const dotsToShow = dayEvents.slice(0, maxDots);
    
    // Позиции точек: слева снизу, слева сверху, справа сверху, справа снизу
    const positions = [
      'bottom-1 left-1',   // слева снизу
      'top-1 left-1',      // слева сверху  
      'top-1 right-1',     // справа сверху
      'bottom-1 right-1'   // справа снизу
    ];

    return dotsToShow.map((event, index) => (
      <div
        key={index}
        className={`absolute w-1 h-1 rounded-full ${positions[index]}`}
        style={{ backgroundColor: event.backgroundColor }}
      />
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Заголовок месяца */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {today.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
        </h2>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* Заголовки дней недели */}
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}

        {/* Дни месяца */}
        {calendarDays.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          const hasEvents = dayEvents.length > 0;
          const isCurrentMonthDay = isCurrentMonth(date);

          return (
            <div
              key={index}
              onClick={() => handleDateClick(date)}
              className={`
                relative aspect-square p-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50
                ${isToday(date) ? 'bg-indigo-50 border-2 border-indigo-200' : 'border border-gray-100'}
                ${!isCurrentMonthDay ? 'opacity-40' : ''}
              `}
            >
              <div className="h-full flex flex-col items-center justify-center">
                <div className={`
                  text-sm font-medium
                  ${isToday(date) ? 'text-indigo-600' : isCurrentMonthDay ? 'text-gray-800' : 'text-gray-400'}
                `}>
                  {date.getDate()}
                </div>
                
                {/* Точки событий в углах */}
                {hasEvents && renderEventDots(dayEvents)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};