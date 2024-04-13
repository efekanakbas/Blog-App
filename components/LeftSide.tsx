'use client'
import React, { useState, useEffect } from 'react';
import Card from './Card';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Box, Typography } from '@mui/material';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

interface LeftSideProps {
  // Define props here
}

const LeftSide: React.FC<LeftSideProps> = () => {
  //! States
  const avatar = Cookies.get('avatar')
  const username = Cookies.get('username')
  const firstName = Cookies.get("firstName")
  const lastName = Cookies.get('lastName')
  const router = useRouter()
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
        <figure onClick={() => {router.push(`/profile/${username}`)}} className='flex items-center cursor-pointer' >
        {/*@ts-ignore*/}
        <Avatar style={{width:'50px', height:'50px'}} alt="User avatar" src={avatar === "null" ? null : avatar} />
      </figure>

      <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}} >
        <Typography sx={{fontWeight:"bold"}} >
            {firstName} {lastName}
        </Typography>

        <Typography sx={{fontSize:"14px", textAlign:"start", color:"gray", marginTop:'4px'}} >
            {username}
        </Typography>
      </Box>
        </Box>
        <SettingsIcon onClick= {() => {router.push("/settings")}} sx={{fontSize:"26px", cursor:"pointer"}} />
        </Box>

        <hr className='my-4' />
    </Card>
  );
};

export default LeftSide;