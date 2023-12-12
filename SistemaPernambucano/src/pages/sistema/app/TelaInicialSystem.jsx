import '../../../App.css'
import { useState, useEffect } from 'react';
import { MoonLoader } from 'react-spinners';

export default function TelaInicialSystem() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        });

        return () => clearTimeout(timer);
    }, []);
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

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
                    <div className='tituloAndSubtituloPage'>
                        <h1 className='TituloPage'>Bem vindo {nomeCapitalizado}!</h1>
                        <p className='SubtituloPage'>Informações gerais</p>
                    </div>
                </>

            )
            }
        </>
    )
}
