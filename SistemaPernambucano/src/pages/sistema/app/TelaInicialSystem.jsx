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

    return (
        <>
        <br />
            {isLoading ? (
                <div className='centralizado'>
                    <MoonLoader color="#0261a3" loading={isLoading} size={50} />
                </div >
            ) : (
                <h1 style={{ display: 'flex', justifyContent: 'center', height: '80vh', alignItems: 'center' }}>
                    Bem vindo ao sistema do Pernambucano
                </h1>
            )
            }
        </>
    )
}
