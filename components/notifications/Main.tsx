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
        "https://65cbe2afefec34d9ed883ace.mockapi.io/messages"
      );

      return response.data.reverse();
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
    <Card  > 
      <Typography variant="h6">Notifications</Typography>
      <hr className="mt-4" />
      {
          data.length === 0 ? (<Box sx={{paddingTop:'24px'}} >
            Notifications person not found
          </Box>) : ( <Box className='scrollBarHidden' sx={{ display: "flex", flexDirection: "column", gap: "32px", overflow:'auto', maxHeight:'calc(100vh - 225px)', paddingTop:'24px' }}>
          {data.map((item: Notification) => (
            <Box sx={{ display: "flex", gap: "12px" }} key={item.id}>
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
        </Box>)
        }
    </Card>
  );
};

export default Main;
