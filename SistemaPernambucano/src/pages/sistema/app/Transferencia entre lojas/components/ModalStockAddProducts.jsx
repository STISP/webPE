import React, { useState } from 'react';
import axios from 'axios';

const ModalStockAddProducts = ({ setShowModal }) => {
    const [productCode, setProductCode] = useState('');
    const [productName, setProductName] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [error, setError] = useState(false);
    const [emptyFields, setEmptyFields] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productCode || !productName || !productQuantity || !productPrice) {
            setEmptyFields(true);
            setTimeout(() => {
                setEmptyFields(false);
            }, 5000);
            return;
        }

        const formData = {
            productCode: parseInt(productCode, 10),
            productName: productName,
            productQuantity: parseInt(productQuantity, 10),
            productPrice: parseFloat(productPrice),
        };

        try {
            await axios.post('http://192.168.1.70:3000/estoqueDeProdutosParaTransferencia/create', formData);
            setShowModal(false);
        } catch (error) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 5000);
        } finally {
            console.clear();
        }
    };

    const modalOff = () => {
        setShowModal(false);
    }

    return (
        <div className="modalStockAddProductsAll">
            <div className="modalStockAddProducts">
                <h2>Adicionar novo produto</h2>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="inputsModalStockAddProducts">
                        <div className='CodigoQuantidadePreco'>
                            <div className="inputProductCode">
                                <label htmlFor="productCode">Código</label>
                                <input
                                    type="number"
                                    id="productCode"
                                    value={productCode}
                                    onChange={handleProductCodeChange}
                                />
                            </div>
                            <div className="inputProductQuantity">
                                <label htmlFor="productQuantity">Quantidade disponível</label>
                                <input
                                    type="number"
                                    id="productQuantity"
                                    value={productQuantity}
                                    onChange={handleProductQuantityChange}
                                />
                            </div>
                            <div className="inputProductPrice">
                                <label htmlFor="productPrice">Preço (Unidade)</label>
                                <input
                                    type="number"
                                    id="productPrice"
                                    value={productPrice}
                                    onChange={handleProductPriceChange}
                                />
                            </div>
                        </div>
                        <div className="inputProductName">
                            <label htmlFor="productName">Nome</label>
                            <input
                                type="text"
                                id="productName"
                                value={productName}
                                onChange={handleProductNameChange}
                            />
                        </div>

                    </div>

                    <div className="buttonsModalStockAddProducts">
                        <button type="submit">Adicionar produto</button>
                        <button onClick={modalOff}>Cancelar</button>
                    </div>
                </form>
                {error && <div className='ErroCodigoJaRegistrado'>Código de produto já registrado</div>}
                {emptyFields && <div className='PreenchaTodosOsCampos'>Preencha todos os campos</div>}
            </div>
        </div>
    );
};

export default ModalStockAddProducts;