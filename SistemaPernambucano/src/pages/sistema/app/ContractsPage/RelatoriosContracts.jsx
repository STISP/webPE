import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import voltarIcon from '../../../../assets/voltarIcon.svg';
import iconContract from '../../../../assets/iconContract.svg';
import iconContractVencido from '../../../../assets/iconContractVencido.svg';
import valorContractIcon from '../../../../assets/valorContractIcon.svg';
import IconLink from '../../../../assets/IconLink.svg';

const RelatoriosContracts = () => {
    const [totalContracts, setTotalContracts] = useState(0);
    const [contracts, setContracts] = useState([]);
    const [selectedStore, setSelectedStore] = useState("");

    useEffect(() => {
        if (contracts.length === 0) {
            fetch('http://192.168.1.70:3000/contracts')
                .then(response => response.json())
                .then(data => {
                    const activeContracts = data.filter(contract => contract.status === 'Ativo');
                    const contractValues = activeContracts.map(contract => contract.contractValue);
                    setTotalContracts(data.length);
                    setContracts(contractValues);
                })
                .catch('Erro ao carregar contratos');
        }
    }, [contracts]);

    const totalValue = contracts.reduce((acc, value) => acc + value, 0);

    const currentDate = new Date().toLocaleDateString('pt-BR');
    const currentDay = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });

    const [reports, setReports] = useState({});

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
        }
    }, [contracts]);

    const stores = [
        "COMERCIO DE ALIMENTOS PERNAMBUCANO - CENTRAL DE SERVIÇOS",
        "MERCADINHO DOM HELDER DE ALIMENTOS LTDA",
        "MERCANTIL JABOATÃO DE ALIMENTOS LTDA - MATRIZ",
        "T.H SUPERMERCADO EIRELLI EPP",
        "COMERCIO DE ALIMENTOS PERNAMBUCANO LTDA",
        "MERCANTIL DOIS IRMÃOS DE ALIMENTOS LTDA",
        "MERCANTIL GOIANA DE ALIMENTOS LTDA",
        "MERCANTIL JABOATAO DE ALIMENTOS LTDA",
        "COMERCIO DE ALIMENTOS PERNAMBUCANO LTDA - VASCO DA GAMA"
    ];

    const [showConfirmation, setShowConfirmation] = useState(false);
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
                setTimeout(() => setShowConfirmation(false), 5000);
                setReports(reports);
            } catch (error) {
                console.error('Erro ao carregar contratos', error);
            }
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
                        {showConfirmation && <div>Atualizado</div>}
                    </button>
                    <Link to="/ContractsPage" >
                        <button className='add-contract-button'>
                            <img src={voltarIcon} />
                            Voltar
                        </button>
                    </Link>
                </div>

            </div>
            <div className='opContract'>
                <div className='opViewContractsScreenInicial'>
                    <Link to="/ContractsPage">
                        <div className='iconAndTotalContracts'>
                            <img src={iconContract} />
                            <p>Todos os contratos</p>
                        </div>
                        <div className="dataAndIcon">
                            <span>{totalContracts} Contratos</span>
                            <img src={IconLink} />
                        </div>
                    </Link>
                </div>

                <div className='opViewContractsScreenInicial'>
                    <Link to="/ContractsPage">
                        <div className='iconAndTotalContracts iconopview'>
                            <img src={iconContractVencido} />
                            <p>Contratos vencidos</p>
                        </div>
                        <div className="dataAndIcon">
                            <span>0 Contratos</span>
                            <img src={IconLink} />
                        </div>
                    </Link>
                </div>

                <div className='opViewContractsScreenInicial'>
                    <Link to="/ContractsPage">
                        <div className='iconAndTotalContracts iconopview'>
                            <img src={valorContractIcon} />
                            <p>Valor total de contratos ativos</p>
                        </div>
                        <div className="dataAndIcon">
                            <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue)}</span>
                            <img src={IconLink} />
                        </div>
                    </Link>
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
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default RelatoriosContracts;