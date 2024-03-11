"use client";
import React, { useState, useEffect } from "react";
import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import Input from "../Input";
import { useFormik } from "formik";
import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGeneral } from "@/contexts/GeneralContext";
import { getData, postData } from "@/utils/CRUD";

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  //! States
  const { avatar } = useGeneral();
  const queryClient = useQueryClient();
  const { values, handleChange, handleReset, handleSubmit } = useFormik({
    initialValues: {
      inputValue: "",
    },
    onSubmit: (values) => {
      mutate({ me: true, message: values.inputValue });
      handleReset(values);
    },
  });

  const { error, data, isFetching } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      return getData('messages');
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["messages"],
    mutationFn: (messages: any) => {
      return postData('messages')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  const { değer } = useGeneral();
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs
  // console.log("messages", messages);
  // if(data) {console.log("data", data)}
  // console.log('pending', isPending)
  console.log("message", data);
  console.log("LOADİNG", isFetching)
  //*
  //



  if (isFetching) return (
    <Box
      sx={{ borderRadius: "0 20px 20px 0", width:'73%', height:'100%', padding:'16px', pt: '0', backgroundColor:'white', position:'relative' }}
    >
       
       <Box sx={{backgroundColor:'white', position:'absolute', bottom:'16px', left:'32px', width:'94%', height:'80px', marginBottom:'16px', borderRadius:'1rem'}}>
            <Input
              id="messageInput"
              onKeyDownHandler={undefined}
              sx={{ width: "100%", padding: "0 80px", marginTop: "16px" }}
              size="medium"
              className=""
              disabled={isFetching || isPending}
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
      <Box sx={{height:'80px', display:'flex', alignItems:'center', flexShrink:'0'}}>
      <Skeleton variant="text" sx={{ fontSize: '1rem', backgroundColor:'rgb(243 244 246)', width:'8rem' }} />
      </Box>
      <Skeleton
        sx={{ height: "calc(100% - 80px)", backgroundColor:'rgb(243 244 246)', borderRadius:'1rem', padding:'16px', width:'100%' }} variant="rounded"
      />
    </Box>
  )

  if(error) return <div>error</div>



  return (
    <Box
 className="w-[73%] h-full p-4 pt-0 bg-white"
 sx={{ borderRadius: "0 20px 20px 0" }}
>
 <Box className="h-[80px] flex items-center shrink-0">Mustafa Turan</Box>
 <Box
    sx={{ height: "calc(100% - 80px)" }}
    className="bg-gray-100 flex shrink-0 rounded-2xl p-4 overflow-x-hidden overflow-y-auto scrollBarHidden relative w-full"
 >
    <Box className="w-full mb-[9.5%] rounded-2xl p-4 pt-[52px] flex flex-col-reverse max-h-full overflow-y-auto gap-4 scrollBarHidden">
      {
        //@ts-ignore
        data?.map((item, i, array) => (
          <Box
            className={`flex px-8 relative ${
              item.messages.me ? " justify-end" : "justify-start "
            }`}
            key={i}
          >
            <figure className={`absolute ${!item.messages.me ? "-left-4" : "-right-4"} top-2`}>
              {!item.messages.me ?
                array[i + 1]?.messages.me !== item.messages.me && (
                 <Avatar alt="user avatar" src="images/avatars/6.png" />
                ) : array[i + 1]?.messages.me !== item.messages.me && (
                  <Avatar alt="user avatar" src="images/avatars/6.png" />
                 ) }
            </figure>

            <Typography
              style={{
                //@ts-ignore
                borderTopLeftRadius:
                 !item.messages.me &&
                 array[i + 1]?.messages.me !== item.messages.me &&
                 "3px",
                borderTopRightRadius:
                 item.messages.me &&
                 array[i + 1]?.messages.me !== item.messages.me &&
                 "3px",
              }}
              className={`flex p-4 rounded-2xl flex-col max-w-[75%] ${
                item.messages.me
                 ? "bg-blue-600 text-white flex-row-reverse "
                 : "bg-white "
              }`}
            >
              {item.messages.message}
            </Typography>
          </Box>
        ))
      }

      <hr className="my-4" />
      <Box className="flex items-center flex-col">
        <Avatar
          alt="user avatar"
          src={avatar}
          sx={{ width: "100px", height: "100px" }}
        />
        <Typography sx={{ marginTop: "8px", fontWeight: "bold" }}>
          Mustafa Turan
        </Typography>
        <Typography sx={{ fontSize: "12px" }} className="text-gray-400">
          Developer Manager
        </Typography>
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
          disabled={isPending}
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
