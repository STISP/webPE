import '../../../App.css'
import Menu from '../../../components/Menu'
import Footer from '../../../components/Footer'
import DetalhesLoja from '../../../components/DetalhesLoja';
import LogoCA from '../../../assets/car.svg'

export default function jaboataoMatriz() {
    return (
        <>
            <Menu />
            <DetalhesLoja ID="Loja5"
                image={LogoCA}
                loja="Jaboatão Centro Matriz"
                LojaNome="Jaboatão Centro Matriz"
                LojaEndereco="Av. Barão de Lucena, 729 - Centro, Jaboatão dos Guararapes - PE, 54110-000"
                LojaHorario="08h ás 16h"
                cnpj="12.493.871/0001-73"
                SegundaASextaI="07:00"
                SegundaASextaF="19:00"
                SabadoI="07:00"
                SabadoF="19:00"
                DomingoI="07:00"
                DomingoF="19:00"
                mapaLojaURL={'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1974.9420891751324!2d-35.0213245!3d-8.1132742!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab1d3e8facc573%3A0x76d3ac330b4db3b1!2sSupermercado%20Pernambucano!5e0!3m2!1spt-BR!2sbr!4v1691454403334!5m2!1spt-BR!2sbr'}
            />

            <Footer />
        </>
    )
}