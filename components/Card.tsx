import { Box } from '@mui/material';
import React, { useState, useEffect, ReactNode } from 'react';

interface CardProps {
  children: ReactNode
}

const Card: React.FC<CardProps> = ({children}) => {
  //! States
      
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    <Box  className='rounded-[15px] p-5 bg-white' >
      {children}
    </Box>
  );
};

export default Card;