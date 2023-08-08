import '../../../App.css'
import Menu from '../../../components/Menu'
import Footer from '../../../components/Footer'
import DetalhesLoja from '../../../components/DetalhesLoja';
import LogoCA from '../../../assets/car.svg'

export default function Olinda() {
    return (
        <>
            <Menu />

            <DetalhesLoja ID="Loja6"
                image={LogoCA}
                loja="Olinda - Sítio Novo"
                LojaNome="Olinda - Sítio Novo"
                LojaEndereco="R. Teresita Bandeira - Sítio Novo, Olinda - PE, 52171-011"
                LojaHorario="07h ás 19h"
                cnpj="15.079.738/0001-63"
                SegundaASextaI="07:00"
                SegundaASextaF="19:00"
                SabadoI="07:00"
                SabadoF="19:00"
                DomingoI="07:00"
                DomingoF="19:00"
                mapaLojaURL={'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3950.7309624547624!2d-34.8777402!3d-8.0266518!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab197728342077%3A0x2abeaa2ea8ecba72!2sSupermecado%20Pernabucano!5e0!3m2!1spt-BR!2sbr!4v1691454560527!5m2!1spt-BR!2sbr'}
            />

            <Footer />
        </>
    )
}