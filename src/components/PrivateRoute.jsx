import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
