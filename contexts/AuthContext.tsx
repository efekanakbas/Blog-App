'use client'
import React, { useEffect, useMemo } from 'react';
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser, postUser } from '@/api';
import { createContext, useContext, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';
import AuthCover from './AuthCover';

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  signin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const queryClient = useQueryClient()

  const {data} = useQuery({
    queryKey:['users'],
    queryFn: getUser
  })


  const {mutate} = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })



  console.log("data", data)
  console.log("COOKIE", Cookies.get('loggedIn'))



  const [isLoggedIn, setIsLoggedIn] = useState(data[0].isLogged);

  const signin = () => {
    setIsLoggedIn(true);
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const values = {
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout,
    signin: signin,
  };

  return (
    
      <AuthContext.Provider value={values}>
        {/* <AuthCover> */}
        {children}
        {/* </AuthCover> */}
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