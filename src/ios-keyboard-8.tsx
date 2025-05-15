import { useEffect, useState, useRef } from 'react'
import './ios-keyboard-8.css'
import { useTelegram } from './lib/telegram'
import { useNavigate } from 'react-router-dom'
import EmblaCarousel from './components/EmblaCarousel'

function App() {
  const { safeAreaInsets, onReady, backButton, disableVerticalSwipe, telegram } = useTelegram()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'horizontal' | 'vertical'>('horizontal')
  // u0417u0430u043cu0435u043du044fu0435u043c u043fu0435u0440u0435u043cu0435u043du043du0443u044e u0434u043bu044f u0444u0438u043au0441u0438u0440u043eu0432u0430u043du043du043eu0439 u0432u044bu0441u043eu0442u044b PromptForm u043du0430 u0432u044bu0441u043eu0442u0443 u0442u0435u043au0441u0442u043eu0432u043eu0433u043e u043fu043eu043bu044f
  const [textareaRows, setTextareaRows] = useState(2) // u041du0430u0447u0438u043du0430u0435u043c u0441 2 u0441u0442u0440u043eu043a
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const verticalFeedRef = useRef<HTMLDivElement>(null)
  
  // u0412u044bu0441u043eu0442u0430 u043eu0434u043du043eu0439 u0441u0442u0440u043eu043au0438 (u043fu0440u0438u043cu0435u0440u043du043e) + u043fu0430u0434u0434u0438u043du0433u0438
  const rowHeight = 24 // u0423u0432u0435u043bu0438u0447u0438u0432u0430u0435u043c u0432u044bu0441u043eu0442u0443 u0441u0442u0440u043eu043au0438 u0434u043bu044f u043bu0443u0447u0448u0435u0439 u0432u0438u0434u0438u043cu043eu0441u0442u0438
  // u0411u0430u0437u043eu0432u0430u044f u0432u044bu0441u043eu0442u0430 PromptForm (u0431u0435u0437 u0443u0447u0435u0442u0430 u0442u0435u043au0441u0442u043eu0432u043eu0433u043e u043fu043eu043bu044f)
  const basePromptFormHeight = 128
  // u0420u0430u0441u0441u0447u0438u0442u044bu0432u0430u0435u043c u0432u044bu0441u043eu0442u0443 PromptForm u0441 u0443u0447u0435u0442u043eu043c u0432u044bu0441u043eu0442u044b u0442u0435u043au0441u0442u043eu0432u043eu0433u043e u043fu043eu043bu044f
  const promptHeight = basePromptFormHeight + textareaRows * rowHeight
  
  // CSS u043fu0435u0440u0435u043cu0435u043du043du0430u044f u0430u0432u0442u043eu043cu0430u0442u0438u0447u0435u0441u043au0438 u043eu0431u043du043eu0432u043bu044fu0435u0442u0441u044f u0432 useTelegram
  
  // u041du043eu0432u044bu0439 u0441u043fu0438u0441u043eu043a u0438u0437u043eu0431u0440u0430u0436u0435u043du0438u0439
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
  
  // u041eu0431u0440u0430u0431u043eu0442u043au0430 u0438u0437u043cu0435u043du0435u043du0438u044f u0432u044bu0441u043eu0442u044b u0442u0435u043au0441u0442u043eu0432u043eu0433u043e u043fu043eu043bu044f u0441 u043fu043eu043cu043eu0449u044cu044e u0441u043bu0430u0439u0434u0435u0440u0430
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // u041fu043eu043bu0443u0447u0430u0435u043c u0437u043du0430u0447u0435u043du0438u0435 u0438u0437 u0441u043bu0430u0439u0434u0435u0440u0430 (0-100) u0438 u043fu0435u0440u0435u0432u043eu0434u0438u043c u0432 u043au043eu043bu0438u0447u0435u0441u0442u0432u043e u0441u0442u0440u043eu043a (2-10)
    const value = parseInt(event.target.value)
    const newRows = Math.max(2, Math.min(10, Math.round(((value / 100) * 8) + 2)))
    setTextareaRows(newRows)
  }
  
  // u0414u043eu0431u0430u0432u043bu044fu0435u043c u0445u0430u043a u0434u043bu044f u0444u0438u043au0441u0430u0446u0438u0438 u043fu043eu0437u0438u0446u0438u043eu043du0438u0440u043eu0432u0430u043du0438u044f u0432 iOS
  useEffect(() => {
    // u041fu0440u043eu0432u0435u0440u044fu0435u043c, u044fu0432u043bu044fu0435u0442u0441u044f u043bu0438 u0443u0441u0442u0440u043eu0439u0441u0442u0432u043e iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
               
    if (isIOS) {
      // u041fu0440u043eu043au0440u0443u0447u0438u0432u0430u0435u043c u0441u0442u0440u0430u043du0438u0446u0443 u043du0430 1px u0438 u043eu0431u0440u0430u0442u043du043e, u0447u0442u043eu0431u044b u0437u0430u0441u0442u0430u0432u0438u0442u044c iOS u043fu0435u0440u0435u0441u0447u0438u0442u0430u0442u044c u043fu043eu0437u0438u0446u0438u0438 u044du043bu0435u043cu0435u043du0442u043eu0432
      const fixPositioning = () => {
        setTimeout(() => {
          window.scrollTo(0, 1);
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 5); // u0423u0441u043au043eu0440u0435u043du043du0430u044f u0437u0430u0434u0435u0440u0436u043au0430
        }, 150); // u0423u0441u043au043eu0440u0435u043du043du0430u044f u0437u0430u0434u0435u0440u0436u043au0430
      };
      
      // u041fu0440u0438u043cu0435u043du044fu0435u043c u0445u0430u043a u043fu0440u0438 u043du0430u0447u0430u043bu044cu043du043eu0439 u0437u0430u0433u0440u0443u0437u043au0435
      fixPositioning();
      
      // u041eu0431u0440u0430u0431u043eu0442u0447u0438u043a u0434u043bu044f u043fu043eu043bu0435u0439 u0432u0432u043eu0434u0430
      const textareaElement = document.querySelector('.prompt-textarea');
      if (textareaElement) {
        textareaElement.addEventListener('focus', () => {
          // u0417u0430u0434u0435u0440u0436u043au0430, u0447u0442u043eu0431u044b u0434u0430u0442u044c u043au043bu0430u0432u0438u0430u0442u0443u0440u0435 u0432u0440u0435u043cu044f u043fu043eu044fu0432u0438u0442u044cu0441u044f
          setTimeout(fixPositioning, 250); // u0423u0441u043au043eu0440u0435u043du043du0430u044f u0437u0430u0434u0435u0440u0436u043au0430
        });
        
        textareaElement.addEventListener('blur', () => {
          // u0417u0430u0434u0435u0440u0436u043au0430 u043fu043eu0441u043bu0435 u0438u0441u0447u0435u0437u043du043eu0432u0435u043du0438u044f u043au043bu0430u0432u0438u0430u0442u0443u0440u044b
          setTimeout(fixPositioning, 250); // u0423u0441u043au043eu0440u0435u043du043du0430u044f u0437u0430u0434u0435u0440u0436u043au0430
        });
      }
      
      // u0414u043eu0431u0430u0432u043bu044fu0435u043c u043eu0431u0440u0430u0431u043eu0442u0447u0438u043au0438 u0434u043bu044f u0432u0440u0435u043cu0435u043du043du043eu0433u043e u0438u0441u043fu0440u0430u0432u043bu0435u043du0438u044f u043fu043eu0437u0438u0446u0438u0439 u043fu0440u0438 u0442u0430u043fu0430u0445
      const promptForm = document.querySelector('.prompt-form');
      if (promptForm) {
        promptForm.addEventListener('touchstart', () => {
          fixPositioning();
        });
      }
    }
  }, []);

  // u0423u0441u0442u0430u043du043eu0432u043au0430 CSS u043fu0435u0440u0435u043cu0435u043du043du044bu0445 u0434u043bu044f u0431u0435u0437u043eu043fu0430u0441u043du044bu0445 u043eu0431u043bu0430u0441u0442u0435u0439 Telegram u0438 u043eu0442u0441u043bu0435u0436u0438u0432u0430u043du0438u0435 u0438u0437u043cu0435u043du0435u043du0438u0439 viewport
  useEffect(() => {
    document.documentElement.style.setProperty('--tg-safe-area-inset-top', `${safeAreaInsets.top}px`)
    document.documentElement.style.setProperty('--tg-safe-area-inset-right', `${safeAreaInsets.right}px`)
    document.documentElement.style.setProperty('--tg-safe-area-inset-bottom', `${safeAreaInsets.bottom}px`)
    document.documentElement.style.setProperty('--tg-safe-area-inset-left', `${safeAreaInsets.left}px`)
    
    // u0418u043du0438u0446u0438u0430u043bu0438u0437u0430u0446u0438u044f u043fu043eu0441u043bu0435 u0437u0430u0433u0440u0443u0437u043au0438 u043au043eu043cu043fu043eu043du0435u043du0442u0430
    onReady()
    
    // u041fu043eu043au0430u0437u044bu0432u0430u0435u043c u043au043du043eu043fu043au0443 u043du0430u0437u0430u0434 u0438 u0434u043eu0431u0430u0432u043bu044fu0435u043c u043eu0431u0440u0430u0431u043eu0442u0447u0438u043a
    backButton.show()
    backButton.onClick(() => navigate('/'))
    
    // u041eu0442u043au043bu044eu0447u0430u0435u043c u0432u0435u0440u0442u0438u043au0430u043bu044cu043du044bu0439 u0441u0432u0430u0439u043f u0434u043bu044f u0437u0430u043au0440u044bu0442u0438u044f u043fu0440u0438u043bu043eu0436u0435u043du0438u044f
    disableVerticalSwipe()
    
    // u041eu0431u0440u0430u0431u043eu0442u0447u0438u043a u0438u0437u043cu0435u043du0435u043du0438u0439 viewport u0440u0435u0430u043bu0438u0437u043eu0432u0430u043d u0432 useTelegram
    
    // u0423u0434u0430u043bu044fu0435u043c u043eu0431u0440u0430u0431u043eu0442u0447u0438u043a u043fu0440u0438 u0440u0430u0437u043cu043eu043du0442u0438u0440u043eu0432u0430u043du0438u0438
    return () => {
      backButton.offClick(() => navigate('/'))
    }
  }, [safeAreaInsets, onReady, backButton, navigate, disableVerticalSwipe, telegram])
  
  // u041eu0431u0440u0430u0431u043eu0442u0447u0438u043a u0441u043du044fu0442u0438u044f u0444u043eu043au0443u0441u0430 u0441 u0442u0435u043au0441u0442u043eu0432u043eu0433u043e u043fu043eu043bu044f u043fu0440u0438 u043au043bu0438u043au0435 u0432u043du0435 PromptForm
  const handleContentClick = () => {
    if (textareaRef.current && document.activeElement === textareaRef.current) {
      textareaRef.current.blur()
    }
  }
  
  return (
    <div className="app-container">
      {/* u0417u0430u0433u043eu043bu043eu0432u043eu043a u0444u0438u043au0441u0438u0440u043eu0432u0430u043du043du044bu0439 u0432u0432u0435u0440u0445u0443 */}
      <div className="tool-title">iOS Keyboard 8</div>
      
      {/* u0421u043eu0434u0435u0440u0436u0438u043cu043eu0435 u044du043au0440u0430u043du0430 */}
      <div className="content-area" onClick={handleContentClick}>
        {activeTab === 'horizontal' ? (
          <div className="horizontal-carousel">
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
      
      {/* PromptForm u0432u043du0438u0437u0443 u044du043au0440u0430u043du0430 */}
      <div 
        className="prompt-form" 
        style={{
          height: `calc(${promptHeight}px + var(--tg-safe-area-inset-bottom))`,
          paddingBottom: `calc(16px + var(--tg-safe-area-inset-bottom))`
        }}
      >
        {/* u0422u0430u0431u044b u0434u043bu044f u043fu0435u0440u0435u043au043bu044eu0447u0435u043du0438u044f u043cu0435u0436u0434u0443 Horizontal carousel u0438 Vertical feed */}
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
        
        {/* u0422u0435u043au0441u0442u043eu0432u043eu0435 u043fu043eu043bu0435 */}
        <textarea 
          className="prompt-textarea" 
          placeholder="Tap here to open keyboard..."
          ref={textareaRef}
          style={{ height: `${textareaRows * rowHeight}px` }}
          rows={textareaRows}
        />
        
        {/* u0421u043bu0430u0439u0434u0435u0440 u0434u043bu044f u0438u0437u043cu0435u043du0435u043du0438u044f u0432u044bu0441u043eu0442u044b u0442u0435u043au0441u0442u043eu0432u043eu0433u043e u043fu043eu043bu044f */}
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
