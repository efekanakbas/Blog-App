import React, { useEffect, useState } from 'react';
import Card from '../Card';
import { useGeneral } from '@/contexts/GeneralContext';
import Top from './Main/Top';
import Users from './Main/Users';
import Projects from './Main/Projects';
import Companies from './Main/Companies';
import { useQuery } from '@tanstack/react-query';
import { getData } from '@/utils/CRUD';
import { useParams } from 'next/navigation'


interface dataProps {
  avatar: String,
  cover: String,
  email: String,
  firstName: String,
  lastName: String,
  username: String
}


interface MainProps {
  data: dataProps[]
}

const Main: React.FC<MainProps> = () => {
  //! States
      const params = useParams().params
      const {searchTabValue} = useGeneral()
      const {data, isLoading, error, refetch} = useQuery({
        queryKey:['searchData'],
        queryFn: async () => {
          return await getData(`searchData/${params}`);
        }
      })

    
  //!
  //todo Functions
      
  //todo
  //? useEffect
  
  
  //?
  //* consoleLogs
  console.log("data", data)
  console.log("params", params)
  //*

  switch (searchTabValue) {
    case 0:
      return  <Top data={data} />;

        break;

    case 1:
        return <Users  data={data}/>
        break;
    
    case 2:
        return <Projects  data={data.projects}/>
        break;  
        
    case 3:
        return <Companies  data={data.companies}/>
        break;
  
    
  }
};

export default Main;