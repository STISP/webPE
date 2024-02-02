import React, { useState } from 'react';

const ViewTransferDado = (props) => {
    const { id, productName, productCode, productQuantity, productValue, postDate, transferDate, deliveryDate, originStore, destinationStore } = props;
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
                        <div className='CodigoProduto'>
                            <p>Código do Produto:</p>
                            <p>{productCode}</p>
                        </div>
                        <div className='QuantidadeProduto'>
                            <p>Quantidade:</p>
                            <p>{productQuantity}</p>
                        </div>
                        <div className='ValorProduto'>
                            <p>Valor:</p>
                            <p>{productValue}</p>
                        </div>
                        <div className='DataTransferencia'>
                            <p>Data de Transferência:</p>
                            <p> {transferDate}</p>
                        </div>
                        <div className='DataEntrega'>
                            <p>Data de Entrega:</p>
                            <p> {deliveryDate}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewTransferDado;
