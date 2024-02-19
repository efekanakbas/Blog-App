import { useGeneral } from "@/contexts/GeneralContext";
import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from '@mui/icons-material/Home';
import BungalowIcon from '@mui/icons-material/Bungalow';
import PublicIcon from '@mui/icons-material/Public';

const dummy: Array<string> = [];

interface LanguageProps {
  // Define props here
}

const Language: React.FC<LanguageProps> = () => {
  //! States
  const { isMe, setProfilePage, setVerticalTabValue} = useGeneral();
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs

  //*

  return (
    <Box id='language' sx={{ marginTop: "48px" }}>
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
      Language
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          marginTop: "24px",
        }}
      >
        {dummy.length > 0 ? (
          dummy.map((item, i) => (
            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems:'center' }}
              key={i}
            >
              <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <PublicIcon
                      sx={{ color: "gray", width: "70px", height: "70px" }}
                    />
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "0px" }}
                >
                  <Typography sx={{ fontSize: "16px" }}>{item}</Typography>
                </Box>
              </Box>
              {isMe && <ModeEditIcon sx={{ color: "lightgray", cursor:'pointer' }} />}
            </Box>
          ))
        ) : (
          <Typography onClick={() => {setProfilePage(4); setVerticalTabValue(3)}} sx={{cursor:'pointer'}} color="primary" fontWeight="bold">
            <AddIcon sx={{ transform: "translateY(-2px)" }} color="primary" />{" "}
            Add Language{" "}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Language;
