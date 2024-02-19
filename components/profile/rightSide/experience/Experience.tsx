import { useGeneral } from "@/contexts/GeneralContext";
import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import WorkIcon from "@mui/icons-material/Work";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";

const dummy: Array<{
  icon: any;
  role: string;
  at: string;
  date: string;
}> = [
  // {
  //   icon: AppleIcon,
  //   role: 'Business Manager',
  //   at: 'Apple',
  //   date: 'January 2018 - March 2018'
  // },
  // {
  //   icon: GoogleIcon,
  //   role: 'Web Developer',
  //   at: 'Google',
  //   date: 'January 2018 - March 2018'
  // },
  // {
  //   icon: null,
  //   role: 'Business Manager',
  //   at: 'Apple',
  //   date: 'January 2018 - March 2018'
  // },
];

interface ExperienceProps {
  // Define props here
}

const Experience: React.FC<ExperienceProps> = () => {
  //! States
  const { isMe, setProfilePage, setVerticalTabValue } = useGeneral();
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs

  //*

  return (
    <Box id='experience' sx={{ marginTop: "48px" }}>
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        Experience
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
              sx={{ display: "flex", justifyContent: "space-between" , alignItems: "center" }}
              key={i}
            >
              <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <Box>
                  {item.icon ? (
                    <item.icon
                      sx={{ color: "gray", width: "70px", height: "70px" }}
                    />
                  ) : (
                    <WorkIcon
                      sx={{ color: "gray", width: "70px", height: "70px" }}
                    />
                  )}
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "0px" }}
                >
                  <Typography sx={{ fontSize: "13px" }}>{item.role}</Typography>
                  <Typography sx={{ fontSize: "13px" }}>{item.at}</Typography>
                  <Typography sx={{ fontSize: "11px", color: "gray" }}>
                    {item.date}
                  </Typography>
                </Box>
              </Box>
              {isMe && <ModeEditIcon sx={{ color: "lightgray", cursor:'pointer' }} />}
            </Box>
          ))
        ) : (
          <Typography onClick={() => {setProfilePage(2); setVerticalTabValue(1)}} sx={{cursor:'pointer'}} color="primary" fontWeight="bold">
            <AddIcon sx={{ transform: "translateY(-2px)" }} color="primary" />{" "}
            Add Experience{" "}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Experience;
