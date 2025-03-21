import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/App.css'
import App from './view/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
