import '../../../App.css'
import DetalhesLoja from '../../../components/DetalhesLoja';
import LogoCA from '../../../assets/car.svg'

export default function Goiana() {
    return <DetalhesLoja ID="Loja2"
        image={LogoCA}
        loja="Goiana"
        LojaNome="Goiana"
        LojaEndereco="R. Benjamin Constant, 52 - Centro, Goiana - PE, 55900-000"
        LojaHorario="07h ás 19h"
        cnpj="23.094.631/0001-12"
        SegundaASextaI="07:00"
        SegundaASextaF="19:00"
        SabadoI="06:00"
        SabadoF="19:00"
        DomingoI="07:00"
        DomingoF="13:00"
        tell = '33611155'
        linkWhatsapp = "https://wa.me/5581999716303"
        mapaLojaURL={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.13856509584!2d-35.00080259999999!3d-7.559867100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab63e66190decd%3A0x958e3b37775119f3!2sSupermercado%20Pernambucano!5e0!3m2!1spt-BR!2sbr!4v1691452306208!5m2!1spt-BR!2sbr'}
    />
}