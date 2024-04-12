import { Box, Skeleton } from "@mui/material";
import React from "react";

interface SearchSkeletonProps {
  key: number;
  mini: boolean
}

const SearchSkeleton: React.FC<SearchSkeletonProps> = ({mini}) => {
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
        gap: "12px",
        alignItems: "center",
      }}
    >
      <Skeleton variant="circular" width={60} height={60} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0px",
          justifyContent: "center",
        }}
      >
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: mini ? "80px" : "150px" }} />

        <Skeleton variant="text" sx={{ fontSize: "14px", width: mini ? "80px" : "150px" }} />
      </Box>
    </Box>
  );
};

export default SearchSkeleton;
