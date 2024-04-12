'use client'
import LeftSide from '@/components/settings/LeftSide';
import Main from '@/components/settings/Main';
import { Box } from '@mui/material';
import React from 'react';

interface SettingsPageLayoutProps {
  // Define props here
}

const SettingsPageLayout: React.FC<SettingsPageLayoutProps> = () => {
  //! States
      
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      alignItems: { xs: "center", md: "start" },
      padding: { xs: "0", md: "0 50px", lg: "0 50px", xl: "0 214px" },
      gap: "25px",
      margin: {xs: "84px 0 28px 0", md: "95px 0 28px 0"},
      height:'calc(100vh - 123px)'
    }}
  >
    <Box
      sx={{
        width: { xs: "100%", md: "24.574%" },
        padding: { xs: "0 25px ", md: "0" },
      }}
    >
     <LeftSide/>
    </Box>
    <Box
      sx={{
        width: { xs: "100%", md: "75.426%" },
        padding: { xs: "0 25px ", md: "0" },
        display: "flex",
        flexDirection: "column",
        gap: "25px",
      }}
    >
    <Main/>
    </Box>
  </Box>
  );
};

export default SettingsPageLayout;