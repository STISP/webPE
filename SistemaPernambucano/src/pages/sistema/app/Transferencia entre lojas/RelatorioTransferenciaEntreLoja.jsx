import React, { useState, useEffect } from 'react';

const RelatorioTransferenciaEntreLoja = () => {
    const [data, setData] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('Gere um relatorio para exibir aqui');
    const itemsPerPage = 2;
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async () => {
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
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const totalPages = data && data.products ? Math.ceil(data.products.length / itemsPerPage) : 0;
    const displayedItems = data && data.products ? data.products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];


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
                    {/* <h2>{data.header}</h2> */}
                    <h2 className="titulo">Todas as transferências entre as lojas</h2>
                    <table className="tabela-transferencias">
                        <thead className="cabecalho-tabela">
                            <tr className="linha-cabecalho">
                                <th className="celula-cabecalho">PRODUTO</th>
                                <th className="celula-cabecalho">CÓD. PRODUTO</th>
                                <th className="celula-cabecalho">VALOR UND R$</th>

                                {data.products[0].stores.map((store, index) => (
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
                        </tbody>
                    </table>
                </>
            )}

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
        </div >
    );
};

export default RelatorioTransferenciaEntreLoja;
