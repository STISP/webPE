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
        axios.delete(`http://192.168.1.70:3000/transferProducts/${id}`)
            .then(response => {
                onDeleteSuccess();
            })
            .catch(error => {
                console.error('Erro ao deletar a transferência:', error);
            });
    };

    const handleCancelDelete = () => {
        setShowConfirmationModal(false);
    };


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
                                <input
                                    type="date"
                                    className='inputDateTransferPendente'
                                    value={newDeliveryDate}
                                    onChange={handleChangeDeliveryDate}
                                    style={{
                                        position: 'absolute',
                                        zIndex: 1,
                                        transform: 'translateX(-125px) translateY(5px)',
                                    }}
                                />
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
                                <button className='moreInfoTransfer' onClick={handleMoreInfoClick}>ver mais informações</button>
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
