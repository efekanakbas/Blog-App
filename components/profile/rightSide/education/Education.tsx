import { useGeneral } from "@/contexts/GeneralContext";
import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import SchoolIcon from '@mui/icons-material/School';
import { useUserDetail } from "@/contexts/UserDetailContext";

interface EducationProps {
  // Define props here
}

const Education: React.FC<EducationProps> = () => {
  //! States
  const { isMe, setProfilePage, setVerticalTabValue } = useGeneral();
  const {educations} = useUserDetail()
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
        Educations
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          marginTop: "24px",
        }}
      >
        {educations?.length > 0 ? (
          educations?.map((item: any, i: number) => (
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
                  <Typography sx={{ fontSize: "13px" }}>{item.school}</Typography>
                  <Typography className="text-gray-600"  sx={{ fontSize: "12px" }}>{item.degree}</Typography>
                  <Typography sx={{ fontSize: "11px", color: "gray" }}>
                    {item.startDate} - {item.current ? "Continue" : item.endDate}
                  </Typography>
                </Box>
              </Box>
              {isMe && <ModeEditIcon sx={{ color: "lightgray", cursor:'pointer' }} />}
            </Box>
          ))
        ) : (
         isMe ?  <Typography onClick={() => {setProfilePage(3); setVerticalTabValue(2)}} sx={{cursor:'pointer'}} color="primary" fontWeight="bold">
         <AddIcon sx={{ transform: "translateY(-2px)" }} color="primary" />{" "}
         Add Education{" "}
       </Typography> : <Typography sx={{color:'gray'}} >- No Education</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Education;
