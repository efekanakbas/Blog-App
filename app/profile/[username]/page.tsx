import ProfilePageLayout from '@/layouts/ProfilePageLayout';
import React, { useState, useEffect } from 'react';
import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";

export const metadata: Metadata = {
    title: "Profile Page",
    description: "Profile Page of Blog",
  };

interface pageProps {
  params: any
}

const page: React.FC<pageProps> = async ({params}) => {
  //! States
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["feeds"],
    queryFn: () => {
    return axios.get("https://65cbe2afefec34d9ed883ace.mockapi.io/feed").then((response) => response.data);
  },
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