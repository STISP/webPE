import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ContratoDetalhes = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const getContractDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/contracts/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const deleteContract = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/contracts/${id}`);
            navigate('/ListContracts');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteContract = async () => {
        setShowConfirmation(true);
    };

    const confirmDeleteContract = async () => {
        try {
            await deleteContract(id);
            setShowConfirmation(false);
            setShowSuccessMessage(true);
        } catch (error) {
            console.error(error);
        }
    };

    const cancelDeleteContract = () => {
        setShowConfirmation(false);
    };

    const { id } = useParams();
    const [contrato, setContrato] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContractDetails = async () => {
            const contract = await getContractDetails(id);
            setContrato(contract);
        };

        fetchContractDetails();
    }, [id]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleRenewContract = () => {
        // Lógica para renovar o contrato
    };

    const handleDeactivateContract = () => {
        // Lógica para desativar o contrato
    };

    function formatDate(date) {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    }


    return (
        <>
            {contrato && (
                <div className="contract-details">
                    <div className="titleAndButton">
                        <h2 className="contract-details__title">Detalhes do Contrato</h2>
                        <div className='op-details-button'>
                            {contrato.status && (
                                <div className='op-details-button2'>
                                    {contrato.status === 'Ativo' && (
                                        <button className="contract-details__button" onClick={handleDeactivateContract}>Cancelar contrato</button>
                                    )}
                                    {contrato.status === 'Desativado' && (
                                        <>
                                            <button className="contract-details__button" onClick={handleRenewContract}>Ativar contrato</button>
                                        </>
                                    )}
                                    <button className="contract-details__button" onClick={handleDeleteContract}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="14" width="12" viewBox="0 0 448 512" fill='#fff'>
                                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                        </svg>
                                        Deletar contrato
                                    </button>
                                </div>
                            )}
                            <button className="contract-details__button" onClick={handleGoBack}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" fill="#fff">
                                    <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
                                </svg>
                                Voltar
                            </button>
                        </div>
                    </div>

                    {showConfirmation && (
                        <div className="confirmation-modal">
                            <div className='modal-confimation'>
                                <h3>Deletar Contrato</h3>
                                <p>Deseja deletar o contrato <strong>{contrato.clientName}</strong>?</p>
                                <div className="buttonsModal">
                                    <button className='Confirmar-modal' onClick={confirmDeleteContract}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="13" width="12" viewBox="0 0 448 512" fill='#fff'>
                                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                        </svg>
                                        Confirmar
                                    </button>
                                    <button className='Cancelar-modal' onClick={cancelDeleteContract}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showSuccessMessage && (
                        <div className="success-message">
                            <p>Contrato deletado com sucesso!</p>
                        </div>
                    )}

                    <div className="contract-details__info-row">
                        <span className="contract-details__label">Status: </span>
                        <span className="contract-details__value">{contrato.status}</span>
                    </div>
                    <section className="contract-details__info-section">
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Nome do Cliente: </span>
                            <span className="contract-details__value">{contrato.clientName}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Numero do contrato: </span>
                            <span className="contract-details__value">{contrato.contractNumber}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Valor do Contrato: </span>
                            <span className="contract-details__value">R$ {contrato.contractValue}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Data de Início: </span>
                            <span className="contract-details__value">{formatDate(contrato.startDate)}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Data de Vencimento: </span>
                            <span className="contract-details__value">{formatDate(contrato.endDate)}</span>
                        </div>
                        {/*<div className="contract-details__info-row">
                            <span className="contract-details__label">Publicado por: </span>
                            <span className="contract-details__value">{contrato.postedBy}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Data de Publicação: </span>
                            <span className="contract-details__value">{contrato.postedDate}</span>
                        </div>*/}
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Descrição do Contrato</span> <br />
                            <span className="contract-details__value">{contrato.contractDescription}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Termos de Pagamento</span> <br />
                            <span className="contract-details__value">{contrato.paymentTerms}</span>
                        </div>
                        {/*<div className="contract-details__info-row">
                            <span className="contract-details__label">Cláusulas Especiais: </span> <br />
                            <span className="contract-details__value">{contrato.specialClauses}</span>
                        </div>*/}
                    </section>

                    <section className="contract-details__additional-info">
                        {/*<p className="contract-details__subtitle">Informações de Contato:</p>
                        <ul className="contract-details__contact-info">
                            <li><span className="contract-details__label">Endereço:</span> {contrato.address}</li>
                            <li><span className="contract-details__label">Telefone:</span> {contrato.phone}</li>
                            <li><span className="contract-details__label">Email:</span> {contrato.email}</li>
                        </ul>*/}

                        <div className="contract-details__other-details">
                            <div>
                                <span className="contract-details__subtitle">Detalhes do Produto</span> <br />
                                {contrato.productDetails}
                            </div>
                            <div>
                                <span className="contract-details__subtitle">Condições de Rescisão</span> <br />
                                {contrato.terminationConditions}
                            </div>
                        </div>

                        {/*<div className="contract-details__signatures">
                            <p><span className="contract-details__subtitle">Assinaturas:</span></p>
                            <ul className="contract-details__signature-list">
                                <li><span className="contract-details__label">Representante do Supermercado:</span> {contrato.supermarketRep}</li>
                                <li><span className="contract-details__label">Testemunhas:</span> {contrato.witnesses}</li>
                            </ul>
                        </div>*/}
                    </section>
                </div>
            )}
        </>
    );
};

export default ContratoDetalhes;