import React from 'react';
import Facebook from '../assets/facebook.svg'
import whatsapp from '../assets/whatsapp.svg'
import Instagram from '../assets/instagram.svg'
import LogoCompleta from '../assets/LogoCompleta.svg'
import { Link } from 'react-router-dom';

const MenuMobileModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    function handleClick() {
        window.scrollTo(0, 0);
        onClose();
    }

    return (
        <div className="modal-menu">
            <div className="op-menu">
                <header>
                    <h1>Menu</h1>
                    <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                </header>
                <section>
                    <div className="linee" />
                    <Link to="/" onClick={onClose}>
                        Inicio
                    </Link>
                    <div className="linee" />
                    <Link to="/lojas" onClick={onClose}>
                        Nossas Lojas
                    </Link>
                    <div className="linee" />
                    <Link to={{ pathname: '/sobre', state: { fromDashboard: true } }} onClick={() => { onClose(); handleClick(); }}>
                        Quem somos
                    </Link>
                    <div className="linee" />
                    <Link to="/Parceiros" onClick={onClose}>
                        Parceiros
                    </Link>
                    <div className="linee" />
                    <a href='https://cartoes.uzecomvoce.com.br/pernambuco' target='_blank' onClick={onClose}>
                        Peça Seu Cartão
                    </a>
                </section>
                <br /><br /><br />
                <section className='menuMobileRedes'>
                    <div className="redesSociais">
                        <a href="https://wa.me/5581999716303"><img loading="lazy" src={whatsapp} alt="whatsapp" /></a>
                        <a href="https://www.facebook.com/people/Supermercados-pernambucano/100063747332450/"><img loading="lazy" src={Facebook} alt="Facebook" /></a>
                        <a href="https://www.instagram.com/supermercadospernambucano/"><img loading="lazy" src={Instagram} alt="Instagram" /></a>
                    </div>
                    <br />
                    <img loading="lazy" src={LogoCompleta} alt="logo" />
                    <br /><br />
                </section>
            </div>
        </div>
    );
};

export default MenuMobileModal;
