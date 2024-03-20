import React, { useState } from 'react';
import axios from 'axios';

const ModalAddStock = ({ productCode, productName, setShowModalAddStock }) => {
    const [quantidade, setQuantidade] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`http://192.168.1.70:3000/estoqueDeProdutosParaTransferencia/${quantidade}/${productCode}`);
            console.log(response.data);
            setShowModalAddStock(false);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='modal'>
            <div className='modal-content'>
                <h2>Adicionar Estoque para {productName}</h2>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <label>
                        Quantidade:
                        <input type='number' value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
                    </label>
                    <div>
                        <button type='submit'>Adicionar</button>
                        <button onClick={() => setShowModalAddStock(false)}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalAddStock;