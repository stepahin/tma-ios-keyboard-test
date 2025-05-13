import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import KeyboardTest1 from './ios-keyboard-1.tsx'
import KeyboardTest2 from './ios-keyboard-2.tsx'
import KeyboardTest3 from './ios-keyboard-3.tsx'
import KeyboardTest4 from './ios-keyboard-4.tsx'
import KeyboardTest5a from './ios-keyboard-5a.tsx'
import KeyboardTest5b from './ios-keyboard-5b.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ios-keyboard-1" element={<KeyboardTest1 />} />
        <Route path="/ios-keyboard-2" element={<KeyboardTest2 />} />
        <Route path="/ios-keyboard-3" element={<KeyboardTest3 />} />
        <Route path="/ios-keyboard-4" element={<KeyboardTest4 />} />
        <Route path="/ios-keyboard-5a" element={<KeyboardTest5a />} />
        <Route path="/ios-keyboard-5b" element={<KeyboardTest5b />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
