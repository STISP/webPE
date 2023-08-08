import { Link } from 'react-router-dom'
import LogoCompleta from '../assets/LogoCompleta.svg'
import MenuMobileIcon from '../assets/MenuMobileIcon.svg'
import ModalMenuMobile from '../components/ModalMenuMobile'
import React, { useState } from 'react'

export default function Menu() {
    const [menuMobile, setMenuMobile] = useState(false);

    const MenuHandleOpenModal = () => {
        setMenuMobile(true);
    };

    const handleCloseModal = () => {
        setMenuMobile(false);
    };

    return (
        <nav>
            <Link to="/"><img src={LogoCompleta} alt="Logo Pernambucano" /></Link>
            {/* menu Desktop*/}
            <ul className='menuDesktop'>
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                <li>
                    <Link to="/Parceiros">Parceiros</Link>
                </li>
                <li>
                    <Link to="/lojas">Nossas Lojas</Link>
                </li>
                <li>
                    <a href='https://cartoes.uzecomvoce.com.br/pernambuco' target='_blank'>Cartão</a>
                </li>
            </ul>
            {/* menu Mobile*/}
            <img className='menuMobileIcon' onClick={MenuHandleOpenModal} src={MenuMobileIcon} alt="" />
            <ModalMenuMobile isOpen={menuMobile} onClose={handleCloseModal} />
        </nav>
    )
}
