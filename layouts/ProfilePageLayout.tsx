import LeftSide from '@/components/profile/leftSide/LeftSide';
import RightSide from '@/components/RightSide';
import RightBottom from '@/components/profile/rightSide/RightSide';
import TopSide from '@/components/profile/TopSide';
import { Box } from '@mui/material';
import React, { useState, useEffect,ReactNode } from 'react';

interface ProfilePageLayoutProps {
    children: ReactNode
}

const ProfilePageLayout: React.FC<ProfilePageLayoutProps> = ({children}) => {
  //! States
      
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    <Box  sx={{ display:"flex", flexDirection:{xs:"column", md:"row"}, alignItems:{xs:"center", md:"start"}, padding:{xs:"0", md: "0 50px", lg:"0 50px", xl:"0 214px"}, gap:"25px", margin:"95px 0 28px 0"}} >
      <Box  sx={{width:{xs:'100%', md:'75.426%'}, padding:{xs:'0 25px ', md:"0"}, display:'flex', flexDirection:'column', gap:'25px'}}   >
      
      <TopSide/>
      <Box sx={{display:{xs: 'grid', md:'flex'}, gap:'25px'}}>
        <LeftSide/>
        <RightBottom/>
      </Box>
      
      </Box>
      <Box  sx={{width:{xs:'100%', md:'24.574%'}, padding:{xs:'0 25px ', md:"0"}}}  >
        <RightSide/>
      </Box>
        
    </Box>
  );
};

export default ProfilePageLayout;