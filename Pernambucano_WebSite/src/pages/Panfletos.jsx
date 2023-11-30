import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Quarta_verde_Panfleto1 from '../assets/Quarta verde 1 30.11.2023.jpg';
import Quarta_verde_Panfleto2 from '../assets/Quarta verde 2 30.11.2023.jpg';
import Quarta_verde_Panfleto3 from '../assets/Quarta verde 3 30.11.2023.jpg';
import Quarta_verde_Panfleto4 from '../assets/Quarta verde 4 30.11.2023.jpg';
import Quarta_verde_Panfleto5 from '../assets/Quarta verde 5 30.11.2023.jpg';
import Quarta_verde_Panfleto6 from '../assets/Quarta verde 6 30.11.2023.jpg';
import DiaPeAniversario1 from '../assets/1 Dia P (aniversário) 30_11_2023.jpg';
import DiaPeAniversario2 from '../assets/1 Dia P (aniversário) 30_11_2023.jpg';

export default function Panfletos() {
  const [panfletoSelecionado, setPanfletoSelecionado] = React.useState(null);
  const sliderRef = React.useRef();

  const panfletos = [
    {
      id: 1,
      titulo: 'Quarta verde',
      dataValidade: 'Ofertas válidas no dia 31 de novembro',
      imagem: [DiaPeAniversario1, DiaPeAniversario2],
    },
    {
      id: 2,
      titulo: 'Quarta verde',
      dataValidade: 'Apenas nesta quarta, 29 de novembro',
      imagem: [Quarta_verde_Panfleto1, Quarta_verde_Panfleto2, Quarta_verde_Panfleto3, Quarta_verde_Panfleto4, Quarta_verde_Panfleto5, Quarta_verde_Panfleto6],
    },
  ];

  const handlePanfletoClick = (id) => {
    const panfletoClicado = panfletos.find((panfleto) => panfleto.id === id);
    setPanfletoSelecionado(panfletoClicado);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVoltar = () => {
    setPanfletoSelecionado(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  if (panfletoSelecionado) {
    return (
      <>
        <div className="imagens-panfleto">
          {/*<div className="tituloBottonBack">
            <h1>{panfletoSelecionado.titulo}</h1>

            <div className="bottonsPrevNext">
              <button className='prevBTN' onClick={handlePrev}>Anterior</button>
              <button className='nextBTN' onClick={handleNext}>Próximo</button>
            </div>

            <button onClick={handleVoltar} className="voltar-btn">
              Voltar
            </button>
          </div>*/}
          <Slider ref={sliderRef} dots={true} infinite={true} speed={500}>
            {panfletoSelecionado.imagem.map((imagem, index) => (
              <div key={index}>
                <a href={imagem} target="_blank" rel="noopener noreferrer">
                  <img loading="lazy" src={imagem} alt={`Imagem ${index + 1}`} />
                </a>
              </div>
            ))}
          </Slider>
          <p><b>{panfletoSelecionado.titulo}</b> | {panfletoSelecionado.dataValidade}</p>
          <div className="bottonBack2">
            <div className="bottonsPrevNext">
              <button className='prevBTN' onClick={handlePrev}>Anterior</button>
              <button className='nextBTN' onClick={handleNext}>Próximo</button>
            </div>

            <button onClick={handleVoltar} className="voltar-btn2">
              Voltar
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h5 className='caminho_page'>
        Página Inicial / Panfletos
      </h5>

      <div className="panfletos">
        {panfletos.map((panfleto) => (
          <div key={panfleto.id} className="panfleto" onClick={() => handlePanfletoClick(panfleto.id)}>
            <img loading="lazy" src={panfleto.imagem[0]} alt={panfleto.titulo} />
            <h3>{panfleto.titulo}</h3>
            <p>{panfleto.dataValidade}</p>
            <a href={panfleto.link}>Ver Produtos</a>
          </div>
        ))}
      </div>
    </>
  );
}