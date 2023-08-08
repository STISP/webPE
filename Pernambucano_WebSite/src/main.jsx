import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NossasLojas from './pages/NossasLojas/NossasLojas.jsx'
import DomHelder from '../src/pages/NossasLojas/SobreLojas.jsx/DomHelder.jsx'
import Olinda from '../src/pages/NossasLojas/SobreLojas.jsx/Olinda.jsx'
import DomHelderServicos from '../src/pages/NossasLojas/SobreLojas.jsx/DomHelderServicos.jsx'
import Goiana from '../src/pages/NossasLojas/SobreLojas.jsx/Goiana.jsx'
import SaoLourencoDaMataCentro from '../src/pages/NossasLojas/SobreLojas.jsx/SaoLourencoDaMataCentro.jsx'
import Moreno from '../src/pages/NossasLojas/SobreLojas.jsx/Moreno.jsx'
import VascoDaGama from '../src/pages/NossasLojas/SobreLojas.jsx/VascoDaGama.jsx'
import JaboataoCentro from '../src/pages/NossasLojas/SobreLojas.jsx/jaboataoCentro.jsx'
import Contatos from './pages/contatos.jsx'
import Parceiros from './pages/Parceiros.jsx'
import Cartao from './pages/Cartao/Cartao.jsx'
import Radio from './pages/Radio.jsx'
import Central from './pages/NossasLojas/SobreLojas.jsx/Central.jsx'
import Sobre from './pages/Sobre/Sobre.jsx'
import JaboataoMatriz from './pages/NossasLojas/SobreLojas.jsx/JaboataoMatriz.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/lojas" element={<NossasLojas />} />
        <Route path="/lojas/Dom_Helder" element={<DomHelder />} />
        <Route path="/lojas/Dom_Helder_Servicos" element={<DomHelderServicos />} />
        <Route path="/lojas/Goiana" element={<Goiana />} />
        <Route path="/lojas/jaboatao_Centro" element={<JaboataoCentro />} />
        <Route path="/lojas/JaboataoMatriz" element={<JaboataoMatriz />} />
        <Route path="/lojas/Moreno" element={<Moreno />} />
        <Route path="/lojas/Olinda" element={<Olinda />} />
        <Route path="/lojas/DomHelderServicos" element={<Central />} />
        <Route path="/lojas/SaoLourencoDaMataCentro" element={<SaoLourencoDaMataCentro />} />
        <Route path="/lojas/VascoDaGama" element={<VascoDaGama />} />
        <Route path="/contatos" element={<Contatos />} />
        <Route path="/parceiros" element={<Parceiros />} />
        <Route path="/radio" element={<Radio />} />
        <Route path="/Cartao" element={<Cartao />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
