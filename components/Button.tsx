import React, { useState, useEffect } from 'react';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  text: string
  type: 'contained' | 'outlined'
  buttonType: string
  handleClick: any
  
}

const Button: React.FC<ButtonProps> = ({type, text, buttonType, handleClick}) => {
  //! States
      
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    //@ts-ignore
    <MuiButton onClick={handleClick} type={buttonType} variant={type} style={{ backgroundColor: type === 'contained' ? '#1976D2' : "", color: type === 'contained' ? 'white' : "", borderRadius:'100px', height:'48px', width:'120px' }} >
      {text}
    </MuiButton>
  );
};

export default Button;