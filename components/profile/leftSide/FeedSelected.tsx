import { Box, Skeleton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import WorkIcon from "@mui/icons-material/Work";
import { useGeneral } from "@/contexts/GeneralContext";
import { useUserDetail } from "@/contexts/UserDetailContext";

interface FeedSelectedProps {
  isLoading: Boolean;
}

const FeedSelected: React.FC<FeedSelectedProps> = ({ isLoading }) => {
  //! States
  const { profileLoading } = useGeneral();
  const {location, job} = useUserDetail()
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs
    console.log("location", location)
  //*

  return (
    <>
      Overview
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "24px",
        }}
      >
        {isLoading || profileLoading ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "75%" }} />
          </Box>
        ) : (
          <Box sx={{display:'flex', flexDirection:'column', gap:'16px', color:"gray"}}>
            <Box sx={{ display: "flex", gap: "8px" }}>
              <PlaceIcon color="primary" />
              <Typography>{location ? location : "- No Location"}</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "8px" }} >
              <WorkIcon color="primary" />
              <Typography>{job ? job : "- No Job"}</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default FeedSelected;
