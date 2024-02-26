"use client";
import LeftSide from "@/components/LeftSide";
import Main from "@/components/notifications/Main";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";


interface NotifPageLayoutProps {
  // Define props here
}

const NotifPageLayout: React.FC<NotifPageLayoutProps> = () => {
  //! States

  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs

  //*

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "start" },
        padding: { xs: "0", md: "0 50px", lg: "0 50px", xl: "0 214px" },
        gap: "25px",
        margin: "95px 0 28px 0",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "24.574%" },
          padding: { xs: "0 25px ", md: "0" },
        }}
      >
        <LeftSide/>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "75.426%" },
          padding: { xs: "0 25px ", md: "0" },
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        {/*@ts-ignore*/}
        <Main/>
      </Box>
    </Box>
  );
};

export default NotifPageLayout;
