import React, { useState } from 'react';

const RegistrarTransfer = ({ onClose }) => {
    const [formValues, setFormValues] = useState({
        productName: '',
        quantity: '',
        transferDate: '',
        originStore: '',
        destinationStore: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleRegister = () => {
        // Perform registration logic here
    };

    return (
        <div className='registrarTransferModal'>
            <div className="registroTrasnferAll">
                <h1>Registro da Transferência</h1>

                <form autocomplete="off" className="formTransferRegister">
                    <div className="origemDestinoTransfer">
                        <div className='SelectTransferProduct'>
                            <label htmlFor="originStore">Origem</label>
                            <select id="originStore" name="originStore" value={formValues.originStore} onChange={handleInputChange} required>
                                <option value="">Selecione a origem</option>
                                <option value="P1">P1</option>
                                <option value="P2">P2</option>
                                <option value="P3">P3</option>
                                <option value="P4">P4</option>
                                <option value="P5">P5</option>
                                <option value="P6">P6</option>
                                <option value="P7">P7</option>
                                <option value="P8">P8</option>
                                <option value="Central de serviços">Central de serviços</option>
                            </select>
                        </div>
                        <div className='SelectTransferProduct'>
                            <label htmlFor="destinationStore">Destino</label>
                            <select id="destinationStore" name="destinationStore" value={formValues.destinationStore} onChange={handleInputChange} required>
                                <option value="">Selecione o destino</option>
                                <option value="P1">P1</option>
                                <option value="P2">P2</option>
                                <option value="P3">P3</option>
                                <option value="P4">P4</option>
                                <option value="P5">P5</option>
                                <option value="P6">P6</option>
                                <option value="P7">P7</option>
                                <option value="P8">P8</option>
                                <option value="Central de serviços">Central de serviços</option>
                            </select>
                        </div>
                    </div>

                    <div className='inputTransferProduct'>
                        <label htmlFor="productName">Escolha o Produto</label>
                        <input type="text" id="productName" name="productName" value={formValues.productName} onChange={handleInputChange} required />
                    </div>

                    <div className='inputTransferProduct'>
                        <label htmlFor="quantity">Quantidade</label>
                        <input type="number" id="quantity" name="quantity" value={formValues.quantity} onChange={handleInputChange} required />
                        <p>Em unidades</p>
                    </div>

                    <div className='inputTransferProduct'>
                        <label htmlFor="transferDate">Data de Transferência</label>
                        <input type="date" id="transferDate" name="transferDate" value={formValues.transferDate} onChange={handleInputChange} required />
                    </div>

                    <div className="butaoCancelarAndRegistrar">
                        <button className='registrarTransfer' onClick={handleRegister}>Registrar</button>
                        <button className='CancelTransfer' onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default RegistrarTransfer;