"use client";
import { Avatar, Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
//@ts-ignore
import useSound from "use-sound";
//@ts-ignore
import likeSound from "../../public/audios/likeSound.wav";
//@ts-ignore
import unlikeSound from "../../public/audios/unlikeSound.wav";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Input from "../Input";
import { useFormik } from "formik";

interface RightModalProps {
  feed: any;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
}

const RightModal: React.FC<RightModalProps> = ({
  feed,
  modalOpen,
  setModalOpen,
  isLiked,
  setIsLiked,
}) => {
  //! States
  const [play] = useSound(likeSound);
  const [play2] = useSound(unlikeSound);

  const { values, handleChange, handleReset, handleSubmit } = useFormik({
    initialValues: {
      inputValue: "",
    },
    onSubmit: (values) => {
      console.log(values);
      handleReset(values);
    },
  });
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs
  console.log("feed", feed);
  //*

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "37%" },
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px #eeeeee solid",
        position:'relative'
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: "12px" }}>
          <figure>
            <Avatar
              alt="user avatar"
              sx={{ width: "50px", height: "50px" }}
              src={feed.user.avatar}
            />
          </figure>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {feed.user.name}
            </Typography>
            <Typography className="text-gray-500" sx={{ fontSize: "14px" }}>
              2 hours ago
            </Typography>
          </Box>
        </Box>
        <CloseIcon
          onClick={() => {
            setModalOpen(!modalOpen);
          }}
          sx={{ cursor: "pointer", display: { xs: "none", md: "inline" } }}
        />
      </Box>

      <Typography sx={{ marginTop: "32px" }}>{feed.feed.text}</Typography>
      <figure
        onClick={() => {
          setIsLiked(!isLiked);
          isLiked ? play2() : play();
        }}
        className="mt-5 cursor-pointer"
      >
        {isLiked ? (
          <FavoriteIcon sx={{ color: "#CE3240" }} />
        ) : (
          <FavoriteBorderIcon sx={{ color: "#CE3240" }} />
        )}
      </figure>
      <Box
        className="scrollBarHidden"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          paddingTop: "32px",
          overflowY: "auto",
          paddingBottom: "16px",
        }}
      >
        {feed.feed.comments.map((item: any, i: number) => (
          <Box sx={{ position: "relative" }} key={i}>
            <figure className="absolute top-0 left-0">
              <Avatar alt="user avatar" src={item.user.avatar} />
            </figure>
            <Box
              sx={{
                backgroundColor: "#eeeeee",
                padding: "16px",
                borderRadius: "16px",
                marginLeft: "52px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                    {item.user.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "12px" }}
                    className="text-gray-500"
                  >
                    username
                  </Typography>
                </Box>
                <MoreHorizIcon className="text-gray-400" />
              </Box>
              <Typography sx={{ marginTop: "12px" }}>
                {item.comment.text}
              </Typography>
            </Box>
            <Box sx={{ marginTop: "8px", marginLeft: "52px" }}>
              Like{" "}
              <span className="text-blue-500">({item.comment.likesCount})</span>
              {/* <span className="border-l absolute top-[7px] border-l-gray-300 text-white ms-3 text-[8px]">se</span> */}
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{position:'absolute', bottom:'15px', backgroundColor:'white', width:'89.7%', borderRadius:'100px'}}>
        <form className="mb-1" onSubmit={handleSubmit}>
          <Input
            id="feedModalInput"
            onKeyDownHandler={undefined}
            disabled={false}
            name="inputValue"
            sx={{ width: "100%" }}
            value={values.inputValue}
            handleChange={handleChange}
            type="text"
            paddingLeft={false}
            size="small"
            autoFocus={false}
            className=""
            placeholder="Type here..."
            helperText=""
            error= {false}
            handleBlur={null}
          />
        </form>
      </Box>
    </Box>
  );
};

export default RightModal;
