import { useState, useEffect } from 'react';
import Footer from './components/Footer.jsx';
import Menu from './components/Menu.jsx';

const Layout = ({ children }) => {
  const [message, setMessage] = useState('');
  const [isBlackFriday, setIsBlackFriday] = useState(false);
  const [promoDayClass, setPromoDayClass] = useState('');

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const date = today.getDate();
    const month = today.getMonth();

    const promoMessages = {
      2: 'Hoje é promoção na padaria!',
      3: 'Hoje é promoção de verduras!',
      4: 'Hoje é promoção de carne!',
    };

    const promoDayClasses = {
      2: 'bakeryPromoBackground',
      3: 'vegetablePromoBackground',
      4: 'meatPromoBackground',
    };

    const isBlackFrday = month === 10 && date >= 23 && date <= 30;
    setIsBlackFriday(isBlackFrday);

    if (isBlackFrday) {
      setMessage('Hoje é Black Friday! Aproveite as promoções em nossas lojas');
    } else {
      const todayMessage = promoMessages[dayOfWeek] || '';
      setMessage(todayMessage);
      setPromoDayClass(promoDayClasses[dayOfWeek] || '');
    }
  }, []);

  return (
    <>
      {message && (
        <h3 className={`MensagemTopoPagina ${isBlackFriday ? 'blackFridayBackground' : promoDayClass}`}>
          {message}
        </h3>
      )}
      <Menu />
      <div className="content">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
