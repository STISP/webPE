import React, { useState } from 'react';
import axios from 'axios';

const ModalRemoveStock = ({ productCode, productName, setShowModalRemoveStock, fetchData }) => {
    const [quantidade, setQuantidade] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const payload = {
                productCode: productCode,
                productQuantity: quantidade
            };
            await axios.post('http://192.168.1.70:3000/estoqueDeProdutosParaTransferencia/removeQuantity', payload);
            setShowModalRemoveStock(false);
            fetchData();
        } catch (error) {
            setErrorMessage('Sem estoque suficiente');
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };

    return (
        <div className='modalAddStockQuantidade'>
            <div className='modal-content-modalAddStockQuantidade'>
                <h2>Remover Estoque de <strong>{productName}</strong></h2>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <label>
                        Quantidade a ser removida:
                        <input type='number' value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
                    </label>
                    <div className='ButtonsModalAddStockQuantidade'>
                        <button type='submit'>Remover</button>
                        <button onClick={() => setShowModalRemoveStock(false)}>Cancelar</button>
                    </div>
                    {errorMessage && <p className='AvisoSemEstoque'>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default ModalRemoveStock;