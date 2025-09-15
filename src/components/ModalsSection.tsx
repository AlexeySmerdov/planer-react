import React from 'react';
import { Event, NewEventForm } from '../types/event';
import { EventModal } from './EventModal';
import { EditEventModal } from './EditEventModal';
import { ConfirmationModal } from './ConfirmationModal';
import { NotificationToast } from './NotificationToast';
import { LoginModal } from './auth/LoginModal';

interface ModalsSectionProps {
  currentUser: any;
  isEventModalOpen: boolean;
  setIsEventModalOpen: (open: boolean) => void;
  onModalCreateEvent: (eventData: NewEventForm) => void;
  selectedDate: string;
  selectedTime: string;
  selectedDuration: string;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  onUpdateEvent: (eventData: any) => void;
  onDeleteFromEdit: () => void;
  selectedEvent: Event | null;
  confirmModal: {
    isOpen: boolean;
    type: 'delete' | null;
    eventId?: string;
    eventTitle?: string;
  };
  setConfirmModal: (modal: any) => void;
  onConfirmDelete: (eventId?: string) => void;
  notification: {
    isOpen: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  };
  setNotification: (notification: any) => void;
}

export const ModalsSection: React.FC<ModalsSectionProps> = ({
  currentUser,
  isEventModalOpen,
  setIsEventModalOpen,
  onModalCreateEvent,
  selectedDate,
  selectedTime,
  selectedDuration,
  isEditModalOpen,
  setIsEditModalOpen,
  onUpdateEvent,
  onDeleteFromEdit,
  selectedEvent,
  confirmModal,
  setConfirmModal,
  onConfirmDelete,
  notification,
  setNotification
}) => {
  return (
    <>
      {!currentUser && <LoginModal isOpen={true} />}

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSubmit={onModalCreateEvent}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedDuration={selectedDuration}
      />

      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={onUpdateEvent}
        onDelete={onDeleteFromEdit}
        event={selectedEvent}
      />

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, type: null })}
        onConfirm={() => onConfirmDelete(confirmModal.eventId)}
        title="Удалить событие"
        message={`Вы уверены, что хотите удалить событие "${confirmModal.eventTitle}"? Это действие нельзя отменить.`}
        type="danger"
        confirmText="Удалить"
        cancelText="Отмена"
      />

      <NotificationToast
        isOpen={notification.isOpen}
        onClose={() => setNotification({ ...notification, isOpen: false })}
        title={notification.title}
        message={notification.message}
        type={notification.type}
      />
    </>
  );
};
