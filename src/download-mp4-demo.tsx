import { useEffect } from 'react';
import { useTelegram } from './lib/telegram';
import { useNavigate } from 'react-router-dom';

const VIDEO_URL = 'https://replicate.delivery/xezq/mDkBKBJCUe3oTqbYB98SWOOQebwqWeTrwDVNN3C7wCfxJLpSB/tmpmc15wyjc.mp4';

export default function DownloadMp4Demo() {
  const { onReady, backButton, disableVerticalSwipe } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    onReady();
    backButton.show();
    backButton.onClick(() => navigate('/'));
    disableVerticalSwipe();
    return () => {
      backButton.offClick(() => navigate('/'));
    };
  }, [onReady, backButton, navigate, disableVerticalSwipe]);

  // Функция для скачивания через Telegram WebApp API
  const handleDownload = () => {
    // Используем глобальный window.Telegram.WebApp для поддержки downloadFile
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.downloadFile) {
      // @ts-ignore
      window.Telegram.WebApp.downloadFile({
        url: VIDEO_URL,
        file_name: 'demo.mp4',
      });
    } else {
      // fallback для браузера
      const a = document.createElement('a');
      a.href = VIDEO_URL;
      a.download = 'demo.mp4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000',
      color: '#fff',
      padding: '16px',
    }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: 16, textAlign: 'center' }}>Download MP4 File demo</h1>
      <div style={{ marginBottom: 24, textAlign: 'center', color: '#aaa', fontSize: '1rem' }}>
        Should be saved to <b>Photos</b> on iOS, not <b>Files</b>
      </div>
      <video
        src={VIDEO_URL}
        controls
        style={{ maxWidth: '100%', maxHeight: '40vh', marginBottom: 32, borderRadius: 12, background: '#111' }}
      />
      <button
        style={{
          padding: '12px 32px',
          fontSize: '1.1rem',
          background: '#2ea6ff',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontWeight: 600,
        }}
        onClick={handleDownload}
      >
        Download
      </button>
    </div>
  );
} 