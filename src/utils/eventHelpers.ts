export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'work': return { bg: '#6366f1', border: '#4f46e5' }
    case 'personal': return { bg: '#f97316', border: '#ea580c' }
    case 'meeting': return { bg: '#3b82f6', border: '#2563eb' }
    default: return { bg: '#6b7280', border: '#4b5563' }
  }
}

export const getTodayEvents = (events: any[]) => {
  const today = new Date();
  const todayStr = today.getFullYear() + '-' + 
    String(today.getMonth() + 1).padStart(2, '0') + '-' + 
    String(today.getDate()).padStart(2, '0');
  
  return events.filter(event => {
    const eventDate = new Date(event.start);
    const eventDateStr = eventDate.getFullYear() + '-' + 
      String(eventDate.getMonth() + 1).padStart(2, '0') + '-' + 
      String(eventDate.getDate()).padStart(2, '0');
    
    return eventDateStr === todayStr;
  });
}

export const getUpcomingEvents = (events: any[]) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const tomorrowStr = tomorrow.getFullYear() + '-' + 
    String(tomorrow.getMonth() + 1).padStart(2, '0') + '-' + 
    String(tomorrow.getDate()).padStart(2, '0');
  
  const dayAfterTomorrowStr = dayAfterTomorrow.getFullYear() + '-' + 
    String(dayAfterTomorrow.getMonth() + 1).padStart(2, '0') + '-' + 
    String(dayAfterTomorrow.getDate()).padStart(2, '0');

  return {
    tomorrow: events.filter(event => {
      const eventDate = new Date(event.start);
      const eventDateStr = eventDate.getFullYear() + '-' + 
        String(eventDate.getMonth() + 1).padStart(2, '0') + '-' + 
        String(eventDate.getDate()).padStart(2, '0');
      return eventDateStr === tomorrowStr;
    }),
    dayAfterTomorrow: events.filter(event => {
      const eventDate = new Date(event.start);
      const eventDateStr = eventDate.getFullYear() + '-' + 
        String(eventDate.getMonth() + 1).padStart(2, '0') + '-' + 
        String(eventDate.getDate()).padStart(2, '0');
      return eventDateStr === dayAfterTomorrowStr;
    })
  };
}

export const formatEventTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('ru-RU', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

export const calculateDuration = (start: string, end: string) => {
  return Math.round((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60));
}
