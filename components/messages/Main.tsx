"use client";
import React, { useState, useEffect } from "react";
import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import Input from "../Input";
import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getData, postData } from "@/utils/CRUD";
import Cookies from "js-cookie";

interface MainProps {
  room: String | null;
  socket: any;
  receiverId: String | null
  setLeftMessage: React.Dispatch<React.SetStateAction<string>>
}

const Main: React.FC<MainProps> = ({ room, socket, receiverId, setLeftMessage }) => {
  //! States
  const [messageList, setMessageList] = useState([])
  const username = Cookies.get('username')
  const avatar = Cookies.get('avatar')
  const { values, handleChange, handleReset, handleSubmit } = useFormik({
    initialValues: {
      inputValue: "",
    },
    onSubmit:  (values) => {
    sendMessage()
    },
    
  });
  const replacedRoom = room?.replace('-', "")



  const { error, data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      return getData(`messages/${room}`);
    },
  });


  // socket
  const live = "https://efekan-akbas-9a21d3a06c36.herokuapp.com";
  const local = "http://localhost:5000";
  //!
  //todo Functions
  const sendMessage = async () => {
    const messageContent = {
      room: room,
      message: {
        text: values.inputValue
      },
      user: {
        isMy: true
      }
    };
    const postContent = {
      text: values.inputValue,
      receiverId: receiverId
    }
    await socket.emit("message", messageContent)
    await postData('messages', postContent)
    //@ts-ignore
    // setMessageList((prev) => [...prev, messageContent])
    handleReset(values)
  }
  //todo
  //? useEffect

  useEffect(() => {
       //@ts-ignore
    socket.on("messageReturn", (data) => {
      data.message.isMy = data.user.username === username ? true : false
      setLeftMessage(data)
      //@ts-ignore
      setMessageList((prev) => [data,...prev])
    });

    // console.log("deneme")

    // Component unmount olduğunda socket dinlemeyi kaldır
    return () => {
      socket.off("messageReturn");
    };
  }, [socket, username, setLeftMessage]);

  useEffect(() => {
    setMessageList(data);
  }, [data]);

  useEffect(() => {
    refetch()
  }, [refetch, receiverId])

 

  //?
  //* consoleLogs
  // console.log("messages", messages);
  // console.log("data", data);
  // console.log("selam")
  // console.log("message", message)
  // console.log("messageList", messageList);
  // console.log("receiverId", receiverId)
  // console.log("room", room)
  //*
  //

  if (isLoading)
    return (
      <Box
        sx={{
          borderRadius: "0 20px 20px 0",
          width: "73%",
          height: "100%",
          padding: "16px",
          pt: "0",
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            position: "absolute",
            bottom: "16px",
            left: "32px",
            width: "94%",
            height: "80px",
            marginBottom: "16px",
            borderRadius: "1rem",
          }}
        >
          <Input
            id="messageInput"
            onKeyDownHandler={undefined}
            sx={{ width: "100%", padding: "0 80px", marginTop: "16px" }}
            size="medium"
            className=""
            disabled={isFetching}
            paddingLeft={false}
            autoFocus={false}
            value={values.inputValue}
            handleChange={handleChange}
            name="inputValue"
            type="text"
            placeholder="Type here..."
            helperText=""
            error={false}
            handleBlur={null}
          />
        </Box>
        <Box
          sx={{
            height: "80px",
            display: "flex",
            alignItems: "center",
            flexShrink: "0",
          }}
        >
          <Skeleton
            variant="text"
            sx={{
              fontSize: "1rem",
              backgroundColor: "rgb(243 244 246)",
              width: "8rem",
            }}
          />
        </Box>
        <Skeleton
          sx={{
            height: "calc(100% - 80px)",
            backgroundColor: "rgb(243 244 246)",
            borderRadius: "1rem",
            padding: "16px",
            width: "100%",
          }}
          variant="rounded"
        />
      </Box>
    );

  if (error) return <div>error</div>;

  return (
    <Box
      className="w-[73%] h-full p-4 pt-0 bg-white"
      sx={{ borderRadius: "0 20px 20px 0" }}
    >
      <Box className="h-[80px] flex items-center shrink-0">
        {data[0]?.message?.receiver?.username === username ? data[0]?.user?.username : data[0]?.message?.receiver?.username}
      </Box>
      <Box
        sx={{ height: "calc(100% - 80px)" }}
        className="bg-gray-100 flex shrink-0 rounded-2xl p-4 overflow-x-hidden overflow-y-auto scrollBarHidden relative w-full"
      >
        <Box className="w-full mb-[9.5%] rounded-2xl p-4 pt-[52px] flex flex-col-reverse max-h-full overflow-y-auto gap-4 scrollBarHidden">
          {
            //@ts-ignorex
            messageList?.map((item: any, i, array) => (
              <Box
                className={`flex px-8 relative ${
                  item.message.isMy ? " justify-end" : "justify-start "
                }`}
                key={i}
              >
                <figure
                  className={`absolute ${
                    !item.message.isMy ? "-left-4" : "-right-4"
                  } top-2`}
                >
                  {!item.message.isMy
                      //@ts-ignore
                    ? array[i + 1]?.message.isMy !== item.message.isMy && (
                        <Avatar
                          alt="user avatar"
                          src={item.message.receiver.avatar}
                        />
                      )
                          //@ts-ignore
                    : array[i + 1]?.message.isMy !== item.message.isMy && (
                       //@ts-ignore
                       <Avatar alt="User avatar" src={avatar === "null" ? null : avatar} />
                      )}
                </figure>

                <Typography
                  style={{
                    //@ts-ignore
                    borderTopLeftRadius:
                      !item.message.isMy &&
                          //@ts-ignore
                      array[i + 1]?.message.isMy !== item.message.isMy &&
                      "3px",
                    borderTopRightRadius:
                      item.message.isMy &&
                          //@ts-ignore
                      array[i + 1]?.message.isMy !== item.message.isMy &&
                      "3px",
                  }}
                  className={`flex p-4 rounded-2xl flex-col max-w-[75%] ${
                    item.message.isMy
                      ? "bg-blue-600 text-white flex-row-reverse "
                      : "bg-white "
                  }`}
                >
                  {item.message.text}
                </Typography>
              </Box>
            ))
          }

          <hr className="my-4" />
          <Box className="flex items-center flex-col">
            <Avatar
              alt="user avatar"
              src={data[0]?.message?.receiver?.avatar}
              sx={{ width: "100px", height: "100px" }}
            />
            <Typography sx={{ marginTop: "8px", fontWeight: "bold" }}>
              {data[0]?.message?.receiver?.username === username ? data[0]?.user?.username : data[0]?.message?.receiver?.username}
            </Typography>
            {/* <Typography sx={{ fontSize: "12px" }} className="text-gray-400">
          Developer Manager
        </Typography> */}
          </Box>
        </Box>
        <Box className="bg-white absolute bottom-0 left-[16px] w-[97%] h-[80px] mb-4 rounded-2xl flex">
          <form onSubmit={handleSubmit} className="flex-grow">
            <Input
              id="messageInput"
              onKeyDownHandler={undefined}
              sx={{ width: "100%", padding: "0 80px", marginTop: "16px" }}
              size="medium"
              className=""
              disabled={isFetching}
              paddingLeft={false}
              autoFocus={false}
              value={values.inputValue}
              handleChange={handleChange}
              name="inputValue"
              type="text"
              placeholder="Type here..."
              helperText=""
              error={false}
              handleBlur={null}
            />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Main;
