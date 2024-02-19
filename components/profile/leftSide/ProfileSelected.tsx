import { useGeneral } from "@/contexts/GeneralContext";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PublicIcon from "@mui/icons-material/Public";

interface ProfileSelectedProps {
  // Define props here
}

const ProfileSelected: React.FC<ProfileSelectedProps> = () => {
  //! States
  const { verticalTabvalue, handleChangeVertical, setProfilePage} = useGeneral();
  //!
  //todo Functions
  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  //todo
  //? useEffect

  //?
  //* consoleLogs

  //*

  return (
    <>
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        About
      </Typography>
      <Box sx={{ marginTop: "24px" }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={verticalTabvalue}
          onChange={handleChangeVertical}
          aria-label="Vertical tabs"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab
            onClick={() => {setProfilePage(0)}}
            href="#skills"
            style={{
              alignItems: "start",
              backgroundColor: verticalTabvalue === 0 ? "#f0f3ff" : "",
              borderRadius: "10px 0 0 10px",
              transition: "all .5s",
            }}
            label={
              <Box>
                {" "}
                <LocalActivityIcon sx={{ marginRight: "12px" }} /> Skills{" "}
              </Box>
            }
            {...a11yProps(0)}
          />
          <Tab
            onClick={() => {setProfilePage(0)}}
            href="#experience"
            style={{
              alignItems: "start",
              backgroundColor: verticalTabvalue === 1 ? "#f0f3ff" : "",
              borderRadius: "10px 0 0 10px",
              transition: "all .5s",
              marginTop:'8px'
            }}
            label={
              <Box>
                {" "}
                <WorkIcon sx={{ marginRight: "12px" }} /> Experience{" "}
              </Box>
            }
            {...a11yProps(1)}
          />
          <Tab
            onClick={() => {setProfilePage(0)}}
            href="#education"
            style={{
              alignItems: "start",
              backgroundColor: verticalTabvalue === 2 ? "#f0f3ff" : "",
              borderRadius: "10px 0 0 10px",
              transition: "all .5s",
              marginTop:'8px'
            }}
            label={
              <Box>
                {" "}
                <SchoolIcon sx={{ marginRight: "12px" }} /> Education{" "}
              </Box>
            }
            {...a11yProps(2)}
          />
          <Tab
            onClick={() => {setProfilePage(0)}}
            href="#language"
            style={{
              alignItems: "start",
              backgroundColor: verticalTabvalue === 3 ? "#f0f3ff" : "",
              borderRadius: "10px 0 0 10px",
              transition: "all .5s",
              marginTop:'8px'
            }}
            label={
              <Box>
                {" "}
                <PublicIcon sx={{ marginRight: "12px" }} /> Language{" "}
              </Box>
            }
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>
    </>
  );
};

export default ProfileSelected;
