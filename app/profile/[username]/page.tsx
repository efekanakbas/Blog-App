import ProfilePageLayout from '@/layouts/ProfilePageLayout';
import React, { useState, useEffect } from 'react';
import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { getData } from '@/utils/CRUD';



export const metadata: Metadata = {
    title: "Profile",
    description: "Profile Page of Blog",
  };

interface pageProps {
  params: any
}

const page: React.FC<pageProps> = async ({params}) => {
  //! States
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: ({pageParam}) => {
    return getData(`feeds?page=${pageParam}&limit=10`);
  },
  staleTime: 5000,
  initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const morePageExist = lastPage.length === 10;
      if(!morePageExist) {
        return;
      }
      return pages.length + 1;
    },
    pages: 1,
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
    <ProfilePageLayout>
      {params.username}
    </ProfilePageLayout>
    </HydrationBoundary>
  );
};

export default page;