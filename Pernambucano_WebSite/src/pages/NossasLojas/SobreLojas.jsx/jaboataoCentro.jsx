import '../../../App.css'
import DetalhesLoja from '../../../components/DetalhesLoja';
import LogoCA from '../../../assets/car.svg'

export default function jaboatao_Centro() {
    return <DetalhesLoja ID="Loja4"
        image={LogoCA}
        loja="Jaboatão Centro Fílial"
        LojaNome="Jaboatão Centro Fílial"
        LojaEndereco="Praça Nossa Sra. do Rosário, 650 - Centro, Jaboatão dos Guararapes - PE, 54110-130"
        LojaHorario="07h ás 19h"
        cnpj="23.094.631/0001-12"
        SegundaASextaI="07:00"
        SegundaASextaF="19:00"
        SabadoI="07:00"
        SabadoF="19:00"
        DomingoI="07:00"
        DomingoF="19:00"
        mapaLojaURL={'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d987.4721177125789!2d-35.019794382139565!3d-8.112837412440948!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab1df222dc9129%3A0xf101316533546769!2sSupermercado%20Pernambucano!5e0!3m2!1spt-BR!2sbr!4v1691454345950!5m2!1spt-BR!2sbr'}
    />

}