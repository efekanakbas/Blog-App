'use client'
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import React, { ReactNode } from "react";

interface ClientProviderProps {
  children: ReactNode;
}

const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  console.log("zAAAAA", isLoggedIn);

  if (!isLoggedIn) {
    return <div className="mt-20">selam</div>;
  } else {
    return <>
     <Navbar/>
    {children}</>;
  }
};

export default ClientProvider;
