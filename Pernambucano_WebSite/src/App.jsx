import { useState, useEffect } from 'react';
import './App.css'
import { Link } from 'react-router-dom'
import SacolaC from './assets/SacolaCompras.svg'
import StarIcon from './assets/starIcon.svg'
import BoxIcon from './assets/boxIcon.svg'
import CarrinhoIcon from './assets/carrinhoIcon.svg'
import Verduras from './assets/verduras.svg'
import TodosProdutos from './assets/TodosProdutos.svg'
import Padaria from './assets/padaria.svg'

export default function App() {

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
                                    <img loading="lazy" src={image} alt={`Promoção ${index}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='QualidadeVariedadePreco'>
                    <div className="qualidade">
                        <img loading="lazy" src={StarIcon} alt="estrela" />
                        <div className="flex">
                            <h3>Qualidade Garantida</h3>
                            <p>Produtos frescos e de alta qualidade para você</p>
                        </div>
                    </div>
                    <div className="line" />
                    <div className="variedade">
                        <img loading="lazy" src={BoxIcon} alt="caixas" />
                        <div className="flex">
                            <h3>Variedade de Produtos</h3>
                            <p>Encontre tudo o que você precisa em um só lugar</p>
                        </div>
                    </div>
                    <div className="line" />
                    <div className="preco">
                        <img loading="lazy" src={CarrinhoIcon} alt="carrinho" />
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
                            <a href='https://wa.me/551221360100' target='_blank' rel="noreferrer">
                                <button className='buttonLojas'>Peça seu Cartão</button>
                            </a>
                        </div>
                    </div>
                    <img loading="lazy" src={SacolaC} alt="Sacola de compras" />
                </div>
                <img loading="lazy" className='SacolaDeCompras' src={SacolaC} alt="Sacola de compras" />

                <div className='maintop2'>
                    <div className="blocoAnuncio">
                    </div>
                    <div className="flex2">
                        <a href='https://wa.me/551221360100' target='_blank' className="FacaSeuCartao" rel="noreferrer">
                            <h3>Torne suas compras ainda mais faceis com o nosso cartão!</h3>
                            <button>Peça seu cartão</button>
                        </a>
                        <div className="entrarEmContato">
                            <div className="padaria">
                                <img loading="lazy" src={Padaria} alt="padaria" />
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