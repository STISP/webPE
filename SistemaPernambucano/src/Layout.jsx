import { useState, useEffect } from 'react';
import Menu from './components/Menu.jsx';

const Layout = ({ children }) => {
  return (
    <>
      <Menu />
      <div className="content">
        {children}
      </div>
    </>
  );
};

export default Layout;
