import React, { useState, useEffect, useCallback } from "react";
import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/utils/CRUD";
import moment from "moment";
import Cookies from "js-cookie";
import { useUserDetail } from "@/contexts/UserDetailContext";
import { useGeneral } from "@/contexts/GeneralContext";

interface LeftSideProps {
  screen: boolean;
  setScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setRoom: React.Dispatch<React.SetStateAction<String | null>>;
  socket: any;
  room: null | String;
  setReceiverId: React.Dispatch<React.SetStateAction<String | null>>;
  leftMessage: String;
  selectedMessageIndex: number | null;
  setSelectedMessageIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const LeftSide: React.FC<LeftSideProps> = ({
  screen,
  setScreen,
  setRoom,
  socket,
  room,
  setReceiverId,
  leftMessage,
  selectedMessageIndex,
  setSelectedMessageIndex,
}) => {
  //! States
  const Iarray = [1, 2, 3, 4];
  const {
    send,
    setSend,
    setMessageLoading,
    setMessagesId,
    messagesId,
  } = useGeneral();
  const { userId, username } = useUserDetail();
  const Iusername = Cookies.get("username");
  const IuserId = Cookies.get("userId");
  const Iavatar = Cookies.get("avatar");
  const {
    error,
    data,
    isFetching,
    refetch,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["messagesAll"],
    queryFn: async () => {
      return getData("messages");
    },
  });
  //!
  //todo Functions
  const handleClick = useCallback(
    async (obj: any, i: number) => {
      setSelectedMessageIndex(i);
      setMessagesId(obj.message.receiver.userId);
      setMessageLoading(true);
      setReceiverId(
        obj?.user?.userId === IuserId
          ? obj?.message?.receiver?.userId
          : obj?.user?.userId
      );
      console.log("obj", obj);
      setRoom(obj.roomId);
      setScreen(true);
    },
    [setReceiverId, setRoom, setScreen, IuserId]
  );

  //todo
  //? useEffect
  useEffect(() => {
    if (room) {
      socket.emit("room", room);
    }
  }, [room, socket]);

  useEffect(() => {
    if (leftMessage) {
      refetch();
    }
  }, [leftMessage, refetch]);

  useEffect(() => {
    return () => {
      setMessagesId("");
    };
  }, [setMessagesId]);

  useEffect(() => {
    if (data) {
      // data içindeki mesajları döngüye alarak boş mesajı bul
      data.forEach((message: any, i: number) => {
        // console.log("username", username);
        // console.log("receiverUsername", message.message.receiver.username);
        if (
          message.message.text === "" &&
          send &&
          message.message.receiver.username === username
        ) {
          // Boş mesajı bulduysak, ona tıklama işlemini gerçekleştir
          handleClick(message, i);
          setSend(false);
        } else {
          if (message.message.receiver.userId === userId && send) {
            messagesId !== message.message.receiver.userId &&
              handleClick(message, i);
            setSend(false);
          }
        }
      });
    }
  }, [data, handleClick, userId, username]);
  //?
  //* consoleLogs
  console.log("data", data);
  // console.log("room", room)
  // console.log("leftMessage", leftMessage)
  console.log("messagesId", messagesId);
  // console.log("username", username);
  //*

  return (
    <Box
      sx={{
        display: { xs: screen ? "none" : "flex", md: "flex" },
        width: { xs: screen ? "0" : "90%", md: "27%" },
        flexDirection: "column",
        height: "100%",
        bgcolor: "white",
        borderBottomLeftRadius: "16px",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: { xs: "16px", md: 0 },
        borderBottomRightRadius: { xs: "16px", md: 0 },
      }}
      className="border-r border-gray-200 shrink-0 overflow-hidden mx-auto"
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
      {/* <Box
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
      </Box> */}
      <Box
        className="flex flex-col flex-shrink-0 overflow-x-hidden overflow-y-auto scrollBarHidden"
        sx={{ maxHeight: "calc(100vh - 283px)" }}
      >
        {isLoading
          ? Iarray.map((_, i) => (
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
              >
                <figure>
                  <Skeleton variant="circular" width={55} height={55} />
                </figure>
                <Box className="flex flex-col w-full gap-1">
                  <Box className="flex items-center justify-between">
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: "6rem" }}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: "4rem" }}
                    />
                  </Box>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", width: "8rem" }}
                  />
                </Box>
              </Box>
            ))
          : data
              ?.filter(
                (item: any) =>
                  !item.user.userDetails.blockedBy.some(
                    (blockedByUser: any) => blockedByUser.username === Iusername
                  ) &&
                  !item.user.userDetails.blocked.some(
                    (blockedUser: any) => blockedUser.username === Iusername
                  )
              )
              .map((message: Message, i: number) => (
                <Box
                  key={i}
                  className={`relative ${
                    selectedMessageIndex === i
                      ? ""
                      : "cursor-pointer hover:bg-gray-100"
                  } ${selectedMessageIndex === i ? "bg-gray-200" : ""}`}
                  sx={{
                    borderBottom: "1px solid #eeeeee",
                    height: "100px",
                    padding: "20px",
                    backgroundColor: "white",
                    display: "flex",
                    flexShrink: "0",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "12px",
                  }}
                  onClick={() => {
                    console.log("deneme")
                    messagesId !== message.message.receiver.userId &&
                      handleClick(message, i);
                  }}
                >
                  <figure>
                    <Avatar
                      sx={{ width: "55px", height: "55px" }}
                      alt="user avatar"

                      src={
                        ((message.message.receiver?.avatar !== Iavatar) &&
                          message.message.receiver?.avatar) ||
                        ((message?.user?.avatar !== Iavatar) &&
                          message?.user?.avatar) || undefined
                      }
                    />
                  </figure>
                  <Box className="flex flex-col w-full gap-1">
                    <Box className="flex items-center justify-between">
                      <Typography>
                        {message.user.username === Iusername
                          ? message.message.receiver.username
                          : message.user.username}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "12px" }}
                        className=" text-gray-400"
                      >
                        {moment(message.message.createAt).format("DD MMM")}
                      </Typography>
                    </Box>
                    <Typography>
                      {!leftMessage ? (
                        message?.message?.text === "" ? (
                          <span className="text-bold">Say hello now! 👋</span>
                        ) : message.message.text.length > 75 ? (
                          message.message.text.slice(0, 75) + "..."
                        ) : (
                          message.message.text
                        )
                      ) : //@ts-ignore
                      leftMessage.roomId === message.roomId ? (
                        //@ts-ignore
                        leftMessage.message.text.length > 75 ? (
                          //@ts-ignore
                          leftMessage.message.text.slice(0, 75) + "..."
                        ) : (
                          //@ts-ignore
                          leftMessage.message.text
                        )
                      ) : message?.message?.text === "" ? (
                        <span className="text-bold">Say hello now! 👋</span>
                      ) : message.message.text.length > 75 ? (
                        message.message.text.slice(0, 75) + "..."
                      ) : (
                        message.message.text
                      )}
                    </Typography>
                  </Box>
                </Box>
              ))}
      </Box>
    </Box>
  );
};

export default LeftSide;
