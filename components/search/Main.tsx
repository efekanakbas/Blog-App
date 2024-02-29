import React from 'react';
import Card from '../Card';
import { useGeneral } from '@/contexts/GeneralContext';
import Top from './Main/Top';
import Users from './Main/Users';
import Projects from './Main/Projects';
import Companies from './Main/Companies';
import { useQuery } from '@tanstack/react-query';
import { getSearch } from '@/api';


interface dataProps {
  id: string;
  users: Data[];
  projects: Data[];
  companies: Data[];
}


interface MainProps {
  data: dataProps
}

const Main: React.FC<MainProps> = () => {
  //! States
      const {searchTabValue} = useGeneral()
      const {data, isLoading, error} = useQuery({
        queryKey:['searchData'],
        queryFn: getSearch
      })

    
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
  // console.log("data", data)
  //*

  switch (searchTabValue) {
    case 0:
        return <Top data={data} />
        break;

    case 1:
        return <Users  data={data.users}/>
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