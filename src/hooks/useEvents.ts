import { useState, useEffect } from 'react';
import { EventService, Event } from '../services/eventService';

export const useEvents = (userId?: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = async () => {
    if (!userId) {
      console.log('No userId provided, skipping event loading');
      setLoading(false);
      setEvents([]);
      return;
    }

    try {
      console.log('Loading events for user:', userId);
      setLoading(true);
      setError(null);
      const fetchedEvents = await EventService.getEvents(userId);
      console.log('Events loaded successfully:', fetchedEvents.length);
      setEvents(fetchedEvents);
    } catch (err: any) {
      console.error('Error loading events:', err);
      
      // More specific error handling
      let errorMessage = 'Произошла ошибка при загрузке событий';
      
      if (err.code === 'permission-denied') {
        errorMessage = 'Нет доступа к событиям. Проверьте настройки Firestore.';
      } else if (err.code === 'unavailable') {
        errorMessage = 'База данных временно недоступна. Попробуйте позже.';
      } else if (err.code === 'unauthenticated') {
        errorMessage = 'Требуется авторизация. Войдите в аккаунт.';
      } else if (err.code === 'failed-precondition') {
        errorMessage = 'Требуется создание индекса в базе данных. Обратитесь к администратору.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!userId) {
      throw new Error('Пользователь не авторизован');
    }

    try {
      console.log('Creating event:', eventData);
      setError(null);
      const eventId = await EventService.createEvent({ ...eventData, userId });
      console.log('Event created with ID:', eventId);
      await loadEvents(); // Refresh events list
      return eventId;
    } catch (err) {
      console.error('Error creating event:', err);
      setError(err instanceof Error ? err.message : 'Не удалось создать событие');
      throw err;
    }
  };

  const updateEvent = async (eventId: string, eventData: Partial<Event>) => {
    try {
      console.log('Updating event:', eventId, eventData);
      setError(null);
      await EventService.updateEvent(eventId, eventData);
      await loadEvents(); // Refresh events list
    } catch (err) {
      console.error('Error updating event:', err);
      setError(err instanceof Error ? err.message : 'Не удалось обновить событие');
      throw err;
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      console.log('Deleting event:', eventId);
      setError(null);
      await EventService.deleteEvent(eventId);
      await loadEvents(); // Refresh events list
    } catch (err) {
      console.error('Error deleting event:', err);
      setError(err instanceof Error ? err.message : 'Не удалось удалить событие');
      throw err;
    }
  };

  useEffect(() => {
    console.log('useEvents effect triggered, userId:', userId);
    if (userId) {
      loadEvents();
    } else {
      setLoading(false);
      setEvents([]);
    }
  }, [userId]);

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    refreshEvents: loadEvents
  };
};
