import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const RelatorioTransferenciaEntreLoja = () => {
    const [data, setData] = useState(null);
    const [stationeryData, setStationeryData] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('Gere um relatorio para exibir aqui');
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [hourTimeVerification, setHourTimeVerification] = useState('Nenhuma');
    const [expedientMaterial, setExpedientMaterial] = useState([]);
    const [expedientMaterialStore, setExpedientMaterialStore] = useState('P1');
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        expedientMaterialAPI();
    }, [expedientMaterialStore]);

    const StoreButton = ({ storeName }) => (
        <button className={expedientMaterialStore === storeName ? 'active' : ''} onClick={() => setExpedientMaterialStore(storeName)}>
            {storeName}
        </button>
    );

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
        expedientMaterialAPI();
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

    const expedientMaterialAPI = async () => {
        const response = await fetch('http://192.168.1.70:3000/transferProducts/report/expenditureMaterial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ storeName: expedientMaterialStore, start: startDate, end: endDate }),
        });

        if (response.ok) {
            const data = await response.json();
            setExpedientMaterial(data);
        } else {
            console.error('Erro ao buscar os dados');
        }
    };

    const months = Object.keys(expedientMaterial).sort();

    function downloadTablesAsExcel() {
        const workbook = XLSX.utils.book_new();

        const table1 = document.querySelector('.tabela-transferencias1');
        const table2 = document.querySelector('.tabela-transferencias2');
        const tables3 = Array.from(document.querySelectorAll('.tabela-transferencias3'));

        const sheet1 = XLSX.utils.table_to_sheet(table1);
        XLSX.utils.book_append_sheet(workbook, sheet1, "Todas as transferências");

        const sheet2 = XLSX.utils.table_to_sheet(table2);
        XLSX.utils.book_append_sheet(workbook, sheet2, "Controle de Uso (Geral)");

        tables3.forEach((table, index) => {
            const sheet3 = XLSX.utils.table_to_sheet(table);
            XLSX.utils.book_append_sheet(workbook, sheet3, `P${index + 1}`);
        });

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(blob, `Relatório de Transferência - ${startDate.split('-').reverse().join('/')} a ${endDate.split('-').reverse().join('/')}.xlsx`);
    }

    return (
        <div className='relatorioTransferenciaEntreLoja'>
            <div className='menuContracts'>
                <button onClick={handleBack}>Voltar</button>
            </div>
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
                        {status === 'Carregado' && <button className="downloadRelatorioTransferencia" onClick={downloadTablesAsExcel}>Baixar Relatório</button>}
                    </div>
                </div>
            </div>

            <div className="line" />

            {status === 'Carregando...' && <p className='avisoCarregamentoRelatorioTransfer'>Carregando...</p>}
            {status === 'Nada encontrado' && <p className='avisoCarregamentoRelatorioTransfer'>Nada encontrado</p>}
            {status === 'Gere um relatorio para exibir aqui' && <p className='avisoCarregamentoRelatorioTransfer'>Gere um relatorio para exibir aqui</p>}

            {
                status === 'Carregado' && data && displayedItems && displayedItems[0] && (
                    <p>
                        <p className='utimaSolicitacaoHour'>Última solicitação às {hourTimeVerification}</p>
                        <h2 className="titulo">{data.header}</h2>

                        <div style={{ overflowX: 'auto', maxWidth: '52.5rem' }}>
                            <table className="tabela-transferencias1" style={{ whiteSpace: 'nowrap' }}>
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
                                    <table className="tabela-transferencias2">
                                        <thead className="cabecalho-tabela">
                                            <tr className="linha-cabecalho">
                                                <th className="celula-cabecalho">PRODUTOS</th>

                                                {Array.from(new Set(stationeryData.products.flatMap(p => p.stores.map(s => s.name)))).sort().map((store, index) => (
                                                    <th key={index} className="celula-cabecalho" colSpan={2}>{store}</th>
                                                ))}

                                                <th className="celula-cabecalho" colSpan="1" rowSpan="2" style={{ whiteSpace: 'nowrap' }}>QUANT. TOTAL</th>
                                                <th className="celula-cabecalho" colSpan="1" rowSpan="2" style={{ whiteSpace: 'nowrap' }}>VALOR TOTAL</th>
                                            </tr>
                                            <tr className="linha-cabecalho">
                                                <th className="celula-cabecalho"></th>

                                                {Array.from(new Set(stationeryData.products.flatMap(p => p.stores.map(s => s.name)))).sort().flatMap((store, index) => (
                                                    [<th key={`${index}-q`} className="celula-cabecalho">Quant.</th>, <th key={`${index}-v`} className="celula-cabecalho">Valor</th>]
                                                ))}

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

                                <h2 className="titulo">Uso de Material de Expediente por Loja</h2>
                                <div className="buttonsStore">
                                    <StoreButton storeName="P1" />
                                    <StoreButton storeName="P2" />
                                    <StoreButton storeName="P3" />
                                    <StoreButton storeName="P4" />
                                    <StoreButton storeName="P5" />
                                    <StoreButton storeName="P6" />
                                    <StoreButton storeName="P7" />
                                    <StoreButton storeName="P8" />
                                </div>
                            </>
                        )}

                        {expedientMaterial && expedientMaterial[months[0]] ? (
                            <>
                                <div style={{ overflowX: 'auto', maxWidth: '52.5rem' }}>
                                    <table className="tabela-transferencias3">
                                        <thead className="cabecalho-tabela">
                                            <tr className="linha-cabecalho">
                                                <th className="celula-cabecalho">Produto</th>
                                                {months.map((month) => {
                                                    const monthName = new Date(2022, month - 1).toLocaleString('pt-BR', { month: 'long' });
                                                    return (
                                                        <th key={month} className="celula-cabecalho" colSpan="2">{monthName}</th>
                                                    );
                                                })}
                                                <th className="celula-cabecalho" colSpan="1" rowSpan="2">Quant. total</th>
                                                <th className="celula-cabecalho" colSpan="1" rowSpan="2">Valor total</th>
                                            </tr>
                                            <tr className="linha-cabecalho">
                                                <th></th>
                                                {months.map((month, monthIndex) => (
                                                    <>
                                                        <th key={`${monthIndex}-quantity`} className="celula-cabecalho">Quantidade</th>
                                                        <th key={`${monthIndex}-value`} className="celula-cabecalho">Valor</th>
                                                    </>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="corpo-tabela">
                                            {Object.keys(expedientMaterial[months[0]]).map((product, productIndex) => {
                                                const totalQuantityProduct = months.reduce((total, month) => total + (expedientMaterial[month][product]?.quantity || 0), 0);
                                                const totalValueProduct = months.reduce((total, month) => total + (expedientMaterial[month][product]?.value || 0), 0);
                                                return (
                                                    <tr key={productIndex} className="linha-produto">
                                                        <td className="celula-produto">{product}</td>
                                                        {months.map((month, monthIndex) => {
                                                            const monthData = expedientMaterial[month][product] || {};
                                                            return (
                                                                <>
                                                                    <td key={`${monthIndex}-quantity`} className="celula-produto">{monthData.quantity || 0}</td>
                                                                    <td key={`${monthIndex}-value`} className="celula-produto">{(monthData.value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                                                </>
                                                            );
                                                        })}
                                                        <td className="celula-produto">{totalQuantityProduct}</td>
                                                        <td className="celula-produto">{totalValueProduct.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                                    </tr>
                                                );
                                            })}
                                            <tr className="linha-produto linha-total">
                                                <td className="celula-produto">Total</td>
                                                {months.map((month, monthIndex) => {
                                                    const totalQuantity = expedientMaterial[month] ? Object.values(expedientMaterial[month]).reduce((total, productData) => total + (productData.quantity || 0), 0) : 0;
                                                    const totalValue = expedientMaterial[month] ? Object.values(expedientMaterial[month]).reduce((total, productData) => total + (productData.value || 0), 0) : 0;
                                                    return (
                                                        <>
                                                            <td key={`${monthIndex}-total-quantity`} className="celula-produto">{totalQuantity}</td>
                                                            <td key={`${monthIndex}-total-value`} className="celula-produto">{totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                                        </>
                                                    );
                                                })}
                                                <td className="celula-produto">{months.reduce((total, month) => total + Object.values(expedientMaterial[month]).reduce((total, productData) => total + (productData.quantity || 0), 0), 0)}</td>
                                                <td className="celula-produto">{months.reduce((total, month) => total + Object.values(expedientMaterial[month]).reduce((total, productData) => total + (productData.value || 0), 0), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <p className='semDadosDeUsoDeMaterial'>
                                Sem dados para essa loja nesse período - {startDate.split('-').reverse().join('/')} a {endDate.split('-').reverse().join('/')}
                            </p>)}
                    </p>
                )
            }
        </div>
    );
};

export default RelatorioTransferenciaEntreLoja;
