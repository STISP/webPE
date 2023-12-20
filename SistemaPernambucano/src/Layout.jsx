import Menu from './components/Menu.jsx';
import { useLocation } from 'react-router-dom';

const Layout = ({ children, hideMenuPaths = [] }) => {
  const { pathname } = useLocation();

  return (
    <>
      {!hideMenuPaths.includes(pathname) && <Menu />}
      <div className="content">
        {children}
      </div>
    </>
  );
};

export default Layout;
