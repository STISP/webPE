import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ShowConfirmationDelete from './showConfirmationDelete-contract';
import IconBack from '../assets/voltarIcon.svg';
import DeleteIcon from '../assets/deleteIcon.svg';


const ContratoDetalhes = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditContract = () => {
        setShowEditModal(true);
    };

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

    function formatDate(date) {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    }

    const handleStartDateChange = (value) => {
        setContrato((prevContrato) => ({
            ...prevContrato,
            startDate: new Date(value),
        }));
    };

    const handleEndDateChange = (value) => {
        setContrato((prevContrato) => ({
            ...prevContrato,
            endDate: new Date(value),
        }));
    };

    const handleStatusChange = (value) => {
        setContrato((prevContrato) => ({
            ...prevContrato,
            status: value,
        }));
    };

    const handleLojaChange = (value) => {
        setContrato((prevContrato) => ({
            ...prevContrato,
            loja: value,
        }));
    };

    const handleDeactivateContract = async () => {

    }

    const handleRenewContract = async () => {

    }
    // quando modifico alguma coisa do modal, ele muda na tela de detalhes e isso não pode acontecer - corrigir.
    // quando clico em salvar, ele não salva as alterações no banco de dados ainda - adicionar. 
    // rota para atualizar os dados: post http://192.168.1.70:3000/contracts/edit/%{id}
    
    // atualizar o website

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
                                        <button className="contract-details__button" onClick={handleDeactivateContract}>Desativar contrato</button>
                                    )}
                                    {contrato.status === 'Desativado' && (
                                        <>
                                            <button className="contract-details__button" onClick={handleRenewContract}>Ativar contrato</button>
                                        </>
                                    )}
                                    */}

                                    <button className="contract-details__button" onClick={handleDeleteContract}>
                                        <img src={DeleteIcon} alt="Icone de deletar" />
                                        Deletar contrato
                                    </button>
                                    <button className="contract-details__button" onClick={handleEditContract}>Editar</button>
                                </div>
                            )}
                            <button className="contract-details__button" onClick={handleGoBack}>
                                <img src={IconBack} alt="Icone de voltar" />
                                Voltar
                            </button>
                        </div>
                    </div>
                    {showEditModal && (
                        <div className="edit-modal">
                            <div className="edit-modal__content">
                                <div className="edit-modal__header">
                                    <h2 className="edit-modal__title">Editar Contrato</h2>
                                </div>

                                <div className="edit-modal__body">
                                    <form className="edit-modal__form" action="">
                                        <div className="edit-modal__form-row">
                                            <label className="edit-modal__label" htmlFor="clientName">Nome do Contrato</label>
                                            <input className="edit-modal__input" type="text" id="clientName" name="clientName" placeholder={contrato.clientName} />
                                        </div>
                                        <div className="edit-modal__form-row">
                                            <label className="edit-modal__label" htmlFor="loja">Loja do Contrato</label>
                                            <select className="edit-modal__input" id="loja" name="loja" value={contrato.loja} onChange={(e) => handleLojaChange(e.target.value)}>
                                                <option value="MERCADINHO DOM HELDER DE ALIMENTOS LTDA">MERCADINHO DOM HELDER DE ALIMENTOS LTDA</option>
                                                <option value="MERCANTIL JABOATÃO DE ALIMENTOS LTDA - MATRIZ">MERCANTIL JABOATÃO DE ALIMENTOS LTDA - MATRIZ</option>
                                                <option value="T.H SUPERMERCADO EIRELLI EPP">T.H SUPERMERCADO EIRELLI EPP</option>
                                                <option value="COMERCIO DE ALIMENTOS PERNAMBUCANO LTDA">COMERCIO DE ALIMENTOS PERNAMBUCANO LTDA</option>
                                                <option value="MERCANTIL DOIS IRMÃOS DE ALIMENTOS LTDA">MERCANTIL DOIS IRMÃOS DE ALIMENTOS LTDA</option>
                                                <option value="MERCANTIL GOIANA DE ALIMENTOS LTDA">MERCANTIL GOIANA DE ALIMENTOS LTDA</option>
                                                <option value="MERCANTIL JABOATAO DE ALIMENTOS LTDA">MERCANTIL JABOATAO DE ALIMENTOS LTDA</option>
                                                <option value="COMERCIO DE ALIMENTOS PERNAMBUCANO LTDA - VASCO DA GAMA">COMERCIO DE ALIMENTOS PERNAMBUCANO LTDA - VASCO DA GAMA</option>
                                                <option value="PERNAMBUCO SERVIÇOS ADMINISTRATIVOS EIRELI">PERNAMBUCO SERVIÇOS ADMINISTRATIVOS EIRELI</option>
                                            </select>
                                        </div>
                                        <div className="edit-modal__form-row">
                                            <label className="edit-modal__label" htmlFor="status">Status</label>
                                            <select className="edit-modal__input" id="status" name="status" value={contrato.status} onChange={(e) => handleStatusChange(e.target.value)}>
                                                <option value="Ativo">Ativo</option>
                                                <option value="Desativado">Desativado</option>
                                            </select>
                                        </div>
                                        <div className="edit-modal__form-row">
                                            <label className="edit-modal__label" htmlFor="contractNumber">Numero do Contrato</label>
                                            <input className="edit-modal__input" type="text" id="contractNumber" name="contractNumber" placeholder={contrato.contractNumber} />
                                        </div>
                                        <div className="edit-modal__form-row">
                                            <label className="edit-modal__label" htmlFor="contractValue">Valor total do Contrato</label>
                                            <input
                                                className="edit-modal__input"
                                                type="number"
                                                id="contractValue"
                                                name="contractValue"
                                                placeholder={(contrato.contractValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                                        </div>
                                        <div className="edit-modal__form-row">
                                            <label className="edit-modal__label" htmlFor="installments">Quantidade de Parcelas</label>
                                            <input className="edit-modal__input" type="number" id="installments" name="installments" placeholder={contrato.installments} />
                                        </div>
                                        <div className="edit-modal__form-row">
                                            <label className="edit-modal__label" htmlFor="monthlyValue">Valor Mensal</label>
                                            <input
                                                className="edit-modal__input"
                                                type="number"
                                                id="monthlyValue"
                                                name="monthlyValue"
                                                placeholder={contrato.monthlyValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            />
                                        </div>
                                        <div className="edit-modal__form-row">
                                            <label className="edit-modal__label" htmlFor="startDate">Data de Início</label>
                                            <input
                                                className="edit-modal__input"
                                                type="date"
                                                id="startDate"
                                                name="startDate"
                                                value={new Date(contrato.startDate).toISOString().split('T')[0]}
                                                onChange={(e) => handleStartDateChange(e.target.value)}
                                            />
                                        </div>
                                        <div className="edit-modal__form-row">
                                            <label className="edit-modal__label" htmlFor="endDate">Data de Vencimento</label>
                                            <input
                                                className="edit-modal__input"
                                                type="date"
                                                id="endDate"
                                                name="endDate"
                                                value={new Date(contrato.endDate).toISOString().split('T')[0]}
                                                onChange={(e) => handleEndDateChange(e.target.value)}
                                            />
                                        </div>
                                        <div className="edit-modal__form-row">
                                            <label className="edit-modal__label" htmlFor="contractDescription">Descrição do Contrato</label>
                                            <input className="edit-modal__input" type="text" id="contractDescription" name="contractDescription" placeholder={contrato.contractDescription} />
                                        </div>
                                        <div className="edit-modal__form-row">
                                            <label className="edit-modal__label" htmlFor="paymentTerms">Termos e forma de pagamento</label>
                                            <input className="edit-modal__input" type="text" id="paymentTerms" name="paymentTerms" placeholder={contrato.paymentTerms} />
                                        </div>
                                        <div className="edit-modal__form-row">
                                            <label className="edit-modal__label" htmlFor="companyName">Nome da Empresa</label>
                                            <input className="edit-modal__input" type="text" id="companyName" name="companyName" placeholder={contrato.companyName} />
                                        </div>
                                        <div className="edit-modal__form-row">
                                            <label className="edit-modal__label" htmlFor="companyFantasyName">Nome Fantasia da Empresa</label>
                                            <input className="edit-modal__input" type="text" id="companyFantasyName" name="companyFantasyName" placeholder={contrato.companyFantasyName} />
                                        </div>
                                        <div className="edit-modal__form-row">
                                            <label className="edit-modal__label" htmlFor="companyPhone">Telefone da Empresa</label>
                                            <input className="edit-modal__input" type="text" id="companyPhone" name="companyPhone" placeholder={contrato.companyPhone} />
                                        </div>
                                        <div className="edit-modal__form-row">
                                            <label className="edit-modal__label" htmlFor="companyEmail">Email da Empresa</label>
                                            <input className="edit-modal__input" type="text" id="companyEmail" name="companyEmail" placeholder={contrato.companyEmail} />
                                        </div>
                                        <div className="edit-modal__form-row">
                                            <label className="edit-modal__label" htmlFor="companyCNPJ">CNPJ da Empresa</label>
                                            <input className="edit-modal__input" type="text" id="companyCNPJ" name="companyCNPJ" placeholder={contrato.companyCNPJ} />
                                        </div>
                                    </form>

                                    <div className="edit-modal__buttons">
                                        <button className="edit-modal__save-button">Salvar</button>
                                        <button className="edit-modal__close-button" onClick={() => setShowEditModal(false)}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {showConfirmation && (
                        <ShowConfirmationDelete contrato={contrato} confirmDeleteContract={confirmDeleteContract} cancelDeleteContract={cancelDeleteContract} />
                    )}

                    {showSuccessMessage && (
                        <div className="success-message">
                            <p>Contrato deletado com sucesso!</p>
                        </div>
                    )}

                    <section className="contract-details__info-section">
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Nome do contrato</span>
                            <span className="contract-details__value">{contrato.clientName}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Loja do contrato</span>
                            <span className="contract-details__value">{contrato.loja}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Status</span>
                            <span className="contract-details__value">{contrato.status}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Numero do contrato</span>
                            <span className="contract-details__value">{contrato.contractNumber}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Valor total do Contrato</span>
                            <span className="contract-details__value">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contrato.contractValue)}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Quantidade de Parcelas</span>
                            <span className="contract-details__value">{contrato.installments}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Valor Mensal</span>
                            <span className="contract-details__value">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contrato.monthlyValue)}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Data de Início</span>
                            <span className="contract-details__value">{formatDate(contrato.startDate)}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Data de Vencimento</span>
                            <span className="contract-details__value">{formatDate(contrato.endDate) === '01/01/9999' ? 'Sem previsão de encerramento' : formatDate(contrato.endDate)}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Descrição do Contrato</span>
                            <span className="contract-details__value">{contrato.contractDescription}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Termos e forma de pagamento</span>
                            <span className="contract-details__value">{contrato.paymentTerms}</span>
                        </div>

                        <h3 className='iconCompanyContract'>Informações da Empresa Contratada</h3>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Nome da Empresa</span>
                            <span className="contract-details__value">{contrato.companyName}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Nome Fantasia da Empresa</span>
                            <span className="contract-details__value">{contrato.companyFantasyName}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Telefone da Empresa</span>
                            <span className="contract-details__value">{contrato.companyPhone}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Email da Empresa</span>
                            <span className="contract-details__value">{contrato.companyEmail}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">CNPJ da Empresa</span>
                            <span className="contract-details__value">{contrato.companyCNPJ}</span>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};

export default ContratoDetalhes;