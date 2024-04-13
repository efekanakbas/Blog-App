import React from 'react';
import SlickSlider from "@/components/login/SlickSlider";
import { Box } from '@mui/material';
import LoginForm from '@/components/login/LoginForm';

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
       <Box  sx={{width:{xs:"100%", md: "43%"}}} >
            <LoginForm/>
       </Box>
       <Box  sx={{width: {xs: 0, md: '57%'}, backgroundColor:'white'}} >
       
       <SlickSlider/>
       </Box>
    </Box>
  );
};

export default LoginPageLayout;