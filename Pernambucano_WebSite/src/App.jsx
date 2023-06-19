import './App.css'
import { Link } from 'react-router-dom'

export default function App() {
  return (
    <>
    <h1>TEST PAGES</h1>
      <h2>Supermercado Pernambucano</h2>
      <p className="read-the-docs">
        Seja Bem Vindo
      </p>
      <Link to="/inicio"><button>Inicio</button></Link>
      <Link to="/Lojas"><button>Nossas Lojas</button></Link>
    </>
  )
}