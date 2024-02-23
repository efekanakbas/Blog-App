import React from 'react';
import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
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
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const {data} = await axios.get("https://65cbe2afefec34d9ed883ace.mockapi.io/messages");
     
      return data.reverse();
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
    <MessagesPageLayout/>
    </HydrationBoundary>
  );
};

export default page;