import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig({
  base: '/tma-ios-keyboard-test/',
  plugins: [react(), mkcert()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    https: true,
    host: true,  // Позволяет доступ отовсюду, а не только с localhost
    port: 3030,  // Запускаем на порту 3030 для Telegram Mini App
    strictPort: true, // Гарантируем, что сервер запустится только на этом порту
  },
})
