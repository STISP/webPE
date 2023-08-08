import React from 'react';
import Footer from './components/Footer.jsx';
import Menu from './components/Menu.jsx';

const Layout = ({ children }) => {
  return (
    <>
      <Menu />
      <div className="content">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
