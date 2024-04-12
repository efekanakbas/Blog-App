import { Box } from '@mui/material';
import React, { useState, useEffect, ReactNode } from 'react';
import LeftSide from '../components/LeftSide';
import RightSide from '../components/RightSide';


interface HomePageLayoutProps {
  children: ReactNode
}



const HomePageLayout: React.FC<HomePageLayoutProps> = ({children}) => {


  return (
    <Box  sx={{ display:"flex", flexDirection:{xs:"column", md:"row"}, alignItems:{xs:"center", md:"start"}, padding:{xs:"0", md: "0 50px", lg:"0 50px", xl:"0 214px"}, gap:"25px", margin: {xs: "84px 0 28px 0", md: "95px 0 28px 0"}}} >
      <Box sx={{width:{xs:'100%', md:'25%'}, padding:{xs:'0 25px', md:"0"}}}   >
        <LeftSide/>
      </Box>
      <Box  sx={{width:{xs:'100%', md:'50%'}, padding:{xs:'0 25px ', md:"0"}}}   >
      
      {children}
      
      </Box>
      <Box  sx={{width:{xs:'100%', md:'25%'}, padding:{xs:'0 25px ', md:"0"}}}  >
        <RightSide/>
      </Box>
    </Box>
  );
};

export default HomePageLayout;