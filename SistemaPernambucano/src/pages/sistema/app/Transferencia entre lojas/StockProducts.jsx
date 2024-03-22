import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalStockAddProducts from './components/ModalStockAddProducts';
import ModalAddStock from './components/ModalAddStock';
import ModalRemoveStock from './components/ModalRemoveStock';

const StockProducts = () => {
    const [produtos, setProdutos] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://192.168.1.70:3000/estoqueDeProdutosParaTransferencia');
            setProdutos(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [dropdownProductId, setDropdownProductId] = useState(null);

    const toggleDropdown = (productId) => {
        setDropdownProductId(dropdownProductId === productId ? null : productId);
    };

    const deleteProduct = async (productId) => {
        try {
            const confirmDelete = window.confirm('Tem certeza que deseja deletar o produto?');
            if (confirmDelete) {
                await axios.delete(`http://192.168.1.70:3000/estoqueDeProdutosParaTransferencia/${productId}`);
                toggleDropdown();
                await fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [showModalAddStock, setShowModalAddStock] = useState(false);
    const [showModalRemoveStock, setShowModalRemoveStock] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState({ id: null, name: null });
    const ModaladicionarEstoque = (productCode, productName) => {
        setSelectedProduct({ id: productCode, name: productName });
        setShowModalAddStock(!showModalAddStock);
    };

    const [selectedProductRemove, setSelectedProductRemove] = useState({ id: null, name: null });
    const ModalremoverEstoque = (productCode, productName) => {
        setSelectedProductRemove({ id: productCode, name: productName });
        setShowModalRemoveStock(!showModalRemoveStock);
    };

    const [showModal, setShowModal] = useState(false);
    const AddNewProductStock = () => {
        setShowModal(!showModal);
    };

    const editProduct = () => {
        alert('Ainda não implementado!');
    };

    const baixarPlanilha = () => {
        alert('Ainda não implementado!');
    };

    const Voltar = () => {
        window.location.href = 'http://192.168.1.70:5173/TransferenciaEntreLojas#/TransferenciaEntreLojas';
    }

    return (
        <div className='stockProducts'>
            <div className="menuContracts">
                <div className='tituloAndSubtituloPage'>
                    <h1 className='TituloPage'>Estoque de Materiais</h1>
                    <p className='SubtituloPage'>Controle de uso de material de expediente</p>
                </div>
            </div>

            <div className="OPbuttonsStock">
                <button className='ButtonAddProdutcStock' onClick={AddNewProductStock}>Novo Material</button>
                <button className='ButtonDownload' onClick={baixarPlanilha}>Baixar Planilha</button>
                <button className='ButtonVoltar' onClick={Voltar}>Voltar</button>
            </div>

            {showModal && <ModalStockAddProducts setShowModal={setShowModal} fetchData={fetchData} />}
            {showModalAddStock && <ModalAddStock productCode={selectedProduct.id} productName={selectedProduct.name} setShowModalAddStock={setShowModalAddStock} fetchData={fetchData} />}
            {showModalRemoveStock && <ModalRemoveStock productCode={selectedProductRemove.id} productName={selectedProductRemove.name} setShowModalRemoveStock={setShowModalRemoveStock} fetchData={fetchData} />}

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
                            <td className="dataCodigo">{produto.productCode}</td>
                            <td className="dataProduto">{produto.productName && produto.productName.length > 20 ? produto.productName.slice(0, 20) + '...' : produto.productName}</td>
                            <td className="dataEstoque">{produto.productQuantity}</td>
                            <td className="dataPreco">R$ {produto.productPrice ? produto.productPrice.toFixed(2) : '0.00'}</td>
                            <td className="dataAcoes">
                                <button onClick={() => ModaladicionarEstoque(produto.productCode, produto.productName)}>
                                    Adicionar Estoque
                                </button>
                                <button onClick={() => toggleDropdown(produto.id)}>
                                    Ações
                                </button>
                                {dropdownProductId === produto.id && (
                                    <div className="dropdownMenu">
                                        <button className='deleteProduct' onClick={() => deleteProduct(produto.id)}>
                                            Deletar Produto
                                        </button>
                                        <button onClick={() => {
                                            ModalremoverEstoque(produto.productCode, produto.productName);
                                            toggleDropdown();
                                        }}>
                                            Remover Estoque
                                        </button>
                                        {/*<button onClick={editProduct}>
                                            Editar Produto
                                        </button>*/}
                                        <button onClick={() => toggleDropdown()}>
                                            Cancelar
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockProducts;