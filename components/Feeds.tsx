'use client'
import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Feed from './Feed';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Share from './Share';

interface Feeds {
  shareShow: boolean
}




const Feeds: React.FC<Feeds> = ({shareShow}) => {
  //! States

  const { isLoading, error, data } = useQuery({
    queryKey: ["feeds"],
    queryFn: () =>
      axios.get("https://65cbe2afefec34d9ed883ace.mockapi.io/feed")
  })
  
      
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
    //  console.log("data", data)
  //*

  if (isLoading) return <h1>Loading</h1>

  if(error) return <h1>Error</h1>

  return (
    <Box className="flex flex-col gap-7">
    {shareShow && <Share/>}
    {
    //@ts-ignore
    data.map((feed, i) => (
        <Feed key={i}  feed = {feed}/>
    ))}
    </Box>
  );
};

export default Feeds;