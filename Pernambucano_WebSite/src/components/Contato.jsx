
import React from 'react'
import { Link } from 'react-router-dom'
import LogoCA from '../../src/assets/logoCA.svg'

export default function DetalhesLoja(props) {
    return (
        <div className='contato'>
            <img src={LogoCA} alt="logo" />
            <h1>{props.loja}</h1>
            <h4>{props.service}</h4>
            <h4>{props.telefone}</h4>
        </div>
    )
}