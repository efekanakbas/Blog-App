'use client'
import React, { useState, useEffect, lazy } from 'react';
import Card from '../../Card';
import { Box } from '@mui/material';
import { useGeneral } from '@/contexts/GeneralContext';
import FeedSelected from './FeedSelected';
const ProfileSelected = lazy(() => import('./ProfileSelected'))


interface RightSideProps {
  // Define props here
}

const RightSide: React.FC<RightSideProps> = () => {
  //! States
      const {tabValue} = useGeneral()
  //!
  //todo Functions
      
  //todo
  //? useEffect
  
  //?
  //* consoleLogs
      
  //*

  return (
    <Box sx={{width:'66.667%'}}>
        {tabValue === 0 ? <FeedSelected/> : <ProfileSelected/>}
    </Box>
    
  );
};

export default RightSide;