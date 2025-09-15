import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Event } from '../types/event';
import { formatEventTime, calculateDuration } from '../utils/eventHelpers';

interface UpcomingEventsProps {
  tomorrowEvents: Event[];
  dayAfterTomorrowEvents: Event[];
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ 
  tomorrowEvents, 
  dayAfterTomorrowEvents 
}) => {
  // Динамическое определение дат
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  // Функция для получения названия дня недели
  const getDayName = (date: Date) => {
    return date.toLocaleDateString('ru-RU', { weekday: 'long' });
  };

  // Функция для получения числа дня
  const getDayNumber = (date: Date) => {
    return date.getDate();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Предстоящие события</h2>
        <MoreHorizontal className="w-4 h-4 text-indigo-500" />
      </div>

      <div className="space-y-6">
        {/* Tomorrow */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="font-medium text-gray-800">{getDayNumber(tomorrow)}</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Завтра</h3>
                <p className="text-sm text-gray-500 capitalize">{getDayName(tomorrow)}</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">{tomorrowEvents.length} событий</span>
          </div>

          <div className="space-y-3 mt-4">
            {tomorrowEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-4">
                <span className="text-sm text-gray-500 w-12">
                  {formatEventTime(event.start)}
                </span>
                <div className="flex-1 bg-indigo-500/10 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-800">{event.title}</h4>
                  <p className="text-xs text-gray-500">
                    {calculateDuration(event.start, event.end)} минут
                  </p>
                </div>
              </div>
            ))}
            {tomorrowEvents.length === 0 && (
              <p className="text-gray-400 text-sm">Нет событий</p>
            )}
          </div>
        </div>

        {/* Day After Tomorrow */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="font-medium text-gray-800">{getDayNumber(dayAfterTomorrow)}</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Послезавтра</h3>
                <p className="text-sm text-gray-500 capitalize">{getDayName(dayAfterTomorrow)}</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">{dayAfterTomorrowEvents.length} событий</span>
          </div>

          <div className="space-y-3 mt-4">
            {dayAfterTomorrowEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-4">
                <span className="text-sm text-gray-500 w-12">
                  {formatEventTime(event.start)}
                </span>
                <div className="flex-1 bg-indigo-500/10 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-800">{event.title}</h4>
                  <p className="text-xs text-gray-500">
                    {calculateDuration(event.start, event.end)} минут
                  </p>
                </div>
              </div>
            ))}
            {dayAfterTomorrowEvents.length === 0 && (
              <p className="text-gray-400 text-sm">Нет событий</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
