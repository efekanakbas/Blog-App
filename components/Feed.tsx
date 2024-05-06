"use client";
import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
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
const FeedModal = React.lazy(() => import("./feedModal/FeedModal"));
import moment from "moment";
import Skeleton from "@mui/material/Skeleton";
import Cookies from "js-cookie";
import {
  InfiniteData,
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteData, postData } from "@/utils/CRUD";
import FeedComment from "./FeedComment";
import BlockIcon from "@mui/icons-material/Block";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import HandshakeIcon from "@mui/icons-material/Handshake";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Link from "next/link";
import { motion } from "framer-motion";

interface FeedsProps {
  feed: any;
  profile: boolean;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<InfiniteData<any, unknown>, Error>>;
}

const Feed: React.FC<FeedsProps> = React.forwardRef(
  ({ feed, profile, refetch }, ref) => {
    //! States
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(feed.feed.liked);
    const [likeNumber, setLikeNumber] = useState(feed.feed.likeCount);
    const [play] = useSound(likeSound);
    const [play2] = useSound(unlikeSound);
    const [commentShow, setCommentShow] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [Imoment, setIMoment] = useState<null | string>(null);
    const avatar = Cookies.get("avatar");
    const username = Cookies.get("username");
    const [isMe, setIsMe] = useState(username === feed.user.username);
    const [isFollowed, setIsFollowed] = useState(feed.user.followed);

    const { handleChange, handleReset, handleSubmit, values } = useFormik({
      initialValues: {
        commentValue: "",
      },
      onSubmit: (values) => {
        commentMutate({
          parentId: feed.feed.feedId,
          text: values.commentValue,
        });
        handleReset(values);
      },
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
      mutationKey: !profile ? ["feeds"] : ["feedsOne"],
      mutationFn: (obj: any) => {
        return postData("like", obj);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: !profile ? ["feeds"] : ["feedsOne"],
        });
      },
    });

    const { mutate: mutateDelete } = useMutation({
      mutationKey: !profile ? ["feeds"] : ["feedsOne"],
      mutationFn: async (obj: any) => {
        document.body.style.overflow = "hidden";
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          customClass: {
            popup: "border-radius-15",
            confirmButton: "swalButton",
            cancelButton: "swalButton",
          },
          showCancelButton: true,
          confirmButtonColor: "#1976d2",
          cancelButtonColor: "#f44336",
          confirmButtonText: "Delete",
          backdrop: "rgba(0, 0, 0, 0.5)",
          didOpen: () => {
            document.body.style.overflow = "auto";
          },
        });

        if (result.isConfirmed) {
          document.body.style.overflow = "hidden";
          await Swal.fire({
            title: "Deleted!",
            text: "Your feed has been deleted.",
            icon: "success",
            confirmButtonText: "OK!",
            confirmButtonColor: "#1976d2",
            didOpen: () => {
              document.body.style.overflow = "auto";
            },
          });
          // Silme işlemi
          await deleteData("feeds", obj);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: !profile ? ["feeds"] : ["feedsOne"],
        });
      },
    });

    const { mutate: commentMutate } = useMutation({
      mutationKey: !profile ? ["feeds"] : ["feedsOne"],
      mutationFn: (obj: any) => {
        return postData("comment", obj);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: !profile ? ["feeds"] : ["feedsOne"],
        });
      },
    });

    const { mutate: commentDeleteMutate } = useMutation({
      mutationKey: !profile ? ["feeds"] : ["feedsOne"],
      mutationFn: (obj: any) => {
        return deleteData("feeds", obj);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: !profile ? ["feeds"] : ["feedsOne"],
        });
      },
    });

    const { mutate: blockedMutate } = useMutation({
      mutationKey: ["blocked"],
      mutationFn: async (obj: any) => {
        try {
          document.body.style.overflow = "hidden";
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You can be able to revert this in settings.",
            icon: "warning",
            customClass: {
              popup: "border-radius-15",
              confirmButton: "swalButton",
              cancelButton: "swalButton",
            },
            showCancelButton: true,
            confirmButtonColor: "#1976d2",
            cancelButtonColor: "#f44336",
            confirmButtonText: "Block",
            backdrop: "rgba(0, 0, 0, 0.5)",
            didOpen: () => {
              document.body.style.overflow = "auto";
            },
          });

          if (result.isConfirmed) {
            document.body.style.overflow = "hidden";
            await Swal.fire({
              title: "Blocked!",
              text: "Your have blocked successfully.",
              icon: "success",
              confirmButtonText: "OK!",
              confirmButtonColor: "#1976d2",
              didOpen: () => {
                document.body.style.overflow = "auto";
              },
            });
            // Block işlemi
            await postData("blocked", obj);
            setModalOpen(false);
            // setSettingsTabValue(2);
            // router.push("/settings");
          }
        } catch (error) {
          console.log("error", error);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["blocked"] });
        queryClient.invalidateQueries({
          queryKey: !profile ? ["feeds"] : ["feedsOne"],
        });
        queryClient.invalidateQueries({ queryKey: ["suggestions"] });
      },
    });

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const itemHome = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
      },
    };

    const itemProfile = {
      hidden: { y: -6, opacity: 0 },
      visible: {
        y: -26,
        opacity: 1,
      },
    };
    //!
    //todo Functions
    const likeHandler = () => {
      setIsLiked(!isLiked);
      if (isLiked) {
        setLikeNumber(likeNumber - 1);
        mutate({
          parentId: feed.feed.feedId,
          status: 2,
          type: "feed",
        });
      } else {
        setLikeNumber(likeNumber + 1);
        mutate({
          parentId: feed.feed.feedId,
          status: 1,
          type: "feed",
        });
      }
    };

    const commentsOpenHandler = () => {
      setCommentShow(!commentShow);
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
          setIsFollowed(true);
          await postData("follow", { username: feed.user.username });
          await refetch();
        } else {
          setIsFollowed(false);
          await postData("unFollow", { username: feed.user.username });
          await refetch();
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    //todo
    //? useEffect
    useEffect(() => {
      setIMoment(moment(feed.feed.createAt).fromNow());
    }, [feed.feed.createAt]);

    useEffect(() => {
      setIsLiked(feed.feed.liked);
      setLikeNumber(feed.feed.likeCount);
      setIsMe(username === feed.user.username);
      setIsFollowed(feed.user.followed);
      // setCommentShow(false)
    }, [feed, username]);

    //?
    //* consoleLogs
    // console.log("selectedIndex", selectedIndex)
    // console.log("OPEN", open)
    // console.log("refOOOOO", ref)
    // console.log("feed", feed);
    // console.log("first", feed.feed);
    // console.log("isMe", isMe);
    //*

    return (
      <motion.div
        variants={profile ? itemProfile : itemHome}
        style={{
          borderRadius: "15px",
          padding: "20px",
          backgroundColor: "white",
          marginTop: "26px",
        }}
        //@ts-ignore
        ref={ref ? ref : null}
      >
        <Box className="flex justify-between items-center mb-4">
          <Box className="flex gap-2 items-center">
            <Avatar
              onClick={() => {
                router.push(`/profile/${feed.user.username}`);
              }}
              sx={{ cursor: "pointer" }}
              alt="user avatar"
              src={feed.user.avatar}
            />
            <Box className="flex flex-col justify-center">
              <Typography>{feed.user.username}</Typography>
              {Imoment ? (
                <Typography sx={{ color: "gray", fontSize: "13px" }}>
                  {Imoment}
                </Typography>
              ) : (
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              )}
            </Box>
          </Box>
          {(!profile || (profile && isMe)) && (
            <Box>
              <button
                // id="feedButton"
                type="button"
                name="feed-button"
                aria-label="Menu Button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon color="primary" />
              </button>
              <Menu
                PaperProps={{
                  style: {
                    borderRadius: "16px",
                    padding: "3px 8px",
                    width: "150px",
                  },
                }}
                sx={{ mt: "30px", ml: "20px" }}
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
                        gap: "8px",
                        borderRadius: "16px",
                        color: "gray",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                      className="hover:text-gray-900"
                      onClick={() => {
                        handleClose();
                        mutateDelete({
                          parentId: feed.feed.feedId,
                          type: "feed",
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
                    {isFollowed ? (
                      <MenuItem
                        sx={{
                          display: "flex",
                          gap: "8px",
                          borderRadius: "16px",
                          color: "gray",
                          justifyContent: "start",
                          alignItems: "center",
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
                          gap: "8px",
                          borderRadius: "16px",
                          color: "gray",
                          justifyContent: "start",
                          alignItems: "center",
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
                        gap: "8px",
                        borderRadius: "16px",
                        color: "gray",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                      className="hover:text-gray-900"
                      onClick={() => {
                        handleClose();
                        blockedMutate({
                          username: feed.user.username,
                        });
                      }}
                    >
                      {" "}
                      <BlockIcon /> Block
                    </MenuItem>
                  </Box>
                )}
              </Menu>
            </Box>
          )}
        </Box>

        <Typography>{feed.feed.text}</Typography>

        {feed?.feed?.images[0]?.endsWith(".pdf") ? (
          <Box
            sx={{
              borderRadius: "10px",
              border: "1px lightgray solid",
              height: "50px",
              marginTop: "16px",
            }}
          >
            <Link
              target="_blank"
              className="flex justify-center items-center h-full hover:bg-gray-100 rounded-[10px] gap-2"
              href={feed?.feed?.images[0]}
            >
              <AttachFileIcon color="warning" />
              <Typography sx={{ fontWeight: "bold" }}>
                {decodeURIComponent(
                  feed?.feed?.images[0]
                    .split("/")
                    [feed?.feed?.images[0].split("/").length - 1].split("-")[
                    feed?.feed?.images[0]
                      .split("/")
                      [feed?.feed?.images[0].split("/").length - 1].split("-")
                      .length - 1
                  ]
                )}
              </Typography>
            </Link>
          </Box>
        ) : (
          feed.feed.images?.length > 0 && (
            <Box
              style={{
                display: "grid",

                gridTemplateColumns:
                  feed.feed.images.length === 4
                    ? "repeat(2, 1fr)"
                    : "repeat(2, 1fr)",
                gap: "12px",
                marginTop: "16px",
              }}
            >
              {feed.feed.images.map((item: any, i: number, arr: any) => (
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
                  {arr.length === 5 && i === 3 && (
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
                    unoptimized
                    onClick={() => {
                      setModalOpen(true);
                      setSelectedIndex(i);
                    }}
                    className="cursor-pointer rounded-2xl"
                    alt="Image"
                    fill
                    src={`${item}`}
                    style={{ objectFit: "cover" }}
                  />
                </figure>
              ))}
            </Box>
          )
        )}

        {feed?.feed?.hashtags?.length > 0 ||
        feed?.feed?.mentions?.length > 0 ? (
          <Box
            sx={{ my: 2.3, display: "flex", flexDirection: "column", gap: 2 }}
          >
            {feed.feed.hashtags.length > 0 && (
              <Box className="flex gap-4 w-full flex-wrap">
                {feed.feed.hashtags.map((hashtag: string, i: number) => (
                  <span
                    className="border border-blue-500 px-4 py-1 rounded-full text-blue-500 relative"
                    key={i}
                  >
                    #{hashtag}
                  </span>
                ))}
              </Box>
            )}

            {feed.feed.mentions.length > 0 && (
              <Box className="flex gap-4 w-full flex-wrap">
                {feed.feed.mentions.map((mention: string, i: number) => (
                  <span
                    className="px-4 py-1 rounded-md text-blue-500 bg-blue-200 relative"
                    key={i}
                  >
                    {mention}
                  </span>
                ))}
              </Box>
            )}
          </Box>
        ) : null}

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

            <Typography sx={{ cursor: "pointer", translate: "0 2px" }}>
              {likeNumber}
            </Typography>
          </Box>
          <Box
            onClick={commentsOpenHandler}
            className="flex gap-1 cursor-pointer"
          >
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

        {commentShow && (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Box sx={{ marginTop: "32px" }}>
              <Typography className="text-gray-500">Comments</Typography>
              <Box
                sx={{
                  maxHeight: "350px",
                  overflowY: "auto",
                  overflowX: "hidden",
                  display: "flex",
                  flexDirection: "column-reverse",
                  gap: "2px",
                }}
                className="scrollBarStyled2"
              >
                {feed.feed.comments
                  .filter(
                    (item: any) =>
                      !item.user.userDetails.blockedBy.some(
                        (blockedByUser: any) =>
                          blockedByUser.username === username
                      ) &&
                      !item.user.userDetails.blocked.some(
                        (blockedUser: any) => blockedUser.username === username
                      )
                  )
                  .map((comment: any, i: number) => (
                    <FeedComment
                      comment={comment}
                      profile={profile}
                      key={i}
                      modal={false}
                      commentDeleteMutate={commentDeleteMutate}
                      refetch={refetch}
                      blockedMutate={blockedMutate}
                    />
                  ))}
              </Box>

              <Box className="flex gap-4 mb-2 mt-6 mx-2">
                <figure>
                  <Avatar
                    alt="user avatar"
                    //@ts-ignore
                    src={avatar === "null" ? null : avatar}
                  />
                </figure>

                <form className="w-full" onSubmit={handleSubmit}>
                  <Input
                    id="feedInput"
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
                    helperText=""
                    error={false}
                    handleBlur={null}
                    handleSubmit={handleSubmit}
                  />
                </form>
              </Box>
            </Box>
          </React.Suspense>
        )}

        <React.Suspense>
          <FeedModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            feed={feed}
            selectedIndex={selectedIndex}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            likeNumber={likeNumber}
            setLikeNumber={setLikeNumber}
            mutate={mutate}
            commentMutate={commentMutate}
            commentDeleteMutate={commentDeleteMutate}
            profile={profile}
            refetch={refetch}
            blockedMutate={blockedMutate}
          />
        </React.Suspense>
      </motion.div>
    );
  }
);

Feed.displayName = "Feed";

export default Feed;
