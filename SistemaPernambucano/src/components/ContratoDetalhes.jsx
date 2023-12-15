import { useParams, useNavigate } from 'react-router-dom';

const ContratoDetalhes = () => {
    const getContractsList = () => {
        return [
            {
                id: 1,
                clientName: 'Cliente 1',
                contractValue: 1000,
                startDate: '01/01/2022',
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
                },
                numberSupermarket: 1
            },
            {
                id: 2,
                clientName: 'Cliente 2',
                contractValue: 2000,
                startDate: '01/01/2022',
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
                },
                numberSupermarket: 1
            },
            {
                id: 3,
                clientName: 'Cliente 3',
                contractValue: 3000,
                startDate: '01/01/2022',
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
                },
                numberSupermarket: 1
            },
            {
                id: 4,
                clientName: 'Cliente 4',
                contractValue: 1500,
                startDate: '01/01/2022',
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
                },
                numberSupermarket: 1
            }
        ];
    };

    const { id } = useParams();
    const contrato = getContractsList().find(contract => contract.id === parseInt(id));
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleRenewContract = () => {
        // Lógica para renovar o contrato
    };

    const handleDeactivateContract = () => {
        // Lógica para desativar o contrato
    };

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
                                    {contrato.status === 'Renovado' && (
                                        <button className="contract-details__button" onClick={handleDeactivateContract}>Cancelar contrato</button>
                                    )}
                                    {contrato.status === 'Cancelado' && (
                                        <>
                                            <button className="contract-details__button" onClick={handleRenewContract}>Ativar contrato</button>
                                        </>
                                    )}
                                    {contrato.status === 'Expirado' && (
                                        <button className="contract-details__button" onClick={handleRenewContract}>Renovar contrato</button>
                                    )}
                                </div>
                            )}
                            <button className="contract-details__button" onClick={handleGoBack}>Voltar</button>
                        </div>
                    </div>
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
                            <span className="contract-details__label">Valor do Contrato: </span>
                            <span className="contract-details__value">R$ {contrato.contractValue}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Data de Início: </span>
                            <span className="contract-details__value">{contrato.startDate}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Data de Vencimento: </span>
                            <span className="contract-details__value">{contrato.dueDate}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Publicado por: </span>
                            <span className="contract-details__value">{contrato.postedBy}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Data de Publicação: </span>
                            <span className="contract-details__value">{contrato.postedDate}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Descrição do Contrato: </span> <br />
                            <span className="contract-details__value">{contrato.contractDescription}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Termos de Pagamento: </span> <br />
                            <span className="contract-details__value">{contrato.paymentTerms}</span>
                        </div>
                        <div className="contract-details__info-row">
                            <span className="contract-details__label">Cláusulas Especiais: </span> <br />
                            <span className="contract-details__value">{contrato.specialClauses}</span>
                        </div>
                    </section>

                    <section className="contract-details__additional-info">
                        <p className="contract-details__subtitle">Informações de Contato:</p>
                        <ul className="contract-details__contact-info">
                            <li><span className="contract-details__label">Endereço:</span> {contrato.contactInformation.address}</li>
                            <li><span className="contract-details__label">Telefone:</span> {contrato.contactInformation.phone}</li>
                            <li><span className="contract-details__label">Email:</span> {contrato.contactInformation.email}</li>
                        </ul>

                        <div className="contract-details__other-details">
                            <p><span className="contract-details__subtitle">Detalhes do Produto:</span> <br /> {contrato.productDetails}</p>
                            <p><span className="contract-details__subtitle">Condições de Rescisão:</span> <br /> {contrato.terminationConditions}</p>
                        </div>

                        <div className="contract-details__signatures">
                            <p><span className="contract-details__subtitle">Assinaturas:</span></p>
                            <ul className="contract-details__signature-list">
                                <li><span className="contract-details__label">Representante do Supermercado:</span> {contrato.signatures.supermarketRep}</li>
                                <li><span className="contract-details__label">Testemunhas:</span> {contrato.signatures.witnesses.join(', ')}</li>
                            </ul>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};

export default ContratoDetalhes;
