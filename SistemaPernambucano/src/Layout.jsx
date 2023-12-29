import React, { useState, useEffect } from 'react';
import Menu from './components/Menu.jsx';
import { useLocation } from 'react-router-dom';

const Layout = ({ children, hideMenuPaths = [] }) => {
  const { pathname } = useLocation();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <>
      {isPageLoaded && !hideMenuPaths.includes(pathname) && <Menu />}
      <div className="content">
        {children}
      </div>
    </>
  );
};

export default Layout;