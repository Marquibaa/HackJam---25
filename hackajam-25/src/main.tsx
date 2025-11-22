import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import MorseFirstName from "./morse.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <MorseFirstName />
  </StrictMode>,
)
