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
 handleSubmit: any
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
 return (
  <TextField
  InputProps={{
    endAdornment: (
      <SendIcon
        sx={{
          position: 'absolute',
          color: value.trim().length > 0 ? '#9ca3af' : 'lightgray',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          cursor: value.trim().length > 0 ? 'pointer' : 'default'
        }}
        onClick={value.trim().length > 0 ? handleSubmit : null} // Gönderme işlemini gerçekleştirecek fonksiyonu buraya ekleyin
      />
    ),
    style: {
      borderRadius: "100px",
      padding: paddingLeft ? '0 24px 0 24px' : '0 4px',
      height: size === 'medium' ? '48px' : "",
    },
  }}
  autoComplete='off'
  autoFocus={autoFocus}
  placeholder={placeholder}
  sx={sx}
  disabled={disabled}
  name={name}
  type='text'
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
  inputRef={ref} // ref'i doğru bir şekilde geçiriyoruz
/>

    
 );
});

Input.displayName = "Input"

export default Input;
