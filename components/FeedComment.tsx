import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  InfiniteData,
  QueryObserverResult,
  RefetchOptions,
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { postData } from "@/utils/CRUD";
//@ts-ignore
import useSound from "use-sound";
//@ts-ignore
import likeSound from "../public/audios/likeSound.wav";
//@ts-ignore
import unlikeSound from "../public/audios/unlikeSound.wav";
import BlockIcon from "@mui/icons-material/Block";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import HandshakeIcon from "@mui/icons-material/Handshake";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface FeedCommentProps {
  comment: any;
  profile: boolean;
  modal: boolean;
  commentDeleteMutate: UseMutateFunction<any, Error, any, unknown>;
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<InfiniteData<any, unknown>, Error>>
  blockedMutate: UseMutateFunction<void, Error, any, unknown>
}

const FeedComment: React.FC<FeedCommentProps> = ({
  comment,
  profile,
  modal,
  commentDeleteMutate,
  refetch,
  blockedMutate
}) => {
  //! States
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(comment.comment.liked);
  const [likedCount, setLikedCount] = useState(comment.comment.likesCount);
  const [play] = useSound(likeSound);
  const [play2] = useSound(unlikeSound);
  const username = Cookies.get("username");
  const [isMe, setIsMe] = useState(username === comment.user.username);
  const [comIsFollowed, setComIsFollowed] = useState<null | any>(null);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: !profile ? ["feeds"] : ["feedsOne"],
    mutationFn: (obj: any) => {
      if (obj.type === "feed") {
        return postData("like", obj);
      } else {
        return postData("like", obj);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: !profile ? ["feeds"] : ["feedsOne"],
      });
    },
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  //!
  //todo Functions
  const likeHandler = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      play2();
      setLikedCount(likedCount - 1);
      mutate({
        parentId: comment.comment.parentId,
        commentId: comment.comment.commentId,
        status: 2,
        type: "comment",
      });
    } else {
      play();
      setLikedCount(likedCount + 1);
      mutate({
        parentId: comment.comment.parentId,
        commentId: comment.comment.commentId,
        status: 1,
        type: "comment",
      });
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFollow = async (string: string) => {
    try {
      if (string === "follow") {
        setComIsFollowed(true);
        await postData("follow", {
          username: comment.user.username,
        });
        refetch()
      } else {
        setComIsFollowed(false);
        await postData("unFollow", {
          username: comment.user.username,
        });
        refetch()
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  //todo
  //? useEffect
  useEffect(() => {
    setIsLiked(comment.comment.liked);
    setLikedCount(comment.comment.likesCount);
    setIsMe(username === comment.user.username);
    if(comment.user.followed) {
      setComIsFollowed(comment.user.followed);
    }
  }, [comment, username, setComIsFollowed]);
  //?
  //* consoleLogs
  // console.log("comment", comment);
  //   console.log("isLiked", isLiked);
  // console.log("isMe", isMe);
  // console.log("com", comIsFollowed);
  //*

  return (
    <Box className={`flex mt-6 gap-3 ${modal ? "pe-[8px]" : "px-2"}`}>
      {!modal && (
        <figure>
          <Avatar
            onClick={() => {
              router.push(`/profile/${comment.user.username}`);
            }}
            sx={{ cursor: "pointer" }}
            alt="user avatar"
            src={comment.user.avatar}
          />
        </figure>
      )}

      <Box className="flex-1">
        <Box className="bg-gray-100  flex-col p-4  rounded-lg">
          <Box className="flex gap-4 justify-between">
            <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {modal && (
                <figure>
                  <Avatar
                    onClick={() => {
                      router.push(`/profile/${comment.user.username}`);
                    }}
                    sx={{ cursor: "pointer" }}
                    alt="user avatar"
                    src={comment.user.avatar}
                  />
                </figure>
              )}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  {comment.user.firstName} {comment.user.lastName}
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "gray" }}>
                  {comment.user.username}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: "8px", alignItems: "start" }}>
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                {moment(comment.comment.createAt).fromNow()}
              </Typography>
              <button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon sx={{ translate: "0px -4px", color: "gray" }} />
              </button>
              <Menu
                PaperProps={{
                  style: {
                    borderRadius: "16px",
                    padding: "3px 8px",
                    width: "150px",
                  },
                }}
                sx={{ mt: "30px", ml: "15px" }}
                id="basic-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                // keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {isMe ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {/* <MenuItem sx={{ display: "flex", gap: "12px", borderRadius: "16px", color:'gray' }} className="hover:text-gray-900" onClick={handleClose}> <PersonAddIcon/> Follow</MenuItem> */}
                    <MenuItem
                      sx={{
                        display: "flex",
                        gap: "12px",
                        borderRadius: "16px",
                        color: "gray",
                      }}
                      className="hover:text-gray-900"
                      onClick={() => {
                        handleClose();
                        commentDeleteMutate({
                          parentId: comment.comment.parentId,
                          commentId: comment.comment.commentId,
                          type: "comment",
                        });
                      }}
                    >
                      {" "}
                      <DeleteIcon /> Delete
                    </MenuItem>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {comIsFollowed ? (
                      <MenuItem
                        sx={{
                          display: "flex",
                          gap: "12px",
                          borderRadius: "16px",
                          color: "gray",
                        }}
                        className="hover:text-gray-900"
                        onClick={() => {
                          handleClose();
                          handleFollow("unfollow");
                        }}
                      >
                        {" "}
                        <PersonAddDisabledIcon /> Unollow
                      </MenuItem>
                    ) : (
                      <MenuItem
                        sx={{
                          display: "flex",
                          gap: "12px",
                          borderRadius: "16px",
                          color: "gray",
                        }}
                        className="hover:text-gray-900"
                        onClick={() => {
                          handleClose();
                          handleFollow("follow");
                        }}
                      >
                        {" "}
                        <PersonAddIcon /> Follow
                      </MenuItem>
                    )}
                    <MenuItem
                      sx={{
                        display: "flex",
                        gap: "12px",
                        borderRadius: "16px",
                        color: "gray",
                      }}
                      className="hover:text-gray-900"
                      onClick={() => {handleClose(); blockedMutate({
                        username: comment.user.username
                      })}}
                    >
                      {" "}
                      <BlockIcon /> Block
                    </MenuItem>
                  </Box>
                )}
              </Menu>
            </Box>
          </Box>
          <Typography className="pt-4">{comment.comment.text}</Typography>
        </Box>
        <Box sx={{ marginTop: "8px", display: "flex" }}>
          <Typography
            onClick={likeHandler}
            sx={{ cursor: "pointer", width: "52px", color: "gray" }}
            className={` ${
              isLiked ? "hover:text-red-600" : "hover:text-blue-600"
            } hover:font-bold`}
          >
            {isLiked ? "Unlike" : "Like"}
          </Typography>
          <span className="text-blue-600">({likedCount})</span>
        </Box>
      </Box>
    </Box>
  );
};

export default FeedComment;
