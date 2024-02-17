"use client";
import React, { useState, useEffect } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import Input from "../Input";
import { useFormik } from "formik";
import { AxiosResponse } from "axios";

interface MainProps {
  messages: AxiosResponse<any, any> | undefined;
}

const Main: React.FC<MainProps> = ({ messages }) => {
  //! States
  const { values, handleChange, handleReset, handleSubmit } = useFormik({
    initialValues: {
      inputValue: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      handleReset(values);
    },
  });

  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs
  // console.log("messages", messages);
  //*

  return (
    <Box
      className="w-[73%] h-full p-4 pt-0  bg-white "
      sx={{ borderRadius: "0 20px 20px 0" }}
    >
      <Box className=" h-[80px]  flex items-center shrink-0">Mustafa Turan</Box>
      <Box
        sx={{ height: "calc(100% - 80px)" }}
        className="bg-gray-100   flex shrink-0 rounded-2xl p-4 overflow-x-hidden overflow-y-auto scrollBarHidden relative w-full"
      >
        <Box className="w-full mb-[9.5%] rounded-2xl p-4 pt-[52px] flex flex-col-reverse max-h-full overflow-y-auto gap-4 scrollBarHidden">
          {
            //@ts-ignore
            messages?.map((item, i, array) => (
              <Box
                className={`flex px-8 relative ${
                  item.me ? " justify-end" : "justify-start "
                }`}
                key={i}
              >
                <figure className="absolute -left-4 top-2">
                  {!item.me && array[i + 1]?.me !== item.me && (
                    <Avatar src="images/avatars/6.png" />
                  )}
                </figure>

                <Typography
                  style={{
                    //@ts-ignore
                    borderTopLeftRadius:
                      !item.me && array[i + 1]?.me !== item.me && "3px",
                    borderTopRightRadius:
                      item.me && array[i + 1]?.me !== item.me && "3px",
                  }}
                  className={`flex p-4 rounded-2xl flex-col max-w-[75%] ${
                    item.me
                      ? "bg-blue-600 text-white flex-row-reverse "
                      : "bg-white "
                  }`}
                >
                  {item.message}
                </Typography>
              </Box>
            ))
          }

          <hr className="my-4" />
          <Box className="flex items-center flex-col">
  <Avatar src="images/avatars/6.png" sx={{ width: '100px', height: '100px' }} />
  <Typography className="mt-2 font-bold">Mustafa Turan</Typography>
  <Typography className="text-[12px] text-gray-400">Developer Manager</Typography>
</Box>
        </Box>
        <Box  className="bg-white absolute bottom-0 w-[97%] h-[80px] mb-4 rounded-2xl">
          <form onSubmit={handleSubmit}>
            <Input
              sx = {{'width': '100%', 'padding' : '0 80px', 'marginTop': '12px'}}
              size="medium"
              className=""
              paddingLeft={false}
              autoFocus={false}
              value={values.inputValue}
              handleChange={handleChange}
              name="inputValue"
              type="text"
              placeholder="Type here..."
            />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Main;
