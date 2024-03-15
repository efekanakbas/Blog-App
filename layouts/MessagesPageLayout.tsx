'use client'
import BlankMain from '@/components/messages/BlankMain';
import LeftSide from '@/components/messages/LeftSide';
import Main from '@/components/messages/Main';
import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import io from "socket.io-client";

//@ts-ignore
const socket = io.connect("https://efekan-akbas-9a21d3a06c36.herokuapp.com");
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
    const [receiverId, setReceiverId] = useState<String | null>(null)
    const [leftMessage, setLeftMessage] = useState("")
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
        <LeftSide setScreen = {setScreen} room = {room} setRoom = {setRoom} socket = {socket} setReceiverId = {setReceiverId} leftMessage = {leftMessage} />
        {screen ? <Main  room = {room} socket = {socket} receiverId = {receiverId} setLeftMessage = {setLeftMessage}  /> : <BlankMain/>}
    </Box>
  );
};

export default MessagesPageLayout;