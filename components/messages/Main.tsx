"use client";
import React, { useState, useEffect } from "react";
import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import Input from "../Input";
import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getData, postData } from "@/utils/CRUD";
import Cookies from "js-cookie";
import { useGeneral } from "@/contexts/GeneralContext";
import SkeletonChatInput from "../SkeletonChatInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface MainProps {
  room: String | null;
  socket: any;
  receiverId: String | null;
  setLeftMessage: React.Dispatch<React.SetStateAction<string>>;
  screen: boolean;
  setScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setRoom: React.Dispatch<React.SetStateAction<String | null>>;
  setReceiverId: React.Dispatch<React.SetStateAction<String | null>>;
  setSelectedMessageIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const Main: React.FC<MainProps> = ({
  room,
  socket,
  receiverId,
  setLeftMessage,
  screen,
  setScreen,
  setReceiverId,
  setRoom,
  setSelectedMessageIndex,
}) => {
  //! States
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["messagesAll"],
    mutationFn: (obj: any) => {
      return postData("messages", obj);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messagesAll"] });
      // setTimeout(() => {
      //   setMessageLoading(false)
      // }, 500);
    },
  });

  const { messageLoading, setMessageLoading, setMessagesId } = useGeneral();
  const [messageList, setMessageList] = useState([]);
  const username = Cookies.get("username");
  const avatar = Cookies.get("avatar");
  const { values, handleChange, handleReset, handleSubmit } = useFormik({
    initialValues: {
      inputValue: "",
    },
    onSubmit: (values) => {
      if (values.inputValue.trim().length > 0) {
        sendMessage();
      }
    },
  });

  const {
    error,
    data,
    isFetching,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      return getData(`messages/${room}`);
    },
  });

  //!
  //todo Functions
  const sendMessage = async () => {
    const messageContent = {
      room: room,
      message: {
        text: values.inputValue,
      },
      user: {
        isMy: true,
      },
    };
    const postContent = {
      text: values.inputValue,
      receiverId: receiverId,
    };
    await socket.emit("message", messageContent);
    mutate(postContent);
    //@ts-ignore
    // setMessageList((prev) => [...prev, messageContent])
    handleReset(values);
  };
  //todo
  //? useEffect

  useEffect(() => {
    //@ts-ignore
    socket.on("messageReturn", (data) => {
      data.message.isMy = data.user.username === username ? true : false;
      setLeftMessage(data);
      //@ts-ignore
      setMessageList((prev) => [data, ...prev]);
    });

    // console.log("deneme")

    // Component unmount olduğunda socket dinlemeyi kaldır
    return () => {
      socket.off("messageReturn");
    };
  }, [socket, username, setLeftMessage]);

  useEffect(() => {
    setMessageList(data);

    if (!isFetching) {
      setMessageLoading(false);
    }

    return () => {
      setMessageLoading(true);
    };
  }, [data, setMessageLoading, isFetching]);

  useEffect(() => {
    refetch();
  }, [refetch, receiverId]);

  //?
  //* consoleLogs
  // console.log("messages", messages);
  // console.log("data", data);
  // console.log("selam")
  // console.log("message", message)
  // console.log("messageList", messageList);
  // console.log("receiverId", receiverId)
  // console.log("room", room)
  // console.log("isFEtching", isFetching)
  // console.log("isLoading", isLoading)
  // console.log("messageLoading", messageLoading)
  //*
  //

  if (isLoading || messageLoading) return <SkeletonChatInput screen={screen} />;

  if (error) return <div>error</div>;

  return (
    <Box
      className="h-full p-4 pt-0 bg-white"
      sx={{
        borderRadius: { xs: "20px", md: "0 20px 20px 0" },
        display: { xs: screen ? "block" : "none", md: "block" },
        width: { xs: screen ? "90%" : 0, md: "73%" },
        marginX: "auto",
      }}
    >
      <Box className="h-[80px] flex items-center shrink-0 justify-between">
        <Box>
          {data[0]?.message?.receiver?.username === username
            ? data[0]?.user?.username
            : data[0]?.message?.receiver?.username}
        </Box>
        <Box
          onClick={() => {
            setScreen(false),
              setReceiverId(null),
              setRoom(null),
              setSelectedMessageIndex(null);
              setMessagesId("")
          }}
          sx={{
            display: { xs: "flex", md: "none" },
            color: "gray",
            cursor: "pointer",
          }}
        >
          <ArrowBackIcon /> Messages
        </Box>
      </Box>
      <Box
        sx={{ height: "calc(100% - 80px)", width: "100%" }}
        className="bg-gray-100 flex shrink-0 rounded-2xl  overflow-x-hidden overflow-y-auto scrollBarHidden relative w-full justify-center"
      >
        <Box className="w-full mb-[112px] rounded-2xl p-4 px-8 pt-[52px] flex flex-col-reverse max-h-full overflow-y-auto gap-4 scrollBarHidden">
          {
            //@ts-ignorex
            messageList
              ?.filter((item: any) => item.message.text !== "")
              .map((item: any, i: number, array: any[]) => (
                <Box
                  className={`flex px-8 relative ${
                    item.message.isMy ? "justify-end" : "justify-start"
                  }`}
                  key={i}
                >
                  <figure
                    className={`absolute ${
                      !item.message.isMy ? "-left-4" : "-right-4"
                    } top-2`}
                  >
                    {!item.message.isMy
                      ? //@ts-ignore
                        array[i + 1]?.message.isMy !== item.message.isMy && (
                          <Avatar
                            alt="user avatar"
                            src={
                              ((item.message.receiver?.avatar !== avatar) &&
                              item.message.receiver?.avatar) ||
                              ((item?.user?.avatar !== avatar) &&
                              item?.user?.avatar) || undefined
                            }
                          />
                        )
                      : //@ts-ignore
                        array[i + 1]?.message.isMy !== item.message.isMy && (
                          <Avatar
                            alt="User avatar"
                            //@ts-ignore
                            src={avatar === "null" ? null : avatar}
                          />
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
                        // maxWidth: "40ch",
                        overflowWrap: "break-word"
                    }}
                    className={`flex p-4 mx-1 rounded-2xl flex-col max-w-[75%] longText ${
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
              src={
                ((data[0].message.receiver?.avatar !== avatar) &&
                data[0].message.receiver?.avatar) ||
                ((data[0]?.user?.avatar !== avatar) &&
                data[0]?.user?.avatar) || undefined
              }
            
              sx={{ width: "100px", height: "100px" }}
            />
            <Typography sx={{ marginTop: "8px", fontWeight: "bold" }}>
              {data[0]?.message?.receiver?.username === username
                ? data[0]?.user?.username
                : data[0]?.message?.receiver?.username}
            </Typography>
            {/* <Typography sx={{ fontSize: "12px" }} className="text-gray-400">
          Developer Manager
        </Typography> */}
          </Box>
        </Box>
        <Box
          className="bg-white absolute bottom-0 w-[97%] h-[80px] mb-[1.45%] rounded-2xl"
          sx={{ display: "flex", justifySelf: "center" }}
        >
          <form onSubmit={handleSubmit} className="flex-grow">
            <Input
              id="messageInput"
              onKeyDownHandler={undefined}
              sx={{ width: "100%", padding: {xs: "0 15px", md: "0 80px"}, marginTop: "16px" }}
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
              handleSubmit={handleSubmit}
            />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Main;
