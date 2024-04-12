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
import { InfiniteData, QueryObserverResult, RefetchOptions, UseMutateFunction } from "@tanstack/react-query";
import FeedComment from "../FeedComment";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Cookies from "js-cookie";

interface RightModalProps {
  feed: any;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
  likeNumber: number;
  setLikeNumber: React.Dispatch<any>;
  mutate: UseMutateFunction<any, Error, any, unknown>;
  commentMutate: UseMutateFunction<any, Error, any, unknown>;
  profile: boolean;
  commentDeleteMutate: UseMutateFunction<any, Error, any, unknown>;
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<InfiniteData<any, unknown>, Error>>
  blockedMutate: UseMutateFunction<void, Error, any, unknown>
}

const RightModal: React.FC<RightModalProps> = ({
  feed,
  modalOpen,
  setModalOpen,
  isLiked,
  setIsLiked,
  likeNumber,
  setLikeNumber,
  mutate,
  commentMutate,
  profile,
  commentDeleteMutate,
  refetch,
  blockedMutate
}) => {
  //! States
  const [paddingBottom, setPaddingBottom] = useState("24px");
  const [play] = useSound(likeSound);
  const [play2] = useSound(unlikeSound);
  const [height, setHeight] = useState(window.innerHeight);
  const username = Cookies.get("username");

  const { values, handleChange, handleReset, handleSubmit } = useFormik({
    initialValues: {
      inputValue: "",
    },
    onSubmit: (values) => {
      commentMutate({
        parentId: feed.feed.feedId,
        text: values.inputValue,
      });
      handleReset(values);
    },
  });
  //!
  //todo Functions
  const handlerClick = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      play2();
      setLikeNumber(likeNumber - 1);
      mutate({
        parentId: feed.feed.feedId,
        status: 2,
        type: "feed",
      });
    } else {
      play();
      setLikeNumber(likeNumber + 1);
      mutate({
        parentId: feed.feed.feedId,
        status: 1,
        type: "feed",
      });
    }
  };
  //todo
  //? useEffect

  useEffect(() => {
    const handleResize = () => {
      const innerHeight = window.innerHeight;
      console.log("indnerSize", innerHeight);
      if (innerHeight >= 840) {
        setPaddingBottom("24px");
      } else if (innerHeight <= 800) {
        setPaddingBottom("54px");
      } else {
        // Dinamik olarak azalan padding hesaplama
        const dynamicPadding = 24 + (30 - (innerHeight % 100));
        setPaddingBottom(`${dynamicPadding}px`);
      }
    };

    // İlk yüklemede ve pencere boyutu değiştiğinde yeniden hesaplayın
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  //?
  //* consoleLogs
  // console.log("feed", feed);
  // console.log("second", innerHeight)
  //*

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "37%" },
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px #eeeeee solid",
        position: "relative",
        paddingBottom:'60px'
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
              {feed.user.username}
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
      <Box className="flex gap-8 mt-6">
        <Box className="flex gap-1">
          <figure
            className="cursor-pointer -translate-y-[2px] "
            onClick={handlerClick}
          >
            {isLiked ? (
              <FavoriteIcon sx={{ color: "#CE3240" }} onClick={play2} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "#CE3240" }} onClick={play} />
            )}
          </figure>

          <Typography sx={{ cursor: "pointer", translate: "0 2px" }}>
            {likeNumber}
          </Typography>
        </Box>
        <Box className="flex gap-1">
          <ChatBubbleOutlineIcon />
          {
            feed.feed.comments.filter(
              (item: any) =>
                !item.user.userDetails.blockedBy.some(
                  (blockedByUser: any) => blockedByUser.username === username
                ) &&
                !item.user.userDetails.blocked.some(
                  (blockedUser: any) => blockedUser.username === username
                )
            ).length
          }
        </Box>
      </Box>
      <Box
        className="scrollBarStyled2"
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          overflowY: "auto",
          gap: "2px",
          maxHeight: "525px",
          paddingBottom: paddingBottom,
        }}
      >
        {feed.feed.comments
          .filter(
            (item: any) =>
              !item.user.userDetails.blockedBy.some(
                (blockedByUser: any) => blockedByUser.username === username
              ) &&
              !item.user.userDetails.blocked.some(
                (blockedUser: any) => blockedUser.username === username
              )
          )
          .map((comment: any, i: number) => (
            <FeedComment
              comment={comment}
              key={i}
              profile={profile}
              modal={true}
              commentDeleteMutate={commentDeleteMutate}
              refetch = {refetch}
              blockedMutate = {blockedMutate}
            />
          ))}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "15px",
          backgroundColor: "white",
          width: "89.7%",
          borderRadius: "100px",
        }}
      >
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
            error={false}
            handleBlur={null}
            handleSubmit={handleSubmit}
          />
        </form>
      </Box>
    </Box>
  );
};

export default RightModal;
