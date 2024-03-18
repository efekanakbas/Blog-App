import React, { useEffect } from "react";
import Card from "../Card";
import { Avatar, Box, Typography } from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Notification {
  id: string;
  avatar: string;
  username: string;
  text: string;
}

interface MainProps {
  data: Notification[];
}

const Main: React.FC<MainProps> = () => {
  //! States
  const { error, data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await axios.get(
        "https://65f8a9eedf151452460fdfd4.mockapi.io/notifications"
      );

      return response.data;
    },
  });
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs
    // console.log("data", data)
  //*

  return (
    <Box sx={{borderRadius:'15px', backgroundColor:'white', padding:'20px', pb:'0'}}>
      <Typography variant="h6">Notifications</Typography>
      <hr className="mt-4" />
      {data.length === 0 ? (
        <Box sx={{ paddingTop: "32px" }}>Notifications person not found</Box>
      ) : (
        <Box
          className="scrollBarHidden"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            overflow: "auto",
            maxHeight: "calc(100vh - 190px)",
            paddingTop: "32px",
            paddingBottom:'12px'
          }}
        >
          {data.map((item: Notification, i: number) => (
            <Box sx={{ display: "flex", gap: "12px" }} key={i}>
              <Avatar
                sx={{ width: "70px", height: "70px" }}
                alt="user avatar"
                src={item.avatar}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">{item.username}</Typography>
                <Typography>{item.text}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Main;
