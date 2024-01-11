import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoCompleta from '../../assets/Logo completa.svg'
import '../../App.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tentativas, setTentativas] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.endsWith('@suppernambucano.com.br')) {
      const mensagem = 'Email inválido. Certifique-se de usar um email autorizado para continuar.';
      setMensagem(mensagem);
      return;
    }

    if (!email || !senha) {
      const mensagem = 'Preencha todos os campos';
      setMensagem(mensagem);
      return;
    }

    if (bloqueado) {
      const mensagem = 'Usuário bloqueado. Tente novamente mais tarde.';
      setMensagem(mensagem);
      return;
    }

    try {
      const response = await fetch('http://192.168.1.70:3000/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('email', email);
        window.location.href = 'http://192.168.1.70:5173/#/';
      } else {
        const mensagem = 'Email ou senha incorretos';
        setTentativas((prevTentativas) => prevTentativas + 1);
        if (tentativas >= 2) {
          setBloqueado(true);
        }
        setMensagem(mensagem);
      }
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
    }
  };

  function handleClick() {
    window.scrollTo(0, 0);
  }

  return (
    <>
      <br />
      <div className="inicioScreen">
        <a href="https://suppernambucano.com.br/" target="_blank"><img src={LogoCompleta} alt="Logo Pernambucano" /></a>
        <div className="allForms">
          <h2 className='entrar-conta'>Entrar na conta</h2>
          <p>Seja bem vindo de volta</p>
          <form onSubmit={handleSubmit} className='form-login'>
            <div className="form-group-login">
              <input
                placeholder='Email'
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMensagem('');
                }}
              />
            </div>
            <div className="form-group-login">
              <input
                placeholder='Senha'
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  setMensagem('');
                }}
              />
            </div>
            {bloqueado ? (
            <p className="errorEmailExist">Usuário bloqueado. Tente novamente mais tarde.</p>
          ) : (
            mensagem && <p className="errorEmailExist">{mensagem}</p>
          )}
            <button className='buttonLoginCadastro' type="submit">Entrar</button>
          </form>
 
          <p className='alterarLoginCadastro'>
            Não tem uma conta? <Link to="https://suppernambucano.com.br/#/lojas/DomHelderServicos" onClick={handleClick} style={{ textDecoration: 'underline' }}>entre em contato com o ADM</Link>
          </p>
        </div>
      </div>
    </>
  );
}