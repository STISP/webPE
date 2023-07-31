
import Menu from '../../components/Menu'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import PoliticaDePrivacidade from '../../pages/Sobre/PoliticaDePrivacidade'


export default function Sobre() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Menu />

            <div className="parceirosAll">
                <p className='caminho_page'>Página Inícial / Sobre</p>



                <PoliticaDePrivacidade isOpen={isModalOpen} onClose={handleCloseModal} />

                <div className="opSobre">
                    <a onClick={handleOpenModal} className="privacidade">
                        <h3>Política de Privacidade</h3>
                        <p>visualizar</p>
                    </a>

                    <div className="trabalheConosco">
                        <h3>Trabalhe Conosco</h3>
                        <p>Lista de cargos disponiveis</p>
                    </div>

                    <Link to='/lojas/DomHelderServicos' className="vendaConosco">
                        <h3>Venda Conosco</h3>
                        <p>Central de serviços</p>
                    </Link>

                    <div className="quemSomos">
                        <h3>Quem Somos</h3>
                        <p>Ler sobre</p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}