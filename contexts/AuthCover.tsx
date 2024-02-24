import React from 'react';


import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUser } from '@/api';



  

interface AuthCoverProps {
    children: React.ReactNode
}

const AuthCover: React.FC<AuthCoverProps> = async  ({children}) => {
  //! States
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: getUser
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
       {children}
       </HydrationBoundary>
  );
};

export default AuthCover;