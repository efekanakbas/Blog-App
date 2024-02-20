import React from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';

interface MuiSwitchProps {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => {
  const primaryColor = theme.palette.primary.main;

  return {
    width: 56,
    height: 28,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(28px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: primaryColor,
          opacity: 1,
          border: 0,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: primaryColor,
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 24,
      height: 24,
      transition: theme.transitions.create(['color'], {
        duration: 300,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 28 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
      '&.Mui-checked': {
        backgroundColor: primaryColor,
      },
    },
  };
});

const MuiSwitch: React.FC<MuiSwitchProps> = ({ label, checked, onChange, name }) => {
  return (
    <FormControlLabel
      sx={{padding:0}}
      control={
        <IOSSwitch
          name={name}
          checked={checked}
          onChange={onChange}
          inputProps={{ 'aria-label': 'controlled' }}
          sx={{ m: 1, padding:0, marginY:0 }}
        />
      }
      label={label}
    />
  );
};

export default MuiSwitch;
