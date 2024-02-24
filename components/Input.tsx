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
    sx: any
    disabled: boolean
    onKeyDownHandler: React.KeyboardEventHandler<HTMLInputElement> | undefined
    id: string
    helperText: any
    error: any
    handleBlur: any
}

const Input: React.FC<InputProps> = ({value, handleChange, name, type, placeholder,className, paddingLeft, autoFocus, size, sx, disabled, onKeyDownHandler, id, helperText, error, handleBlur}) => {
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
                  borderRadius: "100px",
                  //@ts-ignore
                  padding: paddingLeft && '0 24px 0 24px',
                  height: size === 'medium' ? '48px' : "",
                },
              }}
              autoComplete='off'
              autoFocus = {autoFocus}
              placeholder={placeholder}
              sx={sx}
              disabled = {disabled}
              name={name}
              type={type}
              value={value}
              onChange={handleChange}
              size={size === 'small' ? 'small' : 'small'} 
              id={id}
              variant="outlined"
              className={`${className} ${size === 'medium' ? 'mediumInput' : ''}`}
              onKeyDown={onKeyDownHandler}
              helperText={helperText}
              error={error}
              onBlur={handleBlur}
            />
  );
};

export default Input;