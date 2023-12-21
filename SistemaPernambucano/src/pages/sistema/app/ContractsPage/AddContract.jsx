import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddContract = () => {
    const nome = localStorage.getItem('email');
    const nomeSemDomino = nome.replace(/@suppernambucano.com.br/g, '');
    const nomeCapitalizado = nomeSemDomino.charAt(0).toUpperCase() + nomeSemDomino.slice(1);
    const currentDate = new Date().toISOString().split('T')[0];

    const [errorMessage, setErrorMessage] = useState('');

    const handleSaveContract = async () => {
        try {
            const clientName = document.getElementById('clientName').value;
            const contractValue = document.getElementById('contractValue').value;
            const contractNumber = document.getElementById('contractNumber').value;
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            const status = document.getElementById('status').value;
            const contractDescription = document.getElementById('contractDescription').value;
            const paymentTerms = document.getElementById('paymentTerms').value;
            const productDetails = document.getElementById('productDetails').value;
            const terminationConditions = document.getElementById('terminationConditions').value;
            const postedBy = document.getElementById('postedBy').value;
            const postedDate = document.getElementById('postedDate').value;

            if (!clientName || !contractValue || !contractNumber || !startDate || !endDate || !status || !contractDescription || !paymentTerms || !productDetails || !terminationConditions || !postedBy || !postedDate) {
                setErrorMessage('Por favor, preencha todos os campos!');
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
                productDetails,
                terminationConditions,
                postedBy: nomeCapitalizado,
                postedDate: currentDate
            };

            await axios.post('http://localhost:3000/contracts', contractData);
            alert('Contrato salvo com sucesso!');
            navigate('/ContractsPage/ListContracts');
        } catch (error) {
            console.error('Erro ao salvar contrato:', error);
            setErrorMessage('Problema ao cadastrar o contrato, tente novamente ou contate o suporte.');
        }
    };

    const navigate = useNavigate();
    const [firstLoad, setFirstLoad] = useState(true);
    const handleCancel = () => {
        if (firstLoad) {
            navigate('/ContractsPage/ListContracts');
        } else {
            navigate(-1);
        }
        setFirstLoad(false);
    };

    return (
        <div className="add-contract">
            <div className="info-contract">
                <div className="info-contract-content">
                    <div className='addAndBackButton'>
                        <h2>Adicionar Contrato</h2>
                        <button className="back-button" onClick={handleCancel}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18" width="14" viewBox="0 0 384 512" fill='#fff'>
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                            Cancelar
                        </button>
                    </div>
                    <form>
                        <div>
                            <div className="form-group">
                                <label htmlFor="clientName">Nome do Cliente</label>
                                <input type="text" id="clientName" placeholder="Digite o nome do cliente" required />
                            </div>
                            {/*<div className="form-group">
                                <label htmlFor="address">Endereço</label>
                                <input type="text" id="address" placeholder="Digite o endereço" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Telefone</label>
                                <input type="text" id="phone" placeholder="Digite o telefone" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" id="email" placeholder="Digite o email" required />
                            </div>*/}
                        </div>

                        <div>
                            <div className="form-group">
                                <label htmlFor="contractValue">Valor do Contrato</label>
                                <input type="number" id="contractValue" placeholder="Digite o valor do contrato" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contractNumber">Numero do contrato</label>
                                <input type="number" id="contractNumber" placeholder="Digite o numero do contrato" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="startDate">Data de inicio do contrato</label>
                                <input type="date" id="startDate" placeholder="Digite a data de início do contrato" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endDate">Vencimento do contrato</label>
                                <input type="date" id="endDate" placeholder="Digite a data de vencimento do contrato" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status do contrato</label>
                                <select id="status" defaultValue="" required>
                                    <option value="ativo">Ativo</option>
                                    <option value="cancelado">Desativado</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="contractDescription">Descrição do contrato</label>
                                <textarea id="contractDescription" placeholder="Digite a descrição do contrato" required></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="paymentTerms">Termos de pagamento</label>
                                <textarea id="paymentTerms" placeholder="Digite os termos de pagamento" required></textarea>
                            </div>
                            {/*<div className="form-group">
                                <label htmlFor="specialClauses">Cláusulas especiais</label>
                                <textarea id="specialClauses" placeholder="Digite as cláusulas especiais" required></textarea>
                            </div>*/}
                            <div className="form-group">
                                <label htmlFor="productDetails">Detalhes do produto ou serviço</label>
                                <textarea id="productDetails" placeholder="Digite os detalhes do produto ou serviço" required></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="terminationConditions">Condições de rescisão</label>
                                <textarea id="terminationConditions" placeholder="Digite as condições de rescisão" required></textarea>
                            </div>
                        </div>

                        {/*<div>
                            <div className="form-group">
                                <label htmlFor="supermarketRep">Representante do supermercado</label>
                                <input type="text" id="supermarketRep" placeholder="Digite o nome do representante" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="witnesses">Testemunhas</label>
                                <input type="text" id="witnesses" placeholder="Digite o nome das testemunhas" required />
                            </div>
                        </div>*/}

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
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
                </div>
            </div>
        </div>
    );
};

export default AddContract;
