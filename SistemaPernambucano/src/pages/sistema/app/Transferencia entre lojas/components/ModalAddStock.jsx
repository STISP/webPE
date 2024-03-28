import React, { useState } from 'react';
import axios from 'axios';

const ModalAddStock = ({ productCode, productName, setShowModalAddStock, fetchData }) => {
    const [quantidade, setQuantidade] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const payload = {
                productCode: productCode,
                productQuantity: quantidade
            };
            await axios.post('http://192.168.1.70:3000/estoqueDeProdutosParaTransferencia/addQuantity', payload);
            setShowModalAddStock(false);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='modalAddStockQuantidade'>
            <div className='modal-content-modalAddStockQuantidade'>
                <h2>Adicionar Estoque de <strong>{productName}</strong></h2>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <label>
                        Quantidade a ser adicionada:
                        <input type='number' value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
                    </label>
                    <div className='ButtonsModalAddStockQuantidade'>
                        <button type='submit'>Adicionar</button>
                        <button onClick={() => setShowModalAddStock(false)}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalAddStock;