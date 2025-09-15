import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

interface NotificationToastProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type,
  duration = 4000
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          iconColor: 'text-green-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'error':
        return {
          icon: AlertCircle,
          iconColor: 'text-red-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      case 'info':
        return {
          icon: Info,
          iconColor: 'text-blue-500',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
    }
  };

  if (!isOpen) return null;

  const styles = getTypeStyles();
  const IconComponent = styles.icon;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`${styles.bgColor} ${styles.borderColor} border rounded-xl shadow-lg p-4 min-w-80 transform transition-all duration-300 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="flex items-start gap-3">
          <IconComponent className={`w-5 h-5 ${styles.iconColor} mt-0.5 flex-shrink-0`} />
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 mb-1">{title}</h4>
            <p className="text-sm text-gray-600">{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="w-6 h-6 bg-white/50 rounded-lg flex items-center justify-center hover:bg-white/70 transition-colors flex-shrink-0"
          >
            <X className="w-3 h-3 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
