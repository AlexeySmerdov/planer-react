import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Event } from '../types/event';
import { formatEventTime } from '../utils/eventHelpers';

interface TodayEventsProps {
  events: Event[];
}

export const TodayEvents: React.FC<TodayEventsProps> = ({ events }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">События сегодня</h2>
        <MoreHorizontal className="w-4 h-4 text-indigo-500" />
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-gray-50 rounded-xl p-4">
            <div className="w-2 h-2 rounded-full mb-3" style={{ backgroundColor: event.backgroundColor }}></div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-gray-800">{event.title}</h3>
              <span className="px-2 py-1 text-xs rounded-full" style={{ 
                backgroundColor: `${event.backgroundColor}20`, 
                color: event.backgroundColor 
              }}>
                {formatEventTime(event.start)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-3">{event.description}</p>
            {event.participants.length > 0 && (
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {event.participants.slice(0, 3).map((_, index) => (
                    <div key={index} className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white overflow-hidden">
                      <img src="https://placehold.co/20x20" alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                {event.participants.length > 3 && (
                  <span className="ml-2 text-xs text-gray-500">+{event.participants.length - 3} участника</span>
                )}
              </div>
            )}
          </div>
        ))}
        {events.length === 0 && (
          <p className="text-gray-400 text-center py-8">Нет событий на сегодня</p>
        )}
      </div>
    </div>
  );
};
