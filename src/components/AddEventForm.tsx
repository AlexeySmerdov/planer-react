import React from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import { NewEventForm } from '../types/event';

interface AddEventFormProps {
  newEvent: NewEventForm;
  onEventChange: (event: NewEventForm) => void;
  onCreateEvent: () => void;
}

export const AddEventForm: React.FC<AddEventFormProps> = ({
  newEvent,
  onEventChange,
  onCreateEvent
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Добавить событие</h2>

      <div className="space-y-6">
        {/* Event Name */}
        <div>
          <label className="block text-sm text-gray-500 mb-2">Название события</label>
          <input
            type="text"
            placeholder="Введите название"
            value={newEvent.title}
            onChange={(e) => onEventChange({ ...newEvent, title: e.target.value })}
            className="w-full px-4 py-3 bg-gray-100 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-2">Дата</label>
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => onEventChange({ ...newEvent, date: e.target.value })}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-2">Время</label>
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => onEventChange({ ...newEvent, time: e.target.value })}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm text-gray-500 mb-2">Продолжительность</label>
          <select
            value={newEvent.duration}
            onChange={(e) => onEventChange({ ...newEvent, duration: e.target.value })}
            className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>15 минут</option>
            <option>30 минут</option>
            <option>1 час</option>
            <option>1.5 часа</option>
            <option>2 часа</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm text-gray-500 mb-2">Категория</label>
          <div className="flex gap-2 flex-wrap">
            {(['work', 'personal', 'meeting', 'other'] as const).map((category) => (
              <button
                key={category}
                onClick={() => onEventChange({ ...newEvent, category })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  newEvent.category === category
                    ? 'bg-indigo-500/10 text-indigo-500'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {category === 'work' ? 'Работа' :
                 category === 'personal' ? 'Личное' :
                 category === 'meeting' ? 'Встреча' : 'Другое'}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-500 mb-2">Описание</label>
          <textarea
            placeholder="Введите описание события"
            value={newEvent.description}
            onChange={(e) => onEventChange({ ...newEvent, description: e.target.value })}
            className="w-full px-4 py-3 bg-gray-100 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-20"
          />
        </div>

        {/* Participants */}
        <div>
          <label className="block text-sm text-gray-500 mb-2">Участники</label>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
              <img src="https://placehold.co/28x28" alt="" className="w-full h-full object-cover" />
            </div>
            <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Plus className="w-3 h-3 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCreateEvent}
            disabled={!newEvent.title || !newEvent.date || !newEvent.time}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Создать событие
          </button>
          <button className="w-12 h-12 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors">
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
