"use client";
import Left from "@/components/search/Left";
import Main from "@/components/search/Main";
import { useGeneral } from "@/contexts/GeneralContext";
import { Box } from "@mui/material";
import React from "react";

interface dataProps {
  id: string;
  users: Data[];
  projects: Data[];
  companies: Data[];
}

interface SearchPageLayoutProps {
  data: dataProps;
}

const SearchPageLayout: React.FC<SearchPageLayoutProps> = () => {
  //! States
  const { searchTabValue } = useGeneral();

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
        height: searchTabValue !== 0 ? "calc(100vh - 123px)" : "",
       
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "24.574%" },
          padding: { xs: "0 25px ", md: "0" },
        }}
      >
        <Left />
      </Box>
      <Box
        className='scrollBarHidden'
        sx={{
          width: { xs: "100%", md: "75.426%" },
          padding: { xs: "0 25px ", md: "0" },
          display: "flex",
          flexDirection: "column",
          height: "87vh",
          overflow: "auto",
        }}
      >
          {/*@ts-ignore*/}
          <Main />
      </Box>
    </Box>
  );
};

export default SearchPageLayout;
