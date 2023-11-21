import { useState, useEffect } from 'react';
import '../../App.css'
import ConsultaLojas from '../../components/ConsultaLojas'
import Central from '../../../src/assets/central de servico.svg'
import Car from '../../assets/car.svg'
import { MoonLoader } from 'react-spinners';

export default function NossasLojas() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState('Carregando lojas...');
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('pt-BR'));
    const lojas = [
        {
            img: Car,
            ID: "Loja1",
            LinkPage: "/lojas/Dom_Helder",
            loja: "Dom Helder",
            nome: "Supermercado Pernambucano",
            endereco: "R. joão Fragoso de Medeiros, 1687",
            horarioOpenClose: "07:00 às 20:00",
            linkLocalizacao: "https://goo.gl/maps/931D6t7NPsK3wJZ28",
            linkWhatsapp: "https://wa.me/5581999716303"
        },
        {
            img: Car,
            ID: "Loja2",
            LinkPage: "/lojas/Goiana",
            loja: "Goiana",
            nome: "Supermercado Pernambucano",
            endereco: "Rua Benjamin Constantino, 52",
            horarioOpenClose: "07:00 às 19:00",
            linkLocalizacao: "https://goo.gl/maps/yLnnPeet6bjXDMYD9",
            linkWhatsapp: "https://wa.me/5581999716303"
        },
        {
            img: Car,
            ID: "Loja3",
            LinkPage: "/lojas/SaoLourencoDaMataCentro",
            loja: "São Lourenco da Mata Centro",
            nome: "Supermercado Pernambucano",
            endereco: "Av. Dr. Francisco Correia, 774",
            horarioOpenClose: "07:00 às 19:00",
            linkLocalizacao: "https://goo.gl/maps/1SdJ7Fb7YuKLi5Bn9",
            linkWhatsapp: "https://wa.me/5581999716303"
        },
        {
            img: Car,
            ID: "Loja4",
            LinkPage: "/lojas/jaboatao_Centro",
            loja: "Jaboatão Centro Fílial",
            nome: "Supermercado Pernambucano",
            endereco: "Nossa Senhora do Rosário, 644",
            horarioOpenClose: "07:00 às 20:00",
            linkLocalizacao: "https://goo.gl/maps/ePr5DvfhauyAxmmL6",
            linkWhatsapp: "https://wa.me/5581999716303"
        },
        {
            img: Car,
            ID: "Loja5",
            LinkPage: "/lojas/jaboataoMatriz",
            loja: "Jaboatão Centro Matriz",
            nome: "Supermercado Pernambucano",
            endereco: "Rua Barão de Lucena, 729",
            horarioOpenClose: "07:00 às 19:00",
            linkLocalizacao: "https://goo.gl/maps/ULQiuSHQy4whgaVw7",
            linkWhatsapp: "https://wa.me/5581999716303"
        },
        {
            img: Car,
            ID: "Loja6",
            LinkPage: "/lojas/Moreno",
            loja: "Moreno",
            nome: "Supermercado Pernambucano",
            endereco: "Av. Sifronio Portela, 3916",
            horarioOpenClose: "07:00 às 19:00",
            linkLocalizacao: "https://goo.gl/maps/7RdUrb5jKW61ho2y7",
            linkWhatsapp: "https://wa.me/5581999716303"
        },
        {
            img: Car,
            ID: "Loja7",
            LinkPage: "/lojas/Olinda",
            loja: "Olinda - Sítio Novo",
            nome: "Supermercado Pernambucano",
            endereco: "Praça da Bandeira, 22",
            horarioOpenClose: "07:00 às 19:00",
            linkLocalizacao: "https://goo.gl/maps/bpkrmQKrMgH53fEe8",
            linkWhatsapp: "https://wa.me/5581999716303"
        },
        {
            img: Car,
            ID: "Loja8",
            LinkPage: "/lojas/VascoDaGama",
            loja: "Vasco da Gama",
            nome: "Supermercado Pernambucano",
            endereco: "Rua Vasco da Gama, 662",
            horarioOpenClose: "07:00 às 20:30",
            linkLocalizacao: "https://goo.gl/maps/7zqz5jZM7bx6HDqV7",
            linkWhatsapp: "https://wa.me/5581999716303"
        },
        {
            img: Central,
            ID: "central",
            LinkPage: "/lojas/DomHelderServicos",
            loja: "Dom Helder",
            nome: "Centro de Servicos",
            endereco: "R. João Fragoso de Medeiros, 1687",
            horarioOpenClose: "08:00 às 18:00",
            linkLocalizacao: "https://goo.gl/maps/931D6t7NPsK3wJZ28",
            linkWhatsapp: "https://wa.me/5581999716303"
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            updateCurrentTime();
        }, 1000);

        setTimeout(() => {
            setIsLoading(false);
            clearInterval(interval);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const updateCurrentTime = () => {
        setCurrentTime(new Date().toLocaleTimeString('pt-BR'));
    };

    useEffect(() => {
        window.addEventListener('focus', updateCurrentTime);
        return () => {
            window.removeEventListener('focus', updateCurrentTime);
        };
    }, []);

    const checkOpenStatus = (openingTime, closingTime) => {
        const [openingHour, openingMinute] = openingTime.split(':').map(Number);
        const [closingHour, closingMinute] = closingTime.split(':').map(Number);
        const [currentHour, currentMinute] = currentTime.split(':').map(Number);

        const openingTimeInMinutes = openingHour * 60 + openingMinute;
        const closingTimeInMinutes = closingHour * 60 + closingMinute;
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        if (closingTimeInMinutes < openingTimeInMinutes) {
            return currentTimeInMinutes <= closingTimeInMinutes || currentTimeInMinutes >= openingTimeInMinutes;
        } else {
            return currentTimeInMinutes >= openingTimeInMinutes && currentTimeInMinutes <= closingTimeInMinutes;
        }
    };

    function handleClick() {
        window.scrollTo(0, 0);
    }

    return (
        <>
            <section>
                {isLoading ? (
                    <div className="centralizado loaderBg">
                        <MoonLoader color="#0261a3" loading={isLoading} size={60} />
                        <p>{loadingMessage}</p>
                    </div>
                ) : (
                    <>
                        <h5 className='caminho_page'>
                            Página Inicial / Nossas Lojas
                        </h5>

                        <h1 className='tituloPageLojas'>Escolha a loja</h1>

                        <div onClick={handleClick} className="listlojas">
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
                                    ) ? <p className='Open'>Aberto</p> : <p className='Close'>Fechado</p>}
                                />
                            ))}
                        </div>
                    </>
                )}
            </section>
            <br /> <br />
        </>
    );
}