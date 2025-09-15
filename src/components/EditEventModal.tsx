import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, FileText, Tag, Trash2 } from 'lucide-react';
import { Event, NewEventForm } from '../types/event';

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (eventData: Partial<Event>) => void;
  onDelete: () => void;
  event: Event | null;
}

export const EditEventModal: React.FC<EditEventModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  event
}) => {
  const [formData, setFormData] = useState<NewEventForm>({
    title: '',
    date: '',
    time: '',
    duration: '30 минут',
    category: 'work',
    description: '',
    participants: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (event) {
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      const diffMinutes = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60));
      
      let duration = '30 минут';
      if (diffMinutes <= 15) duration = '15 минут';
      else if (diffMinutes <= 30) duration = '30 минут';
      else if (diffMinutes <= 45) duration = '45 минут';
      else if (diffMinutes <= 60) duration = '1 час';
      else if (diffMinutes <= 90) duration = '1.5 часа';
      else if (diffMinutes <= 120) duration = '2 часа';
      else if (diffMinutes <= 180) duration = '3 часа';
      else if (diffMinutes <= 240) duration = '4 часа';
      else duration = 'Весь день';

      setFormData({
        title: event.title,
        date: startDate.toISOString().split('T')[0],
        time: startDate.toTimeString().slice(0, 5),
        duration,
        category: event.category,
        description: event.description,
        participants: event.participants
      });
    }
  }, [event]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Название события обязательно';
    }
    if (!formData.date) {
      newErrors.date = 'Дата обязательна';
    }
    if (!formData.time) {
      newErrors.time = 'Время обязательно';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && event) {
      let durationMinutes = 30;
      
      if (formData.duration === 'Весь день') {
        durationMinutes = 24 * 60;
      } else {
        const durationParts = formData.duration.split(' ');
        const number = parseFloat(durationParts[0]);
        if (formData.duration.includes('час')) {
          durationMinutes = number * 60;
        } else {
          durationMinutes = number;
        }
      }
      
      const startDateTime = new Date(`${formData.date}T${formData.time}:00`);
      const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000);

      onUpdate({
        title: formData.title,
        description: formData.description,
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
        category: formData.category,
        participants: formData.participants
      });
      
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      duration: '30 минут',
      category: 'work',
      description: '',
      participants: []
    });
    setErrors({});
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  const categoryOptions = [
    { value: 'work', label: 'Работа', color: 'bg-blue-500' },
    { value: 'personal', label: 'Личное', color: 'bg-green-500' },
    { value: 'meeting', label: 'Встреча', color: 'bg-purple-500' },
    { value: 'other', label: 'Другое', color: 'bg-gray-500' }
  ];

  const durationOptions = [
    '15 минут',
    '30 минут',
    '45 минут',
    '1 час',
    '1.5 часа',
    '2 часа',
    '3 часа',
    '4 часа',
    'Весь день'
  ];

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Редактировать событие</h2>
                <p className="text-white/80 text-sm">Измените детали события</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4" />
                Название события *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Введите название события"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4" />
                  Дата *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                    errors.date ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4" />
                  Время *
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                    errors.time ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.time && (
                  <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                )}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4" />
                Продолжительность
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                {durationOptions.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Tag className="w-4 h-4" />
                Категория
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categoryOptions.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: category.value as any })}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                      formData.category === category.value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4" />
                Описание
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Добавьте описание события (необязательно)"
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Participants */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <User className="w-4 h-4" />
                Участники
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">Я</span>
                  </div>
                  <span className="text-sm text-gray-600">Вы (организатор)</span>
                </div>
                <button
                  type="button"
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <span className="text-gray-500 text-lg">+</span>
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Удалить
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              Сохранить изменения
            </button>
          </div>
        </form>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-500/5 to-transparent rounded-full translate-y-12 -translate-x-12 pointer-events-none"></div>
      </div>
    </div>
  );
};