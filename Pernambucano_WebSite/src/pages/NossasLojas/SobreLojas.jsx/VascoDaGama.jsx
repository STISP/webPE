import '../../../App.css'
import Menu from '../../../components/Menu'
import Footer from '../../../components/Footer'
import DetalhesLoja from '../../../components/DetalhesLoja';
import LogoCA from '../../../assets/car.svg'

export default function VascoDaGama() {
    return (
        <>
            <Menu />

            <DetalhesLoja ID="Loja8"
                image={LogoCA}
                loja="Vasco da Gama"
                LojaNome="Vasco da Gama"
                LojaEndereco="R. Vasco da Gama, 662 - Vasco da Gama, Recife - PE, 52001-030"
                LojaHorario="07h ás 19h"
                cnpj="15.079.738/0002-44"
                SegundaASextaI="07:00"
                SegundaASextaF="20:30"
                SabadoI="07:00"
                SabadoF="20:30"
                DomingoI="07:00"
                DomingoF="20:30"
                mapaLojaURL={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.841349123762!2d-34.920018400000004!3d-8.0152912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab1962ae4c6bcb%3A0xab15c20a4943dde!2sSupermercado%20Pernambucano!5e0!3m2!1spt-BR!2sbr!4v1691453447220!5m2!1spt-BR!2sbr'}
            />

            <Footer />
        </>
    )
}