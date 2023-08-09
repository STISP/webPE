import React from 'react';

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header>
          <h1>Política de Privacidade</h1>
          <button onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" /></svg></button>
        </header>
        <main>
          <section>
            <h2>Coleta de informações</h2>
            <p>Coletamos informações pessoais que você fornece, como nome, e-mail e outras informações de contato. Também coletamos dados automáticos, como IP e navegador.</p>
          </section>
          <section>
            <h2>Alterações na política de privacidade</h2>
            <p>Podemos alterar esta política a qualquer momento e notificaremos conforme necessário.</p>
          </section>
          <section>
            <h2>Contato</h2>
            <p>Se tiver dúvidas sobre esta política ou uso de informações pessoais, entre em contato pelo endereço do site.</p>
          </section>
        </main>
        <footer>
          <p>Todos os direitos reservados &copy; 2023 Supermercado Pernambucano</p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
