import React, { useState } from 'react';

const StockProducts = () => {

    const [produtos] = useState([
        {
            id: 120,
            nome: 'Caneta azul',
            estoque: 20,
            preco: 20.00,
        },
        {
            id: 2538,
            nome: 'Caixa de Grampiador',
            estoque: 15,
            preco: 5.00,
        },
        {
            id: 121,
            nome: 'Caneta vermelha especial',
            estoque: 20,
            preco: 20.00,
        },
        {
            id: 253238,
            nome: 'Teclado simples para uso em escritório',
            estoque: 1000,
            preco: 100.00,
        }
    ]);

    const adicionarEstoque = () => {
        alert('Estoque adicionado com sucesso!');
    };

    const opcoesProduto = () => {
        alert('Ainda não implementado');
    };

    const AddProductStock = () => {
        alert('Produto adicionado com sucesso!');
    };

    const baixarPlanilha = () => {
        alert('Ainda não implementado!');
    };

    return (
        <div className='stockProducts'>
            <div className="menuContracts">
                <div className='tituloAndSubtituloPage'>
                    <h1 className='TituloPage'>Estoque de Materiais</h1>
                    <p className='SubtituloPage'>Controle de uso de material de expediente</p>
                </div>
            </div>

            <button className='ButtonAddProdutcStock' onClick={AddProductStock}>Adicionar novo produto</button>
            <button className='ButtonDownload' onClick={baixarPlanilha}>Baixar Planilha</button>

            <table className='tableStockProduct' style={{ textAlign: 'left' }}>
                <thead className='TheadStock'>
                    <tr>
                        <th className="headerCodigo">Código</th>
                        <th className="headerProduto">Nome do Produto</th>
                        <th className="headerEstoque">Estoque</th>
                        <th className="headerPreco">Preço</th>
                        <th className="headerAcoes">Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {produtos.map((produto, index) => (
                        <tr className={`ProductStockTr ${index % 2 === 0 ? 'backgroundListStock' : ''}`} key={produto.id}>
                            <td className="dataCodigo">{produto.id}</td>
                            <td className="dataProduto">{produto.nome.length > 20 ? produto.nome.slice(0, 20) + '...' : produto.nome}</td>
                            <td className="dataEstoque">{produto.estoque}</td>
                            <td className="dataPreco">R$ {produto.preco.toFixed(2)}</td>
                            <td className="dataAcoes">
                                <button onClick={adicionarEstoque}>
                                    Adicionar estoque
                                </button>
                                <button onClick={opcoesProduto}>
                                    Ações
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockProducts;
