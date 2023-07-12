import '../App.css'
import LogoCompleta from '../assets/LogoCompleta.svg'
import Facebook from '../assets/facebook.svg'
import whatsapp from '../assets/whatsapp.svg'
import Instagram from '../assets/instagram.svg'

export default function Footer() {
    return (
        <>
            <footer>
                <div className="footerAll">
                    <div className="logoAndRedes">
                        <img src={LogoCompleta} alt="logo" />
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at nisi nec eros tempus vulputate. Suspendisse vitae neque consequat, eleifend justo</p>
                        <div className="redesSociais">
                            <img src={whatsapp} alt="whatsapp" />
                            <img src={Facebook} alt="instagram" />
                            <img src={Instagram} alt="facebook" />
                        </div>
                    </div>

                    <div className="institucional">
                        <h3>Institucional</h3>
                        <ul>
                            <li>
                                <a href="#">Quem somos</a>
                            </li>
                            <li>
                                <a href="#">Trabalhe Conosco</a>
                            </li>
                            <li>
                                <a href="#">Venda conosco</a>
                            </li>
                            <li>
                                <a href="#">Política de Privacidade</a>
                            </li>
                        </ul>
                    </div>
                    <div className="CentralDeAtendimento">
                        <h3>Central de Atendimento</h3>
                        <ul>
                            <li>
                                <a href="#">0800 000 000</a>
                            </li>
                            <li>
                                <a href="#">Fale Conosco</a>
                            </li>
                            <li>
                                <a href="#">Encontre uma Loja</a>
                            </li>
                            <li>
                                <a href="#">Formas de Pagamento</a>
                            </li>
                            <li>
                                <a href="#">Trocas e devoluções</a>
                            </li>
                            <li>
                                <a href="#">Dúvidas Frequentes</a>
                            </li>
                            <li>
                                <a href="#">Nossos canais</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="copyright">
                    <p><strong>©</strong> 2021 - Todos os direitos reservados</p>
                </div>
            </footer>
        </>
    )
}