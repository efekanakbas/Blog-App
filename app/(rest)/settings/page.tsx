import React from 'react';
import type { Metadata } from "next";
import SettingsPageLayout from '@/layouts/SettingsPageLayout';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getData } from '@/utils/CRUD';



export const metadata: Metadata = {
    title: "Settings",
    description: "Setting Page of Blog",
  };


interface pageProps {
  // Define props here
}

const page: React.FC<pageProps> = async() => {
  //! States
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["blocked"],
    queryFn: async () => {
      return getData('blocked')
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
    <SettingsPageLayout/>
    </HydrationBoundary>
  );
};

export default page;