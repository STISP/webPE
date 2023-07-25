import '../../App.css'
import { Link } from 'react-router-dom'
import Menu from '../../components/menu'
import Footer from '../../components/Footer'
import ConsultaLojas from '../../components/ConsultaLojas'
import Central from '../../../src/assets/central de servico.svg'
import Car from '../../assets/car.svg'
import React, { useState, useEffect } from 'react';

export default function NossasLojas() {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('pt-BR'));
    const lojas = [
        {
            img: Car,
            ID: "Loja1",
            LinkPage: "/lojas/Dom_Helder",
            loja: "Dom Helder",
            nome: "Supermercado Pernambucano",
            endereco: "localização completa bla blabla bla bla blabla bla",
            horarioOpenClose: "08:00 às 16:00",
            linkLocalizacao: "https://goo.gl/maps/SP1EW8NhG1vtjRgU8",
            linkWhatsapp: "https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
        },
        {
            img: Car,
            ID: "Loja2",
            LinkPage: "/lojas/Goiana",
            loja: "Goiana",
            nome: "Supermercado Pernambucano",
            endereco: "localização completa bla blabla bla bla blabla bla",
            horarioOpenClose: "08:00 às 16:00",
            linkLocalizacao: "https://goo.gl/maps/SP1EW8NhG1vtjRgU8",
            linkWhatsapp: "https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
        },
        {
            img: Car,
            ID: "Loja3",
            LinkPage: "/lojas/SaoLourencoDaMataCentro",
            loja: "São Lourenco da Mata Centro",
            nome: "Supermercado Pernambucano",
            endereco: "localização completa bla blabla bla bla blabla bla",
            horarioOpenClose: "08:00 às 16:00",
            linkLocalizacao: "https://goo.gl/maps/SP1EW8NhG1vtjRgU8",
            linkWhatsapp: "https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
        },
        {
            img: Car,
            ID: "Loja4",
            LinkPage: "/lojas/jaboatao_Centro",
            loja: "Jaboatão Centro",
            nome: "Supermercado Pernambucano Fílial",
            endereco: "localização completa bla blabla bla bla blabla bla",
            horarioOpenClose: "08:00 às 16:00",
            linkLocalizacao: "https://goo.gl/maps/SP1EW8NhG1vtjRgU8",
            linkWhatsapp: "https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
        },
        {
            img: Car,
            ID: "Loja5",
            LinkPage: "/lojas/jaboatao_Centro",
            loja: "Jaboatão Centro Matriz",
            nome: "Supermercado Pernambucano",
            endereco: "localização completa bla blabla bla bla blabla bla",
            horarioOpenClose: "08:00 às 16:00",
            linkLocalizacao: "https://goo.gl/maps/SP1EW8NhG1vtjRgU8",
            linkWhatsapp: "https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
        },
        {
            img: Car,
            ID: "Loja6",
            LinkPage: "/lojas/Moreno",
            loja: "Moreno",
            nome: "Supermercado Pernambucano",
            endereco: "localização completa bla blabla bla bla blabla bla",
            horarioOpenClose: "08:00 às 16:00",
            linkLocalizacao: "https://goo.gl/maps/SP1EW8NhG1vtjRgU8",
            linkWhatsapp: "https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
        },
        {
            img: Car,
            ID: "Loja7",
            LinkPage: "/lojas/Olinda",
            loja: "Olinda",
            nome: "Supermercado Pernambucano",
            endereco: "localização completa bla blabla bla bla blabla bla",
            horarioOpenClose: "08:00 às 16:00",
            linkLocalizacao: "https://goo.gl/maps/SP1EW8NhG1vtjRgU8",
            linkWhatsapp: "https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
        },
        {
            img: Car,
            ID: "Loja8",
            LinkPage: "/lojas/VascoDaGama",
            loja: "Vasco da Gama",
            nome: "Supermercado Pernambucano",
            endereco: "localização completa bla blabla bla bla blabla bla",
            horarioOpenClose: "08:00 às 16:00",
            linkLocalizacao: "https://goo.gl/maps/SP1EW8NhG1vtjRgU8",
            linkWhatsapp: "https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
        },
        {
            img: Central,
            ID: "central",
            LinkPage: "/lojas/DomHelderServicos",
            loja: "Dom Helder Centro de Servicos",
            nome: "Supermercado Pernambucano",
            endereco: "localização completa bla blabla bla bla blabla bla",
            horarioOpenClose: "08:00 às 16:00",
            linkLocalizacao: "https://goo.gl/maps/SP1EW8NhG1vtjRgU8",
            linkWhatsapp: "https://goo.gl/maps/SP1EW8NhG1vtjRgU8"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            updateCurrentTime();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const updateCurrentTime = () => {
        setCurrentTime(new Date().toLocaleTimeString('pt-BR'));
    };

    const checkOpenStatus = (openingTime, closingTime) => {
        const currentTimeParts = currentTime.split(':');
        const openingTimeParts = openingTime.split(':');
        const closingTimeParts = closingTime.split(':');

        const currentTimeInMinutes = parseInt(currentTimeParts[0], 10) * 60 + parseInt(currentTimeParts[1], 10);
        const openingTimeInMinutes = parseInt(openingTimeParts[0], 10) * 60 + parseInt(openingTimeParts[1], 10);
        const closingTimeInMinutes = parseInt(closingTimeParts[0], 10) * 60 + parseInt(closingTimeParts[1], 10);

        if (closingTimeInMinutes < openingTimeInMinutes) {
            // Caso o horário de fechamento seja antes do horário de abertura,
            // consideramos que o estabelecimento abre em um dia e fecha no outro.
            // Nesse caso, consideramos que está aberto se o horário atual estiver
            // antes do horário de fechamento OU depois do horário de abertura.
            return currentTimeInMinutes <= closingTimeInMinutes || currentTimeInMinutes >= openingTimeInMinutes;
        } else {
            // Caso o horário de fechamento seja depois do horário de abertura,
            // consideramos o horário normal de funcionamento.
            return currentTimeInMinutes >= openingTimeInMinutes && currentTimeInMinutes <= closingTimeInMinutes;
        }
    };

    return (
        <>
            <Menu />

            <section>
                <h5 className='caminho_page'>
                    Página Inicial / Nossas Lojas
                </h5>
                <h1 className='tituloPageLojas'>Escolha a loja</h1>
                <div className="listlojas">
                    {lojas.map((loja) => (
                        <ConsultaLojas
                            key={loja.ID}
                            img={loja.img}
                            ID={loja.ID}
                            LinkPage={loja.LinkPage}
                            loja={loja.loja}
                            nome={loja.nome}
                            endereco={loja.endereco}
                            horarioOpenClose={loja.horarioOpenClose}
                            linkLocalizacao={loja.linkLocalizacao}
                            linkWhatsapp={loja.linkWhatsapp}
                            openClose={checkOpenStatus(
                                loja.horarioOpenClose.split("às")[0].trim(),
                                loja.horarioOpenClose.split("às")[1].trim()
                            ) ? 'Aberto' : 'Fechado'}
                        />
                    ))}
                </div>
            </section>

            <Footer />
        </>
    )
}
