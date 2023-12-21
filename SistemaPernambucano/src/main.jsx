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
import ContractsPage from './pages/sistema/app/ContractsPage/ContractsPage.jsx'
import ListContracts from './pages/sistema/app/ContractsPage/ListContracts.jsx'
import ContratoDetalhes from './components/ContratoDetalhes.jsx'
import AddContract from './pages/sistema/app/ContractsPage/AddContract.jsx'

function isMobileView() {
  return window.matchMedia('(max-width: 1210px)').matches;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  isMobileView() ?
    <div>Sistema não compatível com dispositivos móveis</div> :
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><PrivateRoute><TelaInicialSystem /></PrivateRoute></Layout>} />
          <Route path="/ContractsPage" element={<Layout><PrivateRoute><ContractsPage /></PrivateRoute></Layout>} />
          <Route path="/ContractsPage/ListContracts/AddContract" element={<Layout><PrivateRoute><AddContract /></PrivateRoute></Layout>} />
          <Route path="/ContractsPage/ListContracts" element={<Layout><PrivateRoute><ListContracts /></PrivateRoute></Layout>} />
          <Route exact path="/ContractsPage/ListContracts/Contrato/:id" element={<Layout><PrivateRoute><ContratoDetalhes /></PrivateRoute></Layout>} />
          <Route path="/cadastro" element={<Layout><PrivateRoute><CriarConta /></PrivateRoute></Layout>} />
          <Route path="/Login" element={<Layout hideMenuPaths={["/Login"]}><Login /></Layout>} />
          <Route path="*" element={<RotaNaoEncontrada />} />
        </Routes>
      </Router>
    </React.StrictMode>
)