import { useEffect, useState, useRef } from 'react'
import './ios-keyboard-8.css'
import { useTelegram } from './lib/telegram'
import { useNavigate } from 'react-router-dom'
import EmblaCarousel from './components/EmblaCarousel'
import { Masonry } from 'masonic'

function App() {
  const { safeAreaInsets, onReady, backButton, disableVerticalSwipe, telegram } = useTelegram()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'horizontal' | 'vertical' | 'masonic'>('horizontal')
  // Заменяем переменную для фиксированной высоты PromptForm на высоту текстового поля
  const [textareaRows, setTextareaRows] = useState(2) // Начинаем с 2 строк
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const verticalFeedRef = useRef<HTMLDivElement>(null)
  
  // Высота одной строки (примерно) + паддинги
  const rowHeight = 24 // Увеличиваем высоту строки для лучшей видимости
  // Базовая высота PromptForm (без учета текстового поля)
  const basePromptFormHeight = 128
  // Android hack offset - компенсация неточности viewport только на Android
  const isAndroid = /Android/.test(navigator.userAgent)
  const androidHackOffset = isAndroid ? safeAreaInsets.bottom : 0
  // Рассчитываем высоту PromptForm с учетом высоты текстового поля и Android hack offset
  const promptHeight = basePromptFormHeight + textareaRows * rowHeight + androidHackOffset
  
  // CSS переменная автоматически обновляется в useTelegram
  
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
    'https://preview.reve.art/inspiration/59ab8aec-faf6-4faf-aae4-0aae52b5a238.webp',
    'https://preview.reve.art/inspiration/2b510de9-a6e0-4a6e-8b72-34b79ec2a7d4.webp',
    'https://preview.reve.art/inspiration/3cb0c0f7-6b0d-46b0-a0ea-ea0ee98f2248.webp',
    'https://preview.reve.art/inspiration/2aba8cb2-03cc-403c-bfec-a7fe462765a1.webp',
    'https://preview.reve.art/inspiration/a1bcab54-0d4c-40d4-a44a-b64479a649c6.webp',
    'https://preview.reve.art/inspiration/748a8409-d0cc-4d0c-bfb2-cbfb692ab621.webp',
    'https://preview.reve.art/inspiration/16d5ac3e-786e-4786-9859-91852419365c.webp',
    'https://preview.reve.art/inspiration/6aeae2ad-0dd0-40dd-b3e4-273e4c5fda5c.webp',
    'https://preview.reve.art/inspiration/47327066-97ca-497c-90c3-050c3ff7d17e.webp',
    'https://preview.reve.art/inspiration/00c35a1f-f9c7-4f9c-ba25-dfa2d7155598.webp',
    'https://preview.reve.art/inspiration/f2c1e3cc-e60a-4e60-af6f-0ef630d9f442.webp',
    'https://preview.reve.art/inspiration/73356a9f-9a22-49a2-9561-89560bbaddcb.webp',
    'https://preview.reve.art/inspiration/e21bcfcf-b15c-4b15-bf75-cff7095511e2.webp',
    'https://preview.reve.art/inspiration/7dc3597c-da4a-4da4-a971-7a9772d7ea5a.webp',
    'https://preview.reve.art/inspiration/e4ec5312-26c8-426c-871d-2471a4ef5926.webp',
    'https://preview.reve.art/inspiration/7a30dc07-d61b-4d61-9adb-a1ad2ad04d15.webp',
    'https://preview.reve.art/inspiration/f531b783-1b10-41b1-84aa-e44a6f2742c0.webp',
    'https://preview.reve.art/inspiration/7aa15aeb-9e60-49e6-97f4-b57f557b528b.webp',
    'https://preview.reve.art/inspiration/11738fcd-9643-4964-8933-7893d41f87eb.webp',
    'https://preview.reve.art/inspiration/542f67af-4b22-44b2-9373-8537248a0ebe.webp',
    'https://preview.reve.art/inspiration/3ad351e9-3dce-43dc-a724-f2729e321cf2.webp',
    'https://preview.reve.art/inspiration/4380ffcf-055c-4055-ace7-36cebc972037.webp',
    'https://preview.reve.art/inspiration/a338a01b-2801-4280-9158-b915e445dfed.webp'
  ]
  
  // Подготавливаем данные для masonic сетки
  const masonicItems = imageSlides.map((url, index) => ({
    id: index,
    imageUrl: url
  }))
  
  // Компонент для отображения элемента в masonic сетке
  const MasonryCard = ({ index, data, width }: { index: number, data: any, width: number }) => (
    <div className="masonry-card" style={{ width }}>
      <img 
        src={data.imageUrl} 
        alt={`Masonry Image ${index + 1}`}
        className="masonry-image"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  )
  
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
      const textareaElement = document.querySelector('.prompt-textarea');
      if (textareaElement) {
        textareaElement.addEventListener('focus', () => {
          // Задержка, чтобы дать клавиатуре время появиться
          setTimeout(fixPositioning, 500);
        });
        
        textareaElement.addEventListener('blur', () => {
          // Задержка после исчезновения клавиатуры
          setTimeout(fixPositioning, 500);
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

  // Установка CSS переменных для безопасных областей Telegram и отслеживание изменений viewport
  useEffect(() => {
    document.documentElement.style.setProperty('--tg-safe-area-inset-top', `${safeAreaInsets.top}px`)
    document.documentElement.style.setProperty('--tg-safe-area-inset-right', `${safeAreaInsets.right}px`)
    document.documentElement.style.setProperty('--tg-safe-area-inset-bottom', `${safeAreaInsets.bottom}px`)
    document.documentElement.style.setProperty('--tg-safe-area-inset-left', `${safeAreaInsets.left}px`)
    
    // Инициализация после загрузки компонента
    onReady()
    
    // Показываем кнопку назад и добавляем обработчик
    backButton.show()
    backButton.onClick(() => navigate('/'))
    
    // Отключаем вертикальный свайп для закрытия приложения
    disableVerticalSwipe()
    
    // Обработчик изменений viewport реализован в useTelegram
    
    // Удаляем обработчик при размонтировании
    return () => {
      backButton.offClick(() => navigate('/'))
    }
  }, [safeAreaInsets, onReady, backButton, navigate, disableVerticalSwipe, telegram])
  
  // Обработчик снятия фокуса с текстового поля при клике вне PromptForm
  const handleContentClick = () => {
    if (textareaRef.current && document.activeElement === textareaRef.current) {
      textareaRef.current.blur()
    }
  }
  
  return (
    <div className="app-container">
      {/* Заголовок фиксированный вверху */}
      <div className="tool-title">iOS Keyboard 8</div>
      
      {/* Содержимое экрана */}
      <div className="content-area" onClick={handleContentClick}>
        {activeTab === 'horizontal' ? (
          <div 
            className="horizontal-carousel"
            style={{ 
              height: `calc(var(--tg-viewport-stable-height, 100vh) - 56px - ${promptHeight}px - var(--tg-safe-area-inset-top) - var(--tg-safe-area-inset-bottom))`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            <EmblaCarousel slides={imageSlides} />
          </div>
        ) : activeTab === 'vertical' ? (
          <div 
            className="vertical-feed" 
            ref={verticalFeedRef}
            style={{
              bottom: `calc(${promptHeight}px + var(--tg-safe-area-inset-bottom))`
            }}
          >
            {imageSlides.map((imageUrl, index) => (
              <img 
                key={index}
                src={imageUrl} 
                alt={`Image ${index + 1}`} 
                className="feed-image" 
              />
            ))}
          </div>
        ) : (
          <div 
            className="masonic-grid"
            style={{
              height: `var(--tg-viewport-stable-height, 100vh)`,
              overflow: 'auto',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              paddingTop: 'calc(56px + var(--tg-safe-area-inset-top))',
              paddingBottom: `calc(${promptHeight}px + var(--tg-safe-area-inset-bottom))`
            }}
          >
            <Masonry
              items={masonicItems}
              render={MasonryCard}
              columnGutter={4}
              columnWidth={150}
              overscanBy={5}
            />
          </div>
        )}
      </div>
      
      {/* PromptForm внизу экрана */}
      <div 
        className="prompt-form" 
        style={{
          height: `calc(${promptHeight}px + var(--tg-safe-area-inset-bottom))`,
          paddingBottom: `calc(16px + var(--tg-safe-area-inset-bottom))`
        }}
      >
        {/* Табы для переключения между Horizontal carousel, Vertical feed и Masonic grid */}
        <div className="prompt-tabs">
          <button 
            className={`tab-button ${activeTab === 'horizontal' ? 'active' : ''}`} 
            onClick={() => setActiveTab('horizontal')}
          >
            Horizontal
          </button>
          <button 
            className={`tab-button ${activeTab === 'vertical' ? 'active' : ''}`} 
            onClick={() => setActiveTab('vertical')}
          >
            Vertical
          </button>
          <button 
            className={`tab-button ${activeTab === 'masonic' ? 'active' : ''}`} 
            onClick={() => setActiveTab('masonic')}
          >
            Masonic
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
  )
}

export default App 