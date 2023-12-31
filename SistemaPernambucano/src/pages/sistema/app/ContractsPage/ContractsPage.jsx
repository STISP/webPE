import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContractsPage = () => {
  const [q, setQ] = useState("");
  const [contracts, setContracts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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

    if (differenceInDays <= 15) {
      return 'rgba(164, 2, 2, 0.65)';
    } else if (differenceInDays <= 30) {
      return 'rgba(238, 114, 0, 0.65)';
    } else {
      return 'rgba(0, 133, 3, 0.65)';
    }
  };

  const getStatusColor = (status) => {
    if (status === 'ativo') {
      return 'rgba(0, 133, 3, 0.65)';
    } else if (status === 'cancelado') {
      return 'rgba(255, 0, 0, 0.65)';
    } else {
      return 'rgba(0, 0, 0, 0.65)';
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
          contractValue: contract.contractValue,
          status: contract.status,
        }));
        setContracts(contractsData);
        setIsLoaded(true);
      })
      .catch(error => {
        console.error('Erro ao buscar os contratos');
      });
  };

  function search(items) {
    return items.filter((item) => {
      const clientNameMatches = item.clientName.toLowerCase().indexOf(q.toLowerCase()) > -1;
      const statusMatches = status.length === 0 || status.includes(item.status);
      return clientNameMatches && statusMatches;
    });
  }

  const [status, setStatus] = useState([]);

  const StatusCheckbox = ({ status, setStatus }) => {
    const statusOptions = ["ativo", "Desativado"];

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
                  <p className='client-name'>{contract.clientName}</p>
                  <p className='contract-value'>Valor do Contrato: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contract.contractValue)}</p>
                  <div className='contractDetails'>
                    <p className={`due-date ${getDueDateColor(contract.endDate)}`} style={{ backgroundColor: getDueDateColor(contract.endDate) }}>Vencimento: {new Date(contract.endDate).toLocaleDateString('pt-BR')}</p>
                    <p className='statusListContracts' style={{ color: getStatusColor(contract.status), fontWeight: 600 }}>{contract.status}</p>
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