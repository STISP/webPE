import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { MoonLoader } from 'react-spinners';

export default function PrivateRoute({ children }) {
  const [emailExists, setEmailExists] = useState(null);

  useEffect(() => {
    const checkEmail = async () => {
      const email = localStorage.getItem("email");
      const response = await fetch(`http://localhost:3000/usuario/check-email?email=${email}`);
      const { exists } = await response.json();
      setEmailExists(exists);
    };

    checkEmail();
  }, []);

  {/*  const handleBeforeUnload = () => {
    localStorage.clear();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); */}

  if (emailExists === null) {
    return (
      <>
        <br />
        <div className='centralizado'>
          <MoonLoader color="#0261a3" loading={true} size={60} />
        </div>
      </>
    );
  }

  return emailExists ? children : <Navigate to="/Login" />;
}