'use client'
import React, { useState, useEffect, lazy } from "react";
import Card from "../../Card";
import { Box } from "@mui/material";
import { useGeneral } from "@/contexts/GeneralContext";
import FeedSelected from "./FeedSelected";
const ProfileSelected = lazy(() => import("./ProfileSelected"));

interface LeftSideProps {
  // Define props here
}

const LeftSide: React.FC<LeftSideProps> = () => {
  //! States
    const {tabValue} = useGeneral()
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs

  //*

  return (
    <Box sx={{width:'33.333%'}} >
      <Box sx={{padding:'20px', backgroundColor:'white', position:'sticky', top:'95px', borderRadius:'15px'}} >
        {
          tabValue === 0 ? <FeedSelected/> : <ProfileSelected/> 
        }
      </Box>
    </Box>
  );
};

export default LeftSide;
