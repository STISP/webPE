import React, { useState } from 'react';
import PoliticaDePrivacidade from '../../pages/Sobre/PoliticaDePrivacidade'

export default function Sobre() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTrabalheConoscoAtivo, setIsTrabalheConoscoAtivo] = useState(false);
    const [isQuemSomosAtivo, setIsQuemSomosAtivo] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleTrabalheConoscoClick = () => {
        setIsTrabalheConoscoAtivo(true);
        setIsQuemSomosAtivo(false);
    };

    const handleQuemSomosClick = () => {
        setIsQuemSomosAtivo(true);
        setIsTrabalheConoscoAtivo(false);
    };

    return (
        <>
            <p className='caminho_page'>Página Inícial / Sobre</p>

            <PoliticaDePrivacidade isOpen={isModalOpen} onClose={handleCloseModal} />

            <div className="opSobre">
                <a onClick={handleOpenModal} className="privacidade">
                    <h3>Política de Privacidade</h3>
                    <p>visualizar</p>
                </a>

                <div className='trabalheConosco-vendaConosco-quemSomos'>
                    <div className={`quemSomos ${isQuemSomosAtivo ? 'ativo' : ''}`} onClick={handleQuemSomosClick}>
                        <h3>Quem Somos</h3>
                        <p>Ler sobre</p>
                    </div>
                    <div className={`trabalheConosco ${isTrabalheConoscoAtivo ? 'ativo' : ''}`} onClick={handleTrabalheConoscoClick}>
                        <h3>Trabalhe Conosco</h3>
                        <p>Lista de cargos disponiveis</p>
                    </div>
                </div>
            </div>
            {isTrabalheConoscoAtivo && (
                <div className="trabalheConoscoAtivo">
                    <h1>Vagas disponiveis:</h1>
                    <div className='vagasAll'>
                        {/*<div className="vaga">Vendas</div>*/}
                        <div className="vaga">Gerente de loja</div>
                        <div className="vaga">Estoquista</div>
                        <div className="vaga">Operador(a) de loja</div>
                        <div className="vaga">Balconista</div>
                    </div>
                    <p>Envie seu currículo com a vaga que deseja e sua foto para o email: <a href="mailto:vagasemsupermercadope@gmail.com">vagasemsupermercadope@gmail.com</a></p>
                </div>
            )}
            {isQuemSomosAtivo && (
                <div className="quemSomoAtivo">
                    <h1>Quem somos</h1>
                    <p className='quemSomosInfo'>Somos uma empresa de supermercado dedicada a oferecer uma experiência de compra excepcional aos nossos clientes. Desde a nossa inauguração em 3 de setembro de 2010, nos esforçamos para fornecer uma variedade de produtos com qualidade garantida e preços acessíveis.
                        <br /><br />
                        Nosso compromisso com a satisfação do cliente está no centro de tudo o que fazemos. Acreditamos que a melhor maneira de atender às necessidades de nossos clientes é oferecer uma ampla variedade de produtos, cuidadosamente selecionados, para todos os gostos e orçamentos. Além disso, estamos sempre em busca de promoções semanais para que você possa economizar ainda mais em suas compras.
                        <br /><br />
                        Como empresa do setor varejista, nos especializamos em produtos de padaria, laticínios, doces, balas e itens semelhantes. Nossa equipe está empenhada em garantir que todos os produtos em nossas prateleiras atendam aos mais altos padrões de qualidade.
                        <br /><br />
                        No Supermercado Pernambucano, buscamos constantemente inovação, tanto em conhecimentos quanto em produtos e serviços. Valorizamos o feedback dos nossos clientes e estamos sempre prontos para adaptar nossas ofertas de acordo com suas necessidades.
                        <br /><br />
                        Agradecemos por escolher o Supermercado Pernambucano como seu destino de compras. Esperamos que você aproveite a variedade de produtos, a qualidade garantida e os preços acessíveis que oferecemos. Seja você um cliente frequente ou esteja nos visitando pela primeira vez, estamos comprometidos em fornecer uma experiência excepcional a cada visita.
                        <br /><br />
                        Obrigado por fazer parte da nossa jornada!
                    </p>
                </div>
            )}
            <br /><br />
        </>
    )
}
