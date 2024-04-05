import React, { useState } from 'react';
import ImageTransferDado from '../../../../../assets/IconPernembucanoTransfer.svg';
import setaIcon from '../../../../../assets/setaIcon.svg';
import WarnTransfer from '../../../../../assets/WarnTransfer.svg';
import axios from 'axios';
import DeleteIcon from '../../../../../assets/DeleteIcon.svg';

const ViewTransferDado = ({ id, productName, productCode, productQuantity, productValue, postDate, transferDate, deliveryDate, originStore, destinationStore, onDeleteSuccess }) => {

    const [showMoreInfo, setShowMoreInfo] = useState(false);

    const handleMoreInfoClick = () => {
        setShowMoreInfo(!showMoreInfo);
    };

    const [showInput, setShowInput] = useState(false);
    const [newDeliveryDate, setNewDeliveryDate] = useState('');

    const handleToggleInput = () => {
        setShowInput(!showInput);
    };

    const handleChangeDeliveryDate = (event) => {
        setNewDeliveryDate(event.target.value);
    };

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleDeleteTransfer = () => {
        setShowConfirmationModal(true);
    };

    const handleConfirmDelete = () => {
        axios.post(`http://192.168.1.70:3000/estoqueDeProdutosParaTransferencia/addQuantity`, {
            productCode: productCode,
            productQuantity: productQuantity
        })
            .then(response => {
                axios.delete(`http://192.168.1.70:3000/transferProducts/${id}`)
                    .then(response => {
                        onDeleteSuccess();
                    })
                    .catch(error => {
                        console.error('Erro ao deletar a transferência:', error);
                    });
            })
            .catch(error => {
                console.error('Erro ao adicionar ao estoque:', error);
            });
    };

    const handleCancelDelete = () => {
        setShowConfirmationModal(false);
    };

    const handleUpdateDeliveryDate = () => {
        if (newDeliveryDate.trim() === '') {
            return;
        } else {
            axios.post(`http://192.168.1.70:3000/transferProducts/deliveryDate/${id}`, { deliveryDate: newDeliveryDate })
                .then(response => {
                    window.location.reload();
                })
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleUpdateDeliveryDate();
            handleToggleInput();
        }
    };

    const ImprimirTransfer = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`<h1>Detalhes da Transferência</h1>`);
        printWindow.document.write(`<p>Produto: ${productName}</p>`);
        printWindow.document.write(`<p>Código: ${productCode}</p>`);
        printWindow.document.write(`<p>Quantidade transferida: ${productQuantity}</p>`);
        printWindow.document.write(`<p>Valor und.: ${(productValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>`);
        printWindow.document.write(`<p>Valor total: ${(productValue * productQuantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>`);
        printWindow.document.write(`<p>Data de Postagem: ${postDate}</p>`);
        printWindow.document.write(`<p>Data de Transferência: ${transferDate}</p>`);
        printWindow.document.write(`<p>Data de Entrega: ${deliveryDate}</p>`);
        printWindow.document.write(`<p>Loja de Origem: ${originStore}</p>`);
        printWindow.document.write(`<p>Loja de Destino: ${destinationStore}</p>`);
        printWindow.document.close();
        printWindow.print();
    }

    return (
        <div key={id} className="ViewTransferDadoAll" >
            <div className="ViewTransferDado">
                {deliveryDate === 'Pendente' && (
                    <div className='transferPendenteLine' style={{ position: 'relative' }}>
                        <div className='transferPendente'>
                            <div className='WarnTransfer'>
                                <img src={WarnTransfer} />
                                <p>Não entregue</p>
                            </div>
                            <button onClick={handleToggleInput}>Definir produto como entregue</button>
                            {showInput && (
                                <div className='modalAddStockQuantidade'>
                                    <div className='modal-content-modalAddStockQuantidade'>
                                        <h2>Definir produto como entregue</h2>
                                        <p>Data de entrega para: <strong>{productName}</strong></p>
                                        <input
                                            type="date"
                                            className='inputDateTransferPendente'
                                            value={newDeliveryDate}
                                            onChange={handleChangeDeliveryDate}
                                            onKeyPress={handleKeyPress}
                                        />
                                        <div className="buttonsAddDiaEntrega">
                                            <button className='confimarButtonInputDataEntrega' onClick={handleUpdateDeliveryDate}>Confirmar</button>
                                            <button className='cancelarButtonInputDataEntrega' onClick={handleToggleInput}>Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {showConfirmationModal && (
                    <div className="confirmation-modal">
                        <div className='modal-confimation'>
                            <h3>Deseja deletar a transferência "<strong>{productName}</strong>" ?</h3>
                            <div className="buttonsModal">
                                <button className='Confirmar-modal' onClick={handleConfirmDelete}>
                                    <img src={DeleteIcon} alt="Deletar" />
                                    Confirmar
                                </button>
                                <button className='Cancelar-modal' onClick={handleCancelDelete}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="InfoProducts">
                    <div className='InfoStartTrasfer'>
                        <img src={ImageTransferDado} />
                        <div>
                            <p className='ProductName'>{productName}</p>
                            <p className='DiaPostado'>Postado em: {postDate}</p>
                            <div className="butoesViewDetailsAndDelete">
                                <button className='moreInfoTransfer' onClick={handleMoreInfoClick}>ver mais informações</button> <p>•</p>
                                <button className='moreInfoTransfer' onClick={ImprimirTransfer}>Imprimir</button> <p>•</p>
                                <button onClick={handleDeleteTransfer} className='DeleteButtonTransfer'>Deletar</button>
                            </div>
                        </div>
                    </div>

                    <div className="OrigemDestino">
                        <div className='origem'>
                            <h3>{originStore}</h3>
                            <p>Origem</p>
                        </div>
                        <img src={setaIcon} />
                        <div className='destino'>
                            <h3>{destinationStore}</h3>
                            <p>Destino</p>
                        </div>
                    </div>
                </div>

                {showMoreInfo && (
                    <div className="moreInfoAll" style={{ transition: 'opacity 0.5s' }}>
                        <div className="moreInfo">
                            <div className='infoTransfer'>
                                <h3>{productCode}</h3>
                                <p>Cód. Produto</p>
                            </div>
                            <div className='infoTransfer'>
                                <h3>{productQuantity}</h3>
                                <p>Quantidade</p>
                            </div>
                            <div className='infoTransfer'>
                                <h3>{(productValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </h3>
                                <p>Valor Und.</p>
                            </div>
                            <div className='infoTransfer'>
                                <h3>{(productValue * productQuantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                                <p>Valor Total</p>
                            </div>
                            <div className='infoTransfer'>
                                <h3>{transferDate}</h3>
                                <p>Data transferida</p>
                            </div>
                            <div className='infoTransfer'>
                                <h3>{deliveryDate}</h3>
                                <p>Entregue em</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewTransferDado;