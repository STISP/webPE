import React from 'react';

export default function ContatoComponente(props) {
    return (
        <div className='contato'>
            <img src={props.icon} alt="logo" />
            <div id={props.loja} className="lojaAndNumber">
                <h1>{props.loja}</h1>
                <h3>{props.service}</h3>
                <h4>
                    <a href={`tel:${props.telefone}`}>{props.telefone}</a>
                </h4>
            </div>
        </div>
    );
}
