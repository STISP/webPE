import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddContract = () => {
    const nome = localStorage.getItem('email');
    const nomeSemDomino = nome.replace(/@suppernambucano.com.br/g, '');
    const nomeCapitalizado = nomeSemDomino.charAt(0).toUpperCase() + nomeSemDomino.slice(1);
    const currentDate = new Date().toISOString().split('T')[0];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSaveContract = async (event) => {
        event.preventDefault();
        try {
            const clientName = document.getElementById('clientName').value;
            const contractValue = document.getElementById('contractValue').value;
            const contractNumber = document.getElementById('contractNumber').value;
            const startDate = document.getElementById('startDate').value;
            const endDateElement = document.getElementById('endDate');
            const endDate = endDateElement ? endDateElement.value : "9999-01-01 00:00:00";
            const status = document.getElementById('status').value;
            const contractDescription = document.getElementById('contractDescription').value;
            const paymentTerms = document.getElementById('paymentTerms').value;
            const postedBy = document.getElementById('postedBy').value;
            const postedDate = document.getElementById('postedDate').value;
            const loja = document.getElementById('loja').value;
            const companyPhone = document.getElementById('companyPhone').value;
            const companyEmail = document.getElementById('companyEmail').value;
            const companyName = document.getElementById('companyName').value;
            const companyFantasyName = document.getElementById('companyFantasyName').value;
            const companyCNPJ = document.getElementById('companyCNPJ').value;
            const installments = document.getElementById('installments') ? document.getElementById('installments').value : 1;
            const monthlyValue = document.getElementById('monthlyValue') ? document.getElementById('monthlyValue').value : contractValue;

            if (!clientName || !contractValue || !contractNumber || !startDate || !status || !contractDescription || !paymentTerms || !postedBy || !postedDate || !loja || !companyName || !companyFantasyName || !companyCNPJ || !installments || !monthlyValue) {
                setErrorMessage('Por favor, preencha todos os campos obrigatorios!');
                return;
            }

            const contractData = {
                clientName,
                contractValue,
                contractNumber,
                startDate,
                endDate,
                status,
                contractDescription,
                paymentTerms,
                postedBy: nomeCapitalizado,
                postedDate: currentDate,
                loja: loja,
                companyPhone: companyPhone || 'Nenhum',
                companyEmail: companyEmail || 'Nenhum',
                companyName,
                companyFantasyName,
                companyCNPJ,
                installments,
                monthlyValue,
            };

            setSuccessMessage(`Contrato ${clientName} salvo com sucesso!`);
            setIsModalOpen(true);
            axios.post('http://192.168.1.70:3000/contracts', contractData);
        } catch (error) {
            console.error('Erro ao salvar contrato:', error);
            setErrorMessage('Problema ao cadastrar o contrato, tente novamente ou contate o suporte.');
        }
    };

    const handleModalButtonClick = (action) => {
        if (action === 'contracts') {
            navigate('/ContractsPage');
        } else if (action === 'add') {
            setIsModalOpen(false);
            window.location.reload();
        }
    };

    const [firstLoad, setFirstLoad] = useState(true);
    const handleCancel = () => {
        if (firstLoad) {
            navigate('/ContractsPage');
        } else {
            navigate(-1);
        }
        setFirstLoad(false);
    };

    function handleInvalid(event) {
        event.preventDefault();
    }

    const [isParcelas, setIsParcelas] = useState(false);
    const [isVencimento, setIsVencimento] = useState(true);

    return (
        <div className="add-contract">
            <div className="info-contract">
                <div className="info-contract-content">
                    <div className='addAndBackButton'>
                        <h2>Adicionar novo contrato</h2>
                        <button className="back-button" onClick={handleCancel}>
                            Cancelar
                        </button>
                    </div>
                    <form autocomplete="off">
                        <div>
                            <div className="form-group">
                                <label htmlFor="clientName">*Nome do contrato</label>
                                <input type="text" id="clientName" placeholder="Digite o nome do contrato" required />
                            </div>
                        </div>

                        <div>
                            <div className="form-group">
                                <label htmlFor="contractValue">*Valor total do Contrato</label>
                                <input type="number" id="contractValue" placeholder="Digite o valor do contrato" onInvalid={handleInvalid} required />
                            </div>
                            <div className="form-group">
                                <label>Parcelado?</label>
                                <select onChange={(e) => setIsParcelas(e.target.value === 'Sim')} required>
                                    <option value="Não">Não</option>
                                    <option value="Sim">Sim</option>
                                </select>
                            </div>
                            {isParcelas && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="installments">*Quantidade de parcelas</label>
                                        <input type="number" id="installments" placeholder="Digite a quantidade de parcelas" onInvalid={handleInvalid} required />
                                    </div><div className="form-group">
                                        <label htmlFor="monthlyValue">*Valor da parcela</label>
                                        <input type="number" id="monthlyValue" placeholder="Digite o valor da parcela" onInvalid={handleInvalid} required />
                                    </div>
                                </>
                            )}
                            <div className="form-group">
                                <label htmlFor="contractNumber">*Numero do contrato</label>
                                <input type="number" id="contractNumber" placeholder="Digite o numero do contrato" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="loja">*Loja do contrato</label>
                                <select id="loja" defaultValue="" required>
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
                                <label htmlFor="startDate">*Data de inicio do contrato</label>
                                <input type="date" id="startDate" placeholder="Digite a data de início do contrato" required />
                            </div>
                            {isVencimento && (
                                <div className="form-group">
                                    <label htmlFor="endDate">*Vencimento do contrato</label>
                                    <input type="date" id="endDate" placeholder="Digite a data de vencimento do contrato" />
                                </div>
                            )}
                            <div className="form-group">
                                <label className='data-indeterminada' htmlFor="endDateIndeterminada">
                                    <input type="checkbox" id="endDateIndeterminada" onChange={(e) => setIsVencimento(!e.target.checked)} />
                                    Marque se o contrato não tiver data de vencimento
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">*Status do contrato</label>
                                <select id="status" required>
                                    <option value="Ativo">Ativo</option>
                                    <option value="Desativado">Desativado</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="contractDescription">*Descrição do contrato</label>
                                <textarea id="contractDescription" placeholder="Digite a descrição do contrato" required></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="paymentTerms">*Termos e forma de pagamento</label>
                                <textarea id="paymentTerms" placeholder="Digite os termos de pagamento" required></textarea>
                            </div>

                            <h3 className='iconCompanyContract'>Informações da Empresa Contratada</h3> <br />
                            <div className="form-group">
                                <label htmlFor="companyName">*Nome da empresa</label>
                                <input type="text" id="companyName" placeholder="Digite o nome da empresa" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="companyFantasyName">*Nome fantasia</label>
                                <input type="text" id="companyFantasyName" placeholder="Digite o nome fantasia da empresa" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="companyCNPJ">*CNPJ</label>
                                <input type="text" id="companyCNPJ" placeholder="Digite o CNPJ da empresa" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="companyPhone">Telefone</label>
                                <input type="text" id="companyPhone" placeholder="Digite o telefone da empresa" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="companyEmail">Email</label>
                                <input type="text" id="companyEmail" placeholder="Digite o email da empresa" />
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

                        <div className="erroMensage">
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </div>

                        <div className="form-buttons">
                            <div className="cancelAndSave">
                                <button className="save-button" onClick={handleSaveContract}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512" fill='#fff'>
                                        <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                                    </svg>
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </form>
                    {isModalOpen && (
                        <div className="confirmation-modal">
                            <div className='modal-confimation'>
                                <h3>{successMessage}</h3>
                                <p>Deseja continuar ou adicionar outro contrato?</p>
                                <div className="buttonsModal">
                                    <button className='page-contracts-modal' onClick={() => handleModalButtonClick('contracts')}>
                                        Página de contratos
                                    </button>
                                    <button className='add-new-contract-modal' onClick={() => handleModalButtonClick('add')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" fill='#132438'>
                                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                                        </svg>
                                        Adicionar mais contrato
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddContract;
