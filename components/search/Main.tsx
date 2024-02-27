import React from 'react';
import Card from '../Card';
import { useGeneral } from '@/contexts/GeneralContext';
import Top from './Main/Top';
import Users from './Main/Users';
import Projects from './Main/Projects';
import Companies from './Main/Companies';

interface MainProps {
  // Define props here
}

const Main: React.FC<MainProps> = () => {
  //! States
      const {searchTabValue} = useGeneral()
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  switch (searchTabValue) {
    case 0:
        return <Top/>
        break;

    case 1:
        return <Users/>
        break;
    
    case 2:
        return <Projects/>
        break;  
        
    case 3:
        return <Companies/>
        break;
  
    
  }
};

export default Main;