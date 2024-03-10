'use client'
import LeftSide from '@/components/messages/LeftSide';
import Main from '@/components/messages/Main';
import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';


interface MessagesPageLayoutProps {
  // Define props here
}

const MessagesPageLayout: React.FC<MessagesPageLayoutProps> = () => {
  //! States
  
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      // console.log("data", data)
  //*



  return (
    <Box  className='flex flex-1 rounded-lg gap-0' sx={{margin:"95px 0 28px 0", padding:{xs:"0", md: "0 50px", lg:"0 50px", xl:"0 214px"}, height:'calc(100vh - 123px)'}}>
        <LeftSide />
        <Main/>
    </Box>
  );
};

export default MessagesPageLayout;