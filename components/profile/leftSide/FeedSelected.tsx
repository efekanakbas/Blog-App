import { Box, Skeleton, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import WorkIcon from '@mui/icons-material/Work';
import { useGeneral } from '@/contexts/GeneralContext';

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
  isLoading: Boolean
}

const FeedSelected: React.FC<FeedSelectedProps> = ({isLoading}) => {
  //! States
      const {profileLoading} = useGeneral()
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
          isLoading || profileLoading ? <Box sx={{display:'flex', flexDirection:'column', gap:'20px'}}>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> 
            <Skeleton variant="text" sx={{ fontSize: '1rem', width:'75%' }} /> 
          </Box> : 
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