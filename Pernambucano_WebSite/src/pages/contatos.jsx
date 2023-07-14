
import React from 'react'
import Menu from '../components/menu'
import Contato from '../components/ContatoComponente'

export default function Contatos(props) {
    return (
        <>
            <Menu />
            <p className='caminho_page'>Página Inícial / Contatos</p>
            <h4 className='TituloContato'>Contatos</h4>

            <div className="lojas">
                    <Contato loja='Dom Helder' service='Supermercado Pernambucano' telefone='(81) 00000-0000' />
                    <Contato loja='Dom Helder' service='Supermercado Pernambucano' telefone='(81) 00000-0000' />
                    <Contato loja='Dom Helder' service='Supermercado Pernambucano' telefone='(81) 00000-0000' />
                    <Contato loja='Dom Helder' service='Supermercado Pernambucano' telefone='(81) 00000-0000' />

            </div>
        </>
    )
}