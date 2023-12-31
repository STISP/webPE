import '../../../App.css'
import DetalhesLoja from '../../../components/DetalhesLoja';
import CentralIcon from '../../../assets/central de servico.svg'

export default function Central() {
    return <DetalhesLoja ID="Loja1"
        image={CentralIcon}
        loja="Dom Helder - Central de serviços"
        LojaEndereco="R. João Fragoso de Medeiros, 1687 - PE, 54430-250"
        LojaHorario="08h ás 18h"
        cnpj="21.931.834/0001-90"
        SegundaASextaI="08:00"
        SegundaASextaF="18:00"
        SabadoI="00:00"
        SabadoF="00:00"
        DomingoI="00:00"
        DomingoF="00:00"
        tell = '33611155'
        linkWhatsapp = "https://wa.me/5581999716303"
        mapaLojaURL={'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15796.310037301528!2d-34.9354266!3d-8.1949471!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7aae1694b17ea55%3A0x61af9e8273891ce2!2sSupermercado%20Pernambucano!5e0!3m2!1spt-BR!2sbr!4v1691204388445!5m2!1spt-BR!2sbr'}
    />
}