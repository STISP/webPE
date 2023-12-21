import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ContractsPage = () => {
  const [totalContracts, setTotalContracts] = useState(0);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    if (contracts.length === 0) {
      fetch('http://localhost:3000/contracts')
        .then(response => response.json())
        .then(data => {
          const activeContracts = data.filter(contract => contract.status === 'ativo');
          const contractValues = activeContracts.map(contract => contract.contractValue);
          setTotalContracts(data.length);
          setContracts(contractValues);
        })
        .catch('Erro ao carregar contratos');
    }
  }, [contracts]);

  const totalValue = contracts.reduce((acc, value) => acc + value, 0);

  const currentDate = new Date().toLocaleDateString('pt-BR');
  const currentDay = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });

  return (
    <>
      <div className='menuContracts'>
        <div className='tituloAndSubtituloPage'>
          <h1 className='TituloPage'>Contratos</h1>
          <p className='SubtituloPage'>Gerenciamento de Contratos</p>
        </div>
      </div>
      <div className='opContract'>
        <div className='opViewContractsScreenInicial'>
          <Link to="/ContractsPage/ListContracts">
            <div className='iconAndTotalContracts'>
              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm54.2 253.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.7 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 349l-9.8 32.8z" /></svg>
              <span>{totalContracts} Contratos</span>
            </div>
            <div className="dataAndIcon">
              <div className='dateInfo'>
                <p className='data'>{currentDate}</p>
                <p className='day'>{currentDay}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" /></svg>
            </div>
          </Link>
        </div>
        <div className='opViewContractsScreenInicial2'>
          <Link to="/ContractsPage/ListContracts">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="23" viewBox="0 0 34 23" fill="none">
              <path d="M3.77778 0C1.6941 0 0 1.71901 0 3.83333V19.1667C0 21.281 1.6941 23 3.77778 23H30.2222C32.3059 23 34 21.281 34 19.1667V3.83333C34 1.71901 32.3059 0 30.2222 0H3.77778ZM7.55556 19.1667H3.77778V15.3333C5.86146 15.3333 7.55556 17.0523 7.55556 19.1667ZM3.77778 7.66667V3.83333H7.55556C7.55556 5.94766 5.86146 7.66667 3.77778 7.66667ZM26.4444 19.1667C26.4444 17.0523 28.1385 15.3333 30.2222 15.3333V19.1667H26.4444ZM30.2222 7.66667C28.1385 7.66667 26.4444 5.94766 26.4444 3.83333H30.2222V7.66667ZM17 5.75C18.5029 5.75 19.9442 6.3558 21.0069 7.43414C22.0696 8.51247 22.6667 9.97501 22.6667 11.5C22.6667 13.025 22.0696 14.4875 21.0069 15.5659C19.9442 16.6442 18.5029 17.25 17 17.25C15.4971 17.25 14.0558 16.6442 12.9931 15.5659C11.9304 14.4875 11.3333 13.025 11.3333 11.5C11.3333 9.97501 11.9304 8.51247 12.9931 7.43414C14.0558 6.3558 15.4971 5.75 17 5.75Z" fill="white" />
            </svg>
            <div className='iconAndTotalContracts2'>
              <div className="totalAndIcon">
                <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue)}</span>
                <p>Valor total de contratos ativos</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" /></svg>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ContractsPage;