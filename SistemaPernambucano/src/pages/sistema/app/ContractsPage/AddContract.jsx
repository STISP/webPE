import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddContract = () => {
    const nome = localStorage.getItem('email');
    const nomeSemDomino = nome.replace(/@suppernambucano.com.br/g, '');
    const nomeCapitalizado = nomeSemDomino.charAt(0).toUpperCase() + nomeSemDomino.slice(1);
    const currentDate = new Date().toISOString().split('T')[0];

    const handleSaveContract = () => {
        // Add logic to save the contract
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
                    <h2>Adicionar Contrato</h2>
                    <form>
                        <h3>Detalhes do Cliente</h3>
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

                        <h3>Detalhes do Contrato</h3>
                        <div>
                            <div className="form-group">
                                <label htmlFor="contractValue">Valor do Contrato</label>
                                <input type="number" id="contractValue" placeholder="Digite o valor do contrato" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contractNumber">Numero do contato</label>
                                <input type="number" id="contractNumber" placeholder="Digite o numero do contrato" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dueDate">Data de Vencimento</label>
                                <input type="date" id="dueDate" placeholder="Selecione a data de vencimento" />
                            </div>
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
                                <label htmlFor="productDetails">Detalhes do produto</label>
                                <textarea id="productDetails" placeholder="Digite os detalhes do produto"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="terminationConditions">Condições de rescisão</label>
                                <textarea id="terminationConditions" placeholder="Digite as condições de rescisão"></textarea>
                            </div>
                        </div>

                        <h3>Detalhes do Supermercado</h3>
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

                        <h3>Detalhes do Postamento</h3>
                        <div>
                            <div className="form-group">
                                <label htmlFor="postedBy">Usuário atual</label>
                                <input type="text" id="postedBy" placeholder="Digite o nome do usuário" value={nomeCapitalizado} onChange={(e) => setNomeCapitalizado(e.target.value)} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="postedDate">Data Atual</label>
                                <input type="date" id="postedDate" placeholder="Selecione a data de postagem" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} disabled />
                            </div>
                        </div>

                        <h3>Ações</h3>
                        <div className="form-buttons">
                            <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
                            <button className="save-button" onClick={handleSaveContract}>Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddContract;
