import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import RelogioIcon from '../assets/relogio icon.svg'
import whatsappIcon from '../assets/whatsappIcon.svg'
import LocalizacaoIcon from '../assets/LocalizaçãoIcon.svg'

export default function ConsultaLojas(props) {

  const handleLocalizacaoClick = (event) => {
    event.preventDefault();
    window.open(props.linkLocalizacao, '_blank');
  };

  return (
    <Link to={props.LinkPage} className='detalhesLojas'>
      <div className='imgNameLojas'>
        <img className='imgCarNossasLojas' src={props.img} alt="LogoIcon" />
        <div className="nameLoja">
          <h3>{props.loja}</h3>
          <h3>{props.nome}</h3>
          <p>{props.endereco}</p>
        </div>
      </div>
      <div className="lineButton">
        <div className="lojaStatus">
          <img src={RelogioIcon} alt="RelogioIcon" />
          <p>{props.openClose} <span>•</span> {props.horarioOpenClose}</p>
        </div>

        <div className="localAndWhats">
          <a className='localizaçãoButton' href={props.linkLocalizacao} onClick={handleLocalizacaoClick}><img src={LocalizacaoIcon} alt="localizacao"/>
          
          </a>
          <a className='whatsappButton' href={props.linkWhatsapp} onClick={handleLocalizacaoClick}><img src={whatsappIcon} alt="whatsapp" /></a>
        </div>
      </div>

    </Link>
  );
}
