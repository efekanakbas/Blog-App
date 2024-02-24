'use client'
import React, { useState } from 'react';
import SlickSlider from "@/components/SlickSlider";
import { Box } from '@mui/material';
import RegisterForm1 from '@/components/register/RegisterForm1';
import RegisterForm2 from '@/components/register/RegisterForm2';

interface RegisterPageLayoutProps {
  // Define props here
}

const RegisterPageLayout: React.FC<RegisterPageLayoutProps> = () => {
  //! States
      const [toggle, setToggle] = useState(false)
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
            {!toggle ? <RegisterForm1 setToggle={setToggle} /> : <RegisterForm2 setToggle={setToggle}/>}
       </Box>
       <Box  sx={{width:'57%', backgroundColor:'white'}} >
       
       <SlickSlider/>
       </Box>
    </Box>
  );
};

export default RegisterPageLayout;