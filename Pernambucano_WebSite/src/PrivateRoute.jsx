import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

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

  const handleBeforeUnload = () => {
    localStorage.clear();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  if (emailExists === null) {
    // Exibição de um carregamento enquanto a verificação do email está sendo realizada
    return <div>Carregando...</div>;
  }

  return emailExists ? children : <Navigate to="/Login" />;
}