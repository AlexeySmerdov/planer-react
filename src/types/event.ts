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
  createdAt?: any;
  updatedAt?: any;
}

export interface NewEventForm {
  title: string;
  date: string;
  time: string;
  duration: string;
  category: 'work' | 'personal' | 'meeting' | 'other';
  description: string;
  participants: string[];
}
