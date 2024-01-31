import React, { useState } from 'react';
import ViewTransferDado from './VIewTransferDado';
import RegistrarTransfer from './RegistrarTransfer';

const TransferenciaEntreLojas = () => {
    const [showRegistarTransfer, setShowRegistarTransfer] = useState(false);

    const handleRegistarTransferClick = () => {
        setShowRegistarTransfer(!showRegistarTransfer);
    };

    const handleCloseRegistarTransfer = () => {
        setShowRegistarTransfer(false);
    };

    return (
        <div className="transferencia-entre-lojas">
            <h1>Transferência Entre Lojas</h1>
            <p>Controle de Consumo de Materiais de Expediente</p>

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

            <ViewTransferDado />

            {showRegistarTransfer && (
                <RegistrarTransfer onClose={handleCloseRegistarTransfer}/>
            )}
        </div>
    );
};

export default TransferenciaEntreLojas;