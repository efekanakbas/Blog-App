import { useGeneral } from "@/contexts/GeneralContext";
import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import BungalowIcon from '@mui/icons-material/Bungalow';

const dummy: Array<{
  icon: any;
  role: string;
  at: string;
  date: string;
}> = [
  // {
  //   icon: BungalowIcon,
  //   role: 'Bachelor Degree',
  //   at: 'Oxford',
  //   date: 'January 2016 - March 2020'
  // },
  // {
  //   icon: HomeIcon,
  //   role: 'Master Degree',
  //   at: 'Harward',
  //   date: 'January 2020 - March 2022'
  // },
  // {
  //   icon: null,
  //   role: 'Master Degree',
  //   at: 'MIT',
  //   date: 'January 2022 - March 2023'
  // },
];

interface EducationProps {
  // Define props here
}

const Education: React.FC<EducationProps> = () => {
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
    <Box id='education' sx={{ marginTop: "48px" }}>
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        Education
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
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              key={i}
            >
              <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <Box>
                  {item.icon ? (
                    <item.icon
                      sx={{ color: "gray", width: "70px", height: "70px" }}
                    />
                  ) : (
                    <SchoolIcon
                      sx={{ color: "gray", width: "70px", height: "70px" }}
                    />
                  )}
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "0px" }}
                >
                  <Typography sx={{ fontSize: "13px" }}>{item.at}</Typography>
                  <Typography sx={{ fontSize: "13px" }}>{item.role}</Typography>
                  <Typography sx={{ fontSize: "11px", color: "gray" }}>
                    {item.date}
                  </Typography>
                </Box>
              </Box>
              {isMe && <ModeEditIcon sx={{ color: "lightgray", cursor:'pointer' }} />}
            </Box>
          ))
        ) : (
          <Typography onClick={() => {setProfilePage(3); setVerticalTabValue(2)}} sx={{cursor:'pointer'}} color="primary" fontWeight="bold">
            <AddIcon sx={{ transform: "translateY(-2px)" }} color="primary" />{" "}
            Add Education{" "}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Education;
