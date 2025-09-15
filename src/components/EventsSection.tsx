import React from 'react';
import { Event, NewEventForm } from '../types/event';
import { TodayEvents } from './TodayEvents';
import { UpcomingEvents } from './UpcomingEvents';
import { AddEventForm } from './AddEventForm';

interface EventsSectionProps {
  todayEvents: Event[];
  tomorrowEvents: Event[];
  dayAfterTomorrowEvents: Event[];
  newEvent: NewEventForm;
  onEventChange: (event: NewEventForm) => void;
  onCreateEvent: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  todayEvents,
  tomorrowEvents,
  dayAfterTomorrowEvents,
  newEvent,
  onEventChange,
  onCreateEvent
}) => {
  return (
    <div className="space-y-6 lg:space-y-8">
      <TodayEvents events={todayEvents} />
      <UpcomingEvents 
        tomorrowEvents={tomorrowEvents}
        dayAfterTomorrowEvents={dayAfterTomorrowEvents}
      />
      <div className="hidden lg:block">
        <AddEventForm
          newEvent={newEvent}
          onEventChange={onEventChange}
          onCreateEvent={onCreateEvent}
        />
      </div>
    </div>
  );
};
