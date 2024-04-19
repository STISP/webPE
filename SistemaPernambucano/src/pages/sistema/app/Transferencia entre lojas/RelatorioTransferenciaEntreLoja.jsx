import React, { useState, useEffect } from 'react';

const RelatorioTransferenciaEntreLoja = () => {
    const [data, setData] = useState(null);
    const [stationeryData, setStationeryData] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('Gere um relatorio para exibir aqui');
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [hourTimeVerification, setHourTimeVerification] = useState('Nenhuma');

    const hourTime = () => {
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        return `${hour}:${minute}:${second}`;
    };

    const fetchData = async () => {
        setHourTimeVerification(hourTime());
        setStatus('Carregando...');
        const response = await fetch('http://192.168.1.70:3000/transferProducts/report/transferProductsByMonthAndYear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ start: startDate, end: endDate }),
        });

        if (response.ok) {
            const jsonData = await response.json();
            if (jsonData.products.length > 0) {
                const productsWithAllStores = jsonData.products.map(product => {
                    const storeNames = Array.from(new Set(jsonData.products.flatMap(p => p.stores.map(s => s.name)))).sort();
                    const storesWithZero = Array.from(storeNames).map(name => ({
                        name,
                        total: 0,
                        value: "R$ 0.00"
                    }));
                    const existingStores = product.stores.map(store => store.name);
                    const missingStores = storesWithZero.filter(store => !existingStores.includes(store.name));
                    return {
                        ...product,
                        stores: [...product.stores, ...missingStores]
                    };
                });
                setData({ ...jsonData, products: productsWithAllStores });
                setStatus('Carregado');
            } else {
                setStatus('Nada encontrado');
            }
        } else {
            console.error('Erro ao buscar os dados');
            setStatus('Erro ao buscar os dados');
        }
    };

    const handleSearch = () => {
        fetchData();
        hourTime();
        controlOfUseOfStationeryAPI();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const totalPages = data && data.products ? Math.ceil(data.products.length / itemsPerPage) : 0;
    const displayedItems = data && data.products ? data.products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

    const controlOfUseOfStationeryAPI = async () => {
        const response = await fetch('http://192.168.1.70:3000/transferProducts/report/controlOfUseOfStationery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ start: startDate, end: endDate }),
        });

        if (response.ok) {
            const data = await response.json();
            setStationeryData(data);
        } else {
            console.error('Erro ao buscar os dados');
        }
    };

    return (
        <div>
            <div className="menuContracts">
                <div className='tituloAndSubtituloPage'>
                    <h1 className='TituloPage'>Relatório de Transferência entre Lojas</h1>
                    <p className='SubtituloPage'>Aqui você pode gerar relatórios de transferências entre lojas</p>
                </div>
            </div>

            <div className="search-containerRelatorioTransferencia">
                <div className="inputsSearchRelatorioTransferencia">
                    <div className='inputSearchRelatorioTransferencia'>
                        <label htmlFor="startDateInput">Data Inicial</label>
                        <input className='inputSearchRelatorioTransferencia' type="date" value={startDate} onChange={e => setStartDate(e.target.value)} onKeyDown={e => {
                            if (e.key === 'Enter') {
                                document.getElementById('endDateInput').focus();
                            }
                        }} />
                    </div>

                    <div className='inputSearchRelatorioTransferencia'>
                        <label htmlFor="endDateInput">Data Final</label>
                        <input className='inputSearchRelatorioTransferencia' id="endDateInput" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} onKeyDown={e => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }} />
                    </div>
                    <div className="buttonsSearchRelatorioTransferencia">
                        <button className="searchRelatorioTransferencia" onClick={handleSearch}>Gerar Relatório</button>
                    </div>
                </div>
            </div>

            <div className="line" />

            {status === 'Carregando...' && <p className='avisoCarregamentoRelatorioTransfer'>Carregando...</p>}
            {status === 'Nada encontrado' && <p className='avisoCarregamentoRelatorioTransfer'>Nada encontrado</p>}
            {status === 'Gere um relatorio para exibir aqui' && <p className='avisoCarregamentoRelatorioTransfer'>Gere um relatorio para exibir aqui</p>}

            {status === 'Carregado' && data && displayedItems && displayedItems[0] && (
                <>
                    <p className='utimaSolicitacaoHour'>Última solicitação às {hourTimeVerification}</p>
                    <h2 className="titulo">{data.header}</h2>

                    <div style={{ overflowX: 'auto', maxWidth: '52.5rem' }}>
                        <table className="tabela-transferencias" style={{ whiteSpace: 'nowrap' }}>
                            <thead className="cabecalho-tabela">
                                <tr className="linha-cabecalho">
                                    <th className="celula-cabecalho">PRODUTO</th>
                                    <th className="celula-cabecalho">CODIGO</th>
                                    <th className="celula-cabecalho">VALOR UND R$</th>

                                    {data.products[0].stores.sort((a, b) => a.name.localeCompare(b.name)).map((store, index) => (
                                        <th key={index} className="celula-cabecalho">{store.name}</th>
                                    ))}

                                    <th className="celula-cabecalho">TOTAL</th>
                                    <th className="celula-cabecalho">VALOR TOTAL</th>
                                </tr>
                            </thead>
                            <tbody className="corpo-tabela">
                                {displayedItems.map((product, productIndex) => (
                                    <tr key={productIndex} className="linha-produto">
                                        <td className="celula-produto">{product.name}</td>
                                        <td className="celula-produto">{product.code}</td>
                                        <td className="celula-produto">{product.unitValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>

                                        {data.products[0].stores.map((store, storeIndex) => {
                                            const storeData = product.stores.find(s => s.name === store.name) || { total: 0, value: "R$ 0.00" };
                                            return <td key={storeIndex} className="celula-produto">{storeData.total}</td>;
                                        })}

                                        <td className="celula-produto">{product.totalQuantity}</td>
                                        <td className="celula-produto">{product.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    </tr>
                                ))}
                                <tr className="linha-total">
                                    <td className="celula-total">Total</td>
                                    <td className="celula-total"></td>
                                    <td className="celula-total"></td>
                                    {data.products[0].stores.map((store, storeIndex) => {
                                        const totalStore = displayedItems.reduce((total, product) => {
                                            const storeData = product.stores.find(s => s.name === store.name) || { total: 0, value: "R$ 0.00" };
                                            return total + storeData.total;
                                        }, 0);
                                        return <td key={storeIndex} className="celula-total">{totalStore}</td>;
                                    })}
                                    <td className="celula-total">{displayedItems.reduce((total, product) => total + product.totalQuantity, 0)}</td>
                                    <td className="celula-total">
                                        {displayedItems.reduce((total, product) => {
                                            const value = parseFloat(product.totalValue.replace('R$ ', '').replace(',', '.'));
                                            return total + value;
                                        }, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {data && data.products && totalPages > 1 && (
                        <div className="pagination">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Anterior
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={currentPage === index + 1 ? 'active' : ''}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Próximo
                            </button>
                        </div>
                    )}

                    {stationeryData && stationeryData.products && (
                        <>
                            <div className="line" />

                            <h2 className="titulo">{stationeryData.header}</h2>
                            <div style={{ overflowX: 'auto', maxWidth: '52.5rem' }}>
                                <table className="tabela-transferencias">
                                    <thead className="cabecalho-tabela">
                                        <tr className="linha-cabecalho">
                                            <th className="celula-cabecalho">PRODUTOS</th>

                                            {Array.from(new Set(stationeryData.products.flatMap(p => p.stores.map(s => s.name)))).sort().map((store, index) => (
                                                <th key={index} className="celula-cabecalho" colSpan={2}>{store}</th>
                                            ))}

                                            <th className="celula-cabecalho"></th>
                                            <th className="celula-cabecalho"></th>
                                        </tr>
                                        <tr className="linha-cabecalho">
                                            <th className="celula-cabecalho"></th>

                                            {Array.from(new Set(stationeryData.products.flatMap(p => p.stores.map(s => s.name)))).sort().flatMap((store, index) => (
                                                [<th key={`${index}-q`} className="celula-cabecalho">Quant.</th>, <th key={`${index}-v`} className="celula-cabecalho">Valor</th>]
                                            ))}

                                            <th className="celula-cabecalho" style={{ whiteSpace: 'nowrap' }}>QUANT. TOTAL</th>
                                            <th className="celula-cabecalho" style={{ whiteSpace: 'nowrap' }}>VALOR TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody className="corpo-tabela">
                                        {stationeryData.products.map((product, productIndex) => (
                                            <tr key={productIndex} className="linha-produto">
                                                <td className="celula-produto">{product.name}</td>

                                                {Array.from(new Set(stationeryData.products.flatMap(p => p.stores.map(s => s.name)))).sort().flatMap((store, storeIndex) => {
                                                    const storeData = product.stores.find(s => s.name === store) || { quantity: 0, value: 0 };
                                                    return [<td key={`${storeIndex}-q`} className="celula-produto">{storeData.quantity}</td>, <td key={`${storeIndex}-v`} className="celula-produto">{storeData.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>];
                                                })}

                                                <td className="celula-produto">{product.stores.reduce((total, store) => total + store.quantity, 0)}</td>
                                                <td className="celula-produto">
                                                    {product.stores.reduce((total, store) => total + store.value, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="linha-total">
                                            <td className="celula-total">Total</td>

                                            {Array.from(new Set(stationeryData.products.flatMap(p => p.stores.map(s => s.name)))).sort().flatMap((store, storeIndex) => {
                                                const totalStoreQuantity = stationeryData.products.reduce((total, product) => {
                                                    const storeData = product.stores.find(s => s.name === store) || { quantity: 0, value: 0 };
                                                    return total + storeData.quantity;
                                                }, 0);
                                                const totalStoreValue = stationeryData.products.reduce((total, product) => {
                                                    const storeData = product.stores.find(s => s.name === store) || { quantity: 0, value: 0 };
                                                    return total + storeData.value;
                                                }, 0);
                                                return [<td key={`${storeIndex}-tq`} className="celula-total">{totalStoreQuantity}</td>, <td key={`${storeIndex}-tv`} className="celula-total">{totalStoreValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>];
                                            })}

                                            <td className="celula-total">{stationeryData.products.reduce((total, product) => total + product.stores.reduce((total, store) => total + store.quantity, 0), 0)}</td>
                                            <td className="celula-total">
                                                {stationeryData.products.reduce((total, product) => total + product.stores.reduce((total, store) => total + store.value, 0), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="line" />
                        </>
                    )}
                </>
            )}
        </div >
    );
};

export default RelatorioTransferenciaEntreLoja;