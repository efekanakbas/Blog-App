import { TextField } from '@mui/material';
import React, { useState, useEffect, RefObject } from 'react';

interface InputProps {
    value: any
    handleChange: any
    name: string
    type: string
    placeholder: string
    className : string
    paddingLeft: boolean
    autoFocus: boolean
    size: 'small' | 'medium'
}

const Input: React.FC<InputProps> = ({value, handleChange, name, type, placeholder,className, paddingLeft, autoFocus, size}) => {
  //! States
      
  //!
  //todo Functions
      
  //todo
  //? useEffect
  
  //?
  //* consoleLogs

  //*

  return (
    <TextField
              InputProps={{
                style: {
                  borderRadius: "25px",
                  //@ts-ignore
                  padding: paddingLeft && '0 0 0 24px'
                },
              }}
              autoFocus = {autoFocus}
              placeholder={placeholder}
              sx={{ padding:"" }}
              name={name}
              type={type}
              value={value}
              onChange={handleChange}
              size={size}
              id="outlined-basic"
              variant="outlined"
              className={className}
            />
  );
};

export default Input;