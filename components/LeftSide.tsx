'use client'
import React, { useState, useEffect } from 'react';
import Card from './Card';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Box, Typography } from '@mui/material';
import Cookies from "js-cookie";

interface LeftSideProps {
  // Define props here
}

const LeftSide: React.FC<LeftSideProps> = () => {
  //! States
  const avatar = Cookies.get('avatar')
  const username = Cookies.get('username')
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    <Card>
        <Box  sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}} >

        <Box sx={{display:"flex", gap:"8px"}} >
        <figure className='flex items-center' >
        {/*@ts-ignore*/}
        <Avatar style={{width:'50px', height:'50px'}} alt="User avatar" src={avatar === "null" ? null : avatar} />
      </figure>

      <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}} >
        <Typography sx={{fontWeight:"bold"}} >
            {username}
        </Typography>

        <Typography sx={{fontSize:"14px", textAlign:"start", color:"black", marginTop:'4px'}} >
            Lorem ipsum dolor sit amet.
        </Typography>
      </Box>
        </Box>
        <SettingsIcon sx={{fontSize:"26px"}} />
        </Box>

        <hr className='my-4' />
    </Card>
  );
};

export default LeftSide;