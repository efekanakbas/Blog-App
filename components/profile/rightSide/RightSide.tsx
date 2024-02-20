'use client'
import React, { useState, useEffect, lazy,Suspense } from 'react';
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
    <Box sx={{width:{xs: '100%', md:'66.667%'}}}>
        {tabValue === 0 ? <FeedSelected/> : (
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileSelected />
        </Suspense>
      )}
    </Box>
    
  );
};

export default RightSide;