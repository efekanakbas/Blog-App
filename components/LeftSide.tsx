'use client'
import React, { useState, useEffect } from 'react';
import Card from './Card';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Box, Typography } from '@mui/material';
import { useGeneral } from '@/contexts/GeneralContext';

interface LeftSideProps {
  // Define props here
}

const LeftSide: React.FC<LeftSideProps> = () => {
  //! States
      const {avatar} = useGeneral()
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
      <Avatar  style={{ width: '50px', height: '50px' }}  alt="Avatar" src={avatar} />
      </figure>

      <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}} >
        <Typography sx={{fontWeight:"bold"}} >
            Efekan Akbaş
        </Typography>

        <Typography sx={{fontSize:"14px", textAlign:"start", color:"gray"}} >
            Efekan Akbaş
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