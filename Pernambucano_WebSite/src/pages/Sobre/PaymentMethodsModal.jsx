import React from 'react';

const PaymentMethodsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <header>
                    <h1>Formas de Pagamento</h1>
                    <button onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" /></svg></button>
                </header>
                <main>
                    <section>
                        <h2>Cartão de Crédito</h2>
                        <p>Aceitamos todos os principais cartões de crédito, incluindo Visa, Mastercard e American Express. Seu pagamento será processado de forma segura através de nossa plataforma de pagamento.</p>
                    </section>
                    <section>
                        <h2>Pagamento na Entrega</h2>
                        <p>Oferecemos a opção de pagamento na entrega para clientes locais. Você pode pagar em dinheiro ou usar cartão de crédito/débito ao receber o pedido no seu endereço de entrega.</p>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default PaymentMethodsModal;
