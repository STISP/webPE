import React, { useState } from 'react';
import axios from 'axios';

const ModalStockAddProducts = () => {
    const [productCode, setProductCode] = useState('');
    const [productName, setProductName] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const handleProductCodeChange = (e) => {
        setProductCode(e.target.value);
    };

    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    };

    const handleProductQuantityChange = (e) => {
        setProductQuantity(e.target.value);
    };

    const handleProductPriceChange = (e) => {
        setProductPrice(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            codigoProduto: productCode,
            productName: productName,
            productQuantity: productQuantity,
            productPrice: productPrice,
        };

        try {
            axios.post('http://192.168.1.70:3000/estoqueDeProdutosParaTransferencia/create', formData);
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="productCode">Código</label>
                    <input
                        type="text"
                        id="productCode"
                        value={productCode}
                        onChange={handleProductCodeChange}
                    />
                </div>
                <div>
                    <label htmlFor="productName">Nome</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={handleProductNameChange}
                    />
                </div>
                <div>
                    <label htmlFor="productQuantity">Quantidade disponível</label>
                    <input
                        type="number"
                        id="productQuantity"
                        value={productQuantity}
                        onChange={handleProductQuantityChange}
                    />
                </div>
                <div>
                    <label htmlFor="productPrice">Preço (Unidade)</label>
                    <input
                        type="number"
                        id="productPrice"
                        value={productPrice}
                        onChange={handleProductPriceChange}
                    />
                </div>
                <button type="submit">Adicionar produto</button>
            </form>
        </div>
    );
};

export default ModalStockAddProducts;