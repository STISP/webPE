import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewTransferDado from './components/VIewTransferDado';
import RegistrarTransfer from './components/RegistrarTransferModal';
import AddSimbolo from '../../../../assets/AddSimbolo.svg';
import TransferIcon from '../../../../assets/TransferIcon.svg';

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

    const ValorTotalMesAtual = 30
    const NumeroDeTransferenciaDoMesAtual = 10
    const TransferenciasPendentes = 5

    return (
        <div className="transferencia-entre-lojas">
            <div className="inicioTransferencia">
                <div className='tituloAndSubtituloPage'>
                    <h1 className='TituloPage'>Transferência Entre Lojas</h1>
                    <p className='SubtituloPage'>Controle de Consumo de Materiais de Expediente</p>
                </div>
            </div>

            <div className="lineTransfer" />

            <div className="resumoTranfer">
                <div className="ValorTotalMensal">
                    <h2>{ValorTotalMesAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                    <p>Total Transferêrido no Mês Atual</p>
                </div>
                <div className="NumeroTransferencias">
                    <h2>{NumeroDeTransferenciaDoMesAtual}</h2>
                    <p>Número de Transferências do Mês Atual</p>
                </div>
                <div className="TransferenciasPendentes">
                    <h2>{TransferenciasPendentes}</h2>
                    <p>Transferências Pendentes</p>
                </div>
                <button className='RelatorioTransferCompleto'>
                    <p>Relatorio <br/> Completo</p>
                </button>
            </div>

            <div className="lineTransfer" />

            <div className="botoesTransfer">
                <button onClick={handleRegistarTransferClick}>
                    <img src={TransferIcon} />
                    <p>Transferir Produtos Entre Lojas</p>
                </button>

                <button>
                    <img src={AddSimbolo} />
                    <p>Adicionar Produtos ao Estoque</p>
                </button>

                <button>
                    <img src={{}} />
                    <p>Estoque dos Produtos</p>
                </button>
            </div>

            <div className="lineTransfer" />

            {transferencias.map((transferencia) => (
                <ViewTransferDado
                    key={transferencia.id}
                    productName={transferencia.productName}
                    productCode={transferencia.productCode}
                    productValue={transferencia.productValue}
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