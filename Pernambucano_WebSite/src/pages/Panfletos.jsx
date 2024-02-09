import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import DiaP1 from '../assets/Dia P - jan 20241.jpg';
import DiaP2 from '../assets/Dia P - jan 20242.jpg';
import DiaP3 from '../assets/Dia P - jan 20243.jpg';
import DiaP4 from '../assets/Dia P - jan 20244.jpg';
import DiaP5 from '../assets/Dia P - jan 20245.jpg';
import DiaP6 from '../assets/Dia P - jan 20246.jpg';
import OfertaNatal1 from '../assets/ofertaNatal 1 24.12.2023.jpg';
import OfertaNatal2 from '../assets/ofertaNatal 2 24.12.2023.jpg';
import OfertaNatal3 from '../assets/ofertaNatal 3 24.12.2023.jpg';
import OfertaNatal4 from '../assets/ofertaNatal 4 24.12.2023.jpg';
import OfertaNatal5 from '../assets/ofertaNatal 5 24.12.2023.jpg';
import OfertaNatal6 from '../assets/ofertaNatal 6 24.12.2023.jpg';
import OfertaNatal7 from '../assets/ofertaNatal 7 24.12.2023.jpg';
import ShowDeOferta1 from '../assets/showDeOferta1.jpg';
import ShowDeOferta2 from '../assets/showDeOferta2.jpg';
import FoliaDeOfertas1 from '../assets/Folia de ofertas 1.jpeg';
import FoliaDeOfertas2 from '../assets/Folia de ofertas 2.jpeg';
import FoliaDeOfertas3 from '../assets/Folia de ofertas 3.jpeg';
import FoliaDeOfertas4 from '../assets/Folia de ofertas 4.jpeg';
import FoliaDeOfertas5 from '../assets/Folia de ofertas 5.jpeg';
import FoliaDeOfertas6 from '../assets/Folia de ofertas 6.jpeg';
import FoliaDeOfertas7 from '../assets/Folia de ofertas 7.jpeg';
import FoliaDeOfertas8 from '../assets/Folia de ofertas 8.jpeg';



export default function Panfletos() {
  const [panfletoSelecionado, setPanfletoSelecionado] = React.useState(null);
  const sliderRef = React.useRef();

  const panfletos = [
    {
      id: 1,
      titulo: 'Folia de ofertas',
      dataValidade: 'Ofertás Válidas no Dia 09/02 á 12/02 de Fevereiro, 2024 ou Enquanto Durarem os Estoques',
      imagem: [FoliaDeOfertas1, FoliaDeOfertas2, FoliaDeOfertas3, FoliaDeOfertas4, FoliaDeOfertas5, FoliaDeOfertas6, FoliaDeOfertas7, FoliaDeOfertas8],
    },
    {
      id: 2,
      titulo: 'Dia P - Muitas ofertas!',
      dataValidade: 'Ofertás Válidas no Dia 30 de Janeiro ou Enquanto Durarem os Estoques',
      imagem: [DiaP1, DiaP2, DiaP3, DiaP4, DiaP5, DiaP6],
    },
    {
      id: 3,
      titulo: 'Show de ofertas',
      dataValidade: 'Ofertas válidas de 05 a 06 de Janeiro',
      imagem: [ShowDeOferta1, ShowDeOferta2],
    },
    {
      id: 4,
      titulo: 'Promoções de Natal',
      dataValidade: 'Ofertas válidas até 31 de dezembro (Prolongado)',
      imagem: [OfertaNatal1, OfertaNatal2, OfertaNatal3, OfertaNatal4, OfertaNatal5, OfertaNatal6, OfertaNatal7],
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