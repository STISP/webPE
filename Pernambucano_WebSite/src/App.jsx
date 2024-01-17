import TodosProdutos from './assets/BannerFinalDeSemana.png'
import Verduras from './assets/BannerQuartaVerde.png'
import PromoCarne from './assets/BannerPromoCarne.png'
import './App.css'
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import SacolaC from './assets/SacolaCompras.svg'
import StarIcon from './assets/starIcon.svg'
import BoxIcon from './assets/boxIcon.svg'
import CarrinhoIcon from './assets/carrinhoIcon.svg'
import Padaria from './assets/padaria.png'

export default function App() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [TodosProdutos, PromoCarne, Verduras];
    const [isPaused, setIsPaused] = useState(false);
    const [anosDeExperiencia, setAnosDeExperiencia] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    const intervalRef = useRef();

    useEffect(() => {
        const interval = setInterval(nextSlide, 6000);
        intervalRef.current = interval;
        return () => clearInterval(intervalRef.current);
    }, [currentIndex]);

    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    function handleClick() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        const anoAlvo = 2001;
        const anos = anoAtual - anoAlvo;
        setAnosDeExperiencia(anos);
    }, []);

    return (
        <>
            <section>
                <Link to="/lojas" className='promocoes'>
                    <div className="carousel-container">
                        <div className="carousel-track" onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            {images.map((image, index) => (
                                <div className="carousel-item" key={index}>
                                    <img src={image} alt={`Promoção ${index}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </Link>

                <div className="carousel-indicators">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
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
                        <p className='noMercado'>{anosDeExperiencia} anos de experiência no mercado</p>
                        <h1>O melhor mercado da região é aqui</h1>
                        <p className='bemVindo'>Seja bem-vindo! Aqui, nossa missão é oferecer uma
                            experiência de compra perfeita em nossas lojas, combinada com uma ampla
                            variedade de produtos de alta qualidade.</p>
                        <div className='botoes'>
                            <Link to='/lojas' onClick={handleClick}><button className='buttonContato'>Veja a loja mais proxima</button></Link>
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
                        <a href='https://wa.me/551221360100' target='_blank' className="FacaSeuCartao">
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