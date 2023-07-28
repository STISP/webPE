import './App.css'
import { Link } from 'react-router-dom'
import Footer from './components/Footer'
import Menu from './components/Menu'
import SacolaC from './assets/SacolaCompras.svg'
import StarIcon from './assets/starIcon.svg'
import BoxIcon from './assets/boxIcon.svg'
import CarrinhoIcon from './assets/carrinhoIcon.svg'
import Vitarella from './assets/vitarella.png'

export default function App() {
    return (
        <>
            <Menu />
            {/* conteudo */}
            <section>
                <div className="maintop">
                    <div className="esqText">
                        <p className='noMercado'>20 anos de experiência no mercado</p>
                        <h1>O melhor mercado da região é aqui</h1>
                        <p className='bemVindo'>Seja bem-vindo! Aqui, nossa missão é oferecer uma
                            experiência de compra excepcional, combinada com uma ampla
                            variedade de produtos de alta qualidade.</p>
                        <div className='botoes'>
                            <button className='buttonContato'>Contatos</button>
                            <button className='buttonLojas'>Nossas Lojas</button>
                        </div>
                    </div>
                    <img src={SacolaC} alt="Sacola de compras" />
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

                <div className='maintop2'>
                    <div className="blocoAnuncio">
                    </div>

                    <div className="flex2">
                        <div className="FacaSeuCartao">
                            <h3>Torne suas compras ainda mais faceis com o nosso cartão!</h3>
                            <button>Faça seu cartão</button>
                        </div>

                        <div className="entrarEmContato">
                            <div className="vendaComAGente">
                                <h3>alguma coisa </h3>
                                <button>Confira</button>
                            </div>

                            <div className="CanaisDeAtendimento">
                                <h3>alguma coisa</h3>
                                <button>Confira</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="parceiros">
                    <h3>Parceiros</h3>
                    <div className="flexInLine">
                        <img src={Vitarella} alt="parceiro2" />
                        <div className="line" />
                        <img src={Vitarella} alt="parceiro3" />
                        <div className="line" />
                        <img src={Vitarella} alt="parceiro4" />
                        <div className="line" />
                        <img src={Vitarella} alt="parceiro5" />
                        <div className="line" />
                        <img src={Vitarella} alt="parceiro6" />
                        <div className="line" />
                        <img src={Vitarella} alt="parceiro6" />
                        <div className="line" />
                        <img src={Vitarella} alt="parceiro6" />
                        <div className="line" />
                        <img src={Vitarella} alt="parceiro6" />
                        <div className="line" />
                        <img src={Vitarella} alt="parceiro6" />
                        <div className="line" />
                        <img src={Vitarella} alt="parceiro6" />
                        <div className="line" />
                        <Link to="/Parceiros" >ver mais</Link>
                    </div>
                </div>

                <div className="experiencia">
                    <h3>Aqui sua experiência é o nosso foco</h3>
                </div>

                <Footer />
            </section>
        </>
    )
}