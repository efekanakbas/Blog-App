import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import WorkIcon from '@mui/icons-material/Work';

const dummy = [
    {
        icon:PlaceIcon,
        title:"Istanbul, Turkey"
    },
    {
        icon:WorkIcon,
        title:"UX Designer on Twitter"
    }
]

interface FeedSelectedProps {
  // Define props here
}

const FeedSelected: React.FC<FeedSelectedProps> = () => {
  //! States
      
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    <>
      Overview
      <Box sx={{display:'flex', flexDirection:'column', gap:'20px', marginTop:'24px'}}>
        {
            dummy.map((item, i) => (
                <Box sx={{display:'flex', gap:'8px'}} key={i} >
                    <item.icon color='primary'/>
                    <Typography>
                        {item.title}
                    </Typography>
                </Box>
            ))
        }
      </Box>
    </>
  );
};

export default FeedSelected;