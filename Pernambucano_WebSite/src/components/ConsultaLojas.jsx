import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import RelogioIcon from '../assets/relogio icon.svg'
import whatsappIcon from '../assets/whatsappIcon.svg'
import LocalizacaoIcon from '../assets/LocalizaçãoIcon.svg'

export default function ConsultaLojas({ LinkPage, img, loja, nome, endereco, openClose, horarioOpenClose, linkLocalizacao, linkWhatsapp }) {
  const handleLocalizacaoClick = (event) => {
    event.preventDefault();
    window.open(linkLocalizacao, '_blank');
  };

  return (
    <Link to={LinkPage} className='detalhesLojas'>
      <div className='imgNameLojas'>
        <img className='imgCarNossasLojas' src={img} alt="LogoIcon" />
        <div className="nameLoja">
          <h3>{loja}</h3>
          <h3>{nome}</h3>
          <p>{endereco}</p>
        </div>
      </div>
      <div className="lineButton">
        <div className="lojaStatus">
          <img src={RelogioIcon} alt="RelogioIcon" />
          <p>{openClose} <span>•</span> {horarioOpenClose}</p>
        </div>
        <div className="localAndWhats">
          <a className='localizaçãoButton' href={linkLocalizacao} onClick={handleLocalizacaoClick}>
            <img src={LocalizacaoIcon} alt="localizacao" />
          </a>
          <a className='whatsappButton' href={linkWhatsapp} onClick={handleLocalizacaoClick}>
            <img src={whatsappIcon} alt="whatsapp" />
          </a>
        </div>
      </div>
    </Link>
  );
}
