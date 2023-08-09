import '../App.css'
import LogoCompleta from '../assets/LogoCompleta.svg'
import Facebook from '../assets/facebook.svg'
import whatsapp from '../assets/whatsapp.svg'
import Instagram from '../assets/instagram.svg'
import PoliticaDePrivacidade from '../pages/Sobre/PoliticaDePrivacidade'
import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import PaymentMethodsModal from '../pages/Sobre/PaymentMethodsModal'

export default function Footer() {
    const [PoliticModalOpen, setPoliticModalOpen] = useState(false);
    const [PaymentModalOpen, setPaymentModalOpen] = useState(false);

    const PoliticHandleOpenModal = () => {
        setPoliticModalOpen(true);
    };

    const PaymentHandleOpenModal = () => {
        setPaymentModalOpen(true);
    };

    const handleCloseModal = () => {
        setPaymentModalOpen(false);
        setPoliticModalOpen(false);
    };

    function handleClick() {
        window.scrollTo(0, 0);
    }

    const handleTrabalheConoscoLinkClick = () => {
        setIsTrabalheConoscoAtivo(true);
        setIsQuemSomosAtivo(false);
    };

    return (
        <>
            <footer>
                <div className="footerAll">
                    <div className="logoAndRedes">
                        <img src={LogoCompleta} alt="logo" />
                        <p>Produtos de alta qualidade para você e sua família.</p>
                        <div className="redesSociais">
                            <img src={whatsapp} alt="whatsapp" />
                            <img src={Facebook} alt="instagram" />
                            <img src={Instagram} alt="facebook" />
                        </div>
                    </div>

                    <div className="institucional">
                        <h3>Institucional</h3>
                        <ul>
                            <li>
                                <Link to={{ pathname: '/sobre', state: { fromDashboard: true } }} onClick={handleClick}>
                                    Quem somos
                                </Link>
                            </li>
                            <li>
                                <Link to={{ pathname: '/sobre', state: { fromDashboard: true } }} onClick={handleTrabalheConoscoLinkClick}>
                                    Trabalhe Conosco
                                </Link>
                            </li>
                            <li>
                                <Link to={{ pathname: '/lojas/DomHelderServicos', state: { fromDashboard: true } }} onClick={handleClick}>
                                    Venda conosco
                                </Link>
                            </li>
                            <li>
                                <a onClick={PoliticHandleOpenModal}>Política de Privacidade</a>
                            </li>
                        </ul>

                        <PoliticaDePrivacidade isOpen={PoliticModalOpen} onClose={handleCloseModal} />
                    </div>
                    <div className="CentralDeAtendimento">
                        <h3>Central de Atendimento</h3>
                        <ul>
                            <li>
                                <a href='tel:(81) 3361 1155'>(81) 3361 1155 </a>
                            </li>
                            <li>
                                <Link to={{ pathname: '/lojas', state: { fromDashboard: true } }} onClick={handleClick}>
                                    Fale Conosco
                                </Link>
                            </li>
                            <li>
                                <Link to={{ pathname: '/lojas', state: { fromDashboard: true } }} onClick={handleClick}>
                                    Encontre uma Loja
                                </Link>
                            </li>
                            <li>
                                <a onClick={PaymentHandleOpenModal}>Formas de Pagamento</a>
                            </li>
                        </ul>
                        <PaymentMethodsModal isOpen={PaymentModalOpen} onClose={handleCloseModal} />
                    </div>
                    <div className="Recebapromocoes">
                        <h3>Receba novidades e descontos especiais</h3>
                        <p>inscreva-se e ganhe as melhores promoções disponíveis e muito mais.</p>
                        <div className='inputEmail'>
                            <input name="email" type="text" placeholder="Digite seu email" />
                            <button type="button">Enviar</button>
                        </div>

                    </div>
                </div>

                <div className="copyright">
                    <p><strong>©</strong> 2023 - Todos os direitos reservados</p>
                </div>
            </footer>
        </>
    )
}