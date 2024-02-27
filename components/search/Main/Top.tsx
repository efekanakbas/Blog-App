import { getSearch } from '@/api';
import Card from '@/components/Card';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface TopProps {
  // Define props here
}

const Top: React.FC<TopProps> = () => {
  //! States
      const {data, isLoading, error} = useQuery({
        queryKey:['search'],
        queryFn: getSearch
      })
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      console.log("data", data)
  //*

  return (
    <Card>
      Top
    </Card>
  );
};

export default Top;