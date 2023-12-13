import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ListContracts = () => {
    const handleAddContract = () => {
    };

    const handleSaveContract = () => {
        // logica para salvar um contrato
    };

    const handleDeleteContract = (contractId) => {
        // Lógica para excluir um contrato com base no ID
    };


    const getContractsList = () => {
        return [
            {
                id: 1,
                clientName: 'Cliente 1',
                contractValue: 1000,
                dueDate: '01/03/2024',
                postedBy: 'Usuário 1',
                postedDate: '01/01/2022',
                status: 'Ativo',
                contractDescription: 'Contrato para fornecimento mensal de produtos alimentícios.',
                paymentTerms: 'Pagamento parcelado em 3 vezes, nos dias 5, 15 e 25 de cada mês.',
                specialClauses: 'Caso haja atraso no pagamento, será aplicada multa de 2% ao valor total do contrato.',
                contactInformation: {
                    address: 'Rua das Mercadorias, 123',
                    phone: '(XX) XXXX-XXXX',
                    email: 'contato@supermercadoA.com'
                },
                productDetails: 'Fornecimento de produtos alimentícios conforme especificações no anexo A.',
                terminationConditions: 'O contrato pode ser rescindido mediante aviso prévio de 30 dias, sujeito a uma taxa de rescisão de 10% do valor total.',
                signatures: {
                    supermarketRep: 'Assinatura do Representante do Supermercado A',
                    witnesses: ['Nome da Testemunha 1', 'Nome da Testemunha 2']
                }
            },
            {
                id: 2,
                clientName: 'Cliente 2',
                contractValue: 2000,
                dueDate: '02/01/2025',
                postedBy: 'Usuário 2',
                postedDate: '02/01/2022',
                status: 'Expirado',
                contractDescription: 'Contrato para fornecimento de produtos de limpeza e higiene.',
                paymentTerms: 'Pagamento à vista na entrega dos produtos.',
                specialClauses: 'Qualquer alteração nos produtos deve ser notificada com 15 dias de antecedência.',
                contactInformation: {
                    address: 'Avenida dos Produtos de Limpeza, 456',
                    phone: '(YY) YYYY-YYYY',
                    email: 'compras@supermercadoB.com'
                },
                productDetails: 'Fornecimento de produtos de limpeza conforme lista de produtos no anexo B.',
                terminationConditions: 'Rescisão possível com aviso prévio de 60 dias, sem taxa de rescisão se dentro dos termos do contrato.',
                signatures: {
                    supermarketRep: 'Assinatura do Representante do Supermercado B',
                    witnesses: ['Nome da Testemunha 3', 'Nome da Testemunha 4']
                }
            },
            {
                id: 3,
                clientName: 'Cliente 3',
                contractValue: 3000,
                dueDate: '12/20/2023',
                postedBy: 'Usuário 3',
                postedDate: '03/01/2022',
                status: 'Cancelado',
                contractDescription: 'Contrato para fornecimento de frutas e verduras frescas.',
                paymentTerms: 'Pagamento em duas parcelas iguais, uma no início e outra no meio do período de fornecimento.',
                specialClauses: 'Produtos fornecidos devem atender aos padrões de qualidade estabelecidos.',
                contactInformation: {
                    address: 'Travessa das Hortaliças, 789',
                    phone: '(ZZ) ZZZZ-ZZZZ',
                    email: 'compras@supermercadoC.com'
                },
                productDetails: 'Fornecimento de frutas e verduras frescas, especificadas no contrato.',
                terminationConditions: 'Rescisão permitida somente em casos de não conformidade com os padrões de qualidade acordados.',
                signatures: {
                    supermarketRep: 'Assinatura do Representante do Supermercado C',
                    witnesses: ['Nome da Testemunha 5', 'Nome da Testemunha 6']
                }
            },
            {
                id: 4,
                clientName: 'Cliente 4',
                contractValue: 1500,
                dueDate: '12/20/2023',
                postedBy: 'Usuário 3',
                postedDate: '03/01/2022',
                status: 'Renovado',
                contractDescription: 'Contrato para fornecimento de produtos congelados.',
                paymentTerms: 'Pagamento em três parcelas mensais após a entrega dos produtos.',
                specialClauses: 'Qualquer mudança nos termos deve ser acordada por escrito pelas partes envolvidas.',
                contactInformation: {
                    address: 'Rua dos Congelados, 1010',
                    phone: '(WW) WWWW-WWWW',
                    email: 'compras@supermercadoD.com'
                },
                productDetails: 'Fornecimento de produtos congelados conforme especificado no contrato.',
                terminationConditions: 'Rescisão possível mediante aviso prévio de 90 dias, sujeito a uma taxa de rescisão de 5% do valor total.',
                signatures: {
                    supermarketRep: 'Assinatura do Representante do Supermercado D',
                    witnesses: ['Nome da Testemunha 7', 'Nome da Testemunha 8']
                }
            }
        ];
    };

    const getDueDateColor = (dueDate) => {
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

    const [q, setQ] = useState("");
    const [contracts, setContracts] = useState([]);

    function search(items) {
        return items.filter((item) => {
            const clientNameMatches = item.clientName.toLowerCase().indexOf(q.toLowerCase()) > -1;
            const statusMatches = status.length === 0 || status.includes(item.status);
            return clientNameMatches && statusMatches;
        });
    } useEffect(() => {
        setContracts(getContractsList());
    }, []);
    const [status, setStatus] = useState([]);

    const StatusCheckbox = ({ status, setStatus }) => {
        const statusOptions = ["Ativo", "Expirado", "Cancelado"];

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
            {getContractsList().length === 0 ? (
                <p>A lista de contratos está vazia.</p>
            ) : (
                <ul className='contracts-list'>
                    {search(getContractsList()).map((contract) => (
                        <li key={contract.id} className='contract-item'>
                            <Link to={`/Contrato/${contract.id}`} className='contract-link'>
                                <p className='client-name'>{contract.clientName}</p>
                                <p className='contract-value'>Valor do Contrato: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contract.contractValue)}</p>
                                <div className='contractDetails'>
                                    <p className={`due-date ${getDueDateColor(contract.dueDate)}`} style={{ backgroundColor: getDueDateColor(contract.dueDate) }}>Vencimento: {new Date(contract.dueDate).toLocaleDateString('pt-BR')}</p>
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
            )}
        </div>
    );
};

export default ListContracts;