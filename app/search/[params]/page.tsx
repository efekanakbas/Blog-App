import SearchPageLayout from '@/layouts/SearchPageLayout';
import React from 'react';
import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getData } from '@/utils/CRUD';


export const metadata: Metadata = {
    title: "Search",
    description: "Search Page of Blog",
  };

interface pageProps {
  params: any
}

const page: React.FC<pageProps> = async ({params}) => {
  //! States
  const queryClient = new QueryClient();
 
  await queryClient.prefetchQuery({
    queryKey: ["searchData"],
    queryFn: async () => {
    return getData(`searchData/${params.params}`)
  }
  });
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
    // console.log("params11", params)
  //*

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/*@ts-ignore*/}
      <SearchPageLayout/>
      </HydrationBoundary>
  );
};

export default page;