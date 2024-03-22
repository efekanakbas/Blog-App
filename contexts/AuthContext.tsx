'use client'
import React, { useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { getData, postData } from '@/utils/CRUD';
import toast from 'react-hot-toast';

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextType {
  login: () => void;
  logout: () => void;
  signin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const router = useRouter()

  // const {data, error, isLoading} = useQuery({
  //   queryKey: ['islogged'],
  //   queryFn: async () => {
  //     return await getData('islogged')
  //   },
  //   enabled: Cookies.get('token') ? true : false
  // })




  
  // console.log("COOKIE", Cookies.get('loggedIn'))




  

  



  const signin = () => {
    router.push('/login')
  };

  const login = () => {
    router.push('/')
    setTimeout(() => {
      toast.success('Welcome!')
    }, 500);
    
  };

  const logout = async () => {
    await getData('logout')
    Cookies.remove('token')
    Cookies.remove('isLoggedIn')
    Cookies.remove('userId')
    Cookies.remove('email')
    Cookies.remove('username')
    Cookies.remove('firstName')
    Cookies.remove('lastName')
    Cookies.remove('avatar')
    Cookies.remove('cover')
    router.push('/login')
  };

  const values = {
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