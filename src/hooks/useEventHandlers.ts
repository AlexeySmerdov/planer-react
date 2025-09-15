import { useAuth } from '../context/AuthContext';
import { useEvents } from './useEvents';
import { NewEventForm } from '../types/event';
import { getCategoryColor } from '../utils/eventHelpers';

interface UseEventHandlersProps {
  selectedEvent: any;
  setSelectedEvent: (event: any) => void;
  setIsEditModalOpen: (open: boolean) => void;
  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  setSelectedDuration: (duration: string) => void;
  setIsEventModalOpen: (open: boolean) => void;
  setConfirmModal: (modal: any) => void;
  showNotification: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
  newEvent: NewEventForm;
  setNewEvent: (event: NewEventForm) => void;
}

export const useEventHandlers = ({
  selectedEvent,
  setSelectedEvent,
  setIsEditModalOpen,
  setSelectedDate,
  setSelectedTime,
  setSelectedDuration,
  setIsEventModalOpen,
  setConfirmModal,
  showNotification,
  newEvent,
  setNewEvent
}: UseEventHandlersProps) => {
  const { currentUser } = useAuth();
  const { createEvent, updateEvent, deleteEvent } = useEvents(currentUser?.uid);

  const calculateDurationFromRange = (start: Date, end: Date): string => {
    const diffMs = end.getTime() - start.getTime();
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    
    if (diffMinutes <= 0) return '30 минут';
    
    if (diffMinutes < 60) {
      if (diffMinutes <= 15) return '15 минут';
      if (diffMinutes <= 30) return '30 минут';
      if (diffMinutes <= 45) return '45 минут';
      return '45 минут';
    }
    
    const hours = diffMinutes / 60;
    if (hours <= 1) return '1 час';
    if (hours <= 1.5) return '1.5 часа';
    if (hours <= 2) return '2 часа';
    if (hours <= 3) return '3 часа';
    if (hours <= 4) return '4 часа';
    
    if (diffMinutes >= 480) return 'Весь день';
    
    return `${Math.round(hours)} часа`;
  };

  const handleCreateEvent = async () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      showNotification('error', 'Ошибка валидации', 'Пожалуйста, заполните обязательные поля');
      return;
    }

    try {
      const colors = getCategoryColor(newEvent.category);
      const durationMinutes = parseInt(newEvent.duration.split(' ')[0]) * (newEvent.duration.includes('час') ? 60 : 1);
      
      const startDateTime = new Date(`${newEvent.date}T${newEvent.time}:00`);
      const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000);

      await createEvent({
        title: newEvent.title,
        description: newEvent.description,
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
        category: newEvent.category,
        participants: newEvent.participants,
        backgroundColor: colors.bg,
        borderColor: colors.border,
        userId: currentUser!.uid
      });

      setNewEvent({
        title: '',
        date: '',
        time: '',
        duration: '30 минут',
        category: 'work',
        description: '',
        participants: []
      });

      showNotification('success', 'Успешно!', 'Событие успешно создано');
    } catch (err) {
      console.error('Error creating event:', err);
      showNotification('error', 'Ошибка', 'Не удалось создать событие');
    }
  };

  const handleModalCreateEvent = async (eventData: NewEventForm) => {
    try {
      const colors = getCategoryColor(eventData.category);
      let durationMinutes = 30;
      
      if (eventData.duration === 'Весь день') {
        durationMinutes = 24 * 60;
      } else {
        const durationParts = eventData.duration.split(' ');
        const number = parseFloat(durationParts[0]);
        if (eventData.duration.includes('час')) {
          durationMinutes = number * 60;
        } else {
          durationMinutes = number;
        }
      }
      
      const startDateTime = new Date(`${eventData.date}T${eventData.time}:00`);
      const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000);

      await createEvent({
        title: eventData.title,
        description: eventData.description,
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
        category: eventData.category,
        participants: eventData.participants,
        backgroundColor: colors.bg,
        borderColor: colors.border,
        userId: currentUser!.uid
      });

      showNotification('success', 'Успешно!', 'Событие успешно создано');
    } catch (err) {
      console.error('Error creating event:', err);
      showNotification('error', 'Ошибка', 'Не удалось создать событие');
    }
  };

  const handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event;
    setSelectedEvent({
      id: event.id,
      title: event.title,
      description: event.extendedProps.description || '',
      start: event.start.toISOString(),
      end: event.end.toISOString(),
      category: event.extendedProps.category || 'work',
      participants: event.extendedProps.participants || [],
      backgroundColor: event.backgroundColor,
      borderColor: event.borderColor,
      userId: currentUser!.uid
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateEvent = async (eventData: any) => {
    if (selectedEvent) {
      try {
        const colors = getCategoryColor(eventData.category);
        await updateEvent(selectedEvent.id, {
          ...eventData,
          backgroundColor: colors.bg,
          borderColor: colors.border
        });
        showNotification('success', 'Обновлено', 'Событие успешно обновлено');
      } catch (err) {
        console.error('Error updating event:', err);
        showNotification('error', 'Ошибка', 'Не удалось обновить событие');
      }
    }
  };

  const handleDeleteFromEdit = () => {
    if (selectedEvent) {
      setConfirmModal({
        isOpen: true,
        type: 'delete',
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title
      });
      setIsEditModalOpen(false);
    }
  };

  const handleConfirmDelete = async (eventId?: string) => {
    if (eventId) {
      try {
        await deleteEvent(eventId);
        showNotification('success', 'Удалено', 'Событие успешно удалено');
      } catch (err) {
        console.error('Error deleting event:', err);
        showNotification('error', 'Ошибка', 'Не удалось удалить событие');
      }
    }
  };

  const handleDateSelect = async (selectInfo: any) => {
    const startDateTime = new Date(selectInfo.start);
    const endDateTime = new Date(selectInfo.end);
    
    const dateStr = startDateTime.toISOString().split('T')[0];
    const timeStr = startDateTime.toTimeString().slice(0, 5);
    
    const duration = calculateDurationFromRange(startDateTime, endDateTime);
    
    console.log('Date select - dateStr:', dateStr, 'timeStr:', timeStr, 'duration:', duration);
    
    setSelectedDate(dateStr);
    setSelectedTime(timeStr);
    setSelectedDuration(duration);
    setIsEventModalOpen(true);
    
    selectInfo.view.calendar.unselect();
  };

  const handleFloatingButtonClick = () => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().slice(0, 5);
    
    console.log('Floating button - dateStr:', dateStr, 'timeStr:', timeStr);
    
    setSelectedDate(dateStr);
    setSelectedTime(timeStr);
    setSelectedDuration('30 минут');
    setIsEventModalOpen(true);
  };

  return {
    handleCreateEvent,
    handleModalCreateEvent,
    handleEventClick,
    handleUpdateEvent,
    handleDeleteFromEdit,
    handleConfirmDelete,
    handleDateSelect,
    handleFloatingButtonClick
  };
};
