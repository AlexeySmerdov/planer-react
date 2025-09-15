import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db, auth } from '../config/firebase';

export interface Event {
  id?: string;
  title: string;
  description: string;
  start: string;
  end: string;
  category: 'work' | 'personal' | 'meeting' | 'other';
  participants: string[];
  backgroundColor: string;
  borderColor: string;
  userId: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const EVENTS_COLLECTION = 'events';

export class EventService {
  static async createEvent(eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      if (!eventData.userId) {
        throw new Error('userId is required');
      }

      console.log('Creating event with data:', eventData);
      console.log('Current user:', auth.currentUser);

      const docRef = await addDoc(collection(db, EVENTS_COLLECTION), {
        ...eventData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      
      console.log('Event created successfully with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error('Не удалось создать событие');
    }
  }

  static async getEvents(userId: string): Promise<Event[]> {
    try {
      if (!userId) {
        throw new Error('userId is required');
      }

      console.log('Fetching events for userId:', userId);
      console.log('Current user:', auth.currentUser);
      console.log('Auth state:', {
        uid: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        isAnonymous: auth.currentUser?.isAnonymous
      });

      // Пробуем простой запрос без сортировки
      const simpleQuery = query(
        collection(db, EVENTS_COLLECTION),
        where('userId', '==', userId)
      );

      console.log('Executing simple query...');
      const querySnapshot = await getDocs(simpleQuery);
      
      console.log('Query executed successfully, found', querySnapshot.size, 'documents');

      const events = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Event document:', doc.id, data);
        return {
          id: doc.id,
          ...data
        } as Event;
      });
      
      // Сортируем на клиенте
      const sortedEvents = events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
      console.log('Events sorted successfully:', sortedEvents.length);
      
      return sortedEvents;
    } catch (error) {
      console.error('Error fetching events:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      throw new Error('Не удалось загрузить события');
    }
  }

  static async updateEvent(eventId: string, eventData: Partial<Event>): Promise<void> {
    try {
      console.log('Updating event:', eventId, eventData);
      const eventRef = doc(db, EVENTS_COLLECTION, eventId);
      await updateDoc(eventRef, {
        ...eventData,
        updatedAt: Timestamp.now()
      });
      console.log('Event updated successfully');
    } catch (error) {
      console.error('Error updating event:', error);
      throw new Error('Не удалось обновить событие');
    }
  }

  static async deleteEvent(eventId: string): Promise<void> {
    try {
      console.log('Deleting event:', eventId);
      await deleteDoc(doc(db, EVENTS_COLLECTION, eventId));
      console.log('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
      throw new Error('Не удалось удалить событие');
    }
  }

  static async getEventsByDateRange(startDate: string, endDate: string, userId: string): Promise<Event[]> {
    try {
      if (!userId) {
        throw new Error('userId is required');
      }

      const q = query(
        collection(db, EVENTS_COLLECTION),
        where('userId', '==', userId),
        where('start', '>=', startDate),
        where('start', '<=', endDate)
      );

      const querySnapshot = await getDocs(q);
      const events = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Event));
      
      return events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    } catch (error) {
      console.error('Error fetching events by date range:', error);
      throw new Error('Не удалось загрузить события за период');
    }
  }
}
