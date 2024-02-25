'use client'
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import checkBig from '../public/images/checkBig.svg';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

interface ConfirmPageLayoutProps {
  // Define props here
}

const ConfirmPageLayout: React.FC<ConfirmPageLayoutProps> = () => {
  //! States
  const {signin} = useAuth()
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    <Box sx={{ backgroundColor: '#0071D8', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '12px' }}>
        <figure className='w-[150px] h-[150px] relative'>
          <Image alt='check image' src={checkBig} />
        </figure>
        <Typography sx={{ color: 'white' }} variant='h5'>
        Congratulations
        </Typography>
        <Typography sx={{ color: 'white', textAlign: 'center' }} variant='h4'>
        You have successfully  <br /> registered.
        </Typography>
        <Button onClick={signin} style={{ backgroundColor: 'white', color: '#0071D8', marginTop: '32px', width: '20rem', height: '3rem', borderRadius: '100px' }} variant="contained">
           Login Now!
        </Button>
      </Box>
  );
};

export default ConfirmPageLayout;