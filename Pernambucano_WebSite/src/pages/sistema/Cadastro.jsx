import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

export default function CriarConta() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      senha: senha
    };

    if (!email || !senha) {
      const mensagem = 'Preencha todos os campos';
      setMensagem(mensagem);
      return;
    }

    try {
      const checkEmailResponse = await fetch(`http://localhost:3000/usuario/check-email?email=${email}`);
      const { exists } = await checkEmailResponse.json();
      if (exists) {
        const mensagem = 'Email já cadastrado';
        setMensagem(mensagem);
        return;
      }

      const response = await fetch('http://localhost:3000/usuario/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      if (response.ok) {
        console.log('conta registrada');
        localStorage.setItem('email', email);
        localStorage.setItem('nome', name);
        window.location.href = 'http://localhost:5173/PrimeiroAcesso'
      } else {
        console.log('Erro ao criar conta' + response.status);
      }
    } catch (error) {
      console.log('Erro ao registrar usuário:', error);
    }
  };

  return (
    <div className="inicioScreen">
      <div className="allForms">
        <h2>Cadastre-se</h2>
        <p>cadastre-se gratuitamente</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
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
          <button type="submit">Cadastrar</button>
        </form>
        {mensagem && <p className="errorEmailExist">{mensagem}</p>}
        <p>
          Já tem uma conta? <Link to="/Login" style={{ textDecoration: 'underline' }}>Entrar na conta</Link>
        </p>
      </div>
    </div>
  );
}