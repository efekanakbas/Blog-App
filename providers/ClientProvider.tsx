'use client'
import Login from "@/app/login/page";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import React, { ReactNode, useEffect } from "react";
import { redirect, useRouter } from 'next/navigation';
import Head from 'next/head';


interface ClientProviderProps {
  children: ReactNode;
}

const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // isLoggedIn değeri değiştiğinde çalışacak kod bloğu
    if (!isLoggedIn) {
      router.replace('/login'); // replace kullanarak geçmişi temizle
      router.refresh()
    } else {
      router.replace('/'); 
      // router.refresh()
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return <>
    <Login/>
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
