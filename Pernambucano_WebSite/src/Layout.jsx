import { useState, useEffect, lazy, Suspense } from 'react';
import Footer from './components/Footer.jsx';
import Menu from './components/Menu.jsx';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const Footer = lazy(() => import('./components/Footer.jsx'));
  const Menu = lazy(() => import('./components/Menu.jsx'));
  const [message, setMessage] = useState('');
  const [isBlackFriday, setIsBlackFriday] = useState(false);
  const [isChristmasPromo, setIsChristmasPromo] = useState(false);
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

    const isChristmasPromoDay = month === 11 && date >= 21 && date <= 24;
    setIsChristmasPromo(isChristmasPromoDay);

    const isEndOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() === date;
    const isPromoDay = isEndOfMonth && !isBlackFrday && !isChristmasPromoDay;

    if (isBlackFrday) {
      setMessage('Hoje é Black Friday! Aproveite as promoções em nossas lojas');
    } else if (isChristmasPromoDay) {
      setMessage(
        <Link to="/panfletos" className='promoNatal' rel="noopener noreferrer">
          Hoje tem promoção de Natal! <span>Clique aqui para conferir</span>
        </Link>
      );
    } else if (isPromoDay) {
      setMessage('Dia P - Promoção especial no final do mês!');
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
      <Suspense fallback={<div></div>}>
        <Menu />
        <div className="content">
          {children}
        </div>
        <Footer />
      </Suspense>
    </>
  );
};

export default Layout;