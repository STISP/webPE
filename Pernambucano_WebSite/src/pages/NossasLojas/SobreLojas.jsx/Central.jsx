import '../../../App.css'
import { Link } from 'react-router-dom'
import Menu from '../../../components/Menu'
import Footer from '../../../components/Footer'
import DetalhesLoja from '../../../components/DetalhesLoja';


export default function Central() {
    return (
        <>
            <Menu />
            <DetalhesLoja ID="Loja1"
                loja="Dom Helder - Central de serviços"
                LojaEndereco="Av. Dom Helder Câmara, 5474 - Cachambi, Rio de Janeiro"
                LojaHorario="08h ás 16h"
                cnpj="00.000.000/0000-00"
                SegundaASextaI="07:00"
                SegundaASextaF="20:00"
                SabadoI="07:00"
                SabadoF="20:00"
                DomingoI="06:00"
                DomingoF="06:00"
                mapaLojaURL=""
            />

            <Footer />
        </>
    )
}