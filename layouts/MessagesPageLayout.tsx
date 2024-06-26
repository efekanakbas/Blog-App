"use client";
import SkeletonChatInput from "@/components/SkeletonChatInput";
import BlankMain from "@/components/messages/BlankMain";
import LeftSide from "@/components/messages/LeftSide";
import Main from "@/components/messages/Main";
import { useGeneral } from "@/contexts/GeneralContext";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// socket
const live = "https://efekan-akbas-9a21d3a06c36.herokuapp.com";
const local = "http://localhost:5000";

//@ts-ignore
const socket = io.connect(live);
socket.on("connect", () => {
  console.log("Connected to the server");
});

interface MessagesPageLayoutProps {
  // Define props here
}

const MessagesPageLayout: React.FC<MessagesPageLayoutProps> = () => {
  //! States
  const { messageLoading, send } = useGeneral();
  const [screen, setScreen] = useState(false);
  const [room, setRoom] = useState<null | String>(null);
  const [receiverId, setReceiverId] = useState<String | null>(null);
  const [leftMessage, setLeftMessage] = useState("");
  const [loading, setLoading] = useState(true)
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<
    number | null
  >(null);
  //!
  //todo Functions

  //todo

  //? useEffect
    useEffect(()=> {
      if(send) {
        setTimeout(() => {
          setLoading(false)
        }, 300);
      } else {
        setLoading(false)
      }
    }, [send])
  //?
  //* consoleLogs
  // console.log("data", data)
  // console.log("screen", screen)
  // console.log("room", room)
  // console.log("messageLoading", messageLoading)
  // console.log("loading", loading)
  //*

  return (
    <Box
      className="flex flex-1 rounded-lg gap-0"
      sx={{
        margin: {xs: "84px 0 28px 0", md: "95px 0 28px 0"},
        padding: { xs: "0", md: "0 50px", lg: "0 50px", xl: "0 214px" },
        height: {xs: "calc(100vh - 113px)", md:"calc(100vh - 123px)"},
      }}
    >
      <LeftSide
        screen={screen}
        setScreen={setScreen}
        room={room}
        setRoom={setRoom}
        socket={socket}
        setReceiverId={setReceiverId}
        leftMessage={leftMessage}
        selectedMessageIndex = {selectedMessageIndex}
        setSelectedMessageIndex = {setSelectedMessageIndex}
      />
      {loading ? <SkeletonChatInput screen = {screen} /> : screen ? (
        <Main
          screen = {screen}
          setScreen={setScreen}
          setRoom = {setRoom}
          setReceiverId = {setReceiverId}
          room={room}
          socket={socket}
          receiverId={receiverId}
          setLeftMessage={setLeftMessage}
          setSelectedMessageIndex = {setSelectedMessageIndex}
        />
      ) : (
        <BlankMain screen = {screen} />
      )}
    </Box>
  );
};

export default MessagesPageLayout;
