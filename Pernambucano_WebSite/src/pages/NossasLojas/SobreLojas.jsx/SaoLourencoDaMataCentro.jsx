import '../../../App.css'
import Menu from '../../../components/Menu'
import Footer from '../../../components/Footer'
import DetalhesLoja from '../../../components/DetalhesLoja';
import LogoCA from '../../../assets/car.svg'

export default function Sao_Lourenco_da_Mata_centro() {
    return (
        <>
            <Menu />

            <DetalhesLoja ID="Loja3"
                image={LogoCA}
                loja="São Lourenco da Mata Centro"
                LojaNome="São Lourenco da Mata Centro"
                LojaEndereco="PE-005, 506-598 - Centro, São Lourenço da Mata - PE, 54735-000"
                LojaHorario="08h ás 20h"
                cnpj="15.242.436/0001-64"
                SegundaASextaI="07:00"
                SegundaASextaF="19:00"
                SabadoI="07:00"
                SabadoF="19:00"
                DomingoI="07:00"
                DomingoF="19:00"
                mapaLojaURL={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.0088497680454!2d-35.03928146966852!3d-7.998022015542011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab054cf8191dd7%3A0x7c54642bcce796b1!2sSupermercado%20Pernambucano%20Sao%20Louren%C3%A7o%20da%20Mata!5e0!3m2!1spt-BR!2sbr!4v1691452501585!5m2!1spt-BR!2sbr'}
            />

            <Footer />
        </>
    )
}