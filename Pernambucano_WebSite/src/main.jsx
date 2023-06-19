import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Importando BrowserRouter, Routes e Route
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio.jsx'
import NossasLojas from './pages/NossasLojas.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/lojas" element={<NossasLojas />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
