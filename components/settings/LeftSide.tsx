import { useGeneral } from '@/contexts/GeneralContext';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import Card from '../Card';

interface LeftSideProps {
  // Define props here
}

const LeftSide: React.FC<LeftSideProps> = () => {
  //! States
      const {settingsTabValue, handleChangeSettings} = useGeneral()
  //!
  //todo Functions
  function a11yProps(index: number) {
    return {
      id: `setting-tab-${index}`,
      "aria-controls": `setting-tabpanel-${index}`,
    };
  }
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    <Card>
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        Settings
      </Typography>
      <Box sx={{ marginTop: "24px" }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={settingsTabValue}
          onChange={handleChangeSettings}
          aria-label="Vertical tabs"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab
            style={{
              alignItems: "start",
              backgroundColor: settingsTabValue === 0 ? "#f0f3ff" : "",
              borderRadius: "10px 0 0 10px",
              transition: "all .5s",
            }}
            label={
              <Box>
                 Email Adress
              </Box>
            }
            {...a11yProps(0)}
          />
          <Tab
            style={{
              alignItems: "start",
              backgroundColor: settingsTabValue === 1 ? "#f0f3ff" : "",
              borderRadius: "10px 0 0 10px",
              transition: "all .5s",
              marginTop:'8px'
            }}
            label={
              <Box>
              
                 Password
              </Box>
            }
            {...a11yProps(1)}
          />
          <Tab
            style={{
              alignItems: "start",
              backgroundColor: settingsTabValue === 2 ? "#f0f3ff" : "",
              borderRadius: "10px 0 0 10px",
              transition: "all .5s",
              marginTop:'8px'
            }}
            label={
              <Box>
             
                Block List
              </Box>
            }
            {...a11yProps(2)}
          />
          <Tab
            style={{
              alignItems: "start",
              backgroundColor: settingsTabValue === 3 ? "#f0f3ff" : "",
              borderRadius: "10px 0 0 10px",
              transition: "all .5s",
              marginTop:'8px'
            }}
            label={
              <Box>
               
                Close Your Account
              </Box>
            }
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>
    </Card>
  );
};

export default LeftSide;