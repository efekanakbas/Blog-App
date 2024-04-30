import React, { useState, useEffect } from 'react';
import type { Metadata } from "next";
import NotifPageLayout from '@/layouts/NotifPageLayout';





export const metadata: Metadata = {
    title: "Notifications",
    description: "Notifications Page of Blog",
  };
  

interface pageProps {
  // Define props here
}

const page: React.FC<pageProps> = async  () => {
  //! States

  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
     
  //*

  return (
    
      <NotifPageLayout/>
     
  );
};

export default page;