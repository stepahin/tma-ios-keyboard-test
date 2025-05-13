import { useEffect, useState, useRef } from 'react'
import './ios-keyboard-4.css'
import { useTelegram } from './lib/telegram'
import { useNavigate } from 'react-router-dom'
import EmblaCarousel from './components/EmblaCarousel'

function App() {
  const { safeAreaInsets, onReady, backButton, disableVerticalSwipe } = useTelegram()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'horizontal' | 'vertical'>('horizontal')
  // Заменяем переменную для фиксированной высоты PromptForm на высоту текстового поля
  const [textareaRows, setTextareaRows] = useState(2) // Начинаем с 2 строк
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const verticalFeedRef = useRef<HTMLDivElement>(null)
  
  // Высота одной строки (примерно) + паддинги
  const rowHeight = 24 // Увеличиваем высоту строки для лучшей видимости
  // Базовая высота PromptForm (без учета текстового поля)
  const basePromptFormHeight = 128
  // Рассчитываем высоту PromptForm с учетом высоты текстового поля
  const promptHeight = basePromptFormHeight + textareaRows * rowHeight
  
  // Новый список изображений
  const imageSlides = [
    'https://preview.reve.art/inspiration/7d5de70b-7a90-47a9-9427-81428b25fdb0.webp',
    'https://preview.reve.art/inspiration/dad0aa8e-a900-4a90-bf33-23f3954ce6de.webp',
    'https://preview.reve.art/inspiration/74c28f64-c997-4c99-abdf-a2bd9f74b678.webp',
    'https://preview.reve.art/inspiration/1b6bd5a0-c685-4c68-a9cb-069caa06bd22.webp',
    'https://preview.reve.art/inspiration/9e278d1c-8e4c-48e4-88a2-708ac7ca518f.webp',
    'https://preview.reve.art/inspiration/8f4b7270-1095-4109-aa76-52a7923a6dfd.webp',
    'https://preview.reve.art/inspiration/bc14ca44-9431-4943-9e3d-9de3892ca082.webp',
    'https://preview.reve.art/inspiration/6917e2a3-19ba-419b-b91f-db91bd16d2d7.webp',
    'https://preview.reve.art/inspiration/f9e1f24f-47f1-447f-bde1-33defbe83762.webp',
    'https://preview.reve.art/inspiration/e6260718-fad7-4fad-96e5-cd6e807d99eb.webp',
    'https://preview.reve.art/inspiration/c573b78d-6a28-46a2-8cdf-fccd556c2faa.webp',
    'https://preview.reve.art/inspiration/6a548934-cc6a-4cc6-8897-48898fcc9853.webp',
    'https://preview.reve.art/inspiration/2f0cf419-6647-4664-aceb-bace16a82deb.webp',
    'https://preview.reve.art/inspiration/c32ec400-fc37-4fc3-aaa9-b2aa9b01b05e.webp',
    'https://preview.reve.art/inspiration/3561c7bf-5f2e-45f2-993a-f99316955d2a.webp',
    'https://preview.reve.art/inspiration/59fed9e5-e863-4e86-bdb9-ebdb7133f81e.webp',
    'https://preview.reve.art/inspiration/7c6a134d-c2e5-4c2e-879d-a0794b42366d.webp',
    'https://preview.reve.art/inspiration/4fa50eac-33c8-433c-945e-b145590c36fb.webp',
    'https://preview.reve.art/inspiration/59ab8aec-faf6-4faf-aae4-0aae52b5a238.webp'
  ]
  
  // Обработка изменения высоты текстового поля с помощью слайдера
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Получаем значение из слайдера (0-100) и переводим в количество строк (2-10)
    const value = parseInt(event.target.value)
    const newRows = Math.max(2, Math.min(10, Math.round(((value / 100) * 8) + 2)))
    setTextareaRows(newRows)
  }
  
  // Добавляем хак для фиксации позиционирования в iOS
  useEffect(() => {
    // Проверяем, является ли устройство iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
               
    if (isIOS) {
      // Добавляем класс для специальных iOS стилей
      document.body.classList.add('ios-device');

      // Предварительно скрываем мерцание при смене высоты
      const preventFlicker = () => {
        const contentArea = document.querySelector('.content-area') as HTMLElement | null;
        const horizontalCarousel = document.querySelector('.horizontal-carousel') as HTMLElement | null;
        const promptForm = document.querySelector('.prompt-form') as HTMLElement | null;
        
        if (contentArea) {
          // Фиксируем высоту контентной области заранее
          contentArea.style.willChange = 'height, padding-bottom';
        }
        
        if (horizontalCarousel) {
          // Фиксируем высоту карусели заранее
          horizontalCarousel.style.willChange = 'height';
        }
        
        if (promptForm) {
          // Заранее подготавливаем PromptForm к анимации
          promptForm.style.willChange = 'transform';
        }
      };
      
      // Выполняем сразу при загрузке
      preventFlicker();

      // Прокручиваем страницу на 1px и обратно, чтобы заставить iOS пересчитать позиции элементов
      const fixPositioning = () => {
        setTimeout(() => {
          window.scrollTo(0, 1);
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 10);
        }, 300);
      };
      
      // Применяем хак при начальной загрузке
      fixPositioning();
      
      // Обработчик для полей ввода
      const textareaElement = document.querySelector('.prompt-textarea') as HTMLTextAreaElement | null;
      if (textareaElement) {
        // Предварительная подготовка для избежания задержки при первом клике
        
        textareaElement.addEventListener('focus', () => {
          // Добавляем класс для управления анимацией
          document.body.classList.add('keyboard-open');
          
          // Задержка, чтобы дать клавиатуре время появиться
          setTimeout(fixPositioning, 300);
        });
        
        textareaElement.addEventListener('blur', () => {
          // Убираем класс при скрытии клавиатуры
          document.body.classList.remove('keyboard-open');
          
          // Задержка после исчезновения клавиатуры
          setTimeout(fixPositioning, 300);
        });
      }
      
      // Добавляем обработчики для временного исправления позиций при тапах
      const promptForm = document.querySelector('.prompt-form');
      if (promptForm) {
        promptForm.addEventListener('touchstart', () => {
          fixPositioning();
        });
      }
    }
  }, []);


  useEffect(() => {
    document.documentElement.style.setProperty('--tg-safe-area-inset-top', `${safeAreaInsets.top}px`)
    document.documentElement.style.setProperty('--tg-safe-area-inset-right', `${safeAreaInsets.right}px`)
    document.documentElement.style.setProperty('--tg-safe-area-inset-bottom', `${safeAreaInsets.bottom}px`)
    document.documentElement.style.setProperty('--tg-safe-area-inset-left', `${safeAreaInsets.left}px`)
    
    // Инициализация Telegram WebApp
    onReady()
    
    // Показываем кнопку назад и добавляем обработчик
    backButton.show()
    backButton.onClick(() => navigate('/'))
    
    // Отключаем вертикальный свайп для закрытия приложения
    disableVerticalSwipe()
    
    // Удаляем обработчик при размонтировании компонента
    return () => {
      backButton.offClick(() => navigate('/'))
    }
  }, [safeAreaInsets, onReady, backButton, navigate, disableVerticalSwipe])
  
  // Обработчик снятия фокуса с текстового поля при клике вне PromptForm
  const handleContentClick = () => {
    if (textareaRef.current && document.activeElement === textareaRef.current) {
      textareaRef.current.blur()
    }
  }
  
  return (
    <div className="app-container">
      {/* Заголовок фиксированный вверху */}
      <div className="tool-title">iOS Keyboard 4</div>
      
      {/* Содержимое экрана */}
      <div className="content-area" onClick={handleContentClick}>
        {activeTab === 'horizontal' ? (
          <div 
            className="horizontal-carousel"
            style={{ 
              height: `calc(100vh - 56px - ${promptHeight}px - var(--tg-safe-area-inset-top) - var(--tg-safe-area-inset-bottom))`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            <EmblaCarousel slides={imageSlides} />
          </div>
        ) : (
          <div className="vertical-feed" ref={verticalFeedRef}>
            {imageSlides.map((imageUrl, index) => (
              <img 
                key={index}
                src={imageUrl} 
                alt={`Image ${index + 1}`} 
                className="feed-image" 
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Контейнер для PromptForm, который будет двигаться вместе с клавиатурой */}
      <div className="prompt-container">
        {/* PromptForm внутри контейнера */}
        <div 
          className="prompt-form" 
          style={{
            height: `calc(${promptHeight}px + var(--tg-safe-area-inset-bottom))`,
            paddingBottom: `calc(16px + var(--tg-safe-area-inset-bottom))`
          }}
        >
        {/* Табы для переключения между Horizontal carousel и Vertical feed */}
        <div className="prompt-tabs">
          <button 
            className={`tab-button ${activeTab === 'horizontal' ? 'active' : ''}`} 
            onClick={() => setActiveTab('horizontal')}
          >
            Horizontal carousel
          </button>
          <button 
            className={`tab-button ${activeTab === 'vertical' ? 'active' : ''}`} 
            onClick={() => setActiveTab('vertical')}
          >
            Vertical feed
          </button>
        </div>
        
        {/* Текстовое поле */}
        <textarea 
          className="prompt-textarea" 
          placeholder="Tap here to open keyboard..."
          ref={textareaRef}
          style={{ height: `${textareaRows * rowHeight}px` }}
          rows={textareaRows}
        />
        
        {/* Слайдер для изменения высоты текстового поля */}
        <div className="slider-container">
          <span className="slider-label">textarea height</span>
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            defaultValue="0"
            onChange={handleSliderChange}
            className="html-slider"
          />
        </div>
      </div>
      </div>
    </div>
  );
}

export default App
