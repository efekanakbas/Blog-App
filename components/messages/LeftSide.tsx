import React, { useState, useEffect, useCallback } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/utils/CRUD";
import moment from "moment";
import Cookies from "js-cookie";

interface LeftSideProps {
  setScreen: React.Dispatch<React.SetStateAction<boolean>>
  setRoom: React.Dispatch<React.SetStateAction<String | null>>
  socket: any
  room: null | String
  setReceiverId: React.Dispatch<React.SetStateAction<String | null>>
  leftMessage : String
}

const LeftSide: React.FC<LeftSideProps> = ({setScreen, setRoom, socket, room, setReceiverId, leftMessage}) => {
  //! States
  const username = Cookies.get('username')
  const userId = Cookies.get('userId')
  const { error, data, isFetching, refetch } = useQuery({
    queryKey: ["messagesAll"],
    queryFn: async () => {
      return getData("messages");
    },
  });
  //!
  //todo Functions
  const handleClick = async (obj: any) => {
    setReceiverId(obj?.user?.userId === userId ? obj?.message?.receiver?.userId : obj?.user?.userId )
    console.log("obj", obj)
    setRoom(obj.roomId)
    setScreen(true)
  }
  //todo
  //? useEffect
  useEffect(() => {
    if (room) {
        socket.emit('room', room);
    }
}, [room, socket]);

useEffect(() => {
  if(leftMessage) {
    refetch()
  }
}, [leftMessage, refetch])
  //?
  //* consoleLogs
  console.log("data", data);
  // console.log("room", room)
  console.log("leftMessage", leftMessage)
  //*

  return (
    <Box
      sx={{
        "@media (max-width: 1000px)": {
          width: "50% !important",
        },
        height: "100%",
        bgcolor: "white",
        borderBottomLeftRadius: "16px",
        borderTopLeftRadius: "16px"
      }}
      className="w-[27%]  border-r border-gray-200 flex flex-col shrink-0 overflow-hidden"
    >
      <Box
        className="border-b flex-shrink-0 border-gray-200"
        sx={{
          height: "80px",
          padding: "20px",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          fontWeight: "bold",
          borderRadius: "20px 0 0 0",
        }}
      >
        Messages
      </Box>
      <Box
        className="flex-shrink-0 relative border-b border-gray-200"
        sx={{
          height: "80px",
          padding: "20px",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <SearchIcon className="text-gray-400" />
        <Typography className="text-gray-400">Search Message</Typography>
      </Box>
      <Box
        className="flex flex-col flex-shrink-0 overflow-x-hidden overflow-y-auto scrollBarHidden"
        sx={{ maxHeight: "calc(100vh - 283px)" }}
      >
        {data?.map((message: Message, i: number) => (
          <Box
            key={i}
            className="relative flex flex-shrink-0 hover:bg-gray-100 cursor-pointer "
            sx={{
              borderBottom: "1px solid #eeeeee",
              height: "100px",
              padding: "20px",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "12px",
            }}
            onClick = {() => {
              handleClick(message)
            }}
          >
            <figure>
              <Avatar sx={{width:'55px', height:'55px'}} alt="user avatar" src={message.message.receiver?.avatar ?? null} />
            </figure>
            <Box className="flex flex-col w-full gap-1">
              <Box className="flex items-center justify-between">
                <Typography>{message.user.username === username ? message.message.receiver.username : message.user.username }</Typography>
                <Typography
                  sx={{ fontSize: "12px" }}
                  className=" text-gray-400"
                >
                  {
                    moment(message.message.createAt).format("DD MMM")
                  }
                </Typography>
              </Box>
              {/*@ts-ignore*/}
              <Typography>{!leftMessage ? message.message.text : leftMessage.roomId === message.roomId ? leftMessage.message.text : message.message.text}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LeftSide;
