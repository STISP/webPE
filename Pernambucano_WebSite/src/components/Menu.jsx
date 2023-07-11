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
                    <Link to="">Cartão</Link>
                </li>
                <li>
                    <Link to="">Nossas Lojas</Link>
                </li>
                <li>
                    <Link to="">Parceiros</Link>
                </li>
                <li>
                    <Link to="">Contatos</Link>
                </li>
            </ul>
        </nav>
    )
}
