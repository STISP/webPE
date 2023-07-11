import '../../../App.css'
import { Link } from 'react-router-dom'
import Menu from '../../../components/menu'
import Footer from '../../../components/Footer'


export default function SaoLourencoDaMataCentro() {
    return (
        <>
            <Menu />

            <section>
                <h5 className='caminho_page'>
                    Página Inicial / Nossas Lojas / São Lourenço da Mata
                </h5>
                <h1>São Lourenço da Mata</h1>
            </section>

            <Footer />
        </>
    )
}