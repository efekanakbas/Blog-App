import { Box } from '@mui/material';
import React, { useState, useEffect, lazy } from 'react';
//@ts-ignore
import ImageGallery from "react-image-gallery";
import CloseIcon from "@mui/icons-material/Close";


  

interface LeftModalProps {
  images: Array<string>
  selectedIndex: number
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftModal: React.FC<LeftModalProps> = ({images, selectedIndex, setModalOpen}) => {
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
    <Box  className='scrollBarHidden' sx={{width:{xs: '100%', md: '63%' }, overflow:"auto", position:"relative"}} >
        <CloseIcon
          onClick={() => {
            setModalOpen(false);
          }}
          sx={{ position:'absolute', cursor: "pointer", display:{xs: 'inline', md:"none", top:'10px', right:"10px"}, zIndex:"10" }}
        />
        <ImageGallery loading = {lazy} startIndex={selectedIndex}  showBullets={true}  lazyLoad = {true} showPlayButton = {false} showThumbnails = {false} useBrowserFullscreen = {false} items = {imagesItem} />
    </Box>
  );
};

export default LeftModal;