import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/sistema/Login.jsx'
import CriarConta from './pages/sistema/Cadastro.jsx'
import RotaNaoEncontrada from './pages/RotaNaoEncontrada.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import TelaInicialSystem from './pages/sistema/app/TelaInicialSystem.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          {/*<Route path="/" element={<App />} />
          <Route path="/SistemaPE" element={<PrivateRoute><TelaInicialSystem /></PrivateRoute>} />*/}
          <Route path="/" element={<PrivateRoute><TelaInicialSystem /></PrivateRoute>} />
          <Route path="/cadastro" element={<CriarConta />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<RotaNaoEncontrada />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
)


