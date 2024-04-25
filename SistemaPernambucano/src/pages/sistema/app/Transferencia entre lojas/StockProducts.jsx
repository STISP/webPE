import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalStockAddProducts from './components/ModalStockAddProducts';
import ModalAddStock from './components/ModalAddStock';
import ModalRemoveStock from './components/ModalRemoveStock';
import AddSimbolo from '../../../../assets/AddSimbolo.svg';
import MenosIcon from '../../../../assets/menosIcon.svg';
import VoltarIcon from '../../../../assets/voltarIcon.svg';
import ExcelIcon from '../../../../assets/excel.svg';
import ModalConfirmDelete from './components/ModalConfirmDelete';
import Engrenagem from '../../../../assets/engrenagem.svg';
import { useNavigate } from 'react-router-dom';

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

    const baixarPlanilha = () => {
        axios.get('http://192.168.1.70:3000/estoqueDeProdutosParaTransferencia', { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'estoque_de_produtos.csv');
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Erro ao baixar planilha:', error);
            });
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const deleteProduct = (productId) => {
        setProductToDelete(productId);
        setShowDeleteModal(true);
    };

    const editProduct = () => {
        alert('Funcionalidade não implementada');
        toggleDropdown();
    };

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    // filtro de pesquisa de produtos por nome ou código do produto
    const [search, setSearch] = useState('');

    const filteredProducts = produtos.filter(produto => {
        return produto.productName.toLowerCase().includes(search.toLowerCase()) || produto.productCode.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className='stockProducts'>
            <div className="menuContracts">
                <div className='tituloAndSubtituloPage'>
                    <h1 className='TituloPage'>Estoque de Materiais</h1>
                    <p className='SubtituloPage'>Controle de uso de material de expediente</p>
                </div>
            </div>

            <div className="OPbuttonsStock">
                <button className='ButtonVoltar' onClick={handleBack}>
                    <img src={VoltarIcon} alt="" />
                    Voltar
                </button>
                <button className='ButtonAddProdutcStock' onClick={AddNewProductStock}>
                    <img src={AddSimbolo} alt="" />
                    Novo Material
                </button>
                <button className='ButtonDownload' onClick={baixarPlanilha}>
                    <img src={ExcelIcon} alt="" />
                    Baixar Planilha
                </button>
                <input type="text" className='InputFiltroPesquisaEstoque' placeholder="Pesquisar" onChange={(e) => setSearch(e.target.value)} />
            </div>

            {showModal && <ModalStockAddProducts setShowModal={setShowModal} fetchData={fetchData} />}
            {showModalAddStock && <ModalAddStock productCode={selectedProduct.id} productName={selectedProduct.name} setShowModalAddStock={setShowModalAddStock} fetchData={fetchData} />}
            {showModalRemoveStock && <ModalRemoveStock productCode={selectedProductRemove.id} productName={selectedProductRemove.name} setShowModalRemoveStock={setShowModalRemoveStock} fetchData={fetchData} />}
            {showDeleteModal && (<ModalConfirmDelete show={showDeleteModal} onHide={() => setShowDeleteModal(false)} id={productToDelete} toggleDropdown={toggleDropdown} fetchData={fetchData} />)}

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
                    {produtos.length === 0 ? (
                        <p>Nenhum produto cadastrado</p>
                    ) : (
                        filteredProducts.map((produto, index) => (
                            <tr className={`ProductStockTr ${index % 2 === 0 ? 'backgroundListStock' : ''}`} key={produto.id}>
                                <td className="dataCodigo">{produto.productCode}</td>
                                <td className="dataProduto">{produto.productName && produto.productName.length > 20 ? produto.productName.slice(0, 20) + '...' : produto.productName}</td>
                                <td className="dataEstoque">{produto.productQuantity}</td>
                                <td className="dataPreco">R$ {produto.productPrice ? produto.productPrice.toFixed(2) : '0.00'}</td>
                                <td className="dataAcoes">
                                    <button title='Adicionar Estoque' onClick={() => ModaladicionarEstoque(produto.productCode, produto.productName)}>
                                        <img src={AddSimbolo} />
                                    </button>
                                    <button title='Remover Estoque' onClick={() => {
                                        ModalremoverEstoque(produto.productCode, produto.productName);
                                        toggleDropdown();
                                    }}>
                                        <img src={MenosIcon} />
                                    </button>
                                    <button title='Opções' onClick={() => toggleDropdown(produto.id)}>
                                        <img src={Engrenagem} alt="" />
                                    </button>
                                    {dropdownProductId === produto.id && (
                                        <div className="dropdownMenu">
                                            <button className='deleteProduct' onClick={() => deleteProduct(produto.id)}>
                                                Deletar Produto
                                            </button>
                                            <button onClick={editProduct}>
                                                Editar Produto
                                            </button>
                                            <button onClick={() => toggleDropdown()}>
                                                Cancelar
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        )))}
                </tbody>
            </table>
        </div>
    );
};

export default StockProducts;