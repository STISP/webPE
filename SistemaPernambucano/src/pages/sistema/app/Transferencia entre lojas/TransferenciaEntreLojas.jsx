import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewTransferDado from './components/VIewTransferDado';
import RegistrarTransfer from './components/RegistrarTransferModal';
import AddSimbolo from '../../../../assets/AddSimbolo.svg';
import TransferIcon from '../../../../assets/TransferIcon.svg';
import IconBox from '../../../../assets/IconBox.svg';
import { Link } from 'react-router-dom';

const TransferenciaEntreLojas = () => {
    const [showRegistarTransfer, setShowRegistarTransfer] = useState(false);
    const [transferencias, setTransferencias] = useState([]);

    const handleRegistarTransferClick = () => {
        setShowRegistarTransfer(!showRegistarTransfer);
    };

    const handleCloseRegistarTransfer = () => {
        setShowRegistarTransfer(false);
    };

    const fetchTransferencias = async () => {
        try {
            const response = await axios.get('http://192.168.1.70:3000/transferProducts/all');
            setTransferencias(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTransferencias();
    }, []);

    const handleDeleteSuccess = () => {
        fetchTransferencias();
        fetchTransferenciasPendentes();
        fetchNumeroDeTransferenciaDoMesAtual();
        fetchValorTotalMesAtual();
    };

    const handleAddSuccess = () => {
        fetchTransferencias();
        fetchTransferenciasPendentes();
        fetchNumeroDeTransferenciaDoMesAtual();
        fetchValorTotalMesAtual();
    };

    const [ValorTotalMesAtual, setValorTotalMesAtual] = useState(0);

    const fetchValorTotalMesAtual = async () => {
        try {
            const response = await axios.get('http://192.168.1.70:3000/transferProducts/delivered/totalValue');
            setValorTotalMesAtual(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchValorTotalMesAtual();
    }, []);

    const [NumeroDeTransferenciaDoMesAtual, setNumeroDeTransferenciaDoMesAtual] = useState(0);

    const fetchNumeroDeTransferenciaDoMesAtual = async () => {
        try {
            const response = await axios.get('http://192.168.1.70:3000/transferProducts/delivered/total');
            setNumeroDeTransferenciaDoMesAtual(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchNumeroDeTransferenciaDoMesAtual();
    }, []);

    const [transferenciasPendentes, setTransferenciasPendentes] = useState(0);

    const fetchTransferenciasPendentes = async () => {
        try {
            const response = await axios.get('http://192.168.1.70:3000/transferProducts/pending/total');
            setTransferenciasPendentes(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchTransferenciasPendentes();
    }, []);

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
                    <p>Total transferêrido do mês atual</p>
                </div>
                <div className="NumeroTransferencias">
                    <h2>{NumeroDeTransferenciaDoMesAtual}</h2>
                    <p>Número de transferências do mês atual</p>
                </div>
                <div className="TransferenciasPendentes">
                    <h2>{transferenciasPendentes}</h2>
                    <p>Transferências pendentes</p>
                </div>
            </div>

            <div className="lineTransfer" />

            <div className="botoesTransfer">
                <Link onClick={handleRegistarTransferClick}>
                    <img src={TransferIcon} />
                    <p>Transferir Produtos Entre Lojas</p>
                </Link>

                <Link to="/EstoqueDeProdutos">
                    <img src={IconBox} />
                    <p>Estoque de Materiais</p>
                </Link>

                <Link to="/RelatorioTransferenciaEntreLoja">
                    <img src={AddSimbolo} />
                    <p>Relatorio Completo</p>
                </Link>
            </div>

            <div className="lineTransfer" />

            {transferencias.map((transferencia) => (
                <ViewTransferDado
                    key={transferencia.id}
                    id={transferencia.id}
                    productName={transferencia.productName}
                    productCode={transferencia.productCode}
                    productValue={transferencia.productValue}
                    postDate={new Date(transferencia.postDate).toLocaleDateString('pt-BR')}
                    productQuantity={transferencia.productQuantity}
                    transferDate={new Date(transferencia.transferDate).toLocaleDateString('pt-BR')}
                    deliveryDate={new Date(transferencia.deliveryDate).getFullYear() === 9998 ? 'Pendente' : new Date(transferencia.deliveryDate).toLocaleDateString('pt-BR')}
                    originStore={transferencia.originStore}
                    destinationStore={transferencia.destinationStore}
                    onDeleteSuccess={handleDeleteSuccess}
                />
            ))}

            {showRegistarTransfer && (
                <RegistrarTransfer onClose={handleCloseRegistarTransfer} onAddSuccess={handleAddSuccess} />
            )}
        </div>
    );
};

export default TransferenciaEntreLojas;