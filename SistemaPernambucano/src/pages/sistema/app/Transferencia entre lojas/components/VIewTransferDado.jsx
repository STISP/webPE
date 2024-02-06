import React, { useState } from 'react';
import ImageTransferDado from '../../../../../assets/IconPernembucanoTransfer.svg';
import setaIcon from '../../../../../assets/setaIcon.svg';
import WarnTransfer from '../../../../../assets/WarnTransfer.svg';

const ViewTransferDado = (props) => {
    const { id, productName, productCode, productQuantity, productValue, postDate, transferDate, deliveryDate, originStore, destinationStore } = props;
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

    return (
        <div key={id} className="ViewTransferDadoAll" >
            {deliveryDate === 'Pendente' && (
                <div className='transterPendente'>
                    <div className='WarnTransfer'>
                        <img src={WarnTransfer} />
                        <p>Não entregue</p>
                    </div>
                    <button onClick={handleToggleInput}>Definir produto como entregue</button>
                </div>
            )}
            {showInput && (
                <input type="date" value={newDeliveryDate} onChange={handleChangeDeliveryDate} />
            )}
            <div className="ViewTransferDado">
                <div className="InfoProducts">
                    <div className='InfoStartTrasfer'>
                        <img src={ImageTransferDado} />
                        <div>
                            <p className='ProductName'>{productName}</p>
                            <p className='DiaPostado'>Postado em: {postDate}</p>
                            <div className="butoesViewDetailsAndDelete">
                                <button className='moreInfoTransfer' onClick={handleMoreInfoClick}>ver mais informações</button>
                                <button className='DeleteButtonTransfer'>Deletar</button>
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
