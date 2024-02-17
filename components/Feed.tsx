'use client'
import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Avatar, Box, Typography } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Image from "next/image";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
//@ts-ignore
import useSound from 'use-sound'
//@ts-ignore
import likeSound from '../public/audios/likeSound.wav'
//@ts-ignore
import unlikeSound from '../public/audios/unlikeSound.wav'
import { useFormik } from "formik";
import Input from "./Input";
import FeedModal from './FeedModal';








const Feed: React.FC<FeedsProps> = ({feed}) => {
  //! States
    const [isLiked, setIsLiked] = useState(feed.feed.liked)
    const [play] = useSound(likeSound)
    const [play2] = useSound(unlikeSound)
    const [commentShow, setCommentShow] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const {handleChange, handleReset, handleSubmit, values} = useFormik({
      initialValues: {
        commentValue: ""
      },
      onSubmit: values => {
        console.log(values)
        handleReset(values)
      },
    });

    
  //!
  //todo Functions
    const likeHandler = () => {
      setIsLiked(!isLiked)
    }

    const commentsOpenHandler = () => {
      setCommentShow(!commentShow)
    }
  //todo
  //? useEffect

  //?
  //* consoleLogs
  
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

          <Typography >{feed.feed.text}</Typography>
          {
            feed.feed.image && <figure className="my-4 relative w-full  h-96 " >
              <Image onClick={() => {setModalOpen(true)}}  className="object-cover cursor-pointer" alt="Image" fill src={feed.feed.image} />
          </figure>
          }

          <Box className='flex gap-8 mt-6' >
            <Box  className='flex gap-1'>
              <figure className='cursor-pointer -translate-y-[2px] ' onClick={likeHandler} >
              {isLiked ? <FavoriteIcon onClick={play2}  /> : <FavoriteBorderIcon onClick={play} />}
              </figure>
            
            <Typography className='cursor-pointer'>
              {feed.feed.likeCount}
            </Typography>
            </Box>
            <Box onClick={commentsOpenHandler} className='flex gap-1 cursor-pointer'>
            <ChatBubbleOutlineIcon/>
            {feed.feed.commentsCount}
            </Box>
          </Box>
          {
            commentShow && 
            <Box className="mt-8" >
              <Typography className="text-gray-500" >
                Comments
              </Typography>
              {
                feed.feed.comments.map((comment, i) => (
                  <Box className='flex mt-6 gap-3 px-2' key={i}>
                     <figure>
                     <Avatar src= {comment.user.avatar} />
                     </figure>

                     <Box className='flex-1'>
                        <Box className='bg-gray-100  flex-col p-4  rounded-lg'>
                        <Box className='flex gap-4 justify-between' >
                        <Typography className="text-gray-900 font" >
                          {comment.user.name}
                        </Typography>
                        <MoreHorizIcon className="text-gray-400" />
                        </Box>
                        <Typography className='pt-4'>
                          {comment.feed.text}
                        </Typography>
                     </Box>
                     <Typography className="mt-2">
                      {comment.feed.liked ? "Unlike" : "Like"} <span className='text-blue-600' >({comment.feed.likesCount})</span>
                     </Typography>
                     </Box>
                     
                  </Box>
                ))
              }

              
                <Box className='flex gap-4 mb-2 mt-6 mx-2'>
                  <figure>
                    <Avatar src="images/avatars/6.png" />
                  </figure>

                  <form className="w-full" onSubmit={handleSubmit}>
                    <Input size="small" autoFocus = {false}  paddingLeft = {false} className='w-full' name="commentValue" type='text' placeholder="Messages..." value={values.commentValue} handleChange={handleChange}  />
                  </form>
                </Box>
            </Box>
          }
           <FeedModal modalOpen = {modalOpen} setModalOpen = {setModalOpen} />
        </Card>
  );
};

export default Feed;
