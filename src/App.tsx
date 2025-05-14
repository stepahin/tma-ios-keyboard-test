import { useEffect } from 'react'
import './App.css'
import { useTelegram } from './lib/telegram'
import { useNavigate } from 'react-router-dom'

function App() {
  const { onReady, backButton, disableVerticalSwipe, requestFullscreen, lockOrientation } = useTelegram()
  const navigate = useNavigate()

  // Инициализация после загрузки компонента
  useEffect(() => {
    // Сообщаем Telegram WebApp, что приложение готово
    onReady()
    
    // Скрываем кнопку назад на главном экране
    backButton.hide()
    
    // Отключаем вертикальный свайп для закрытия приложения
    disableVerticalSwipe()
    
    // Запрашиваем полноэкранный режим (Bot API 8.0+)
    requestFullscreen()
    
    // Блокируем ориентацию экрана в текущем режиме (Bot API 8.0+)
    lockOrientation()
  }, [onReady, backButton, disableVerticalSwipe, requestFullscreen, lockOrientation])

  // Обработчик перехода на выбранный вариант
  const handleNavigate = (path: string) => {
    navigate(path)
  }

  return (
    <div className="main-container">
      <div className="main-title">iOS Keyboard Test Variants</div>
      
      <div className="variants-list">
        <button 
          className="variant-button variant-button-red" 
          onClick={() => handleNavigate('/ios-keyboard-1')}
        >
          iOS Keyboard 1
          <span className="variant-description">Android ok<br/>iOS broken<br/>No webkit tricks</span>
        </button>
        
        <button 
          className="variant-button variant-button-green" 
          onClick={() => handleNavigate('/ios-keyboard-2')}
        >
          iOS Keyboard 2
          <span className="variant-description">Caret ok<br/>No phantom clickable area<br/>Correct position</span>
        </button>
        
        <button 
          className="variant-button variant-button-yellow" 
          onClick={() => handleNavigate('/ios-keyboard-3')}
        >
          iOS Keyboard 3
          <span className="variant-description">Smooth transition (haha no)</span>
        </button>
        
        <button 
          className="variant-button variant-button-yellow" 
          onClick={() => handleNavigate('/ios-keyboard-4')}
        >
          iOS Keyboard 4
          <span className="variant-description">Opening transition</span>
        </button>
        
        <button 
          className="variant-button variant-button-yellow" 
          onClick={() => handleNavigate('/ios-keyboard-5a')}
        >
          iOS Keyboard 5a
          <span className="variant-description">Different approach</span>
        </button>
        
        <button 
          className="variant-button variant-button-yellow" 
          onClick={() => handleNavigate('/ios-keyboard-5b')}
        >
          iOS Keyboard 5b
          <span className="variant-description">Another attempt</span>
        </button>
        
        <button 
          className="variant-button variant-button-purple" 
          onClick={() => handleNavigate('/ios-keyboard-6')}
        >
          iOS Keyboard 6
          <span className="variant-description">viewportHeight<br/>Использует var(--tg-viewport-height)</span>
        </button>
        
        <button 
          className="variant-button variant-button-purple" 
          onClick={() => handleNavigate('/ios-keyboard-7')}
        >
          iOS Keyboard 7
          <span className="variant-description">viewportStableHeight<br/>Использует var(--tg-viewport-stable-height)</span>
        </button>
      </div>
    </div>
  )
}

export default App
