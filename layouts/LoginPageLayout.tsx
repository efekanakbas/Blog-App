import React from 'react';
import SlickSlider from "@/components/SlickSlider";
import { Box } from '@mui/material';
import LoginForm from '@/components/LoginForm';

interface LoginPageLayoutProps {
  // Define props here
}

const LoginPageLayout: React.FC<LoginPageLayoutProps> = () => {
  //! States
      
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    <Box sx={{display:'flex', height:'100vh'}}>
       <Box  sx={{width:'43%'}} >
            <LoginForm/>
       </Box>
       <Box  sx={{width:'57%', backgroundColor:'white'}} >
       
       <SlickSlider/>
       </Box>
    </Box>
  );
};

export default LoginPageLayout;