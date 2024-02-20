'use client'
import React, { useState, useEffect, lazy, Suspense } from "react";
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
    <Box sx={{width: {xs:'100%', md: '33.333%'}}} >
      <Box sx={{padding:'20px', backgroundColor:'white', position:'sticky', top:'95px', borderRadius:'15px'}} >
        {
          tabValue === 0 ? <FeedSelected/> : (
            <Suspense fallback={<div>Loading...</div>}>
              <ProfileSelected />
            </Suspense>
          ) 
        }
      </Box>
    </Box>
  );
};

export default LeftSide;
