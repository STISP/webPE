import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ContratoDetalhes = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const getContractDetails = async (id) => {
        try {
            const response = await axios.get(`http://192.168.1.70:3000/contracts/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const deleteContract = async (id) => {
        try {
            await axios.delete(`http://192.168.1.70:3000/contracts/${id}`);
            navigate('/ContractsPage');
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
                        <div className='detalhesPostado'>
                            <h2 className="contract-details__title">Detalhes do Contrato</h2>
                            <p>Postado por {contrato.postedBy} em {formatDate(contrato.postedDate)}</p>
                        </div>
                        <div className='op-details-button'>
                            {contrato.status && (
                                <div className='op-details-button2'>
                                    {/* 
                                    {contrato.status === 'Ativo' && (
                                        <button className="contract-details__button" onClick={handleDeactivateContract}>Cancelar contrato</button>
                                    )}
                                    {contrato.status === 'Desativado' && (
                                        <>
                                            <button className="contract-details__button" onClick={handleRenewContract}>Ativar contrato</button>
                                        </>
                                    )}
                                    */}
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

                    <section className="contract-details__info-section">
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Nome do contrato: </span>
                            <span className="contract-details__value">{contrato.clientName}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Loja do contrato: </span>
                            <span className="contract-details__value">{contrato.loja}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Status: </span>
                            <span className="contract-details__value">{contrato.status}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Numero do contrato: </span>
                            <span className="contract-details__value">{contrato.contractNumber}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Valor do Contrato: </span>
                            <span className="contract-details__value">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contrato.contractValue)}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Data de Início: </span>
                            <span className="contract-details__value">{formatDate(contrato.startDate)}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Data de Vencimento: </span>
                            <span className="contract-details__value">{formatDate(contrato.endDate)}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Descrição do Contrato</span>
                            <span className="contract-details__value">{contrato.contractDescription}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Termos de Pagamento</span>
                            <span className="contract-details__value">{contrato.paymentTerms}</span>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};

export default ContratoDetalhes;