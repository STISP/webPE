import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
<Link to="/Lojas"><button>Nossas Lojas</button></Link>

export default function ConsultaLojas(props) {

  return (
    <Link to={props.LinkPage} id={props.ID}>
      <div className="lojas">
        <img src="" alt="LogoIcon" />
        <div className="nameLoja">
          <h3>{props.loja}</h3>
          <h3>{props.nome}</h3>
          <p>Endereço: {props.endereco}</p>
        </div>

        <div className="lineButton">
          <div className="lojaStatus">
            <div className="timeIcon">relogio aqui</div>
            <p><span>Fechado</span> • {props.horarioOpenClose}</p>
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
