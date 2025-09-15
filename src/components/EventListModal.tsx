import React from 'react';
import { X, Calendar, Clock, Edit3, Plus } from 'lucide-react';
import { Event } from '../types/event';
import { formatEventTime, calculateDuration } from '../utils/eventHelpers';

interface EventListModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  events: Event[];
  onEditEvent: (event: Event) => void;
  onCreateEvent?: (date: string) => void;
}

export const EventListModal: React.FC<EventListModalProps> = ({
  isOpen,
  onClose,
  date,
  events,
  onEditEvent,
  onCreateEvent
}) => {
  if (!isOpen) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'work': return 'Работа';
      case 'personal': return 'Личное';
      case 'meeting': return 'Встреча';
      default: return 'Другое';
    }
  };

  const handleCreateEvent = () => {
    if (onCreateEvent) {
      onCreateEvent(date);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">События дня</h2>
                <p className="text-white/80 text-sm">{formatDate(date)}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Events List */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-200px)]">
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: event.backgroundColor }}
                    />
                    <div>
                      <h3 className="font-medium text-gray-800">{event.title}</h3>
                      <p className="text-sm text-gray-500">
                        {getCategoryLabel(event.category)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onEditEvent(event)}
                    className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Edit3 className="w-3 h-3 text-gray-500" />
                  </button>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatEventTime(event.start)}</span>
                  </div>
                  <span>•</span>
                  <span>{calculateDuration(event.start, event.end)} мин</span>
                </div>

                {event.description && (
                  <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                )}

                {event.participants.length > 0 && (
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex -space-x-2">
                      {event.participants.slice(0, 3).map((_, index) => (
                        <div key={index} className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white" />
                      ))}
                    </div>
                    {event.participants.length > 3 && (
                      <span className="text-xs text-gray-500">+{event.participants.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 space-y-3">
          {onCreateEvent && (
            <button
              onClick={handleCreateEvent}
              className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Добавить событие
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
