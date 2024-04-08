import { Box, TextField } from '@mui/material';
import React, { forwardRef } from 'react';
import SendIcon from '@mui/icons-material/Send';

interface InputProps {
  value: any;
  handleChange: any;
  name: string;
  type: string;
  placeholder: string;
  className: string;
  paddingLeft: boolean;
  autoFocus: boolean;
  size: 'small' | 'medium';
  sx: any;
  disabled: boolean;
  onKeyDownHandler: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  id: string;
  helperText: any;
  error: any;
  handleBlur: any;
  handleSubmit: any;
}

const Input = forwardRef(({
  value,
  handleChange,
  name,
  type,
  placeholder,
  className,
  paddingLeft,
  autoFocus,
  size,
  sx,
  disabled,
  onKeyDownHandler,
  id,
  helperText,
  error,
  handleBlur,
  handleSubmit
}: InputProps, ref) => {

  // CSS sınıfını tanımla
  const autofillClass = 'input:-webkit-autofill';
  const yeniOzellikler = { [autofillClass]: { height: size === "medium" ? '29px'  : ""} };

  return (
    <TextField
      InputProps={{
        style: {
          borderRadius: "100px",
          padding: paddingLeft ? '0 24px 0 24px' : '0',
          height: size === 'medium' ? '48px' : "",
        },
        endAdornment: (
          handleSubmit && <SendIcon
            sx={{
              position: 'absolute',
              color: value.trim().length > 0 ? '#9ca3af' : 'lightgray',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              cursor: value.trim().length > 0 ? 'pointer' : 'default',
            }}
            onClick={value.trim().length > 0 ? handleSubmit : null}
          />
        ),
      }}
      autoComplete='off'
      autoFocus={autoFocus}
      placeholder={placeholder}
      sx={{
        ...sx, // Önceden gelen sx özellikleri
        ...yeniOzellikler, // Yeni özellikler
      }}
      disabled={disabled}
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
      inputRef={ref}
    />
  );
});

Input.displayName = "Input";

export default Input;
