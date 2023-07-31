import React from 'react';

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header>
          <h1>Política de Privacidade</h1>
          <button onClick={onClose}>&times;</button>
        </header>
        <main>
          <section>
            <h2>Coleta de informações</h2>
            <p>Coletamos informações pessoais que você nos fornece voluntariamente, como seu nome, endereço de e-mail e outras informações de contato. Também podemos coletar informações automaticamente quando você usa nosso site, como seu endereço IP, tipo de navegador e informações sobre como você interage com nosso site.</p>
          </section>
          <section>
            <h2>Alterações na política de privacidade</h2>
            <p>Podemos alterar esta política de privacidade a qualquer momento. Quando fizermos alterações, publicaremos a política atualizada em nosso site e notificaremos você conforme exigido por lei.</p>
          </section>
          <section>
            <h2>Contato</h2>
            <p>Se você tiver alguma dúvida sobre esta política de privacidade ou sobre como usamos suas informações pessoais, entre em contato conosco pelo endereço fornecido em nosso site.</p>
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
