
import React from 'react'
import Menu from '../components/menu'
import Contato from '../components/ContatoComponente'
import Car from '../../src/assets/car.svg'
import Central from '../../src/assets/central de servico.svg'

export default function Contatos(props) {
    return (
        <>
            <Menu />
            <p className='caminho_page'>Página Inícial / Contatos</p>
            <h4 className='TituloContato'>Contatos</h4>

            <div className="lojas">
                    <Contato icon={Car} loja='Dom Helder' service='Supermercado Pernambucano' telefone='(81) 00000-0000' />
                    <Contato icon={Car} loja='Jaboatão Centro Matriz' service='Supermercado Pernambucano' telefone='(81) 00000-0000' />
                    <Contato icon={Car} loja='Jaboatão Centro Filial' service='Supermercado Pernambucano' telefone='(81) 00000-0000' />
                    <Contato icon={Car} loja='São Lourenço da Mata - centro' service='Supermercado Pernambucano' telefone='(81) 00000-0000' />
                    <Contato icon={Car} loja='Moreno' service='Supermercado Pernambucano' telefone='(81) 00000-0000' />
                    <Contato icon={Car} loja='Goiana' service='Supermercado Pernambucano' telefone='(81) 00000-0000' />
                    <Contato icon={Car} loja='Sítio Novo - Olinda' service='Supermercado Pernambucano' telefone='(81) 00000-0000' />
                    <Contato icon={Car} loja='Vasco da Gama' service='Supermercado Pernambucano' telefone='(81) 00000-0000' />
                    <Contato icon={Central} loja='Dom Helder' service='Central de Serviços' telefone='(81) 00000-0000' />
            </div>
        </>
    )
}