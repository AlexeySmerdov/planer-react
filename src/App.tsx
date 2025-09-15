import React from 'react';
import { useAuth } from './context/AuthContext';
import { useEvents } from './hooks/useEvents';
import { useAppState } from './hooks/useAppState';
import { useEventHandlers } from './hooks/useEventHandlers';
import { getTodayEvents, getUpcomingEvents } from './utils/eventHelpers';
import { AppLayout } from './components/AppLayout';
import { CalendarSection } from './components/CalendarSection';
import { EventsSection } from './components/EventsSection';
import { ModalsSection } from './components/ModalsSection';
import { FloatingActionButton } from './components/FloatingActionButton';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { SettingsPage } from './components/SettingsPage';

function App() {
  const { currentUser, loading: authLoading } = useAuth();
  const {
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
  } = useAppState();

  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const { events, loading, error } = useEvents(currentUser?.uid);

  const showNotification = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    setNotification({
      isOpen: true,
      type,
      title,
      message
    });
  };

  const {
    handleCreateEvent,
    handleModalCreateEvent,
    handleEventClick,
    handleUpdateEvent,
    handleDeleteFromEdit,
    handleConfirmDelete,
    handleDateSelect,
    handleFloatingButtonClick
  } = useEventHandlers({
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
  });

  // Show loading while checking auth state
  if (authLoading) {
    return <LoadingState />;
  }

  // Show loading while fetching events
  if (loading) {
    return <LoadingState />;
  }

  // Show error state
  if (error) {
    return <ErrorState error={error} />;
  }

  const todayEvents = getTodayEvents(events);
  const upcomingEvents = getUpcomingEvents(events);

  // Show settings page if open
  if (isSettingsOpen) {
    return <SettingsPage onBack={() => setIsSettingsOpen(false)} />;
  }

  return (
    <AppLayout onSettingsClick={() => setIsSettingsOpen(true)}>
      <CalendarSection
        currentView={currentView}
        onViewChange={setCurrentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        events={events}
        onEventClick={handleEventClick}
        onDateSelect={handleDateSelect}
        onSettingsClick={() => setIsSettingsOpen(true)}
      />

      <EventsSection
        todayEvents={todayEvents}
        tomorrowEvents={upcomingEvents.tomorrow}
        dayAfterTomorrowEvents={upcomingEvents.dayAfterTomorrow}
        newEvent={newEvent}
        onEventChange={setNewEvent}
        onCreateEvent={handleCreateEvent}
      />

      <FloatingActionButton onClick={handleFloatingButtonClick} />
      <PWAInstallPrompt />

      <ModalsSection
        currentUser={currentUser}
        isEventModalOpen={isEventModalOpen}
        setIsEventModalOpen={setIsEventModalOpen}
        onModalCreateEvent={handleModalCreateEvent}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedDuration={selectedDuration}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        onUpdateEvent={handleUpdateEvent}
        onDeleteFromEdit={handleDeleteFromEdit}
        selectedEvent={selectedEvent}
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
        onConfirmDelete={handleConfirmDelete}
        notification={notification}
        setNotification={setNotification}
      />
    </AppLayout>
  );
}

export default App;
