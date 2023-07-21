import { Link } from 'react-router-dom'
import LogoCompleta from '../assets/LogoCompleta.svg'


export default function Menu() {
    return (
        <nav>
            <img src={LogoCompleta} alt="Logo Pernambucano" />
            {/* menu */}
            <ul>
                <li>
                    <Link to="/inicio">Inicio</Link>
                </li>
                <li>
                    <Link to="/Cartao">Cartão</Link>
                </li>
                <li>
                    <Link to="/lojas">Nossas Lojas</Link>
                </li>
                <li>
                    <Link to="/Parceiros">Parceiros</Link>
                </li>
                <li>
                    <Link to="/contatos">Contatos</Link>
                </li>
            </ul>
        </nav>
    )
}
