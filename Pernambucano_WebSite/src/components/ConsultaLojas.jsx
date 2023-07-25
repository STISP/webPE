import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import RelogioIcon from '../assets/relogio icon.svg'

export default function ConsultaLojas(props) {

  return (
    <Link to={props.LinkPage} className='detalhesLojas'>
      <div className="lojas">
        <img className='imgCar' src={props.img} alt="LogoIcon" />
        <div className="nameLoja">
          <h3>{props.loja}</h3>
          <h3>{props.nome}</h3>
          <p>Endereço: {props.endereco}</p>
        </div>

        <div className="lineButton">
          <div className="lojaStatus">
            <div className="timeIcon">
              <img src={RelogioIcon} alt="RelogioIcon" />
            </div>
            <p>{props.openClose} • {props.horarioOpenClose}</p>
          </div>

          <div className="localAndWhats">
            <a href={props.linkLocalizacao}><button>Localização</button></a>
            <a href={props.linkWhatsapp}><button>WhatsApp</button></a>
          </div>
        </div>

      </div>
    </Link>
  );
}
