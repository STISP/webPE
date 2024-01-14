import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import voltarIcon from '../../../../assets/voltarIcon.svg';
import iconContract from '../../../../assets/iconContract.svg';
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

    const [reportData, setReportData] = useState(null);

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

    return (
        <>
            <div className='menuContracts'>
                <div className='tituloAndSubtituloPage'>
                    <h1 className='TituloPage'>Resumo de Contratos</h1>
                    <p className='SubtituloPage'>Data atual: {currentDate} - {currentDay.charAt(0).toUpperCase() + currentDay.slice(1)}</p>
                </div>
                <Link to="/ContractsPage" >
                    <button className='add-contract-button'>
                        <img src={voltarIcon} />
                        Voltar
                    </button>
                </Link>
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