import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RelogioIcon from '../assets/relogio icon.svg';
import whatsappIcon from '../assets/whatsappIcon.svg';
import LocalizacaoIcon from '../assets/LocalizaçãoIcon.svg';

const ConsultaLojas = memo(({
  LinkPage,
  img,
  loja,
  nome,
  endereco,
  openClose,
  horarioOpenClose,
  linkLocalizacao,
  linkWhatsapp
}) => {
  const handleLinkClick = useCallback((event, link) => {
    event.preventDefault();
    window.open(link, '_blank');
  }, []);

  return (
    <Link to={LinkPage} className='detalhesLojas'>
      <div className='imgNameLojas'>
        <img loading="lazy" className='imgCarNossasLojas' src={img} alt="LogoIcon" />
        <div className="nameLoja">
          <h3>{loja}</h3>
          <h3>{nome}</h3>
          <p>{endereco}</p>
        </div>
      </div>
      <div className="lineButton">
        <div className="lojaStatus">
          <img loading="lazy" src={RelogioIcon} alt="RelogioIcon" />
          <div>{openClose} <span>•</span> {horarioOpenClose}</div>
        </div>
        <div className="localAndWhats">
          <div className='localizaçãoButton' onClick={(event) => handleLinkClick(event, linkLocalizacao)}>
            <img loading="lazy" src={LocalizacaoIcon} alt="localizacao" />
          </div>
          <div className='whatsappButton' onClick={(event) => handleLinkClick(event, linkWhatsapp)}>
            <img loading="lazy" src={whatsappIcon} alt="whatsapp" />
          </div>
        </div>
      </div>
    </Link>
  );
});

ConsultaLojas.propTypes = {
  LinkPage: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  loja: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  endereco: PropTypes.string.isRequired,
  openClose: PropTypes.node.isRequired,
  horarioOpenClose: PropTypes.string.isRequired,
  linkLocalizacao: PropTypes.string.isRequired,
  linkWhatsapp: PropTypes.string.isRequired,
};

export default ConsultaLojas;
