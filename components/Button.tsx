import React, { useState, useEffect } from 'react';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  text: string
  type: 'contained' | 'outlined'
  buttonType: string
  handleClick: any
  disabled: boolean | null
  
}

const Button: React.FC<ButtonProps> = ({type, text, buttonType, handleClick, disabled}) => {
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
    <MuiButton disabled = {disabled} onClick={handleClick} type={buttonType} variant={type} style={{ backgroundColor: type === 'contained' ? disabled ? 'lightgray' : '#1976D2' : "", color: type === 'contained' ? 'white' : "", borderRadius:'100px', height:'48px', width:'120px' }} >
      {text}
    </MuiButton>
  );
};

export default Button;