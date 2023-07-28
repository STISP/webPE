import '../../../App.css'
import { Link } from 'react-router-dom'
import Menu from '../../../components/Menu'
import Footer from '../../../components/Footer'
import DetalhesLoja from '../../../components/DetalhesLoja';


export default function Moreno() {
    return (
        <>
            <Menu />

            <section>
                <h5 className='caminho_page'>
                    Página Inicial / Nossas Lojas / Moreno
                </h5>
                <h1>Moreno</h1>
            </section>

            <Footer />
        </>
    )
}