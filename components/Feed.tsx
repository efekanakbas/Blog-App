"use client";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Avatar, Box, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Image from "next/image";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
//@ts-ignore
import useSound from "use-sound";
//@ts-ignore
import likeSound from "../public/audios/likeSound.wav";
//@ts-ignore
import unlikeSound from "../public/audios/unlikeSound.wav";
import { useFormik } from "formik";
import Input from "./Input";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import CircularProgress from "@mui/material/CircularProgress";
import { useGeneral } from "@/contexts/GeneralContext";
const FeedModal = React.lazy(() => import("./feedModal/FeedModal"));

interface FeedsProps {
  feed: any;
}

const Feed: React.FC<FeedsProps> = ({ feed }) => {
  //! States
  const [onLoad, setOnLoad] = useState(false);
  const [isLiked, setIsLiked] = useState(feed.feed.liked);
  const [play] = useSound(likeSound);
  const [play2] = useSound(unlikeSound);
  const [commentShow, setCommentShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { avatar } = useGeneral();

  const { handleChange, handleReset, handleSubmit, values } = useFormik({
    initialValues: {
      commentValue: "",
    },
    onSubmit: (values) => {
      console.log(values);
      handleReset(values);
    },
  });
  //!
  //todo Functions
  const likeHandler = () => {
    setIsLiked(!isLiked);
  };

  const commentsOpenHandler = () => {
    setCommentShow(!commentShow);
  };
  //todo
  //? useEffect

  //?
  //* consoleLogs
  // console.log("selectedIndex", selectedIndex)
  // console.log("OPEN", open)
  //*

  return (
    <Card>
      <Box className="flex justify-between items-center mb-4">
        <Box className="flex gap-2 items-center">
          <Avatar src={feed.user.avatar} />
          <Box className="flex flex-col justify-center">
            <Typography>{feed.user.name}</Typography>
            <Typography>2 Hours Ago</Typography>
          </Box>
        </Box>
        <MoreHorizIcon color="primary" />
      </Box>

      <Typography>{feed.feed.text}</Typography>

      {
        //@ts-ignore
        feed.feed.image?.length > 0 && (
          <Box
            style={{
              display: "grid",
              //@ts-ignore
              gridTemplateColumns:
                feed.feed.image.length === 4
                  ? "repeat(2, 1fr)"
                  : "repeat(2, 1fr)",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {/*@ts-ignore*/}
            {feed.feed.image.map((item, i, arr) => (
              <figure
                key={i}
                className={`relative w-full ${
                  arr.length <= 2 ? "h-[480px]" : "h-[240px]"
                }`}
                style={{
                  gridColumn:
                    arr.length === 3 && i === 2
                      ? "1 / span 2"
                      : arr.length === 1 && i === 0
                      ? "1 / span 2"
                      : undefined,
                  display: arr.length === 5 && i === 4 ? "none" : "",
                  position: "relative",
                }}
              >
                {arr.length === 5 && i === 3 && onLoad && (
                  <span className="absolute z-20 flex text-white justify-center items-center  w-full h-full bg-gray-900 opacity-60 rounded-2xl">
                    <PlusOneIcon
                      onClick={() => {
                        setModalOpen(true);
                        setSelectedIndex(3);
                      }}
                      sx={{ fontSize: "150px", cursor: "pointer" }}
                    />
                  </span>
                )}
                <Image
                  onLoad={() => setOnLoad(true)}
                  onClick={() => {
                    setModalOpen(true);
                    setSelectedIndex(i);
                  }}
                  className="cursor-pointer rounded-2xl"
                  alt="Image"
                  fill
                  objectFit="cover"
                  src={item}
                />
                {!onLoad && (
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#eeeeee",
                      borderRadius: "16px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress sx={{ zIndex: "10" }} />
                  </Box>
                )}
              </figure>
            ))}
          </Box>
        )
      }

      <Box className="flex gap-8 mt-6">
        <Box className="flex gap-1">
          <figure
            className="cursor-pointer -translate-y-[2px] "
            onClick={likeHandler}
          >
            {isLiked ? (
              <FavoriteIcon sx={{ color: "#CE3240" }} onClick={play2} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "#CE3240" }} onClick={play} />
            )}
          </figure>

          <Typography className="cursor-pointer">
            {feed.feed.likeCount}
          </Typography>
        </Box>
        <Box
          onClick={commentsOpenHandler}
          className="flex gap-1 cursor-pointer"
        >
          <ChatBubbleOutlineIcon />
          {feed.feed.commentsCount}
        </Box>
      </Box>


      {commentShow && (
        <React.Suspense fallback={<div>Loading...</div>}>
        <Box sx={{ marginTop: "32px" }}>
          <Typography className="text-gray-500">Comments</Typography>
          <Box
            sx={{ maxHeight: "350px", overflowY: "auto", overflowX: "hidden" }}
            className="scrollBarHidden"
          >
            {feed.feed.comments.map((comment: any, i: number) => (
              <Box className="flex mt-6 gap-3 px-2" key={i}>
                <figure>
                  <Avatar src={comment.user.avatar} />
                </figure>

                <Box className="flex-1">
                  <Box className="bg-gray-100  flex-col p-4  rounded-lg">
                    <Box className="flex gap-4 justify-between">
                      <Typography className="text-gray-900 font">
                        {comment.user.name}
                      </Typography>
                      <MoreHorizIcon className="text-gray-400" />
                    </Box>
                    <Typography className="pt-4">
                      {comment.comment.text}
                    </Typography>
                  </Box>
                  <Typography className="mt-2">
                    {comment.comment.liked ? "Unlike" : "Like"}{" "}
                    <span className="text-blue-600">
                      ({comment.comment.likesCount})
                    </span>
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box className="flex gap-4 mb-2 mt-6 mx-2">
            <figure>
              <Avatar src={avatar} />
            </figure>

            <form className="w-full" onSubmit={handleSubmit}>
              <Input
                onKeyDownHandler={undefined}
                disabled={false}
                sx={null}
                size="small"
                autoFocus={false}
                paddingLeft={false}
                className="w-full"
                name="commentValue"
                type="text"
                placeholder="Messages..."
                value={values.commentValue}
                handleChange={handleChange}
              />
            </form>
          </Box>
        </Box>
        </React.Suspense>
      )}



      <React.Suspense fallback={<div>Loading...</div>}>
        <FeedModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          feed={feed}
          selectedIndex={selectedIndex}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
        />
      </React.Suspense>
    </Card>
  );
};

export default Feed;
