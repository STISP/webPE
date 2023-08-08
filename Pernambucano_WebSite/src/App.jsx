import React, { useState, useEffect } from 'react';
import './App.css'
import { Link } from 'react-router-dom'
import SacolaC from './assets/SacolaCompras.svg'
import StarIcon from './assets/starIcon.svg'
import BoxIcon from './assets/boxIcon.svg'
import CarrinhoIcon from './assets/carrinhoIcon.svg'
import Vitarella from './assets/vitarella.png'

export default function App() {

    const parceiros = [
        { id: 1, imgSrc: Vitarella, altText: 'parceiro1' },
        { id: 2, imgSrc: Vitarella, altText: 'parceiro2' },
        { id: 3, imgSrc: Vitarella, altText: 'parceiro3' },
        { id: 4, imgSrc: Vitarella, altText: 'parceiro4' },
        { id: 5, imgSrc: Vitarella, altText: 'parceiro5' },
        { id: 6, imgSrc: Vitarella, altText: 'parceiro6' },
        { id: 7, imgSrc: Vitarella, altText: 'parceiro7' },
        { id: 8, imgSrc: Vitarella, altText: 'parceiro8' },
        { id: 9, imgSrc: Vitarella, altText: 'parceiro9' },
        { id: 10, imgSrc: Vitarella, altText: 'parceiro10' },
        { id: 11, imgSrc: Vitarella, altText: 'parceiro11' },
    ];


    const [numItemsToShow, setNumItemsToShow] = useState(6);

    const handleResize = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth < 768) {
            setNumItemsToShow(5);
        } else if (windowWidth < 992) {
            setNumItemsToShow(9);
        } else {
            setNumItemsToShow(11);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <section>
                <div className="maintop">
                    <div className="esqText">
                        <p className='noMercado'>20 anos de experiência no mercado</p>
                        <h1>O melhor mercado da região é aqui</h1>
                        <p className='bemVindo'>Seja bem-vindo! Aqui, nossa missão é oferecer uma
                            experiência de compra perfeita, combinada com uma ampla
                            variedade de produtos de alta qualidade.</p>
                        <div className='botoes'>
                            <Link to='/lojas'><button className='buttonContato'>Veja a loja mais proxima</button></Link>
                            <a href='https://cartoes.uzecomvoce.com.br/pernambuco' target='_blank'>
                                <button className='buttonLojas'>Cartão</button>
                            </a>
                        </div>
                    </div>
                    <img src={SacolaC} alt="Sacola de compras" />
                </div>
                <img className='SacolaDeCompras' src={SacolaC} alt="Sacola de compras" />

                <div className='QualidadeVariedadePreco'>
                    <div className="qualidade">
                        <img src={StarIcon} alt="estrela" />
                        <div className="flex">
                            <h3>Qualidade Garantida</h3>
                            <p>Produtos frescos e de alta qualidade para você</p>
                        </div>
                    </div>
                    <div className="line" />
                    <div className="variedade">
                        <img src={BoxIcon} alt="caixas" />
                        <div className="flex">
                            <h3>Variedade de Produtos</h3>
                            <p>Encontre tudo o que você precisa em um só lugar</p>
                        </div>
                    </div>
                    <div className="line" />
                    <div className="preco">
                        <img src={CarrinhoIcon} alt="carrinho" />
                        <div className="flex">
                            <h3>Preços Acessíveis</h3>
                            <p>Produtos de qualidade a preços acessíveis.</p>
                        </div>
                    </div>
                </div>

                <div className='maintop2'>
                    <div className="blocoAnuncio">
                    </div>

                    <div className="flex2">
                        <a href='https://cartoes.uzecomvoce.com.br/pernambuco' target='_blank' className="FacaSeuCartao">
                            <h3>Torne suas compras ainda mais faceis com o nosso cartão!</h3>
                            <button>Faça seu cartão</button>
                        </a>

                        <div className="entrarEmContato">
                            <div className="vendaComAGente">
                                <h3>teste</h3>
                                <button>Confira</button>
                            </div>

                            <div className="CanaisDeAtendimento">
                                <h3>teste</h3>
                                <button>Confira</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="parceiros">
                    <h3>Parceiros</h3>
                </div>

                <div className="parceiros">
                    <div className="flexInLine">
                        {parceiros.slice(0, numItemsToShow).map((parceiro) => (
                            <React.Fragment key={parceiro.id}>
                                <img src={parceiro.imgSrc} alt={parceiro.altText} />
                                <div className="line" />
                            </React.Fragment>
                        ))}
                        <Link to="/Parceiros">ver mais</Link>
                    </div>
                </div>

                <div className="experiencia">
                    <h3>Qualidade e variedade de produtos é aqui</h3>
                </div>
            </section>
        </>
    )
}