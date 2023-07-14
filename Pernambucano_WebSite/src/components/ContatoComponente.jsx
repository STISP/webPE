
import React from 'react'
import { Link } from 'react-router-dom'
import Car from '../../src/assets/car.svg'

export default function ContatoComponente(props) {
    return (
        <div className='contato'>
            <img src={Car} alt="logo" />
            <div className="lojaAndNumber">
                <h1>{props.loja}</h1>
                <h3>{props.service}</h3>
                <h4 tabindex="0">{props.telefone}</h4>
            </div>
        </div>
    )
}