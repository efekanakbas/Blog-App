import React, { useState, useEffect } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const messages = [
  {
    avatar: "images/avatars/6.png",
    name: "Efekan Akbaş",
    date: "05 Jan",
    message: "Oh okay, thank you!",
  },
  {
    avatar: "images/avatars/6.png",
    name: "Efekan Akbaş",
    date: "05 Jan",
    message: "Oh okay, thank you!",
  },
  {
    avatar: "images/avatars/6.png",
    name: "Efekan Akbaş",
    date: "05 Jan",
    message: "Oh okay, thank you!",
  },
  {
    avatar: "images/avatars/6.png",
    name: "Efekan Akbaş",
    date: "05 Jan",
    message: "Oh okay, thank you!",
  },
  {
    avatar: "images/avatars/6.png",
    name: "Efekan Akbaş",
    date: "05 Jan",
    message: "Oh okay, thank you!",
  },
  {
    avatar: "images/avatars/6.png",
    name: "Efekan Akbaş",
    date: "05 Jan",
    message: "Oh okay, thank you!",
  },
  {
    avatar: "images/avatars/6.png",
    name: "Efekan Akbaş",
    date: "05 Jan",
    message: "Oh okay, thank you!",
  },
  {
    avatar: "images/avatars/6.png",
    name: "Efekan Akbaş",
    date: "05 Jan",
    message: "Oh okay, thank you!",
  },
  {
    avatar: "images/avatars/6.png",
    name: "Efekan Akbaş",
    date: "05 Jan",
    message: "Oh okay, thank you!",
  },
  {
    avatar: "images/avatars/6.png",
    name: "Efekan Akbaş",
    date: "05 Jan",
    message: "Oh okay, thank you!",
  },
  {
    avatar: "images/avatars/6.png",
    name: "Efekan Akbaş",
    date: "05 Jan",
    message: "Oh okay, thank you!",
  },
  {
    avatar: "images/avatars/6.png",
    name: "Efekan Akbaş",
    date: "05 Jan",
    message: "Oh okay, thank you!",
  },
  {
    avatar: "images/avatars/6.png",
    name: "Efekan Akbaş",
    date: "05 Jan",
    message: "Oh okay, thank you!",
  },
  {
    avatar: "images/avatars/6.png",
    name: "Efekan Akbaş",
    date: "05 Jan",
    message: "Oh okay, thank you!",
  },
  {
    avatar: "images/avatars/6.png",
    name: "Efekan Akbaş",
    date: "05 Jan",
    message: "Oh okay, thank you!",
  },
];

interface LeftSideProps {
  // Define props here
}

const LeftSide: React.FC<LeftSideProps> = () => {
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
      '@media (max-width: 1000px)': {
        width: '50% !important',
      },
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
        sx={{ borderRadius: "0 0 0 20px", maxHeight:'calc(100vh - 283px)' }}
      >
        {messages.map((message, i) => (
          <Box
            key={i}
            className="relative flex flex-shrink-0 hover:bg-gray-100 cursor-pointer "
            sx={{
              ':not(:last-child)': {
                borderBottom: '1px solid #eeeeee',
              },
              height: "100px",
              padding: "20px",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <figure>
              <Avatar src={message.avatar} />
            </figure>
            <Box className="flex flex-col w-full gap-1">
              <Box className="flex items-center justify-between">
                <Typography>Mustafa Turan</Typography>
                <Typography sx={{fontSize:"12px"}} className=" text-gray-400">
                  05 Jan
                </Typography>
              </Box>
              <Typography>{message.message}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LeftSide;
