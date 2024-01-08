import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddContract = () => {
    const navigate = useNavigate();
    const nome = localStorage.getItem('email');
    const nomeSemDomino = nome.replace(/@suppernambucano.com.br/g, '');
    const nomeCapitalizado = nomeSemDomino.charAt(0).toUpperCase() + nomeSemDomino.slice(1);
    const currentDate = new Date().toISOString().split('T')[0];

    const [errorMessage, setErrorMessage] = useState('');

    // gerador de id aleatório criptografado em base 36 que nunca se repete
    //const id = Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);

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
            const loja = document.getElementById('loja').value;

            if (!clientName || !contractValue || !contractNumber || !startDate || !endDate || !status || !contractDescription || !paymentTerms || !productDetails || !terminationConditions || !postedBy || !postedDate || !loja) {
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
                postedDate: currentDate,
                loja: loja,
            };

            await axios.post('http://192.168.1.70:3000/contracts', contractData);
            alert('Contrato salvo com sucesso!');
            navigate('/ContractsPage');
        } catch (error) {
            console.error('Erro ao salvar contrato:', error);
            setErrorMessage('Problema ao cadastrar o contrato, tente novamente ou contate o suporte.');
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
                    <form>
                        <div>
                            <div className="form-group">
                                <label htmlFor="clientName">Nome do Cliente</label>
                                <input type="text" id="clientName" placeholder="Digite o nome do cliente" required />
                            </div>
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
                                <label htmlFor="loja">Loja do contrato</label>
                                <select id="loja" defaultValue="" required>
                                    <option value="" disabled selected>Selecione a loja</option>
                                    <option value="COMERCIO DE ALIMENTOS PERNAMBUCANO CENTRAL DE SERVIÇOS">COMERCIO DE ALIMENTOS PERNAMBUCANO CENTRAL DE SERVIÇOS</option>
                                    <option value="MERCADINHO DOM HELDER DE ALIMENTOS LTDA">MERCADINHO DOM HELDER DE ALIMENTOS LTDA</option>
                                    <option value="MERCANTIL JABOATÃO DE ALIMENTOS LTDA MATRIZ">MERCANTIL JABOATÃO DE ALIMENTOS LTDA MATRIZ</option>
                                    <option value="T.H SUPERMERCADO EIRELLI EPP">T.H SUPERMERCADO EIRELLI EPP</option>
                                    <option value="COMERCIO DE ALIMENTOS PERNAMBUCANO LTDAP">COMERCIO DE ALIMENTOS PERNAMBUCANO LTDAP</option>
                                    <option value="MERCANTIL DOIS IRMÃOS DE ALIMENTOS LTDA">MERCANTIL DOIS IRMÃOS DE ALIMENTOS LTDA</option>
                                    <option value="MERCANTIL GOIANA DE ALIMENTOS LTDA">MERCANTIL GOIANA DE ALIMENTOS LTDA</option>
                                    <option value="MERCANTIL JABOATAO DE ALIMENTOS LTDA">MERCANTIL JABOATAO DE ALIMENTOS LTDA</option>
                                </select>
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
                            <div className="form-group">
                                <label htmlFor="productDetails">Detalhes do produto ou serviço</label>
                                <textarea id="productDetails" placeholder="Digite os detalhes do produto ou serviço" required></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="terminationConditions">Condições de rescisão</label>
                                <textarea id="terminationConditions" placeholder="Digite as condições de rescisão" required></textarea>
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
