'use client'
import React, { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from "@/contexts/AuthContext";
import Login from "@/app/login/page";
import Navbar from "@/components/Navbar";
import Register from "@/app/register/page";
import Confirm from "@/app/confirm/page";

interface ClientProviderProps {
  children: ReactNode;
}

const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const path = usePathname()

  // console.log("PATH", path);

  useEffect(() => {
    if (!isLoggedIn) {
      if (path !== '/login' && path !== '/register' && path !== '/confirm') {
        // Kullanıcı oturum açmamışsa ve /login, /register veya /confirm olmayan bir yola erişmeye  çalışıyorsa, kullanıcıyı /login sayfasına yönlendir.
        router.replace('/login');
      } else {
        router.refresh()
      }
    } else {
      // Kullanıcı oturum açmışsa ve /login, /register veya /confirm sayfalarına erişmeye  çalışıyorsa, kullanıcıyı ana sayfaya yönlendir.
      if (path === '/login' || path === '/register' || path === '/confirm') {
        router.replace('/');
      }
    }
  }, [isLoggedIn, router, path]);

  if (!isLoggedIn) {
    return (
      <>
        {path === '/register' ? <Register /> : path === '/confirm' ? <Confirm /> : <Login />}
      </>
    );
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