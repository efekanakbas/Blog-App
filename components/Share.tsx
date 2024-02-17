'use client'
import React, { useState, useEffect} from 'react';
import Card from './Card';
import { useFormik } from 'formik';
import { Avatar, Box, Typography } from '@mui/material';
import Input from './Input';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TagIcon from '@mui/icons-material/Tag';
import Man4Icon from '@mui/icons-material/Man4';
import ShareModal from './ShareModal';
import PlaceIcon from '@mui/icons-material/Place';

interface ShareProps {
  
}

const Share: React.FC<ShareProps> = () => {
  //! States
      const {values, handleChange, handleReset, handleSubmit} = useFormik({
        initialValues: {
          shareValue: ""
        },
        onSubmit: values => {
          console.log( values)
          handleReset(values);
        },
      });

      const [modalOpen, setModalOpen] = useState(false)
      const [pos1, setPos1] = useState<boolean>(false)
      const [pos2, setPos2] = useState<boolean>(false)
      const [pos3, setPos3] = useState<boolean>(false)
      const [inputShow, setInputShow] = useState<boolean>(false)

        
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    <Card>
      <Box className='flex gap-4'>
        <figure>
            <Avatar src='images/avatars/6.png' />
        </figure>
        <form className='w-full' onSubmit={handleSubmit} >
        <Input size='small' autoFocus = {false}  paddingLeft={false} className='w-full' name='shareValue' type='text' value={values.shareValue} handleChange={handleChange}placeholder='Share something...'/>
        </form>
      </Box>

      <hr className='my-6' />

      <Box className='flex justify-evenly'>
        <Box onClick = {() => {setModalOpen(true)}} className='flex gap-2 items-center cursor-pointer'>
          <figure className='scale450' >
            <ImageIcon color='primary' />
          </figure>
          <Typography className='none450' >
            Image
          </Typography>
        </Box>

        <Box onClick = {() => {setModalOpen(true)}}  className='flex gap-1 cursor-pointer'>
            <figure className='scale450'>
            <AttachFileIcon color='warning' />
            </figure>
            <Typography className='none450'>
            Attachment
          </Typography>
            
        </Box>

        <Box onClick = {() => {setModalOpen(true), setInputShow(true), setPos1(true)}}  className='flex gap-1 cursor-pointer'>
            <figure className='scale450'>
                <TagIcon color='error' />
            </figure>
            <Typography className='none450'>
            Hashtag
          </Typography>
            
        </Box>

        <Box onClick = {() => {setModalOpen(true), setInputShow(true), setPos2(true)}}  className='flex gap-1 cursor-pointer'>
            <figure className='scale450' >
                <Man4Icon color='secondary' />
            </figure>
            <Typography className='none450'>
            Mention
          </Typography>
            
        </Box>

        <Box onClick = {() => {setModalOpen(true), setInputShow(true), setPos3(true)}}  className='flex gap-1 cursor-pointer'>
            <figure className='scale450' >
                <PlaceIcon color='info' />
            </figure>
            <Typography className='none450'>
            Location
          </Typography>
            
        </Box>
      </Box>

      <ShareModal modalOpen = {modalOpen} setModalOpen={setModalOpen} pos1={pos1} pos2={pos2} pos3={pos3} setPos1 = {setPos1} setPos2 = {setPos2} setPos3 = {setPos3} inputShow = {inputShow} setInputShow = {setInputShow} />


    </Card>
  );
};

export default Share;