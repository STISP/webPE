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
import ContratoDetalhes from './components/ContratoDetalhes.jsx'
import AddContract from './pages/sistema/app/ContractsPage/AddContract.jsx'
import TransferenciaEntreLojas from './pages/sistema/app/Transferencia entre lojas/TransferenciaEntreLojas.jsx'
import RelatoriosContracts from './pages/sistema/app/ContractsPage/RelatoriosContracts.jsx';
import StockProducts from './pages/sistema/app/Transferencia entre lojas/StockProducts.jsx';
import RelatorioTransferenciaEntreLoja from './pages/sistema/app/Transferencia entre lojas/RelatorioTransferenciaEntreLoja.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout><PrivateRoute><TelaInicialSystem /></PrivateRoute></Layout>} />
        <Route path="/ContractsPage" element={<Layout><PrivateRoute><ContractsPage /></PrivateRoute></Layout>} />
        <Route path="/ContractsPage/AddContract" element={<Layout><PrivateRoute><AddContract /></PrivateRoute></Layout>} />
        <Route path="/ContractsPage/RelatoriosContracts" element={<Layout><PrivateRoute><RelatoriosContracts /></PrivateRoute></Layout>} />
        <Route exact path="/ContractsPage/Contrato/:id" element={<Layout><PrivateRoute><ContratoDetalhes /></PrivateRoute></Layout>} />
        <Route path="/TransferenciaEntreLojas" element={<Layout><PrivateRoute><TransferenciaEntreLojas /></PrivateRoute></Layout>} />
        <Route path="/EstoqueDeProdutos" element={<Layout><PrivateRoute><StockProducts /></PrivateRoute></Layout>} />
        <Route path="/RelatorioTransferenciaEntreLoja" element={<Layout><PrivateRoute><RelatorioTransferenciaEntreLoja /></PrivateRoute></Layout>} />
        
        <Route path="/cadastro" element={<Layout><PrivateRoute><CriarConta /></PrivateRoute></Layout>} />
        <Route path="/Login" element={<Layout hideMenuPaths={["/Login"]}><Login /></Layout>} />
        <Route path="*" element={<RotaNaoEncontrada />} />
      </Routes>
    </Router>
  </React.StrictMode>
)