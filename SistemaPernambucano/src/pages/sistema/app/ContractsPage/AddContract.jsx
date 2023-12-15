import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AddContract = () => {
    const nome = localStorage.getItem('email');
    const nomeSemDomino = nome.replace(/@suppernambucano.com.br/g, '');
    const nomeCapitalizado = nomeSemDomino.charAt(0).toUpperCase() + nomeSemDomino.slice(1);
    const currentDate = new Date().toISOString().split('T')[0];

    const handleSaveContract = async () => {
        try {
            const clientName = document.getElementById('clientName').value;
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const contractValue = document.getElementById('contractValue').value;
            const contractNumber = document.getElementById('contractNumber').value;
            const startDate = document.getElementById('startDate').value;
            //const endDate = document.getElementById('endDate').value;
            const status = document.getElementById('status').value;
            const contractDescription = document.getElementById('contractDescription').value;
            const paymentTerms = document.getElementById('paymentTerms').value;
            const specialClauses = document.getElementById('specialClauses').value;
            const productDetails = document.getElementById('productDetails').value;
            const terminationConditions = document.getElementById('terminationConditions').value;
            const supermarketRep = document.getElementById('supermarketRep').value;
            const witnesses = document.getElementById('witnesses').value;

            const contractData = {
                clientName,
                address,
                phone,
                email,
                contractValue,
                contractNumber,
                startDate,
                //endDate,
                status,
                contractDescription,
                paymentTerms,
                specialClauses,
                productDetails,
                terminationConditions,
                supermarketRep,
                witnesses,
                postedBy: nomeCapitalizado,
                postedDate: currentDate
            };

            await axios.post('http://localhost:3000/contracts', contractData);
            alert('Contrato salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar contrato:', error);
        }
    };

    const navigate = useNavigate();


    const [firstLoad, setFirstLoad] = useState(true);

    const handleCancel = () => {
        if (firstLoad) {
            navigate('/ListContracts');
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
                            Cancelar
                        </button>
                    </div>
                    <form>
                        <div>
                            <div className="form-group">
                                <label htmlFor="clientName">Nome do Cliente</label>
                                <input type="text" id="clientName" placeholder="Digite o nome do cliente" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Endereço</label>
                                <input type="text" id="address" placeholder="Digite o endereço" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Telefone</label>
                                <input type="text" id="phone" placeholder="Digite o telefone" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" id="email" placeholder="Digite o email" />
                            </div>
                        </div>

                        <div>
                            <div className="form-group">
                                <label htmlFor="contractValue">Valor do Contrato</label>
                                <input type="number" id="contractValue" placeholder="Digite o valor do contrato" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contractNumber">Numero do contrato</label>
                                <input type="number" id="contractNumber" placeholder="Digite o numero do contrato" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="startDate">Data de inicio do contrato</label>
                                <input type="date" id="startDate" placeholder="Selecione a data de vencimento" />
                            </div>
                            {/*<div className="form-group">
                                <label htmlFor="endDate">Vencimento do contrato</label>
                                <input type="date" id="endDate" placeholder="Selecione a data de vencimento" />
                             </div>*/}
                            <div className="form-group">
                                <label htmlFor="status">Status do contrato</label>
                                <select id="status" defaultValue="">
                                    <option value="">Selecione o status do contrato</option>
                                    <option value="ativo">Ativo</option>
                                    <option value="cancelado">Cancelado</option>
                                    <option value="renovado">Renovado</option>
                                    <option value="expirado">Expirado</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="contractDescription">Descrição do contrato</label>
                                <textarea id="contractDescription" placeholder="Digite a descrição do contrato"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="paymentTerms">Termos de pagamento</label>
                                <textarea id="paymentTerms" placeholder="Digite os termos de pagamento"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="specialClauses">Cláusulas especiais</label>
                                <textarea id="specialClauses" placeholder="Digite as cláusulas especiais"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="productDetails">Detalhes do produto ou serviço</label>
                                <textarea id="productDetails" placeholder="Digite os detalhes do produto ou serviço"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="terminationConditions">Condições de rescisão</label>
                                <textarea id="terminationConditions" placeholder="Digite as condições de rescisão"></textarea>
                            </div>
                        </div>

                        <div>
                            <div className="form-group">
                                <label htmlFor="supermarketRep">Representante do supermercado</label>
                                <input type="text" id="supermarketRep" placeholder="Digite o nome do representante" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="witnesses">Testemunhas</label>
                                <input type="text" id="witnesses" placeholder="Digite o nome das testemunhas" />
                            </div>
                        </div>

                        <div style={{ display: 'none' }}>
                            <div className="form-group">
                                <label htmlFor="postedBy">Usuário atual</label>
                                <input type="text" id="postedBy" placeholder="Digite o nome do usuário" value={nomeCapitalizado} onChange={(e) => setNomeCapitalizado(e.target.value)} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="postedDate">Data Atual</label>
                                <input type="date" id="postedDate" placeholder="Selecione a data de postagem" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} disabled />
                            </div>
                        </div>

                        <div className="form-buttons">
                            <button className="save-button" onClick={handleSaveContract}>Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddContract;
