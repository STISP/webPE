import React, { useState, useEffect } from 'react';

const ModalEditProduct = ({ setShowModalEditProduct, EditProductID, fetchData }) => {
    const [id, setProductID] = useState(EditProductID);
    const [productCode, setProductCode] = useState('');
    const [productName, setProductName] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productPrice, setProductPrice] = useState('');

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`http://192.168.1.70:3000/estoqueDeProdutosParaTransferencia/${EditProductID}`);
                const product = await response.json();
                setProductCode(product.productCode);
                setProductName(product.productName);
                setProductQuantity(product.productQuantity);
                setProductPrice(product.productPrice);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProductData();
    }, [EditProductID]);

    const handleEditProduct = async () => {
        try {
            await fetch(`http://192.168.1.70:3000/estoqueDeProdutosParaTransferencia/editProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    productCode,
                    productName,
                    productQuantity,
                    productPrice
                })
            });
            fetchData();
            setShowModalEditProduct(false);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='modalAddStockQuantidade'>
            <div className='modal-content-modalAddStockQuantidade'>
                <form autoComplete="off">
                    <h2>Editar Produto</h2>
                    <div className="flexModalEdit">
                        <div>
                            <label htmlFor="productCode">Código do Produto</label>
                            <input
                                type="text"
                                id="productCode"
                                value={productCode}
                                onChange={(e) => setProductCode(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="productName">Nome</label>
                            <input
                                type="text"
                                id="productName"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flexModalEdit">
                        <div>
                            <label htmlFor="productQuantity">Quantidade</label>
                            <input
                                type="number"
                                id="productQuantity"
                                value={productQuantity}
                                onChange={(e) => setProductQuantity(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="productPrice">Preço</label>
                            <input
                                type="number"
                                id="productPrice"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='ButtonsModalAddStockQuantidade'>
                        <button onClick={handleEditProduct}>Editar</button>
                        <button onClick={() => setShowModalEditProduct(false)}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalEditProduct;