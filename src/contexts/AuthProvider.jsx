import React, { createContext, useState } from 'react';

export const AuthContext = createContext({});

const isAuthorized = () => {
  if (localStorage.getItem('userId')) {
    return true;
  }

  return false;
};

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(isAuthorized);

  const logIn = () => setLoggedIn(true);

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  };

  return (
    // eslint-disable-next-line
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
