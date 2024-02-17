'use client'
import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';



const TanstackProvider= ({children} : {children: React.ReactNode}) => {

    const [queryClient] = useState(() => new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount : false,
          refetchOnWindowFocus : false,
          staleTime: 1000 * 60 * 5, // 5 dakika
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