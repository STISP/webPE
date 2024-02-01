import React, { useState } from 'react';

const ViewTransferDado = (props) => {
    const { id, productName, productCode, postDate, productQuantity, transferDate, deliveryDate, originStore, destinationStore } = props;
    const [showMoreInfo, setShowMoreInfo] = useState(false);

    const handleMoreInfoClick = () => {
        setShowMoreInfo(!showMoreInfo);
    };

    return (
        <div key={id} className="ViewTransferDado2" >
            <div className="ViewTransferDado2">
                <img src={{}} alt="" />
                <div className="InfoProducts">
                    <p className='ProductName'>{productName}</p>
                    <p className='DiaPostado'>{postDate}</p>
                    <div className="butoesViewDetailsAndDelete">
                        <button onClick={handleMoreInfoClick}>ver mais informações</button>
                        <button>Deletar</button>
                    </div>
                </div>

                <div className="OrigemDestino">
                    <p className='origem'>Origem: {originStore}</p>
                    <img src={{}} alt="" />
                    <p className='destino'>Destino: {destinationStore}</p>
                </div>
                {showMoreInfo && (
                    <div className="moreInfo" >
                        <p className='CodigoProduto'>Código do Produto:  {productCode}</p>
                        <p className='QuantidadeProduto'>Quantidade: {productQuantity}</p>
                        <p className='DataTransferencia'>Data de Transferência: {transferDate}</p>
                        <p className='DataEntrega'>Data de Entrega: {deliveryDate}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewTransferDado;
