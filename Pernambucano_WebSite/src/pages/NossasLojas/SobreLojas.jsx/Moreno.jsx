import '../../../App.css'
import Menu from '../../../components/Menu'
import Footer from '../../../components/Footer'
import DetalhesLoja from '../../../components/DetalhesLoja';
import LogoCA from '../../../assets/car.svg'

export default function Moreno() {
    return (
        <>
            <Menu />

            <DetalhesLoja ID="Loja6"
                image={LogoCA}
                loja="Moreno"
                LojaNome="Moreno"
                LojaEndereco="Av. Dr. Sofronio Portela, 3910 - Centro, Moreno - PE, 54800-000"
                LojaHorario="07h ás 19h"
                cnpj="10.779.172/0001-69"
                SegundaASextaI="07:00"
                SegundaASextaF="19:00"
                SabadoI="07:00"
                SabadoF="19:00"
                DomingoI="07:00"
                DomingoF="19:00"
                mapaLojaURL={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.83022387525!2d-35.1025883!3d-8.1187624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab027284ffe14d%3A0xd4dac8374547e806!2sSupermercado%20Pernambucano!5e0!3m2!1spt-BR!2sbr!4v1691453205575!5m2!1spt-BR!2sbr'}
            />

            <Footer />
        </>
    )
}