import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // clearing tokens
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    navigate("/");
  }, [navigate]);

  return <div>Logging out...</div>;
};


export default LogoutButton;
