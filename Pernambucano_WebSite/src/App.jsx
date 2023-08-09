import React, { useState, useEffect } from 'react';
import './App.css'
import { Link } from 'react-router-dom'
import SacolaC from './assets/SacolaCompras.svg'
import StarIcon from './assets/starIcon.svg'
import BoxIcon from './assets/boxIcon.svg'
import CarrinhoIcon from './assets/carrinhoIcon.svg'
import Vitarella from './assets/vitarella.png'
import Verduras from './assets/Verduras.svg'
import TodosProdutos from './assets/TodosProdutos.svg'
import Padaria from './assets/padaria.svg'

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

    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [Verduras, TodosProdutos];

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <>
            <section>
                <div className='promocoes'>
                    <div className="carousel-container">
                        <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            {images.map((image, index) => (
                                <div className="carousel-item" key={index}>
                                    <img src={image} alt={`Promoção ${index}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

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
                <div className="maintop">
                    <div className="esqText">
                        <p className='noMercado'>20 anos de experiência no mercado</p>
                        <h1>O melhor mercado da região é aqui</h1>
                        <p className='bemVindo'>Seja bem-vindo! Aqui, nossa missão é oferecer uma
                            experiência de compra perfeita em nossas lojas, combinada com uma ampla
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

                <div className='maintop2'>
                    <div className="blocoAnuncio">
                    </div>

                    <div className="flex2">
                        <a href='https://cartoes.uzecomvoce.com.br/pernambuco' target='_blank' className="FacaSeuCartao">
                            <h3>Torne suas compras ainda mais faceis com o nosso cartão!</h3>
                            <button>Faça seu cartão</button>
                        </a>

                        <div className="entrarEmContato">
                            <div className="padaria">
                                <img src={Padaria} alt="padaria" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="experiencia">
                    <h3>Qualidade e variedade de produtos é aqui</h3>
                </div>
            </section>
        </>
    )
}