import React, { createContext, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleLogIn, setLoggedOut } from '../../store/actionCreators/userAC';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.users.isLoggedIn);

  const dispath = useDispatch();

  const login = (credentials, resolve) => dispath(handleLogIn(credentials, resolve))
  const logout = () => dispath(setLoggedOut());

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
