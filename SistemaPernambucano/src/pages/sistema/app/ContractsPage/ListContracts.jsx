import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListContracts = () => {
    const [q, setQ] = useState("");
    const [contracts, setContracts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (contracts.length === 0) {
            fetchContracts();
        }
    }, []);

    const isValidDate = (dateString) => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
        return dateRegex.test(dateString);
    };

    const getDueDateColor = (dueDate) => {
        if (!isValidDate(dueDate)) {
            return 'rgba(0, 0, 0, 0.65)'; // Return default color if date is invalid
        }

        const currentDate = new Date();
        const dueDateObj = new Date(dueDate);
        const differenceInDays = Math.floor((dueDateObj - currentDate) / (1000 * 60 * 60 * 24));

        if (differenceInDays <= 15) {
            return 'rgba(164, 2, 2, 0.65)';
        } else if (differenceInDays <= 30) {
            return 'rgba(238, 114, 0, 0.65)';
        } else {
            return 'rgba(0, 133, 3, 0.65)';
        }
    };

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/ContractsPage');
    };

    const fetchContracts = () => {
        setIsLoaded(false); // Set isLoaded to false before fetching contracts
        axios.get('http://localhost:3000/contracts')
            .then(response => {
                const contractsData = response.data.map(contract => ({
                    id: contract.id,
                    clientName: contract.clientName,
                    endDate: contract.endDate,
                    contractValue: contract.contractValue,
                    status: contract.status,
                }));
                setContracts(contractsData);
                setIsLoaded(true);
            })
            .catch(error => {
                console.error('Erro ao buscar os contratos');
            });
    };

    function search(items) {
        return items.filter((item) => {
            const clientNameMatches = item.clientName.toLowerCase().indexOf(q.toLowerCase()) > -1;
            const statusMatches = status.length === 0 || status.includes(item.status);
            return clientNameMatches && statusMatches;
        });
    }

    const [status, setStatus] = useState([]);

    const StatusCheckbox = ({ status, setStatus }) => {
        const statusOptions = ["ativo", "cancelado"];

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
                    <button className='add-contract-button' onClick={handleGoBack}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" fill="#fff">
                            <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
                        </svg>
                        Voltar
                    </button>
                    <Link to="/AddContract" >
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
                <input
                    type="search"
                    name="search-form"
                    id="search-form"
                    className="search-input"
                    placeholder="Pesquisar Contrato"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />
                <StatusCheckbox status={status} setStatus={setStatus} />
            </div>
            {/*<div className='avisoVencimentoWarn'>
                <p className='avisoVencimento'>Aviso de vencimento próximo:</p>
                <div className='avisoVencimentoMaiorQue30'>
                    <p>Vencimento em mais de 30 dias</p>
                </div>
                <div className='avisoVencimento30'>
                    <p>Vencimento em 30 dias</p>
                </div>
                <div className='avisoVencimento15'>
                    <p>Vencimento em 15 dias</p>
                </div>
            </div>*/}

            {isLoaded ? (
                contracts.length === 0 ? (
                    <p>A lista de contratos está vazia.</p>
                ) : (
                    <ul className='contracts-list'>
                        {search(contracts).map((contract) => (
                            <li key={contract.id} className='contract-item'>
                                <Link to={`/Contrato/${contract.id}`} className='contract-link'>
                                    <p className='client-name'>{contract.clientName}</p>
                                    <p className='contract-value'>Valor do Contrato: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contract.contractValue)}</p>
                                    <div className='contractDetails'>
                                        <p className={`due-date ${getDueDateColor(contract.endDate)}`} style={{ backgroundColor: getDueDateColor(contract.endDate) }}>Vencimento: {new Date(contract.endDate).toLocaleDateString('pt-BR')}</p>
                                        <p className='statusListContracts'>{contract.status}</p>
                                        {/*<button className='delete-contract-button' onClick={() => handleDeleteContract(contract.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                                                <path d="M3.09219 0.380273L2.9375 0.6875H0.875C0.494727 0.6875 0.1875 0.994727 0.1875 1.375C0.1875 1.75527 0.494727 2.0625 0.875 2.0625H9.125C9.50527 2.0625 9.8125 1.75527 9.8125 1.375C9.8125 0.994727 9.50527 0.6875 9.125 0.6875H7.0625L6.90781 0.380273C6.7918 0.146094 6.55332 0 6.29336 0H3.70664C3.44668 0 3.2082 0.146094 3.09219 0.380273ZM9.125 2.75H0.875L1.33047 10.0332C1.36484 10.5768 1.81602 11 2.35957 11H7.64043C8.18398 11 8.63516 10.5768 8.66953 10.0332L9.125 2.75Z" fill="white" />
                                            </svg>
                                            Excluir
                                        </button>*/}
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

export default ListContracts;