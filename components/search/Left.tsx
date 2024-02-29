import React from 'react';
import Card from '../Card';
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useGeneral } from '@/contexts/GeneralContext';

interface LeftProps {
  // Define props here
}

const Left: React.FC<LeftProps> = () => {
  //! States
      const {searchTabValue, setSearchTabValue, handleChangeSearch} = useGeneral()
  //!
  //todo Functions
  function a11yProps(index: number) {
    return {
      id: `search-tab-${index}`,
      "aria-controls": `search-tabpanel-${index}`,
    };
  }
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    <Box sx={{borderRadius:'15px', padding:'20px', backgroundColor:'white', position:'sticky', top:'95px'}}>
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        Search Filter
      </Typography>
      <Box sx={{ marginTop: "24px" }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={searchTabValue}
          onChange={handleChangeSearch}
          aria-label="Vertical tabs"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab
            onClick={() => {setSearchTabValue(0)}}
            href="#skills"
            style={{
              alignItems: "start",
              backgroundColor: searchTabValue === 0 ? "#f0f3ff" : "",
              borderRadius: "10px 0 0 10px",
              transition: "all .5s",
            }}
            label={
              <Box>
                
                Top
              </Box>
            }
            {...a11yProps(0)}
          />
          <Tab
            onClick={() => {setSearchTabValue(1)}}
            href="#experience"
            style={{
              alignItems: "start",
              backgroundColor: searchTabValue === 1 ? "#f0f3ff" : "",
              borderRadius: "10px 0 0 10px",
              transition: "all .5s",
              marginTop:'8px'
            }}
            label={
              <Box>
               
                 Users
              </Box>
            }
            {...a11yProps(1)}
          />
          <Tab
            onClick={() => {setSearchTabValue(2)}}
            href="#education"
            style={{
              alignItems: "start",
              backgroundColor: searchTabValue === 2 ? "#f0f3ff" : "",
              borderRadius: "10px 0 0 10px",
              transition: "all .5s",
              marginTop:'8px'
            }}
            label={
              <Box>
                Projects
              </Box>
            }
            {...a11yProps(2)}
          />
          <Tab
            onClick={() => {setSearchTabValue(3)}}
            href="#language"
            style={{
              alignItems: "start",
              backgroundColor: searchTabValue === 3 ? "#f0f3ff" : "",
              borderRadius: "10px 0 0 10px",
              transition: "all .5s",
              marginTop:'8px'
            }}
            label={
              <Box>
                 Companies
              </Box>
            }
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>
    </Box>
  );
};

export default Left;