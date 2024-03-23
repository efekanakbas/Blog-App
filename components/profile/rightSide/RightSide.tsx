"use client";
import React, { lazy, Suspense } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { useGeneral } from "@/contexts/GeneralContext";
import FeedSelected from "./FeedSelected";
const ProfileSelected = lazy(() => import("./ProfileSelected"));
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

interface RightSideProps {
  // Define props here
}

const RightSide: React.FC<RightSideProps> = () => {
  //! States
  const { tabValue } = useGeneral();
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs

  //*

  return (
    <Box sx={{ width: { xs: "100%", md: "66.667%" } }}>
      {tabValue === 0 ? (
        <FeedSelected />
      ) : (
        <Suspense
          fallback={
            <Box
              sx={{ bgcolor: "white", borderRadius: "15px", padding: "20px" }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                Overview
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  marginTop: "24px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", gap: "8px" }}>
                    {React.createElement(LocationOnIcon, {
                      color: "primary",
                    })}
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: "12rem" }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", gap: "8px" }}>
                    {React.createElement(WorkIcon, {
                      color: "primary",
                    })}
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: "8rem" }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ marginTop: "48px" }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  Skills
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    marginTop: "24px",
                  }}
                >
                  <Box>
                    <Box>
                      <LocalActivityIcon
                        sx={{
                          color: "gray",
                          marginRight: "4px",
                          transform: "translateY(-1px)",
                        }}
                      />{" "}
                      Main Skills
                    </Box>
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "1rem",
                        width: "20rem",
                        marginTop: "20px",
                      }}
                    />
                  </Box>

                  <Box>
                    <Box>
                      <LocalActivityIcon
                        sx={{
                          color: "gray",
                          marginRight: "4px",
                          transform: "translateY(-1px)",
                        }}
                      />{" "}
                      Complementary Skills
                    </Box>
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "1rem",
                        width: "16rem",
                        marginTop: "20px",
                      }}
                    />
                  </Box>

                  <Box>
                    <Box>
                      <LocalActivityIcon
                        sx={{
                          color: "gray",
                          marginRight: "4px",
                          transform: "translateY(-1px)",
                        }}
                      />{" "}
                      Interests
                    </Box>
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "1rem",
                        width: "12rem",
                        marginTop: "20px",
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              <Box sx={{ marginTop: "48px" }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  Experiences
                </Typography>

                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "20rem", marginTop: "20px" }}
                />
              </Box>

              <Box sx={{ marginTop: "48px" }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  Educations
                </Typography>

                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "16rem", marginTop: "20px" }}
                />
              </Box>

              <Box sx={{ marginTop: "48px" }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  Languages
                </Typography>

                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "12rem", marginTop: "20px" }}
                />
              </Box>
            </Box>
          }
        >
          <ProfileSelected />
        </Suspense>
      )}
    </Box>
  );
};

export default RightSide;
