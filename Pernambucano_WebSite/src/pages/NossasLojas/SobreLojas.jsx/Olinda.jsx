import '../../../App.css'
import { Link } from 'react-router-dom'
import Menu from '../../../components/menu'
import Footer from '../../../components/Footer'


export default function Olinda() {
    return (
        <>
            <Menu />

            <section>
                <h5 className='caminho_page'>
                    Página Inicial / Nossas Lojas / Olinda
                </h5>
                <h1>Olinda</h1>
            </section>

            <Footer />
        </>
    )
}