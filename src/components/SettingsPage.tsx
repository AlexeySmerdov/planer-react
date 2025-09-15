import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

type CalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';

interface ViewOption {
  id: CalendarView;
  name: string;
  description: string;
}

const viewOptions: ViewOption[] = [
  {
    id: 'timeGridDay',
    name: 'День',
    description: 'Подробный вид на один день с временными слотами'
  },
  {
    id: 'timeGridWeek',
    name: 'Неделя',
    description: 'Отображение недели с событиями по дням'
  },
  {
    id: 'dayGridMonth',
    name: 'Месяц',
    description: 'Месячный календарь с обзором всех событий'
  }
];

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const [defaultView, setDefaultView] = useState<CalendarView>('timeGridDay');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Загружаем сохраненное значение из localStorage
    const savedView = localStorage.getItem('defaultCalendarView') as CalendarView;
    if (savedView && viewOptions.some(option => option.id === savedView)) {
      setDefaultView(savedView);
    }
  }, []);

  const handleViewChange = (viewId: CalendarView) => {
    if (viewId !== defaultView) {
      setDefaultView(viewId);
      setHasChanges(true);
    }
  };

  const handleSave = () => {
    localStorage.setItem('defaultCalendarView', defaultView);
    setHasChanges(false);
    
    // Уведомление о сохранении
    const event = new CustomEvent('settingsSaved', {
      detail: { type: 'success', message: 'Настройки сохранены' }
    });
    window.dispatchEvent(event);
  };

  const handleReset = () => {
    const originalView = localStorage.getItem('defaultCalendarView') as CalendarView || 'timeGridDay';
    setDefaultView(originalView);
    setHasChanges(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Настройки</h1>
              <p className="text-sm text-gray-500">Персонализация приложения</p>
            </div>
          </div>
          
          {hasChanges && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Отменить
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Сохранить
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-2xl mx-auto">
        {/* Default View Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Вид календаря по умолчанию
            </h2>
            <p className="text-gray-600 text-sm">
              Выберите, какой вид календаря будет отображаться при открытии приложения
            </p>
          </div>

          <div className="space-y-3">
            {viewOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleViewChange(option.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  defaultView === option.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          defaultView === option.id
                            ? 'border-indigo-500 bg-indigo-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {defaultView === option.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <div>
                        <h3 className={`font-medium ${
                          defaultView === option.id ? 'text-indigo-900' : 'text-gray-800'
                        }`}>
                          {option.name}
                        </h3>
                        <p className={`text-sm ${
                          defaultView === option.id ? 'text-indigo-700' : 'text-gray-500'
                        }`}>
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {defaultView === option.id && (
                    <Check className="w-5 h-5 text-indigo-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Settings Sections */}
        <div className="space-y-6">
          {/* Placeholder for future settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Больше настроек скоро
              </h3>
              <p className="text-gray-500 text-sm">
                В следующих обновлениях добавим уведомления, темы оформления и другие настройки
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};