'use client'
import React, { useEffect, useMemo } from 'react';
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser,postUser, putUser} from '@/api';
import { createContext, useContext, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

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
  const router = useRouter()

  const {data:userData} = useQuery({
    queryKey:['users'],
    queryFn: getUser
  })




  const {mutate: putMutate} = useMutation({
    mutationFn: putUser,
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })



  // console.log("dataUser", userData)
  // console.log("COOKIE", Cookies.get('loggedIn'))




  const [isLoggedIn, setIsLoggedIn] = useState(userData.isLogged);

  const signin = () => {
    putMutate({isLogged: true})
    setIsLoggedIn(true);
    router.push('/')
  };

  const login = () => {
    putMutate({isLogged: true})
    setIsLoggedIn(true);
    router.push('/')
  };

  const logout = () => {
    putMutate({isLogged: false})
    setIsLoggedIn(false);
    router.push('/login')
  };

  const values = {
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout,
    signin: signin,
  };

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