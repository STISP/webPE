import '../../../App.css'
import { useState, useEffect } from 'react';
import { MoonLoader } from 'react-spinners';
import LogoCompleta from '../../../assets/LogoCompletaW.svg'
import { Link } from 'react-router-dom';

export default function TelaInicialSystem() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        });

        return () => clearTimeout(timer);
    }, []);

    const nome = localStorage.getItem('email');
    const nomeSemDomino = nome.replace(/@suppernambucano.com.br/g, '');
    const nomeCapitalizado = nomeSemDomino.charAt(0).toUpperCase() + nomeSemDomino.slice(1);

    return (
        <>
            <br />
            {isLoading ? (
                <div className='centralizado'>
                    <MoonLoader color="#0261a3" loading={isLoading} size={50} />
                </div >
            ) : (
                <>
                    <div className='tituloAndSubtituloPage2'>
                        <a href="https://suppernambucano.com.br/" target="_blank"><img src={LogoCompleta} alt="Logo Pernambucano" /></a>
                        <h1 className='TituloPage'>Bem vindo {nomeCapitalizado}!</h1>
                        <p className='SubtituloPage'>Sistema totalmente desenvolvido por Supermercado Pernambucano</p>
                    </div> <br /> <br />
                    <div className="op">
                        <Link to="/ContractsPage" className='link-contracts'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                                <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" />
                            </svg>
                            Gerencie seus contratos
                        </Link>
                        <Link to="/TransferenciaEntreLojas" className='link-contracts'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                                <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" />
                            </svg>
                            Transferência entre lojas
                        </Link>
                    </div>
                </>
            )
            }
        </>
    )
}
