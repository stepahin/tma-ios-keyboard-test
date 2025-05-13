declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        safeAreaInset: {
          top: number;
          right: number;
          bottom: number;
          left: number;
        };
        onEvent: (eventType: string, eventHandler: any) => void;
        offEvent: (eventType: string, eventHandler: any) => void;
        BackButton: {
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          isVisible: boolean;
        };
        // Свойство, показывающее, разрешены ли вертикальные свайпы
        isVerticalSwipesEnabled: boolean;
        // Метод для отключения вертикальных свайпов (старый метод)
        disableVerticalSwipes: () => void;
        // Метод для настройки поведения свайпа
        setupSwipeGesture: (params: { allow_vertical_swipe: boolean }) => void;
        // Альтернативный метод для настройки поведения свайпа
        setupSwipeBehavior: (params: { allow_vertical_swipe: boolean }) => void;
        // Старый метод настройки поведения свайпа
        web_app_setup_swipe_behavior: (params: { allow_vertical_swipe: boolean }) => void;
        // Метод для отправки событий в Telegram WebApp
        postEvent: (eventType: string, eventData?: any) => void;
        // Метод для запроса полноэкранного режима (Bot API 8.0+)
        requestFullscreen: () => void;
        // Метод для блокировки ориентации экрана (Bot API 8.0+)
        lockOrientation: () => void;
        // Метод для установки цвета заголовка
        setHeaderColor: (color: string) => void;
        // Добавь другие необходимые методы при необходимости
      };
    };
  }
}

const telegram = window.Telegram?.WebApp;

export const useTelegram = () => {
  const safeAreaInsets = {
    top: telegram?.safeAreaInset?.top || 0,
    right: telegram?.safeAreaInset?.right || 0,
    bottom: telegram?.safeAreaInset?.bottom || 0,
    left: telegram?.safeAreaInset?.left || 0,
  };

  const onReady = () => {
    if (telegram) {
      telegram.ready();
      telegram.expand();
    }
  };
  
  // Функция для запроса полноэкранного режима (Bot API 8.0+)
  const requestFullscreen = () => {
    if (!telegram) {
      console.error('Telegram WebApp не доступен!');
      return;
    }
    
    try {
      if (typeof telegram.requestFullscreen === 'function') {
        telegram.requestFullscreen();
        console.log('Запрошен полноэкранный режим');
        
        // Рекомендуется установить цвет заголовка при использовании полноэкранного режима
        if (typeof telegram.setHeaderColor === 'function') {
          telegram.setHeaderColor('#000000'); // Черный цвет для заголовка
          console.log('Установлен цвет заголовка для полноэкранного режима');
        }
      } else {
        console.warn('Метод requestFullscreen не поддерживается в текущей версии Telegram WebApp');
      }
    } catch (error) {
      console.error('Ошибка при запросе полноэкранного режима:', error);
    }
  };
  
  // Функция для блокировки ориентации экрана (Bot API 8.0+)
  const lockOrientation = () => {
    if (!telegram) {
      console.error('Telegram WebApp не доступен!');
      return;
    }
    
    try {
      if (typeof telegram.lockOrientation === 'function') {
        telegram.lockOrientation();
        console.log('Ориентация экрана заблокирована');
      } else {
        console.warn('Метод lockOrientation не поддерживается в текущей версии Telegram WebApp');
      }
    } catch (error) {
      console.error('Ошибка при блокировке ориентации экрана:', error);
    }
  };

  // Добавляем поддержку кнопки "Назад"
  const backButton = {
    show: () => {
      if (telegram?.BackButton) {
        telegram.BackButton.show();
      }
    },
    hide: () => {
      if (telegram?.BackButton) {
        telegram.BackButton.hide();
      }
    },
    onClick: (callback: () => void) => {
      if (telegram?.BackButton) {
        telegram.BackButton.onClick(callback);
      }
    },
    offClick: (callback: () => void) => {
      if (telegram?.BackButton) {
        telegram.BackButton.offClick(callback);
      }
    },
    get isVisible() {
      return telegram?.BackButton?.isVisible || false;
    }
  };

  // Функция для отключения вертикального свайпа
  const disableVerticalSwipe = () => {
    if (!telegram) {
      console.error('Telegram WebApp не доступен!');
      return;
    }
    
    console.log('Пытаемся отключить вертикальные свайпы...');
    
    try {
      // Используем все доступные методы для разных версий Telegram WebApp

      // Отключаем вертикальные свайпы (старый метод)
      const WebApp = window.Telegram.WebApp;
      if (typeof WebApp.disableVerticalSwipes === 'function') {
        WebApp.disableVerticalSwipes();
        console.log('Использован метод disableVerticalSwipes');
      }

      // Настраиваем поведение свайпов (новые методы)
      if (typeof WebApp.web_app_setup_swipe_behavior === 'function') {
        WebApp.web_app_setup_swipe_behavior({ allow_vertical_swipe: false });
        console.log('Использован метод web_app_setup_swipe_behavior');
      } else if (typeof WebApp.setupSwipeBehavior === 'function') {
        WebApp.setupSwipeBehavior({ allow_vertical_swipe: false });
        console.log('Использован метод setupSwipeBehavior');
      } else if (typeof WebApp.setupSwipeGesture === 'function') {
        WebApp.setupSwipeGesture({ allow_vertical_swipe: false });
        console.log('Использован метод setupSwipeGesture');
      }
      
      // Также пытаемся использовать postEvent как альтернативу
      if (typeof WebApp.postEvent === 'function') {
        WebApp.postEvent('web_app_setup_swipe_behavior', { allow_vertical_swipe: false });
        console.log('Использован метод postEvent');
      }
      
      console.log('Вертикальные свайпы отключены всеми доступными методами');
    } catch (error) {
      console.error('Ошибка при отключении вертикальных свайпов:', error);
    }
  };

  // Функция для включения вертикального свайпа
  const enableVerticalSwipe = () => {
    if (!telegram) return;
    
    try {
      // Пробуем разные методы, т.к. разные версии Telegram могут использовать разные методы
      if ('postEvent' in telegram) {
        (telegram as any).postEvent('web_app_setup_swipe_behavior', { allow_vertical_swipe: true });
      } else if ('setupSwipeGesture' in telegram) {
        (telegram as any).setupSwipeGesture({ allow_vertical_swipe: true });
      } else {
        // Прямой доступ к методу через window.Telegram.WebApp
        window.Telegram.WebApp.postEvent('web_app_setup_swipe_behavior', { allow_vertical_swipe: true });
      }
      console.log('Vertical swipe enabled');
    } catch (error) {
      console.error('Failed to enable vertical swipe:', error);
    }
  };

  return {
    telegram,
    safeAreaInsets,
    onReady,
    backButton,
    disableVerticalSwipe,
    enableVerticalSwipe,
    requestFullscreen,
    lockOrientation,
  };
};
