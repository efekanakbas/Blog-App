import React, { useState, useEffect } from 'react';
import type { Metadata } from "next";
import NotifPageLayout from '@/layouts/NotifPageLayout';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";




export const metadata: Metadata = {
    title: "Notifications",
    description: "Notifications Page of Blog",
  };
  

interface pageProps {
  // Define props here
}

const page: React.FC<pageProps> = async  () => {
  //! States
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const {data} = await axios.get("https://65f8a9eedf151452460fdfd4.mockapi.io/notifications");
     
      return data;
    }
  });
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
     
  //*

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotifPageLayout/>
      </HydrationBoundary>
  );
};

export default page;