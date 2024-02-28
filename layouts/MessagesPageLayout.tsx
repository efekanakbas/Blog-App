'use client'
import LeftSide from '@/components/messages/LeftSide';
import Main from '@/components/messages/Main';
import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface MessagesPageLayoutProps {
  // Define props here
}

const MessagesPageLayout: React.FC<MessagesPageLayoutProps> = () => {
  //! States
  const { error, data, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await axios.get("https://65cbe2afefec34d9ed883ace.mockapi.io/messages");
     
      return response.data.reverse();
    }
  })
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      // console.log("data", data)
  //*

  if (isLoading) return <div>Loading...</div>

  if(error) return <div>Error</div>

  return (
    <Box  className='flex flex-1 rounded-lg gap-0' sx={{margin:"95px 0 28px 0", padding:{xs:"0", md: "0 50px", lg:"0 50px", xl:"0 214px"}, height:'calc(100vh - 123px)'}}>
        <LeftSide />
        <Main messages = {data} />
    </Box>
  );
};

export default MessagesPageLayout;