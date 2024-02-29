import SearchPageLayout from '@/layouts/SearchPageLayout';
import React from 'react';
import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { getSearch } from '@/api';

export const metadata: Metadata = {
    title: "Search",
    description: "Search Page of Blog",
  };

interface pageProps {
  // Define props here
}

const page: React.FC<pageProps> = async () => {
  //! States
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["searchData"],
    queryFn: getSearch
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
      <SearchPageLayout/>
      </HydrationBoundary>
  );
};

export default page;