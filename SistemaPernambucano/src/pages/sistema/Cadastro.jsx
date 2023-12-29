import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

export default function CriarConta() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    const emailParts = email.split('@');
    if (emailParts.length > 1) {
      setName(emailParts[0]);
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      senha: senha
    };

    if (!email || !senha || !confirmSenha) {
      const mensagem = 'Preencha todos os campos';
      setMensagem(mensagem);
      return;
    }

    if (senha !== confirmSenha) {
      const mensagem = 'As senhas não coincidem';
      setMensagem(mensagem);
      return;
    }

    const emailMinusc = email.toLowerCase();
    if (!emailMinusc.endsWith('@suppernambucano.com.br')) {
      const mensagem = 'Email inválido. Certifique-se de usar um email autorizado para continuar.';
      setMensagem(mensagem);
      return;
    }

    try {
      const checkEmailResponse = await fetch(`http://192.168.1.70:3000/usuario/check-email?email=${email}`);
      const { exists } = await checkEmailResponse.json();
      if (exists) {
        const mensagem = 'Email já cadastrado';
        setMensagem(mensagem);
        return;
      }

      const response = await fetch('http://192.168.1.70:3000/usuario/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      if (response.ok) {
        localStorage.setItem('email', email);
        localStorage.setItem('nome', name);
        window.location.href = 'http://192.168.1.70:5173/SistemaPE/'
      } else {
        console.log('Erro ao criar conta' + response.status);
        const mensagem = 'Erro ao criar conta. Por favor, tente novamente mais tarde.';
        setMensagem(mensagem);
      }
    } catch (error) {
      console.log('Erro ao registrar usuário:', error);
      const mensagem = 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.';
      setMensagem(mensagem);
    }
  };

  function handleClick() {
    window.scrollTo(0, 0);
  }

  return (
    <>
      <br />
      <div className="inicioScreen">
        <div className="allForms">
          <h2>Criar um novo usuario</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-cadast" style={{ display: 'none' }}>
              <input
                placeholder='Nome'
                type="text"
                id="nome"
                value={name}
                autoComplete="off"
                maxLength={50}
                onChange={(e) => {
                  setName(e.target.value);
                  setMensagem('');
                }}
              />
            </div>
            <div className="form-cadast">
              <input
                placeholder='Email'
                type="email"
                id="email"
                value={email}
                autoComplete="off"
                maxLength={255}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMensagem('');
                }}
              />
            </div>
            <div className="form-cadast">
              <input
                placeholder='Senha'
                type="password"
                id="senha"
                value={senha}
                autoComplete="off"
                onChange={(e) => {
                  setSenha(e.target.value);
                  setMensagem('');
                }}
              />
            </div>
            <div className="form-cadast">
              <input
                placeholder='Confirmar Senha'
                type="password"
                id="confirmSenha"
                value={confirmSenha}
                autoComplete="off"
                onChange={(e) => {
                  setConfirmSenha(e.target.value);
                  setMensagem('');
                }}
              />
            </div>
            {/*<h3>Permições do novo usuário</h3>
            <div className='checkboxCadastro'>
              <input
                type="checkbox"
                id="cadastro"
                value="cadastro"
              />
              <label htmlFor="cadastro">Cadastro de novo usuário</label>
            </div>
            <div className='checkboxCadastro'>
              <input
                type="checkbox"
                id="acessoContratos"
                value="acessoContratos"
              />
              <label htmlFor="acessoContratos">Acesso aos contratos</label>
            </div>
            <div className='checkboxCadastro'>
              <input
                type="checkbox"
                id="addContratos"
                value="addContratos"
              />
              <label htmlFor="addContratos">Acesso para adicionar contratos</label>
            </div>
            <div className='checkboxCadastro'>
              <input
                type="checkbox"
                id="delContratos"
                value="delContratos"
              />
              <label htmlFor="delContratos">Acesso para deletar contratos</label>
            </div>*/}

            <br />
            {mensagem && <p className="errorEmailExist">{mensagem}</p>}
            <button className='buttonLoginCadastro' type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  );
}
