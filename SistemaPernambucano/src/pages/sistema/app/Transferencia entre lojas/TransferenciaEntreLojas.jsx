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
    const [transferenciasPendentes, setTransferenciasPendentes] = useState([]);
    const [allTransferencias, setAllTransferencias] = useState([]);
    const [showTodasTransferencias, setShowTodasTransferencias] = useState(false);

    const handleAbrirTodasTransferencias = () => {
        fetchAllTransferencias();
        setShowTodasTransferencias(current => !current);
    };

    const handleRegistarTransferClick = () => {
        setShowRegistarTransfer(!showRegistarTransfer);
    };

    const handleCloseRegistarTransfer = () => {
        setShowRegistarTransfer(false);
    };

    const fetchTransferencias = async () => {
        try {
            const response = await axios.get('http://192.168.1.70:3000/transferProducts/lastThree');
            setTransferencias(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAllTransferencias = async () => {
        try {
            const response = await axios.get('http://192.168.1.70:3000/transferProducts/all');
            setAllTransferencias(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchTransferenciasPendentes = async () => {
        try {
            const responsePedding = await axios.get('http://192.168.1.70:3000/transferProducts/pending'); // Altere esta URL para a correta
            setTransferenciasPendentes(responsePedding.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTransferencias();
        fetchTransferenciasPendentes();
    }, []);

    const handleDeleteSuccess = () => {
        fetchTransferencias();
        fetchTransferenciasPendentesTotal();
        fetchTransferenciasPendentes();
        fetchNumeroDeTransferenciaDoMesAtual();
        fetchValorTotalMesAtual();
    };

    const handleAddSuccess = () => {
        fetchTransferencias();
        fetchTransferenciasPendentesTotal();
        fetchTransferenciasPendentes();
        fetchNumeroDeTransferenciaDoMesAtual();
        fetchValorTotalMesAtual();
    };

    const handleUpdateSuccess = () => {
        fetchTransferencias();
        fetchTransferenciasPendentesTotal();
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

    const [transferenciasPendentesTotal, setTransferenciasPendentesTotal] = useState(0);

    const fetchTransferenciasPendentesTotal = async () => {
        try {
            const response = await axios.get('http://192.168.1.70:3000/transferProducts/pending/total');
            setTransferenciasPendentesTotal(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchTransferenciasPendentesTotal();
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
                    <h2>{transferenciasPendentesTotal}</h2>
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

            <h2>Ultimas Transferências Realizadas</h2>
            {transferencias.length === 0 ? (
                <p>Nenhuma transferência realizada, faça a primeira transferencia <Link onClick={handleRegistarTransferClick}><strong>clicando aqui</strong></Link></p>
            ) : (
                transferencias.map((transferencia) => (
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
                        onUpdateSuccess={handleUpdateSuccess}
                    />
                ))
            )}

            <h2>Transferências Pendentes</h2>
            {transferenciasPendentes.length === 0 ? (
                <p>Nenhuma transferência pendente</p>
            ) : (
                transferenciasPendentes.map((transferencia) => (
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
                        onUpdateSuccess={handleUpdateSuccess}
                    />
                ))
            )}

            {showRegistarTransfer && (
                <RegistrarTransfer onClose={handleCloseRegistarTransfer} onAddSuccess={handleAddSuccess} />
            )}

            <button className="handleAbrirTodasTransferencias" onClick={handleAbrirTodasTransferencias}>
                {showTodasTransferencias ? (
                    <span className='spanAbrirTodasTransfer'>
                        Fechar todas as transferências
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="15" fill="#fff">
                            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                        </svg>

                    </span>
                ) : (
                    <span>
                        Abrir todas as transferências
                        <svg className='spanAbrirTodasTransfer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="15" fill="#fff">
                            <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                        </svg>
                    </span>
                )}
            </button>

            {showTodasTransferencias && (
                <div>
                    <h2>Todas as Transferências</h2>
                    {allTransferencias.length === 0 ? (
                        <p>Nenhuma transferência realizada</p>
                    ) : (
                        allTransferencias.map((transferencia) => (
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
                                onUpdateSuccess={handleUpdateSuccess}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default TransferenciaEntreLojas;