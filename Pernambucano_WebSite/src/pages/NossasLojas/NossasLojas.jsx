import '../../App.css'
import { Link } from 'react-router-dom'
import Menu from '../../components/menu'
import Footer from '../../components/Footer'
import ConsultaLojas from '../../components/Lojas'

export default function NossasLojas() {
    return (
        <>
            <Menu />

            <section>
                <h5 className='caminho_page'>
                    Página Inicial / Nossas Lojas
                </h5>
                <h1>Escolha a loja</h1>
                <div className="listlojas">
                    <ConsultaLojas
                        ID="Loja1"
                        LinkPage="/lojas/Dom_Helder"
                        loja="Dom Helder"
                        nome="Supermercado Pernambucano"
                        endereco="localização completa bla blabla bla bla blabla bla"
                        horarioOpenClose="08h ás 16h"
                        linkLocalizacao="https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
                        linkWhatsapp="https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
                    />
                    <ConsultaLojas
                        ID="Loja2"
                        LinkPage="/lojas/Goiana"
                        loja="Goiana"
                        nome="Supermercado Pernambucano"
                        endereco="localização completa bla blabla bla bla blabla bla"
                        horarioOpenClose="08h ás 16h"
                        linkLocalizacao="https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
                        linkWhatsapp="https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
                    />
                    <ConsultaLojas
                        ID="Loja3"
                        LinkPage="/lojas/SaoLourencoDaMataCentro"
                        loja="São Lourenco da Mata Centro"
                        nome="Supermercado Pernambucano"
                        endereco="localização completa bla blabla bla bla blabla bla"
                        horarioOpenClose="08h ás 16h"
                        linkLocalizacao="https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
                        linkWhatsapp="https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
                    />
                    <ConsultaLojas
                        ID="Loja4"
                        LinkPage="/lojas/jaboatao_Centro"
                        loja="Jaboatão Centro"
                        nome="Supermercado Pernambucano"
                        endereco="localização completa bla blabla bla bla blabla bla"
                        horarioOpenClose="08h ás 16h"
                        linkLocalizacao="https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
                        linkWhatsapp="https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
                    />
                    <ConsultaLojas
                        ID="Loja5"
                        LinkPage="/lojas/Moreno"
                        loja="Moreno"
                        nome="Supermercado Pernambucano"
                        endereco="localização completa bla blabla bla bla blabla bla"
                        horarioOpenClose="08h ás 16h"
                        linkLocalizacao="https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
                        linkWhatsapp="https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
                    />
                    <ConsultaLojas
                        ID="Loja6"
                        LinkPage="/lojas/Olinda"
                        loja="Olinda"
                        nome="Supermercado Pernambucano"
                        endereco="localização completa bla blabla bla bla blabla bla"
                        horarioOpenClose="08h ás 16h"
                        linkLocalizacao="https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
                        linkWhatsapp="https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
                    />
                    <ConsultaLojas
                        ID="Loja7"
                        LinkPage="/lojas/VascoDaGama"
                        loja="Vasco da Gama"
                        nome="Supermercado Pernambucano"
                        endereco="localização completa bla blabla bla bla blabla bla"
                        horarioOpenClose="08h ás 16h"
                        linkLocalizacao="https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
                        linkWhatsapp="https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
                    />
                    <ConsultaLojas
                        ID="Loja8"
                        LinkPage="/lojas/DomHelderServicos"
                        loja="Dom Helder Centro de Servicos"
                        nome="Supermercado Pernambucano"
                        endereco="localização completa bla blabla bla bla blabla bla"
                        horarioOpenClose="08h ás 16h"
                        linkLocalizacao="https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
                        linkWhatsapp="https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
                    />
                </div>
            </section>

            <Footer />
        </>
    )
}