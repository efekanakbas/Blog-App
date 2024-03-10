'use client'
import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';



const TanstackProvider= ({children} : {children: React.ReactNode}) => {

    const [queryClient] = useState(() => new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount : true,
          refetchOnWindowFocus : false,
          staleTime: 1000 *  5, // 5 saniye
        }
      }
    }))

  return (
    <QueryClientProvider client={queryClient} >
      <ReactQueryDevtools initialIsOpen = {false} />
        {children}
        
    </QueryClientProvider>
  );
};

export default TanstackProvider;