import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

export default function DetalhesLoja(props) {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('pt-BR'));

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
            return currentTimeInMinutes <= closingTimeInMinutes || currentTimeInMinutes >= openingTimeInMinutes;
        } else {
            return currentTimeInMinutes >= openingTimeInMinutes && currentTimeInMinutes <= closingTimeInMinutes;
        }
    };

    function handleClick() {
        window.scrollTo(0, 0);
    }

    return (
        <section id={props.ID}>
            <h5 className='caminho_page'>
                Página Inicial / Nossas Lojas / {props.loja}
            </h5>
            <div className="LojaInfoAndHorarioFuncionamento">
                <div>

                    <div className="LojaInfo">
                        <img loading="lazy" className='IconLojaInfo' src={props.image} alt='Logo' />
                        <div className="NomeLocalizacaoHorario">
                            <div className="LojaNome">{props.loja}</div>
                            <div className="LojaEndereco">{props.LojaEndereco}</div>

                            <div className="LojaHorario">
                                {checkOpenStatus(props.SegundaASextaI, props.SegundaASextaF) ||
                                    checkOpenStatus(props.SabadoI, props.SabadoF) ||
                                    checkOpenStatus(props.DomingoI, props.DomingoF) ? (
                                    <p className='Open'>Aberto</p>
                                ) : (
                                    <p className='Close'>Fechado</p>
                                )}
                                <span>•</span>
                                {props.LojaHorario}
                            </div>

                        </div>
                    </div>

                    <h5>CNPJ {props.cnpj}</h5>
                    <div className="WhatsappTellAlterarLoja">
                        <a className="LojaWhatsapp" href={props.linkWhatsapp}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                            WhatsApp
                        </a>
                        <a href={'tel:' + props.tell} className="LojaTell">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>
                            Telefone
                        </a>
                        <Link to="/lojas" onClick={handleClick} className="AlterarLoja">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" /></svg>
                            Alterar loja
                        </Link>
                    </div>
                </div>
                <div className="HorarioFuncionamento">
                    {["Segunda", "Terça", "Quarta", "Quinta", "Sexta"].map((dia, index) => (
                        <div className='HF' key={index}>
                            <p>{dia}</p>
                            <p className='pontS'>{".".repeat(36 + index)}</p>
                            <p>{`${props.SegundaASextaI}h até ${props.SegundaASextaF}h`}</p>
                        </div>
                    ))}
                    <div className='HF'>
                        <p>Sábado</p>
                        <p className='pontS'>
                            {".".repeat(props.SabadoI === "00:00" && props.SabadoF === "00:00" ? 50 : 37)}
                        </p>
                        {props.SabadoI === "00:00" && props.SabadoF === "00:00" ? (
                            <p>Fechado</p>
                        ) : (
                            <p>{`${props.SabadoI}h até ${props.SabadoF}h`}</p>
                        )}
                    </div>
                    <div className='HF'>
                        <p>Domingo</p>
                        <p className='pontS'>
                            {".".repeat(props.DomingoI === "00:00" && props.DomingoF === "00:00" ? 50 : 35)}
                        </p>
                        {props.DomingoI === "00:00" && props.DomingoF === "00:00" ? (
                            <p>Fechado</p>
                        ) : (
                            <p>{`${props.DomingoI}h até ${props.DomingoF}h`}</p>
                        )}
                    </div>
                </div>

            </div>
            <br />
            <div className="LojaMapa">
                <iframe src={props.mapaLojaURL} width="1072" height="288" title="Mapa da loja" frameBorder="0" style={{ border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
            </div>
            <br /> <br />
        </section>
    )
}
