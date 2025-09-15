import { useState } from 'react';
import { NewEventForm } from '../types/event';

export const useAppState = () => {
  const [currentView, setCurrentView] = useState<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'>('timeGridDay');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
