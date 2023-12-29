import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import RotaNaoEncontrada from './pages/RotaNaoEncontrada.jsx';

const App = React.lazy(() => import('./App.jsx'));
const NossasLojas = React.lazy(() => import('./pages/NossasLojas/NossasLojas.jsx'));
const Panfletos = React.lazy(() => import('./pages/Panfletos.jsx'));
const DomHelder = React.lazy(() => import('../src/pages/NossasLojas/SobreLojas.jsx/DomHelder.jsx'));
const Olinda = React.lazy(() => import('../src/pages/NossasLojas/SobreLojas.jsx/Olinda.jsx'));
const Goiana = React.lazy(() => import('../src/pages/NossasLojas/SobreLojas.jsx/Goiana.jsx'));
const SaoLourencoDaMataCentro = React.lazy(() => import('../src/pages/NossasLojas/SobreLojas.jsx/SaoLourencoDaMataCentro.jsx'));
const Moreno = React.lazy(() => import('../src/pages/NossasLojas/SobreLojas.jsx/Moreno.jsx'));
const VascoDaGama = React.lazy(() => import('../src/pages/NossasLojas/SobreLojas.jsx/VascoDaGama.jsx'));
const JaboataoCentro = React.lazy(() => import('../src/pages/NossasLojas/SobreLojas.jsx/jaboataoCentro.jsx'));
const Central = React.lazy(() => import('./pages/NossasLojas/SobreLojas.jsx/Central.jsx'));
const Sobre = React.lazy(() => import('./pages/Sobre/Sobre.jsx'));
const JaboataoMatriz = React.lazy(() => import('./pages/NossasLojas/SobreLojas.jsx/JaboataoMatriz.jsx'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Suspense fallback={<div></div>}>
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
        </Suspense>
      </Layout>
    </Router>
  </React.StrictMode>
);
