import '../../../App.css'
import { Link } from 'react-router-dom'
import Menu from '../../../components/Menu'
import Footer from '../../../components/Footer'
import DetalhesLoja from '../../../components/DetalhesLoja';


export default function VascoDaGama() {
    return (
        <>
            <Menu />

            <section>
                <h5 className='caminho_page'>
                    Página Inicial / Nossas Lojas / Vasco da Gama
                </h5>
                <h1>Vasco da Gama</h1>
            </section>

            <Footer />
        </>
    )
}