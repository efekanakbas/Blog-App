'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = () => {
    // Login işlemleri burada gerçekleştirilir
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Logout işlemleri burada gerçekleştirilir
    setIsLoggedIn(false);
  };

  const values = {
    isLoggedIn: isLoggedIn,
    login: login,
    logout:logout
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
