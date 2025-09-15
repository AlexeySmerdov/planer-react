import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const usePWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop'>('desktop');

  useEffect(() => {
    // Определяем платформу
    const detectPlatform = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(userAgent)) {
        setPlatform('ios');
      } else if (/android/.test(userAgent)) {
        setPlatform('android');
      } else {
        setPlatform('desktop');
      }
    };

    // Обработка события beforeinstallprompt (работает в основном на Android Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    // Проверка установки PWA
    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    // Проверка, запущено ли приложение как PWA
    const checkIfInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isIosStandalone = (window.navigator as any).standalone === true;
      const isInWebApk = document.referrer.includes('android-app://');
      
      console.log('PWA Status Check:', {
        isStandalone,
        isIosStandalone,
        isInWebApk,
        userAgent: navigator.userAgent,
        platform,
        hasServiceWorker: 'serviceWorker' in navigator
      });
      
      if (isStandalone || isIosStandalone || isInWebApk) {
        console.log('App is running as PWA');
        setIsInstalled(true);
        setIsInstallable(false);
      } else {
        console.log('App is running in browser');
        // Для мобильных устройств всегда показываем возможность установки
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const hasManifest = document.querySelector('link[rel="manifest"]');
        
        console.log('Mobile check:', { isMobile, hasManifest });
        
        if (isMobile && hasManifest) {
          setIsInstallable(true);
        }
      }
    };

    // Проверяем поддержку Service Worker
    if ('serviceWorker' in navigator) {
      console.log('Service Worker is supported');
      
      // Регистрируем Service Worker
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered successfully:', registration);
        })
        .catch(error => {
          console.log('SW registration failed:', error);
        });
    } else {
      console.log('Service Worker is not supported');
    }

    detectPlatform();
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    checkIfInstalled();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installPWA = async () => {
    console.log('Install PWA clicked, platform:', platform);
    
    // Если есть нативный промпт (Android Chrome)
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        console.log(`User response to the install prompt: ${outcome}`);
        
        if (outcome === 'accepted') {
          console.log('User accepted the install prompt');
          setIsInstalled(true);
        }
        
        setDeferredPrompt(null);
        setIsInstallable(false);
        return;
      } catch (error) {
        console.error('Error during PWA installation:', error);
      }
    }

    // Показываем инструкции для ручной установки
    return 'manual';
  };

  return {
    isInstallable,
    isInstalled,
    installPWA,
    platform
  };
};