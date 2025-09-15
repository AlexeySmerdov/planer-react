import { useState, useEffect } from 'react';
import { NewEventForm } from '../types/event';

export const useAppState = () => {
  // Load default view from localStorage
  const getDefaultView = (): 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' => {
    const saved = localStorage.getItem('defaultCalendarView');
    if (saved && ['dayGridMonth', 'timeGridWeek', 'timeGridDay'].includes(saved)) {
      return saved as 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';
    }
    return 'timeGridDay'; // Default fallback
  };

  const [currentView, setCurrentView] = useState<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'>(getDefaultView());
  const [searchQuery, setSearchQuery] = useState('');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('30 минут');
  const [newEvent, setNewEvent] = useState<NewEventForm>({
    title: '',
    date: '',
    time: '',
    duration: '30 минут',
    category: 'work',
    description: '',
    participants: []
  });

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'delete' | null;
    eventId?: string;
    eventTitle?: string;
  }>({
    isOpen: false,
    type: null
  });

  const [notification, setNotification] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  });

  // Listen for settings changes
  useEffect(() => {
    const handleSettingsSaved = (event: CustomEvent) => {
      if (event.detail.type === 'success') {
        setNotification({
          isOpen: true,
          type: 'success',
          title: 'Настройки сохранены',
          message: event.detail.message || 'Изменения успешно применены'
        });
        
        // Reload default view
        const newDefaultView = getDefaultView();
        setCurrentView(newDefaultView);
      }
    };

    window.addEventListener('settingsSaved', handleSettingsSaved as EventListener);
    
    return () => {
      window.removeEventListener('settingsSaved', handleSettingsSaved as EventListener);
    };
  }, []);

  return {
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    isEventModalOpen,
    setIsEventModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedEvent,
    setSelectedEvent,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    selectedDuration,
    setSelectedDuration,
    newEvent,
    setNewEvent,
    confirmModal,
    setConfirmModal,
    notification,
    setNotification
  };
};
