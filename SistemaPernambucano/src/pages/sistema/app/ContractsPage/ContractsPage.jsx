import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResumoIcon from '../../../../assets/ResumoIcon.svg';

const ContractsPage = () => {
    const [q, setQ] = useState("");
    const [contracts, setContracts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [store, setStore] = useState("");
    const [sortOrder, setSortOrder] = useState('nenhum');
    const [expiredContracts, setExpiredContracts] = useState(false);

    useEffect(() => {
        if (contracts.length === 0) {
            fetchContracts();
        }
    }, []);

    const isValidDate = (dateString) => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
        return dateRegex.test(dateString);
    };

    const getContractColor = (contract) => {
        if (contract.status === 'Desativado') {
            return '#808080';
        } else if (contract.status === 'Ativo') {
            return getDueDateColor(contract.endDate);
        }
    };

    const getDueDateColor = (dueDate) => {
        if (!isValidDate(dueDate)) {
            return 'rgba(0, 0, 0, 0.65)';
        }

        const currentDate = new Date();
        const dueDateObj = new Date(dueDate);
        const differenceInDays = Math.floor((dueDateObj - currentDate) / (1000 * 60 * 60 * 24));

        if (differenceInDays <= 0) {
            return '#ff0000';
        } else if (differenceInDays <= 30) {
            return '#EE7200';
        } else {
            return '#00c104';
        }
    };

    const getAvisoMensagem = (dueDate) => {
        if (!isValidDate(dueDate)) {
            return null;
        }

        const currentDate = new Date();
        const dueDateObj = new Date(dueDate);
        const differenceInDays = Math.floor((dueDateObj - currentDate) / (1000 * 60 * 60 * 24));

        if (differenceInDays <= 0) {
            return 'Contrato vencido';
        } else if (differenceInDays <= 30) {
            return 'Proximo do vencimento';
        } else {
            return null;
        }
    };

    const navigate = useNavigate();
    const handleGoRelatorio = () => {
        navigate('/ContractsPage/RelatoriosContracts');
    };

    function reloadPage() {
        window.location.reload();
    }

    const fetchContracts = () => {
        setIsLoaded(false);
        axios.get('http://192.168.1.70:3000/contracts')
            .then(response => {
                const contractsData = response.data.map(contract => ({
                    id: contract.id,
                    clientName: contract.clientName,
                    endDate: contract.endDate,
                    startDate: contract.startDate,
                    contractValue: contract.contractValue,
                    status: contract.status,
                    loja: contract.loja,
                    postedDate: contract.postedDate,
                }));
                setContracts(contractsData);
                setIsLoaded(true);
            })
            .catch(error => {
                console.error('Erro ao buscar os contratos');
            });
    };

    const storeNames = {
        "MERCADINHO DOM HELDER DE ALIMENTOS LTDA": "P1",
        "MERCANTIL JABOATÃO DE ALIMENTOS LTDA - MATRIZ": "P2",
        "T.H SUPERMERCADO EIRELLI EPP": "P3",
        "COMERCIO DE ALIMENTOS PERNAMBUCANO LTDA": "P4",
        "MERCANTIL DOIS IRMÃOS DE ALIMENTOS LTDA": "P5",
        "MERCANTIL GOIANA DE ALIMENTOS LTDA": "P6",
        "MERCANTIL JABOATAO DE ALIMENTOS LTDA": "P7",
        "COMERCIO DE ALIMENTOS PERNAMBUCANO LTDA - VASCO DA GAMA": "P8",
        "PERNAMBUCO SERVIÇOS ADMINISTRATIVOS EIRELI": "PSA",
    };

    function search(items) {
        let sortedItems = items
            .filter((item) => {
                const clientNameMatches = item.clientName.toLowerCase().indexOf(q.toLowerCase()) > -1;
                const statusMatches = status.length === 0 || status.includes(item.status);
                const storeMatches = store === "" || store === storeNames[item.loja];
                const expiredMatches = !expiredContracts || (expiredContracts && getDueDateColor(item.endDate) === '#ff0000');
                return clientNameMatches && statusMatches && storeMatches && expiredMatches;
            })
            .sort((a, b) => {
                switch (sortOrder) {
                    case 'nenhum':
                        return 0;
                    case 'asc':
                        return a.contractValue - b.contractValue;
                    case 'desc':
                        return b.contractValue - a.contractValue;
                    case 'nearest':
                        const dueDateA = new Date(a.endDate);
                        const dueDateB = new Date(b.endDate);
                        return dueDateA - dueDateB;
                    default:
                        return 0;
                }
            });

        if (sortOrder === 'nenhum') {
            sortedItems = sortedItems.sort((a, b) => {
                const postedDateA = new Date(a.postedDate);
                const postedDateB = new Date(b.postedDate);
                return postedDateB - postedDateA;
            });
        }

        return sortedItems;
    }

    const [status, setStatus] = useState([]);

    const StatusCheckbox = ({ status, setStatus }) => {
        const statusOptions = ["Ativo", "Desativado"];

        const handleChange = (event) => {
            if (event.target.checked) {
                setStatus([...status, event.target.value]);
            } else {
                setStatus(status.filter(status => status !== event.target.value));
            }
        };

        return (
            <div className="status-checkbox">
                {statusOptions.map((statusOption, index) => (
                    <label key={index}>
                        <input
                            id={`status-${index}`}
                            name={`status-${index}`}
                            type="checkbox"
                            value={statusOption}
                            checked={status.includes(statusOption)}
                            onChange={handleChange}
                        />
                        {statusOption}
                    </label>
                ))}

                <label>
                    <input type="checkbox" checked={expiredContracts} onChange={(e) => setExpiredContracts(e.target.checked)} />
                    Contratos Vencidos
                </label>
            </div>
        );
    };

    const StoreSelect = ({ store, setStore }) => {
        const storeOptions = Object.values(storeNames);

        const handleChange = (event) => {
            setStore(event.target.value);
        };

        return (
            <div className="store-select">
                <select value={store} onChange={handleChange}>
                    <option value="">Todas as Lojas</option>
                    {storeOptions.map((storeOption, index) => (
                        <option key={index} value={storeOption}>
                            {storeOption}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    return (
        <div className='view-contracts'>
            <div className='menuContracts'>
                <div className='tituloAndSubtituloPage'>
                    <h1 className='TituloPage'>Lista de Contratos</h1>
                    <p className='SubtituloPage'>Gerenciamento e Detalhes dos Contratos</p>
                </div>
                <div className="buttonsContracts">
                    <button className='add-contract-button' onClick={reloadPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" fill='#fff'>
                            <path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z" />
                        </svg>
                    </button>
                    <button className='add-contract-button' onClick={handleGoRelatorio}>
                        <img src={ResumoIcon} alt="Resumo" />
                        Resumo
                    </button>
                    <Link to="/ContractsPage/AddContract" >
                        <button className='add-contract-button'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" fill='#fff'>
                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                            </svg>
                            Adicionar Contrato
                        </button>
                    </Link>
                </div>
            </div>
            <div className="filerSearch">
                <input autoComplete='off'
                    type="search"
                    name="search-form"
                    id="search-form"
                    className="search-input"
                    placeholder="Pesquisar Contrato"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />
                <select className="OdernarPor" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="nenhum">Ultimos Adicionados</option>
                    <option value="asc">Menor para Maior R$</option>
                    <option value="desc">Maior para Menor R$</option>
                    <option value="nearest">Próximo vencimento</option>
                </select>

                <StoreSelect store={store} setStore={setStore} />
                <StatusCheckbox status={status} setStatus={setStatus} />
            </div>

            {isLoaded ? (
                contracts.length === 0 ? (
                    <div className="WarnListClean">
                        <h2>Lista vazia no momento</h2>
                        <Link to="/ContractsPage/AddContract">Adicione o primeiro contrato clicando aqui</Link>
                    </div>
                ) : (
                    <ul className='contracts-list'>
                        {search(contracts).map((contract) => (
                            <li key={contract.id} className='contract-item'>
                                <Link to={`/ContractsPage/Contrato/${contract.id}`} className='contract-link'>
                                    <div className="contrato-loja" style={{ borderBottom: `5px solid ${getContractColor(contract)}` }}>
                                        <div className='contrato-loja-cliente'>
                                            <p className='nome-loja'>{storeNames[contract.loja]}</p>
                                            <p className='contract-value'>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contract.contractValue)}</p>
                                        </div>
                                        <p className='client-name'>{contract.clientName}</p>
                                    </div>
                                    <div className='contractDetails' style={{ borderBottom: `1px solid ${getContractColor(contract)}`, borderLeft: `1px solid ${getContractColor(contract)}`, borderRight: `1px solid ${getContractColor(contract)}` }}>
                                        <p className={`due-date ${getContractColor(contract)}`} style={{ color: getContractColor(contract), border: `1px solid ${getContractColor(contract)}` }}>{new Date(contract.startDate).toLocaleDateString('pt-BR')} - {new Date(contract.endDate).toLocaleDateString('pt-BR')}</p>
                                        <p className={`due-date ${getContractColor(contract)}`} style={getAvisoMensagem(contract.endDate) ? { color: getContractColor(contract), border: `1px solid ${getContractColor(contract)}` } : {}}>{getAvisoMensagem(contract.endDate)}</p>
                                        <p className={`due-date ${getContractColor(contract)}`} style={{ color: getContractColor(contract), border: `1px solid ${getContractColor(contract)}` }}>{contract.status}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )
            ) : (
                <p>Carregando contratos...</p>
            )}
        </div>
    );
};

export default ContractsPage;