import { useGeneral } from "@/contexts/GeneralContext";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import PublicIcon from "@mui/icons-material/Public";
import { useUserDetail } from "@/contexts/UserDetailContext";

interface LanguageProps {
  setLanEdit: React.Dispatch<React.SetStateAction<number | null>>;
}

const Language: React.FC<LanguageProps> = ({ setLanEdit }) => {
  //! States
  const { isMe, setProfilePage, setVerticalTabValue } = useGeneral();
  const { languages } = useUserDetail();
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs

  //*

  return (
    <Box id="language" sx={{ marginTop: "48px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
          Languages
        </Typography>

        {isMe && languages.length > 0 && (
          <Button
            onClick={() => {
              setProfilePage(4);
              setVerticalTabValue(3);
              setLanEdit(null);
            }}
            sx={{}}
          >
            <AddIcon sx={{ transform: "translateY(-2px)" }} color="primary" />{" "}
            New
          </Button>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          marginTop: "24px",
        }}
      >
        {languages?.length > 0 ? (
          languages?.map((item: any, i: number) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={i}
            >
              <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <PublicIcon
                  sx={{ color: "gray", width: "70px", height: "70px" }}
                />
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "0px" }}
                >
                  <Typography sx={{ fontSize: "13px" }}>
                    {item.language}
                  </Typography>
                  <Typography
                    className="text-gray-600"
                    sx={{ fontSize: "12px" }}
                  >
                    {item.level}
                  </Typography>
                </Box>
              </Box>
              {isMe && (
                <ModeEditIcon
                  onClick={() => {
                    console.log("ıtem", item)
                    setProfilePage(4);
                    setVerticalTabValue(3);
                    setLanEdit(item.itemId);
                  }}
                  sx={{ color: "lightgray", cursor: "pointer" }}
                />
              )}
            </Box>
          ))
        ) : isMe ? (
          <Typography
            onClick={() => {
              setProfilePage(4);
              setVerticalTabValue(3);
            }}
            sx={{ cursor: "pointer" }}
            color="primary"
            fontWeight="bold"
          >
            <AddIcon sx={{ transform: "translateY(-2px)" }} color="primary" />{" "}
            Add Language{" "}
          </Typography>
        ) : (
          <Typography sx={{ color: "gray" }}>- No Language</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Language;
