import { Link } from 'react-router-dom'
import AlterarIcon from '../assets/AlterarIcon.svg'
import LogoCA from '../assets/logoCA.svg'

export default function DetalhesLoja(props) {
    return (
        <section id={props.ID}>
            <h5 className='caminho_page'>
                Página Inicial / Nossas Lojas / {props.loja}
            </h5>
            <div className="LojaInfoAndHorarioFuncionamento">
                <div className="LojaInfo">
                    <img src={LogoCA} alt='Logo' />
                    <div className="NomeLocalizacaoHorario">
                        <div className="LojaNome">{props.loja}</div>
                        <div className="LojaEndereco">{props.LojaEndereco}</div>
                        <div className="LojaHorario">iconRelogio {"Fechado ou aberto (fazer codigo)"}{props.LojaHorario}</div>
                    </div>
                    <h5>CNPJ {props.cnpj}</h5>
                    <div className="WhatsappTellAlterarLoja">
                        <a className="LojaWhatsapp">
                            <img src={AlterarIcon} alt="icone alterar loja" /> WhatsApp</a>
                        <div className="LojaTell">iconTell Telefone</div>
                        <Link to="" className="AlterarLoja">iconAlterarLoja Alterar loja</Link>
                    </div>
                </div>
                <div className="HorarioFuncionamento">
                    <p>Segunta{"-" * 25}{props.SegundaASextaI}h até {props.SegundaASextaF}h</p>
                    <p>Terça{"." * 27}{props.SegundaASextaI}h até {props.SegundaASextaF}h</p>
                    <p>Quarta{"." * 26}{props.SegundaASextaI}h até {props.SegundaASextaF}h</p>
                    <p>Quinta{"." * 26}{props.SegundaASextaI}h até {props.SegundaASextaF}h</p>
                    <p>Sexta{"." * 27}{props.SegundaASextaI}h até {props.SegundaASextaF}h</p>
                    <p>Sábado{"." * 26}{props.SabadoI}h até {props.SabadoF}h</p>
                    <p>Domingo{"." * 25}{props.DomingoI}h até {props.DomingoF}h</p>
                </div>
            </div>
            <div className="LojaMapa">
                <iframe src={props.mapaLojaURL} title="Mapa da loja" frameBorder="0" style={{ border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0" />
            </div>
        </section>
    )
}
