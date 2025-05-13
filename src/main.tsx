import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import KeyboardTest1 from './ios-keyboard-1.tsx'
import KeyboardTest2 from './ios-keyboard-2.tsx'
import KeyboardTest3 from './ios-keyboard-3.tsx'
import KeyboardTest4 from './ios-keyboard-4.tsx'
import KeyboardTest5a from './ios-keyboard-5a.tsx'
import KeyboardTest5b from './ios-keyboard-5b.tsx'

// Get base path from Vite environment or use empty string for local development
const basePath = import.meta.env.BASE_URL || '/';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/ios-keyboard-1',
      element: <KeyboardTest1 />,
    },
    {
      path: '/ios-keyboard-2',
      element: <KeyboardTest2 />,
    },
    {
      path: '/ios-keyboard-3',
      element: <KeyboardTest3 />,
    },
    {
      path: '/ios-keyboard-4',
      element: <KeyboardTest4 />,
    },
    {
      path: '/ios-keyboard-5a',
      element: <KeyboardTest5a />,
    },
    {
      path: '/ios-keyboard-5b',
      element: <KeyboardTest5b />,
    },
  ],
  { basename: basePath }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
