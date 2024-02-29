import { Box, Skeleton } from "@mui/material";
import React from "react";

interface SearchSkeletonProps {
  key: number;
}

const SearchSkeleton: React.FC<SearchSkeletonProps> = ({ key }) => {
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
      key={key}
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
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "150px" }} />

        <Skeleton variant="text" sx={{ fontSize: "14px", width: "150px" }} />
      </Box>
    </Box>
  );
};

export default SearchSkeleton;
