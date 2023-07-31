
import React from 'react'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import Vitarella from '../assets/vitarella.png'


export default function Parceiros() {
    return (
        <>
            <Menu />

            <div className="parceirosAll">
                <p className='caminho_page'>Página Inícial / Parceiros</p>
                <h2 className='TituloParceiros'>Confira nossos relacionamentos de sucesso!</h2>

                <div className='Parceiros'>
                    <div className='marca'>
                        <img src={Vitarella} alt="Logo da marca" />
                    </div>
                    <div className='marca'>
                        <img src={Vitarella} alt="Logo da marca" />
                    </div>
                    <div className='marca'>
                        <img src={Vitarella} alt="Logo da marca" />
                    </div>
                    <div className='marca'>
                        <img src={Vitarella} alt="Logo da marca" />
                    </div>
                    <div className='marca'>
                        <img src={Vitarella} alt="Logo da marca" />
                    </div>
                    <div className='marca'>
                        <img src={Vitarella} alt="Logo da marca" />
                    </div>
                    <div className='marca'>
                        <img src={Vitarella} alt="Logo da marca" />
                    </div>
                    <div className='marca'>
                        <img src={Vitarella} alt="Logo da marca" />
                    </div>
                    <div className='marca'>
                        <img src={Vitarella} alt="Logo da marca" />
                    </div>
                    <div className='marca'>
                        <img src={Vitarella} alt="Logo da marca" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}