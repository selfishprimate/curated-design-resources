import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

// Self-hosted Inter font
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'

import './index.css'
import App from './App.jsx'

// Initialize theme from localStorage (defaults to light mode)
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme) {
    // Use saved preference
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  } else {
    // Default to light mode
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

initializeTheme()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
