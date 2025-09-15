import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Share, Plus, MoreVertical } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

export const PWAInstallPrompt: React.FC = () => {
  const { isInstallable, installPWA, platform } = usePWA();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAutoPrompt, setShowAutoPrompt] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Определяем мобильное устройство
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isTouchDevice = 'ontouchstart' in window;
      const isSmallScreen = window.innerWidth <= 768;
      const isMobileResult = isMobileDevice || (isTouchDevice && isSmallScreen);
      setIsMobile(isMobileResult);
      
      // Для мобильных устройств показываем автоматический промпт
      if (isMobileResult && isInstallable) {
        // Проверяем, не показывали ли уже промпт в этой сессии
        const hasShownPrompt = sessionStorage.getItem('pwa-prompt-shown');
        if (!hasShownPrompt) {
          setTimeout(() => {
            setShowAutoPrompt(true);
            setIsVisible(true);
            sessionStorage.setItem('pwa-prompt-shown', 'true');
          }, 3000); // Показываем через 3 секунды
        }
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isInstallable]);

  // Не показываем промпт если уже установлено или не установимо
  if (!isInstallable || !isVisible) return null;

  const handleInstall = async () => {
    try {
      const result = await installPWA();
      if (result === 'manual') {
        setShowInstructions(true);
      } else {
        setIsVisible(false);
        setShowAutoPrompt(false);
      }
    } catch (error) {
      console.error('Install error:', error);
      setShowInstructions(true);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setShowAutoPrompt(false);
    setShowInstructions(false);
    // Запоминаем, что пользователь закрыл промпт
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  // Проверяем, не отклонял ли пользователь промпт недавно (в течение дня)
  const dismissedTime = localStorage.getItem('pwa-prompt-dismissed');
  if (dismissedTime) {
    const dayInMs = 24 * 60 * 60 * 1000;
    if (Date.now() - parseInt(dismissedTime) < dayInMs) {
      return null;
    }
  }

  const getInstallInstructions = () => {
    switch (platform) {
      case 'ios':
        return {
          title: 'Установка на iPhone/iPad',
          steps: [
            { icon: Share, text: 'Нажмите кнопку "Поделиться" внизу экрана' },
            { icon: Plus, text: 'Выберите "На экран Домой"' },
            { icon: Smartphone, text: 'Нажмите "Добавить" для установки' }
          ]
        };
      case 'android':
        return {
          title: 'Установка на Android',
          steps: [
            { icon: MoreVertical, text: 'Нажмите меню браузера (⋮)' },
            { icon: Download, text: 'Выберите "Установить приложение" или "Добавить на главный экран"' },
            { icon: Smartphone, text: 'Подтвердите установку' }
          ]
        };
      default:
        return {
          title: 'Установка в браузере',
          steps: [
            { icon: Download, text: 'Найдите иконку установки в адресной строке' },
            { icon: Smartphone, text: 'Нажмите "Установить" в появившемся окне' }
          ]
        };
    }
  };

  const instructions = getInstallInstructions();

  return (
    <>
      {/* Overlay для мобильного автоматического промпта */}
      {showAutoPrompt && isMobile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50 p-4">
          <div className="bg-white rounded-t-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 animate-slide-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-6 text-white rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Установить приложение</h2>
                    <p className="text-white/80 text-sm">Быстрый доступ с главного экрана</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {!showInstructions ? (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Добавьте Планировщик на главный экран
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Получите быстрый доступ к календарю событий прямо с главного экрана вашего устройства
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Работает без интернета</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Быстрый запуск с главного экрана</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Полноэкранный режим</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={handleInstall}
                      className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Установить приложение
                    </button>
                    <button
                      onClick={handleClose}
                      className="w-full text-gray-500 py-2 text-sm hover:text-gray-700 transition-colors"
                    >
                      Может быть позже
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Installation Instructions */}
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {instructions.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Следуйте инструкциям для установки приложения
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    {instructions.steps.map((step, index) => {
                      const IconComponent = step.icon;
                      return (
                        <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-4 h-4 text-indigo-600" />
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-800">{step.text}</span>
                          </div>
                          <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Понятно
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Обычный промпт для десктопа или если автоматический не показан */}
      {!showAutoPrompt && (
        <div className="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-80 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 z-50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              {isMobile ? <Smartphone className="w-5 h-5 text-white" /> : <Download className="w-5 h-5 text-white" />}
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">
                Установить приложение
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {isMobile 
                  ? 'Добавьте Планировщик на главный экран для быстрого доступа'
                  : 'Установите приложение для работы без браузера'
                }
              </p>
              
              <div className="flex gap-2">
                <button
                  onClick={handleInstall}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                >
                  Установить
                </button>
                <button
                  onClick={handleClose}
                  className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};