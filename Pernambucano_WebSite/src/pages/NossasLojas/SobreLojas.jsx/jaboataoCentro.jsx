import '../../../App.css'
import { Link } from 'react-router-dom'
import Menu from '../../../components/menu'
import Footer from '../../../components/Footer'


export default function jaboataoCentro() {
    return (
        <>
            <Menu />

            <section>
                <h5 className='caminho_page'>
                    Página Inicial / Nossas Lojas / Jaboatão Centro
                </h5>
                <h1>Jaboatão Centro</h1>
            </section>

            <Footer />
        </>
    )
}