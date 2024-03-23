import { useGeneral } from "@/contexts/GeneralContext";
import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { useUserDetail } from "@/contexts/UserDetailContext";
interface SkillsProps {
  // Define props here
}

const Skills: React.FC<SkillsProps> = () => {
  //! States
  const {
    isMe,
    setProfilePage,
    setInputFocus,
    setVerticalTabValue,
  } = useGeneral();
  const { mainSkills, complementarySkills, interests } = useUserDetail();
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs

  //*

  return (
    <Box id="skills" sx={{ marginTop: "48px" }}>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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
            {isMe && mainSkills?.length > 0 && (
              <ModeEditIcon sx={{ color: "lightgray", cursor: "pointer" }} />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            {mainSkills?.length > 0 ? (
              mainSkills?.map((item: any, i: number) => (
                <Box
                  sx={{
                    padding: "4px 12px",
                    border: "1px solid #1976D2",
                    borderRadius: "100px",
                    color: "#1976D2",
                  }}
                  key={i}
                >
                  #{item}
                </Box>
              ))
            ) : isMe ? (
              <Typography
                onClick={() => {
                  setProfilePage(1);
                  setInputFocus(0);
                  setVerticalTabValue(0);
                }}
                sx={{ cursor: "pointer" }}
                color="primary"
                fontWeight="bold"
              >
                <AddIcon
                  sx={{ transform: "translateY(-2px)" }}
                  color="primary"
                />{" "}
                Add Main Skills{" "}
              </Typography>
            ) : (
              <Typography sx={{ color: "gray" }}>- No Main Skills</Typography>
            )}
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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
            {isMe && complementarySkills?.length > 0 && (
              <ModeEditIcon sx={{ color: "lightgray", cursor: "pointer" }} />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            {complementarySkills?.length > 0 ? (
              complementarySkills?.map((item: any, i: number) => (
                <Box
                  sx={{
                    padding: "4px 12px",
                    border: "1px solid #1976D2",
                    borderRadius: "100px",
                    color: "#1976D2",
                  }}
                  key={i}
                >
                  #{item}
                </Box>
              ))
            ) : isMe ? (
              <Typography
                onClick={() => {
                  setProfilePage(1);
                  setInputFocus(1);
                  setVerticalTabValue(0);
                }}
                sx={{ cursor: "pointer" }}
                color="primary"
                fontWeight="bold"
              >
                <AddIcon
                  sx={{ transform: "translateY(-2px)" }}
                  color="primary"
                />{" "}
                Add Comlementary Skills{" "}
              </Typography>
            ) : (
              <Typography sx={{ color: "gray" }}>
                - No Complementary Skills
              </Typography>
            )}
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <LocalActivityIcon
                sx={{
                  color: "gray",
                  marginRight: "4px",
                  transform: "translateY(-1px)",
                }}
              />{" "}
              Interest
            </Box>
            {isMe && interests?.length > 0 && (
              <ModeEditIcon sx={{ color: "lightgray", cursor: "pointer" }} />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            {interests?.length > 0 ? (
              interests?.map((item: any, i: number) => (
                <Box
                  sx={{
                    padding: "4px 12px",
                    border: "1px solid #1976D2",
                    borderRadius: "100px",
                    color: "#1976D2",
                  }}
                  key={i}
                >
                  #{item}
                </Box>
              ))
            ) : isMe ? (
              <Typography
                onClick={() => {
                  setProfilePage(1);
                  setInputFocus(2);
                  setVerticalTabValue(0);
                }}
                sx={{ cursor: "pointer" }}
                color="primary"
                fontWeight="bold"
              >
                <AddIcon
                  sx={{ transform: "translateY(-2px)" }}
                  color="primary"
                />{" "}
                Add Interest{" "}
              </Typography>
            ) : (
              <Typography sx={{ color: "gray" }}>- No Interests</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Skills;
