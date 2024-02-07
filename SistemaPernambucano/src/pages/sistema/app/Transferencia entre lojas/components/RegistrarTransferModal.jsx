import React, { useState } from 'react';
import axios from 'axios';

const RegistrarTransfer = ({ onClose, onAddSuccess }) => {

    const nome = localStorage.getItem('email');
    const nomeSemDomino = nome.replace(/@suppernambucano.com.br/g, '');
    const nomeCapitalizado = nomeSemDomino.charAt(0).toUpperCase() + nomeSemDomino.slice(1);

    const [formValues, setFormValues] = useState({
        aindaNaoEntregue: false,
        productName: '',
        productCode: '',
        productQuantity: '',
        postDate: new Date().toISOString(),
        productValue: '',
        transferDate: '',
        deliveryDate: '',
        originStore: '',
        destinationStore: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFormValues({ ...formValues, [name]: checked });
    };

    const handleRegister = () => {
        event.preventDefault();
        const { productName, productCode, productQuantity, productValue, deliveryDate, transferDate, originStore, destinationStore, aindaNaoEntregue } = formValues;

        const data = {
            productName: productName,
            productCode: productCode,
            productQuantity: productQuantity,
            postDate: new Date().toISOString(),
            productValue: productValue,
            deliveryDate: aindaNaoEntregue ? '9999-01-01T00:00:00Z' : deliveryDate,
            transferDate: transferDate,
            originStore: originStore,
            destinationStore: destinationStore,
            postedBy: nomeCapitalizado,
        };

        axios.post('http://192.168.1.70:3000/transferProducts/create', data)
            .then(() => {
                onClose();
                onAddSuccess();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className='registrarTransferModal'>
            <div className="registroTrasnferAll">
                <h1>Registro de Transferência</h1>

                <form autoComplete="off" className="formTransferRegister">
                    <div className="divisaoInput">
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

                    <div className="divisaoInput">
                        <div className='inputTransferProduct'>
                            <label htmlFor="productCode">Código do Produto</label>
                            <input type="text" id="productCode" name="productCode" value={formValues.productCode} onChange={handleInputChange} required />
                        </div>

                        <div className='inputTransferProduct'>
                            <label htmlFor="productQuantity">Quantidade</label>
                            <input type="number" id="productQuantity" name="productQuantity" value={formValues.productQuantity} onChange={handleInputChange} required />
                            <p>Em unidades</p>
                        </div>

                        <div className='inputTransferProduct'>
                            <label htmlFor="productValue">Valor do Produto</label>
                            <input type="number" id="productValue" name="productValue" value={formValues.productValue} onChange={handleInputChange} required />
                            <p>Em reais</p>
                        </div>
                    </div>

                    <div className="divisaoInput">
                        <div className='inputTransferProduct'>
                            <label htmlFor="transferDate">Data de Transferência</label>
                            <input type="date" id="transferDate" name="transferDate" value={formValues.transferDate} onChange={handleInputChange} required />
                        </div>

                        <div className='inputTransferProduct'>
                            <label htmlFor="deliveryDate">Data Entregue</label>
                            <input type="date" id="deliveryDate" name="deliveryDate" value={formValues.deliveryDate} onChange={handleInputChange} disabled={formValues.aindaNaoEntregue} />
                            <div className="checkBoxAindaNaoEntregue">
                                <input type="checkbox" id="aindaNaoEntregue" name="aindaNaoEntregue" value="Ainda não entregue" checked={formValues.aindaNaoEntregue} onChange={handleCheckboxChange} />
                                <label htmlFor="aindaNaoEntregue">Ainda não entregue</label>
                            </div>
                        </div>
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