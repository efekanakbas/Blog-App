import React from 'react';
import type { Metadata } from "next";
import MessagesPageLayout from '@/layouts/MessagesPageLayout';


export const metadata: Metadata = {
    title: "Messages",
    description: "Home Page of Blog",
  };
  

interface pageProps {
  // Define props here
}

const page: React.FC<pageProps> = async () => {
  //! States

  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    <MessagesPageLayout/>
  );
};

export default page;