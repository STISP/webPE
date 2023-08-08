import '../../../App.css'
import Menu from '../../../components/Menu'
import Footer from '../../../components/Footer'
import DetalhesLoja from '../../../components/DetalhesLoja';
import LogoCA from '../../../assets/car.svg'
import React from 'react';

export default function DomHelder() {
    return (
        <>
            <Menu />
            <DetalhesLoja ID="Loja1"
                image={LogoCA}
                loja="Dom Helder"
                LojaEndereco="Av. Dom Helder Câmara, 5474 - Cachambi, Rio de Janeiro"
                LojaHorario="08h ás 16h"
                cnpj="12.493.871/0001-73"
                SegundaASextaI="07:00"
                SegundaASextaF="20:00"
                SabadoI="07:00"
                SabadoF="20:00"
                DomingoI="07:00"
                DomingoF="20:00"
                tell="(21) 2222-2222"
                mapaLojaURL={'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15796.310037301528!2d-34.9354266!3d-8.1949471!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7aae1694b17ea55%3A0x61af9e8273891ce2!2sSupermercado%20Pernambucano!5e0!3m2!1spt-BR!2sbr!4v1691204388445!5m2!1spt-BR!2sbr'}
            />

            <Footer />
        </>
    )
}