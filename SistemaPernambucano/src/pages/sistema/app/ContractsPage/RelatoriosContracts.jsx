import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import voltarIcon from '../../../../assets/voltarIcon.svg';
import iconContract from '../../../../assets/iconContract.svg';
import iconContractVencido from '../../../../assets/iconContractVencido.svg';
import valorContractIcon from '../../../../assets/valorContractIcon.svg';
import * as XLSX from 'xlsx';

const RelatoriosContracts = () => {
    const [totalContracts, setTotalContracts] = useState(0);
    const [contracts, setContracts] = useState([]);
    const [selectedStore, setSelectedStore] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [reports, setReports] = useState({});
    const [contractsExpired, setContractsExpired] = useState([]);
    const totalValue = contracts.reduce((acc, value) => acc + value, 0);
    const currentDate = new Date().toLocaleDateString('pt-BR');
    const currentDay = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });
    const [gastoMensal, setgastoMensal] = useState(0);
    const [monthlyExpensesPerStore, setMonthlyExpensesPerStore] = useState({});

    useEffect(() => {
        if (contracts.length === 0) {
            fetch('http://192.168.1.70:3000/contracts')
                .then(response => response.json())
                .then(data => {
                    const activeContracts = data.filter(contract => contract.status === 'Ativo');
                    const contractValues = activeContracts.map(contract => contract.contractValue);
                    setTotalContracts(data.length);
                    setContracts(contractValues);

                    // Iterate over each store and fetch the report
                    const fetchReports = async () => {
                        const reports = {};
                        for (let i = 0; i < stores.length; i++) {
                            const encodedStore = encodeURIComponent(stores[i]);
                            const response = await fetch(`http://192.168.1.70:3000/contracts/reports/${encodedStore}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            });
                            const data = await response.json();
                            reports[stores[i]] = data;
                        }
                        setReports(reports);
                    };
                    fetchReports();
                })
                .catch('Erro ao carregar contratos');

            fetch('http://192.168.1.70:3000/contracts/expired/all')
                .then(response => response.json())
                .then(data => {
                    setContractsExpired(data);
                })
                .catch('Erro ao carregar contratos vencidos');

            fetch('http://192.168.1.70:3000/contracts/monthly/all')
                .then(response => response.json())
                .then(data => {
                    setgastoMensal(data);
                })
                .catch('Erro ao carregar gasto mensal');

            const fetchMonthlyExpensesPerStore = async () => {
                const expenses = {};
                for (let i = 0; i < stores.length; i++) {
                    const encodedStore = encodeURIComponent(stores[i]);
                    const response = await fetch(`http://192.168.1.70:3000/contracts/monthly/${encodedStore}`);
                    const data = await response.json();
                    expenses[stores[i]] = data;
                }
                setMonthlyExpensesPerStore(expenses);
            };
            fetchMonthlyExpensesPerStore();
        }
    }, [contracts]);

    const stores = [
        "MERCADINHO DOM HELDER DE ALIMENTOS LTDA",
        "MERCANTIL JABOATÃO DE ALIMENTOS LTDA - MATRIZ",
        "T.H SUPERMERCADO EIRELLI EPP",
        "COMERCIO DE ALIMENTOS PERNAMBUCANO LTDA",
        "MERCANTIL DOIS IRMÃOS DE ALIMENTOS LTDA",
        "MERCANTIL GOIANA DE ALIMENTOS LTDA",
        "MERCANTIL JABOATAO DE ALIMENTOS LTDA",
        "COMERCIO DE ALIMENTOS PERNAMBUCANO LTDA - VASCO DA GAMA",
        "PERNAMBUCO SERVIÇOS ADMINISTRATIVOS EIRELI"
    ];

    function downloadReport() {
        const rows = transformReportsToRows(reports);
        generateExcelData(rows);
    }

    function generateExcelData(rows) {
        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Contratos');
        XLSX.writeFile(wb, 'Relatório de Contratos.xlsx');
    }

    function transformReportsToRows(reports) {
        return Object.entries(reports).map(([store, stats]) => ({
            'Loja': store,
            'Gasto Mensal R$': new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(monthlyExpensesPerStore[store] || 0),
            'Total de Contratos Ativos R$': stats.totalValue ? stats.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : "0",
            'Contratos Ativos': stats.activeContracts || 0,
            'Contratos Desativados': stats.inactiveContracts || 0,
            'Contratos Vencidos': stats.ExpiredContracts || 0,
            'N° de Registro do Último Mês': stats.contractsLastMonth || 0,
            'Data do Próximo Vencimento': stats.nextExpiration ? new Date(stats.nextExpiration).toLocaleDateString('pt-BR') : "Nenhum"
        }));
    }

    function reloadPage() {
        // Fetch the data again
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.1.70:3000/contracts');
                const data = await response.json();
                const activeContracts = data.filter(contract => contract.status === 'Ativo');
                const contractValues = activeContracts.map(contract => contract.contractValue);
                setTotalContracts(data.length);
                setContracts(contractValues);

                // Iterate over each store and fetch the report
                const reports = {};
                for (let i = 0; i < stores.length; i++) {
                    const encodedStore = encodeURIComponent(stores[i]);
                    const response = await fetch(`http://192.168.1.70:3000/contracts/reports/${encodedStore}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    const data = await response.json();
                    reports[stores[i]] = data;
                }
                setShowConfirmation(true);
                setTimeout(() => setShowConfirmation(false), 3000);
                setReports(reports);

                const responseExpired = await fetch('http://192.168.1.70:3000/contracts/expired/all');
                const dataExpired = await responseExpired.json();
                setContractsExpired(dataExpired);

                const responseMonthly = await fetch('http://192.168.1.70:3000/contracts/monthly/all');
                const dataMonthly = await responseMonthly.json();
                setgastoMensal(dataMonthly);

            } catch (error) {
                console.error('Erro ao carregar contratos', error);
            }

            const fetchMonthlyExpensesPerStore = async () => {
                const expenses = {};
                for (let i = 0; i < stores.length; i++) {
                    const encodedStore = encodeURIComponent(stores[i]);
                    const response = await fetch(`http://192.168.1.70:3000/contracts/monthly/${encodedStore}`);
                    const data = await response.json();
                    expenses[stores[i]] = data;
                }
                setMonthlyExpensesPerStore(expenses);
            };
            fetchMonthlyExpensesPerStore();

        };
        fetchData();
    }

    return (
        <>
            <div className='menuContracts'>
                <div className='tituloAndSubtituloPage'>
                    <h1 className='TituloPage'>Resumo de Contratos</h1>
                    <p className='SubtituloPage'>Data atual: {currentDate} - {currentDay.charAt(0).toUpperCase() + currentDay.slice(1)}</p>
                </div>
                <div className="buttonsContracts">
                    <button className='add-contract-button' onClick={reloadPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" fill='#fff'>
                            <path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z" />
                        </svg>
                    </button>
                    {showConfirmation && <div className='dadosAtualizados'>Atualizado</div>}
                    <button className='add-contract-button' onClick={downloadReport}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512" fill='#fff'>
                            <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 232V334.1l31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31V232c0-13.3 10.7-24 24-24s24 10.7 24 24z" />
                        </svg>
                        Baixar Relatório
                    </button>
                    <Link to="/ContractsPage" >
                        <button className='add-contract-button'>
                            <img src={voltarIcon} />
                            Voltar
                        </button>
                    </Link>
                </div>
            </div>
            <div className='resumoAll'>
                <div className='opContract'>
                    <div className='opViewContractsScreenInicial'>
                        <Link to="/ContractsPage">
                            <div className='iconAndTotalContracts'>
                                <img src={iconContract} />
                                <p>Todos os Contratos</p>
                            </div>
                            <div className="dataAndIcon">
                                <span>{totalContracts} Contratos</span>
                            </div>
                        </Link>
                    </div>

                    <div className='opViewContractsScreenInicial'>
                        <Link to="/ContractsPage">
                            <div className='iconAndTotalContracts iconopview'>
                                <img src={iconContractVencido} />
                                <p>Todos os Contratos Vencidos</p>
                            </div>
                            <div className="dataAndIcon">
                                <span>{contractsExpired} Contratos</span>
                            </div>
                        </Link>
                    </div>

                    <div className='opViewContractsScreenInicial'>
                        <Link to="/ContractsPage">
                            <div className='iconAndTotalContracts iconopview'>
                                <img src={valorContractIcon} />
                                <p>Valor Total de Contratos Ativos</p>
                            </div>
                            <div className="dataAndIcon">
                                <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue)}</span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='opViewContractsScreenInicial'>
                    <div className='iconAndTotalContracts'>
                        <img src={iconContract} />
                        <p>Gasto Mensal Total</p>
                    </div>
                    <div className="dataAndIcon">
                        <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gastoMensal)}</span>
                    </div>
                </div>
            </div>

            <div className="line" />

            <div className="reportLoja">
                <h2>Resumo por lojas</h2>

                {stores.map((store, index) => (
                    <div key={index} className="lojaInfoReport" onClick={() => setSelectedStore(store)}>
                        <h4 className='NomeLojaReport'>{store}</h4>
                        <div className="linePart" />
                        <div className="spaceBack">
                            <div className="lojaInfoReportPart">
                                <div className="tituloAndSpan">
                                    <p>Contratos ativos</p>
                                    <span>{reports[store]?.activeContracts || 0}</span>
                                </div>
                                <div className="linePart2" />
                                <div className="tituloAndSpan">
                                    <p>Contratos desativados</p>
                                    <span>{reports[store]?.inactiveContracts || 0}</span>
                                </div>
                                <div className="linePart2" />
                                <div className='tituloAndSpan'>
                                    <p>Registrados no último mês</p>
                                    <span>{reports[store]?.contractsLastMonth || 0}</span>
                                </div>
                                <div className="linePart2" />
                                <div className="tituloAndSpan">
                                    <p>Gasto mensal</p>
                                    <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(monthlyExpensesPerStore[store] || 0)}</span>
                                </div>
                            </div>

                            <div className="line2" />

                            <div className="lojaInfoReportPart">
                                <div className="tituloAndSpan">
                                    <p>Valor total de contratos ativos</p>
                                    <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(reports[store]?.totalValue || 0)}</span>
                                </div>
                                <div className="linePart2" />
                                <div className="tituloAndSpan">
                                    <p>Próximo vencimento</p>
                                    <span>{reports[store]?.nextExpiration ? new Date(reports[store].nextExpiration).toLocaleDateString('pt-BR') : "Nenhum"}</span>
                                </div>
                                <div className="linePart2" />
                                <div className="tituloAndSpan">
                                    <p>Contratos vencidos</p>
                                    <span>{reports[store]?.ExpiredContracts || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default RelatoriosContracts;
