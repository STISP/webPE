import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import NossasLojas from './pages/NossasLojas/NossasLojas.jsx'
import Panfletos from './pages//Panfletos.jsx'
import DomHelder from '../src/pages/NossasLojas/SobreLojas.jsx/DomHelder.jsx'
import Olinda from '../src/pages/NossasLojas/SobreLojas.jsx/Olinda.jsx'
import Goiana from '../src/pages/NossasLojas/SobreLojas.jsx/Goiana.jsx'
import SaoLourencoDaMataCentro from '../src/pages/NossasLojas/SobreLojas.jsx/SaoLourencoDaMataCentro.jsx'
import Moreno from '../src/pages/NossasLojas/SobreLojas.jsx/Moreno.jsx'
import VascoDaGama from '../src/pages/NossasLojas/SobreLojas.jsx/VascoDaGama.jsx'
import JaboataoCentro from '../src/pages/NossasLojas/SobreLojas.jsx/jaboataoCentro.jsx'
import Central from './pages/NossasLojas/SobreLojas.jsx/Central.jsx'
import Sobre from './pages/Sobre/Sobre.jsx'
import JaboataoMatriz from './pages/NossasLojas/SobreLojas.jsx/JaboataoMatriz.jsx'
import Layout from './Layout';
import RotaNaoEncontrada from './pages/RotaNaoEncontrada.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/lojas" element={<NossasLojas />} />
          <Route path="/lojas/Dom_Helder" element={<DomHelder />} />
          <Route path="/lojas/Goiana" element={<Goiana />} />
          <Route path="/lojas/jaboatao_Centro" element={<JaboataoCentro />} />
          <Route path="/lojas/JaboataoMatriz" element={<JaboataoMatriz />} />
          <Route path="/lojas/Moreno" element={<Moreno />} />
          <Route path="/lojas/Olinda" element={<Olinda />} />
          <Route path="/lojas/DomHelderServicos" element={<Central />} />
          <Route path="/lojas/SaoLourencoDaMataCentro" element={<SaoLourencoDaMataCentro />} />
          <Route path="/lojas/VascoDaGama" element={<VascoDaGama />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/panfletos" element={<Panfletos />} />
          <Route path="*" element={<RotaNaoEncontrada />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
)
