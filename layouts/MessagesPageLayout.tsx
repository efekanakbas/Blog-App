'use client'
import BlankMain from '@/components/messages/BlankMain';
import LeftSide from '@/components/messages/LeftSide';
import Main from '@/components/messages/Main';
import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import io from "socket.io-client";

//@ts-ignore
const socket = io.connect("http://localhost:5000");
socket.on('connect', () => {
  console.log("Connected to the server");
 });



interface MessagesPageLayoutProps {
  // Define props here
}

const MessagesPageLayout: React.FC<MessagesPageLayoutProps> = () => {
  //! States
    const [screen, setScreen] = useState(false)
    const [room, setRoom] = useState<null | String>(null)
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      // console.log("data", data)
      // console.log("screen", screen)
      // console.log("room", room)
  //*



  return (
    <Box  className='flex flex-1 rounded-lg gap-0' sx={{margin:"95px 0 28px 0", padding:{xs:"0", md: "0 50px", lg:"0 50px", xl:"0 214px"}, height:'calc(100vh - 123px)'}}>
        <LeftSide setScreen = {setScreen} room = {room} setRoom = {setRoom} socket = {socket} />
        {screen ? <Main  room = {room} socket = {socket}  /> : <BlankMain/>}
    </Box>
  );
};

export default MessagesPageLayout;