import React, { useState, useEffect } from 'react';

const RelatorioTransferenciaEntreLoja = () => {
    const [data, setData] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchData = async () => {
        const response = await fetch('http://192.168.1.70:3000/transferProducts/report/transferProductsByMonthAndYear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ start: startDate, end: endDate }),
        });

        if (response.ok) {
            const jsonData = await response.json();
            const productsWithAllStores = jsonData.products.map(product => {
                const storeNames = new Set(jsonData.products.flatMap(p => p.stores.map(s => s.name)));
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
        } else {
            console.error('Erro ao buscar os dados');
        }
    };

    const handleSearch = () => {
        fetchData();
    };

    return (
        <div>
            <h1>Relatório de Transferência entre Lojas</h1>

            <div className="search-container">
                <select name="reportType" id="reportType" onChange={e => console.log(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { document.getElementById('startDateInput').focus(); } }}>
                    <option value="1">Todas as transferências entre as lojas</option>
                    <option value="2">Controle de Uso de Material de Expediente (VISÃO GERAL)</option>
                    <option value="2">Material de expediente</option>
                </select>

                <label htmlFor="startDateInput">Data Inicial</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} onKeyDown={e => {
                    if (e.key === 'Enter') {
                        document.getElementById('endDateInput').focus();
                    }
                }} />

                <label htmlFor="endDateInput">Data Final</label>
                <input id="endDateInput" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }} />
                <button onClick={handleSearch}>Buscar</button>
            </div>

            {data && (
                <>
                    {/* <h2>{data.header}</h2> */}
                    <table>
                        <thead>
                            <tr>
                                <th>PRODUTO</th>
                                <th>CÓD. PRODUTO</th>
                                <th>VALOR UND R$</th>

                                {data.products[0].stores.map((store, index) => (
                                    <th key={index}>{store.name}</th>
                                ))}

                                <th>TOTAL</th>
                                <th>VALOR TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.products.map((product, productIndex) => (
                                <tr key={productIndex}>
                                    <td>{product.name}</td>
                                    <td>{product.code}</td>
                                    <td>{product.unitValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>

                                    {data.products[0].stores.map((store, storeIndex) => {
                                        const storeData = product.stores.find(s => s.name === store.name) || { total: 0, value: "R$ 0.00" };
                                        return <td key={storeIndex}>{storeData.total}</td>;
                                    })}

                                    <td>{product.totalQuantity}</td>
                                    <td>{product.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default RelatorioTransferenciaEntreLoja;
