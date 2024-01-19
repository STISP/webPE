import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ContratoDetalhes = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditContract = () => {
        setShowEditModal(true);
    };

    {/*
    const EditModal = ({ showEditModal, setShowEditModal, id }) => {
        const [contractData, setContractData] = useState({
            // initialize contract data here
            clientName: contrato.clientName,
            loja: contrato.loja,
            status: contrato.status,
            contractNumber: contrato.contractNumber,
            contractValue: contrato.contractValue,
            installments: contrato.installments,
            monthlyValue: contrato.monthlyValue,
            startDate: contrato.startDate,
            endDate: contrato.endDate,
            contractDescription: contrato.contractDescription,
            paymentTerms: contrato.paymentTerms,
            companyName: contrato.companyName,
            companyFantasyName: contrato.companyFantasyName,
            companyPhone: contrato.companyPhone,
            companyEmail: contrato.companyEmail,
            companyCNPJ: contrato.companyCNPJ
        });

        const handleChange = (e) => {
            setContractData({
                ...contractData,
                [e.target.name]: e.target.value
            });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await axios.post(`http://192.168.1.70:3000/contracts/edit/${id}`, contractData);
                setShowEditModal(false);
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        };

        const nome = localStorage.getItem('email');
        const nomeSemDomino = nome.replace(/@suppernambucano.com.br/g, '');
        const nomeCapitalizado = nomeSemDomino.charAt(0).toUpperCase() + nomeSemDomino.slice(1);
        const currentDate = new Date().toISOString().split('T')[0];

        const [isParcelas, setIsParcelas] = useState(false);

        return (
            <div show={showEditModal} onHide={() => setShowEditModal(false)}>
                <div closeButton>
                    <h2>Editar Contrato</h2>
                </div>
                <div>
                    <form>
                        <div>
                            <div className="form-group">
                                <label htmlFor="clientName">Nome do Cliente</label>
                                <input type="text" id="clientName" name="clientName" value={contractData.clientName} onChange={handleChange} placeholder={contractData.clientName} />
                            </div>
                        </div>

                        <div>
                            <div className="form-group">
                                <label htmlFor="contractValue">Valor total do Contrato</label>
                                <input type="number" id="contractValue" name="contractValue" value={contractData.contractValue} onChange={handleChange} placeholder={contractData.contractValue} />
                            </div>
                            <div className="form-group">
                                <label >Parcelado?</label>
                                <select onChange={(e) => setIsParcelas(e.target.value === 'Sim')} required>
                                    <option value="Não">Não</option>
                                    <option value="Sim">Sim</option>
                                </select>
                            </div>
                            {isParcelas && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="installments">Quantidade de parcelas</label>
                                        <input type="number" id="installments" name="installments" value={contractData.installments} onChange={handleChange} placeholder={contractData.installments} />
                                    </div><div className="form-group">
                                        <label htmlFor="monthlyValue">Valor da parcela</label>
                                        <input type="number" id="monthlyValue" name="monthlyValue" value={contractData.monthlyValue} onChange={handleChange} placeholder={contractData.monthlyValue} />
                                    </div>
                                </>
                            )}
                            <div className="form-group">
                                <label htmlFor="contractNumber">Numero do contrato</label>
                                <input type="text" id="contractNumber" name="contractNumber" value={contractData.contractNumber} onChange={handleChange} placeholder={contractData.contractNumber} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="loja">Loja do contrato</label>
                                <select id="loja" name="loja" value={contractData.loja} onChange={handleChange} required>
                                    <option value="" disabled>Selecione a loja</option>
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
                            <div className="form-group">
                                <label htmlFor="startDate">Data de inicio do contrato</label>
                                <input type="date" id="startDate" name="startDate" value={contractData.startDate} onChange={handleChange} placeholder={contractData.startDate} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endDate">Vencimento do contrato</label>
                                <input type="date" id="endDate" name="endDate" value={contractData.endDate} onChange={handleChange} placeholder={contractData.endDate} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status do contrato</label>
                                <select id="status" name="status" value={contractData.status} onChange={handleChange}>
                                    <option value="Ativo">Ativo</option>
                                    <option value="Desativado">Desativado</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="contractDescription">Descrição do contrato</label>
                                <textarea id="contractDescription" name="contractDescription" value={contractData.contractDescription} onChange={handleChange} placeholder={contractData.contractDescription}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="paymentTerms">Termos e forma de pagamento</label>
                                <textarea id="paymentTerms" name="paymentTerms" value={contractData.paymentTerms} onChange={handleChange} placeholder={contractData.paymentTerms}></textarea>
                            </div>

                            <h3 className='iconCompanyContract'>Informações da Empresa Contratada</h3> <br />
                            <div className="form-group">
                                <label htmlFor="companyName">Nome da empresa</label>
                                <input type="text" id="companyName" placeholder={contractData.companyName} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="companyFantasyName">Nome fantasia</label>
                                <input type="text" id="companyFantasyName" placeholder={contractData.companyFantasyName} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="companyCNPJ">CNPJ</label>
                                <input type="text" id="companyCNPJ" placeholder={contractData.companyCNPJ} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="companyPhone">Telefone</label>
                                <input type="text" id="companyPhone" placeholder={contractData.companyPhone} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="companyEmail">Email</label>
                                <input type="text" id="companyEmail" placeholder={contractData.companyEmail} />
                            </div>
                        </div>

                        <div style={{ display: 'none' }}>
                            <div className="form-group">
                                <label htmlFor="postedBy">Usuário atual</label>
                                <input type="text" id="postedBy" value={nomeCapitalizado} onChange={(e) => nomeCapitalizado(e.target.value)} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="postedDate">Data Atual</label>
                                <input type="text" id="postedDate" value={currentDate} onChange={(e) => currentDate(e.target.value)} disabled />
                            </div>
                        </div>

                        <div className="form-buttons">
                            <div className="cancelAndSave">
                                <button className="save-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512" fill='#fff'>
                                        <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                                    </svg>
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
*/}

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
                                        <button className="contract-details__button" onClick={handleDeactivateContract}>Desativar contrato</button>
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
                                    <button className="contract-details__button" onClick={handleEditContract}>Editar</button>
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
                    {/* <EditModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} id={id} />*/}
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
                            <span className="contract-details__value">{formatDate(contrato.endDate)}</span>
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