import '../../../App.css'
import { useState, useEffect } from 'react';
import { MoonLoader } from 'react-spinners';

export default function TelaInicialSystem() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
    
        return () => clearTimeout(timer);
      }, []);

    return (
        <>
            {isLoading ? (
                <div className='centralizado'>
                    <MoonLoader color="#0261a3" loading={isLoading} size={60} />
                </div >
            ) : (
                <h1 style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
                    Bem vindo ao sistema do Pernambucano
                </h1>
            )
            }
        </>
    )
}
