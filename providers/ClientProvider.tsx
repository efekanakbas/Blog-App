'use client'
import Login from "@/app/login/page";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import React, { ReactNode, useEffect } from "react";
import { redirect, usePathname, useRouter } from 'next/navigation';
import Head from 'next/head';
import Register from "@/app/register/page";


interface ClientProviderProps {
  children: ReactNode;
}

const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const path = usePathname()

  const url = path

  console.log("PATH", path)

  useEffect(() => {
    if (!isLoggedIn) {
      if(path === '/register') {
        router.replace('/register'); 
      router.refresh()
      } else {
        router.replace('/login'); 
      router.refresh()
      }
    } else {
      router.replace('/'); 
      // router.refresh()
    }
  }, [isLoggedIn, router, path]);

  if (!isLoggedIn) {
    return <>
    {path === '/register' ? <Register/> : <Login/>}
    </>
  } else {
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  }
};

export default ClientProvider;
