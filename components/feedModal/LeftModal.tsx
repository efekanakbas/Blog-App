import { Box } from '@mui/material';
import React, { useState, useEffect, lazy } from 'react';
//@ts-ignore
import ImageGallery from "react-image-gallery";


  

interface LeftModalProps {
  images: Array<string>
  selectedIndex: number
}

const LeftModal: React.FC<LeftModalProps> = ({images, selectedIndex}) => {
  //! States


  const imagesItem = images.map((item, i) => ({
    original: item,
    thumbnail: "https://picsum.photos/id/1018/250/150/",
    style: { objectFit: 'cover', height: '200px' },
  }));
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
    //   console.log("images", images)
  //*

  return (
    <Box  className='scrollBarHidden' sx={{width:'63%', overflow:"auto"}} >
        <ImageGallery startIndex={selectedIndex}  showBullets={true}  lazyLoad = {true} showPlayButton = {false} showThumbnails = {false} useBrowserFullscreen = {false} items = {imagesItem} />
    </Box>
  );
};

export default LeftModal;