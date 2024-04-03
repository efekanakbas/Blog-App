import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "@/utils/CRUD";
//@ts-ignore
import useSound from "use-sound";
//@ts-ignore
import likeSound from "../public/audios/likeSound.wav";
//@ts-ignore
import unlikeSound from "../public/audios/unlikeSound.wav";

interface FeedCommentProps {
  comment: any;
  profile: Boolean;
  modal: Boolean;
}

const FeedComment: React.FC<FeedCommentProps> = ({
  comment,
  profile,
  modal,
}) => {
  //! States
  const [isLiked, setIsLiked] = useState(comment.comment.liked);
  const [likedCount, setLikedCount] = useState(comment.comment.likesCount);
  const [play] = useSound(likeSound);
  const [play2] = useSound(unlikeSound);

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
  //todo
  //? useEffect
  useEffect(() => {
    setIsLiked(comment.comment.liked);
    setLikedCount(comment.comment.likesCount);
  }, [comment]);
  //?
  //* consoleLogs
  //   console.log("comment", comment);
  //   console.log("isLiked", isLiked);
  //*

  return (
    <Box className={`flex mt-6 gap-3 ${modal ? "pe-[8px]" : "px-2"}`}>
      {!modal && (
        <figure>
          <Avatar alt="user avatar" src={comment.user.avatar} />
        </figure>
      )}

      <Box className="flex-1">
        <Box className="bg-gray-100  flex-col p-4  rounded-lg">
          <Box className="flex gap-4 justify-between">
            <Box sx={{ display: "flex", gap: "8px", alignItems:'center' }}>
              {modal && (
                <figure>
                  <Avatar alt="user avatar" src={comment.user.avatar} />
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

            <Box sx={{ display: "flex", gap: "8px" }}>
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                {moment(comment.comment.createAt).fromNow()}
              </Typography>
              <MoreHorizIcon sx={{ color: "gray", translate: "0 -1.5px" }} />
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
