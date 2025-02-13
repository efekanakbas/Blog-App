import { useGeneral } from "@/contexts/GeneralContext";
import { Box, Typography, Button } from "@mui/material";
import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import WorkIcon from "@mui/icons-material/Work";
import { useUserDetail } from "@/contexts/UserDetailContext";

interface ExperienceProps {
  setExpEdit: React.Dispatch<React.SetStateAction<number | null>>
}

const Experience: React.FC<ExperienceProps> = ({setExpEdit}) => {
  //! States
  const { isMe, setProfilePage, setVerticalTabValue } = useGeneral();
  const { experiences } = useUserDetail();
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs

  //*

  return (
    <Box id="experience" sx={{ marginTop: "48px" }}>
      <Box sx={{display:'flex', justifyContent:'space-between'}}>
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        Experiences
      </Typography>

      {
        isMe && experiences?.length > 0 && <Button
        onClick={() => {
          setProfilePage(2);
          setVerticalTabValue(1);
          setExpEdit(null)
        }}
        sx={{  }}
      >
        <AddIcon sx={{ transform: "translateY(-2px)" }} color="primary" />{" "}
        New
      </Button>
      }
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          marginTop: "24px",
        }}
      >
        {experiences?.length > 0 ? (
          experiences?.map((item: any, i: number) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
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
                  <Typography sx={{ fontSize: "13px" }}>
                    {item.title}
                  </Typography>
                  <Typography
                    className="text-gray-600"
                    sx={{ fontSize: "12px" }}
                  >
                    {item.company}
                  </Typography>
                  <Typography sx={{ fontSize: "11px", color: "gray" }}>
                    {item.startDate} -{" "}
                    {item.current ? "Continue" : item.endDate}
                  </Typography>
                </Box>
              </Box>
              {isMe && (
                <ModeEditIcon
                  onClick={() => {
                    setProfilePage(2);
                    setVerticalTabValue(1);
                    setExpEdit(item.itemId)
                  }}
                  sx={{ color: "lightgray", cursor: "pointer" }}
                />
              )}
            </Box>
          ))
        ) : isMe ? (
          <Typography
            onClick={() => {
              setProfilePage(2);
              setVerticalTabValue(1);
            }}
            sx={{ cursor: "pointer" }}
            color="primary"
            fontWeight="bold"
          >
            <AddIcon sx={{ transform: "translateY(-2px)" }} color="primary" />{" "}
            Add Experience{" "}
          </Typography>
        ) : (
          <Typography sx={{ color: "gray" }}>- No Experience</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Experience;
