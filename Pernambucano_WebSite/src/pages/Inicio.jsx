import '../App.css'
import Footer from '../components/Footer'
import Menu from '../components/menu'

export default function TelaInicio() {
    return (
        <>
            <Menu />

            {/* conteudo */}
            <section>
                <div className="maintop">
                    <img src="" alt="Sacola de compras" />
                    <h1>O melhor mercado da região é aqui</h1>
                    <p>Seja bem-vindo! Aqui, nossa missão é oferecer uma
                        experiência de compra excepcional, combinada com uma ampla
                        variedade de produtos de alta qualidade.</p>
                    <button>Contatos</button>
                    <button>Nossas Lojas</button>
                </div>

                <div className='QualidadeVariedadePreco'>
                    <div className="qualidade">
                        <img src="" alt="estrela" />
                        <div className="flex">
                            <h3>Qualidade Garantida</h3>
                            <p>Produtos frescos e de alta qualidade para você</p>
                        </div>
                    </div>
                    <div className="variedade">
                        <img src="" alt="caixas" />
                        <div className="flex">
                            <h3>Variedade de Produtos</h3>
                            <p>Encontre tudo o que você precisa em um só lugar</p>
                        </div>
                    </div>
                    <div className="preco">
                        <img src="" alt="carrinho" />
                        <div className="flex">
                            <h3>Preços Acessíveis</h3>
                            <p>Produtos de qualidade a preços acessíveis.</p>
                        </div>
                    </div>
                </div>

                <div className='maintop2'>
                    <div className="blocoAnuncio">
                        <img src="" alt="anuncio" />
                    </div>

                    <div className="flex">
                        <div className="FacaSeuCartao">
                            <h3>Torne suas compras ainda mais faceis com o nosso cartão!</h3>
                            <button>Faça seu cartão</button>
                        </div>

                        <div className="flex">
                            <div className="vendaComAGente">
                                <h3>Venda com <strong>a gente</strong></h3>
                                <button>Confira</button>
                            </div>

                            <div className="CanaisDeAtendimento">
                                <h3>Canais de atendimento</h3>
                                <button>Confira</button>
                            </div>
                        </div>
                    </div>

                    <div className="parceiros">
                        <h3>Parceiros</h3>
                        <div className="flexInLine">
                            <img src="" alt="parceiro1" />
                            <img src="" alt="parceiro2" />
                            <img src="" alt="parceiro3" />
                            <img src="" alt="parceiro4" />
                            <img src="" alt="parceiro5" />
                            <img src="" alt="parceiro6" />
                        </div>
                    </div>
                    <div className="experiencia">
                        <h3>Aqui sua experiência é o nosso foco</h3>
                    </div>
                </div>

                <Footer />
            </section>
        </>
    )
}



















