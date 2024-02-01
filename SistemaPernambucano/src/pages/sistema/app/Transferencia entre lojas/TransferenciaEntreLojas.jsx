import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewTransferDado from './components/VIewTransferDado';
import RegistrarTransfer from './components/RegistrarTransferModal';

const TransferenciaEntreLojas = () => {
    const [showRegistarTransfer, setShowRegistarTransfer] = useState(false);
    const [transferencias, setTransferencias] = useState([]);

    const handleRegistarTransferClick = () => {
        setShowRegistarTransfer(!showRegistarTransfer);
    };

    const handleCloseRegistarTransfer = () => {
        setShowRegistarTransfer(false);
    };

    useEffect(() => {
        const fetchTransferencias = async () => {
            try {
                const response = await axios.get('http://192.168.1.70:3000/transferProducts');
                setTransferencias(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTransferencias();
    }, []);

    return (
        <div className="transferencia-entre-lojas">
            <div className="inicioTransferencia">
                <div className='tituloAndSubtituloPage'>
                    <h1 className='TituloPage'>Transferência Entre Lojas</h1>
                    <p className='SubtituloPage'>Controle de Consumo de Materiais de Expediente</p>
                </div>
            </div>

            <div className="line" />

            <div className="resumoTranfer">
                <div className="ValorTotalMensal">
                    <h2></h2>
                    <p>Total Transferêrido no Mês Atual</p>
                </div>
                <div className="NumeroTransferencias">
                    <h2></h2>
                    <p>Número de Transferências do Mês Atual</p>
                </div>
            </div>

            <div className="line" />

            <div className="botoes">
                <button onClick={handleRegistarTransferClick}>
                    <img src={{}} />
                    <p>Transferir Produto</p>
                </button>

                <button>
                    <img src={{}} />
                    <p>Ver Todas as Transferências</p>
                </button>

                <button>
                    <img src={{}} />
                    <p>Adicionar Produto</p>
                </button>
            </div>

            <div className="line" />

            {transferencias.map((transferencia) => (
                <ViewTransferDado
                    key={transferencia.id}
                    productName={transferencia.productName}
                    productCode={transferencia.productCode}
                    postDate={transferencia.postDate}
                    productQuantity={transferencia.productQuantity}
                    transferDate={transferencia.transferDate}
                    deliveryDate={transferencia.deliveryDate}
                    originStore={transferencia.originStore}
                    destinationStore={transferencia.destinationStore}
                />
            ))}

            {showRegistarTransfer && (
                <RegistrarTransfer onClose={handleCloseRegistarTransfer} />
            )}
        </div>
    );
};

export default TransferenciaEntreLojas;