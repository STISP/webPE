import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContractsPage = () => {
  const [q, setQ] = useState("");
  const [contracts, setContracts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [store, setStore] = useState([]);

  useEffect(() => {
    if (contracts.length === 0) {
      fetchContracts();
    }
  }, []);

  const isValidDate = (dateString) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return dateRegex.test(dateString);
  };

  const getDueDateColor = (dueDate) => {
    if (!isValidDate(dueDate)) {
      return 'rgba(0, 0, 0, 0.65)'; // Return default color if date is invalid
    }

    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const differenceInDays = Math.floor((dueDateObj - currentDate) / (1000 * 60 * 60 * 24));

    if (differenceInDays <= 0) {
      return '#C35A5A';
    } else if (differenceInDays <= 30) {
      return '#EE7200';
    } else {
      return '#59AF5B';
    }
  };

  const getAvisoMensagem = (dueDate) => {
    if (!isValidDate(dueDate)) {
      return null;
    }

    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const differenceInDays = Math.floor((dueDateObj - currentDate) / (1000 * 60 * 60 * 24));

    if (differenceInDays <= 0) {
      return 'Contrato vencido';
    } else if (differenceInDays <= 30) {
      return 'Proximo do vencimento';
    } else {
      return null;
    }
  };

  const navigate = useNavigate();
  const handleGoRelatorio = () => {
    navigate('/ContractsPage/RelatoriosContracts');
  };

  const fetchContracts = () => {
    setIsLoaded(false); // Set isLoaded to false before fetching contracts
    axios.get('http://192.168.1.70:3000/contracts')
      .then(response => {
        const contractsData = response.data.map(contract => ({
          id: contract.id,
          clientName: contract.clientName,
          endDate: contract.endDate,
          startDate: contract.startDate,
          contractValue: contract.contractValue,
          status: contract.status,
          loja: contract.loja,
        }));
        setContracts(contractsData);
        setIsLoaded(true);
      })
      .catch(error => {
        console.error('Erro ao buscar os contratos');
      });
  };

  const storeNames = {
    "MERCADINHO DOM HELDER DE ALIMENTOS LTDA": "P1",
    "MERCANTIL JABOATÃO DE ALIMENTOS LTDA - MATRIZ": "P2",
    "T.H SUPERMERCADO EIRELLI EPP": "P3",
    "COMERCIO DE ALIMENTOS PERNAMBUCANO LTDA": "P4",
    "MERCANTIL DOIS IRMÃOS DE ALIMENTOS LTDA": "P5",
    "MERCANTIL GOIANA DE ALIMENTOS LTDA": "P6",
    "MERCANTIL JABOATAO DE ALIMENTOS LTDA": "P7",
    "COMERCIO DE ALIMENTOS PERNAMBUCANO LTDA - VASCO DA GAMA": "P8",
    "COMERCIO DE ALIMENTOS PERNAMBUCANO - CENTRAL DE SERVIÇOS": "CS",
  };

  function search(items) {
    return items
      .filter((item) => {
        const clientNameMatches = item.clientName.toLowerCase().indexOf(q.toLowerCase()) > -1;
        const statusMatches = status.length === 0 || status.includes(item.status);
        const storeMatches = store.length === 0 || store.includes(storeNames[item.loja]);
        return clientNameMatches && statusMatches && storeMatches;
      })
      .sort((a, b) => {
        // Coloca os contratos 'Desativado' primeiro
        if (a.status === 'Desativado' && b.status !== 'Desativado') {
          return -1;
        }
        if (b.status === 'Desativado' && a.status !== 'Desativado') {
          return 1;
        }

        // Ordena o restante dos contratos pela data de vencimento mais próxima
        const dueDateA = new Date(a.endDate);
        const dueDateB = new Date(b.endDate);
        return dueDateA - dueDateB;
      });
  }

  const [status, setStatus] = useState([]);

  const StatusCheckbox = ({ status, setStatus }) => {
    const statusOptions = ["Ativo", "Desativado"];

    const handleChange = (event) => {
      if (event.target.checked) {
        setStatus([...status, event.target.value]);
      } else {
        setStatus(status.filter(status => status !== event.target.value));
      }
    };

    return (
      <div className="status-checkbox">
        {statusOptions.map((statusOption, index) => (
          <label key={index}>
            <input
              id={`status-${index}`}
              name={`status-${index}`}
              type="checkbox"
              value={statusOption}
              checked={status.includes(statusOption)}
              onChange={handleChange}
            />
            {statusOption}
          </label>
        ))}
      </div>
    );
  };

  const StoreCheckbox = ({ store, setStore }) => {
    const storeOptions = Object.values(storeNames);

    const handleChange = (event) => {
      if (event.target.checked) {
        setStore([...store, event.target.value]);
      } else {
        setStore(store.filter(option => option !== event.target.value));
      }
    };

    return (
      <div className="store-checkbox">
        {storeOptions.map((storeOption, index) => (
          <label key={index}>
            <input
              id={`store-${index}`}
              name={`store-${index}`}
              type="checkbox"
              value={storeOption}
              checked={store.includes(storeOption)}
              onChange={handleChange}
            />
            {storeOption}
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className='view-contracts'>
      <div className='menuContracts'>
        <div className='tituloAndSubtituloPage'>
          <h1 className='TituloPage'>Lista de Contratos</h1>
          <p className='SubtituloPage'>Gerenciamento e Detalhes dos Contratos</p>
        </div>
        <div className="buttonsContracts">
          <button className='add-contract-button' onClick={handleGoRelatorio}>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512" fill='#fff'>
              <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z" />
            </svg>
            Resumo
          </button>
          <Link to="/ContractsPage/AddContract" >
            <button className='add-contract-button'>
              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" fill='#fff'>
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
              </svg>
              Adicionar Contrato
            </button>
          </Link>
        </div>
      </div>
      <div className="filerSearch">
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          placeholder="Pesquisar Contrato"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <StatusCheckbox status={status} setStatus={setStatus} />
        <StoreCheckbox store={store} setStore={setStore} />
      </div>

      {isLoaded ? (
        contracts.length === 0 ? (
          <div className="WarnListClean">
            <h2>Lista vazia no momento</h2>
            <Link to="/ContractsPage/AddContract">Adicione o primeiro contrato clicando aqui</Link>
          </div>
        ) : (
          <ul className='contracts-list'>
            {search(contracts).map((contract) => (
              <li key={contract.id} className='contract-item'>
                <Link to={`/ContractsPage/Contrato/${contract.id}`} className='contract-link'>
                  <div className="contrato-loja" style={{ borderBottom: `5px solid ${getDueDateColor(contract.endDate)}` }}>
                    <div className='contrato-loja-cliente'>
                      <p className='nome-loja'>{storeNames[contract.loja]}</p>
                      <p className='contract-value'>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contract.contractValue)}</p>
                    </div>
                    <p className='client-name'>{contract.clientName}</p>
                  </div>
                  <div className='contractDetails' style={{ borderBottom: `1px solid ${getDueDateColor(contract.endDate)}`, borderLeft: `1px solid ${getDueDateColor(contract.endDate)}`, borderRight: `1px solid ${getDueDateColor(contract.endDate)}` }}>
                    <p className={`due-date ${getDueDateColor(contract.endDate)}`} style={{ color: getDueDateColor(contract.endDate), border: `1px solid ${getDueDateColor(contract.endDate)}` }}>{new Date(contract.startDate).toLocaleDateString('pt-BR')} - {new Date(contract.endDate).toLocaleDateString('pt-BR')}</p>
                    <p className={`due-date ${getDueDateColor(contract.endDate)}`} style={getAvisoMensagem(contract.endDate) ? { color: getDueDateColor(contract.endDate), border: `1px solid ${getDueDateColor(contract.endDate)}` } : {}}>{getAvisoMensagem(contract.endDate)}</p>
                    <p className={`due-date ${getDueDateColor(contract.endDate)}`} style={{ color: getDueDateColor(contract.endDate), border: `1px solid ${getDueDateColor(contract.endDate)}` }}>{contract.status}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )
      ) : (
        <p>Carregando contratos...</p>
      )}
    </div>
  );
};

export default ContractsPage;