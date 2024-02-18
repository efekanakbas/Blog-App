"use client";
import React, { useState, useEffect } from "react";
import Card from "../Card";
import { Avatar, Box, Tab, Tabs, Typography } from "@mui/material";
import { useGeneral } from "@/contexts/GeneralContext";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

interface TopSideProps {
  // Define props here
}

const TopSide: React.FC<TopSideProps> = () => {
  //! States
  const { avatar, name, tabValue, handleChange } = useGeneral();
  


  //!
  //todo Functions
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  
  //todo
  //? useEffect

  //?
  //* consoleLogs

  //*

  return (
    <Box sx={{ borderRadius: "15px", backgroundColor: "white" }}>
      <Box
        sx={{
          backgroundColor: "#eeeeee",
          borderRadius: "10px",
          margin: "4px",
          height: "250px",
        }}
      ></Box>
      <Box sx={{ padding: "26px" }}>
        <Box sx={{display:'flex', gap:'16px'}}>
          <figure className="relative inline-flex">
            <span className="absolute bottom-0 right-0 z-10 p-1 bg-white rounded-full shadow-xl">
              <PhotoCameraIcon />
            </span>
            <Avatar sx={{ width: "100px", height: "100px" }} src={avatar} />
          </figure>
          <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', gap:'12px'}}>
            <Typography sx={{fontWeight:'bold', fontSize:'20px'}}>
                {name}
            </Typography>
            <Typography sx={{color:'#0071d8', fontWeight:'bold', textDecoration:'underline 2px', textUnderlineOffset:'3px'}} >
                Add Intro
            </Typography>
          </Box>
        </Box>

        <hr className="my-8"/>

        <Box sx={{color:'gray'}} >
         <span className="font-bold text-gray-900" >100+</span> Conndetions <span className="font-bold text-gray-900" >852 </span> Followers <span className="font-bold text-gray-900" >156</span> Following
        </Box>

        <hr className="my-8"/>

        <Box>
        <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs">
          <Tab style={{backgroundColor: tabValue === 0 ? '#eeeeee' : '', borderRadius:'10px 10px 0 0', fontWeight:'bold', transition:'all .5s', marginRight:'8px'}} label="Feed" {...a11yProps(0)} />
          <Tab style={{backgroundColor: tabValue === 1 ? '#eeeeee' : '', borderRadius:'10px 10px 0 0', fontWeight:'bold', transition:'all .5s'}} label="Profile" {...a11yProps(1)} />
        </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default TopSide;
