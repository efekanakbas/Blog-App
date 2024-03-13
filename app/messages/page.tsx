import React from 'react';
import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import MessagesPageLayout from '@/layouts/MessagesPageLayout';
import { getData } from '@/utils/CRUD';


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
    queryKey: ["messagesAll"],
    queryFn: async () => {
      return getData('messages')
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