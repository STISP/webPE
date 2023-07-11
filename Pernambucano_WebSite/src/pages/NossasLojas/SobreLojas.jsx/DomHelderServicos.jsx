import '../../../App.css'
import { Link } from 'react-router-dom'
import Menu from '../../../components/menu'
import Footer from '../../../components/Footer'
import DetalhesLoja from '../../../components/DetalhesLoja';


export default function DomHelder() {
    return (
        <>
            <Menu />

            <DetalhesLoja ID="Loja2"
                loja="Dom Helder - Centro de serviços"
                LojaNome="Dom Helder - Centro de serviços"
                LojaEndereco="Av. Dom Helder Câmara, 5474 - Cachambi, Rio de Janeiro - RJ, 20771-004"
                LojaHorario="08h ás 16h"
                cnpj="00.000.000/0000-00"
                SegundaASextaI="07:00"
                SegundaASextaF="20:00"
                SabadoI="07:00"
                SabadoF="20:00"
                DomingoI="07:00"
                DomingoF="20:00"
                mapaLojaURL=""
            />

            <Footer />
        </>
    )
}