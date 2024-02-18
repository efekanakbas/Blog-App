import { Dialog, DialogContent } from '@mui/material';
import React, { useState, useEffect } from 'react';
import LeftModal from './LeftModal';
import RightModal from './RightModal';

interface FeedModalProps {
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  feed: any
  selectedIndex: number
  isLiked: boolean
  setIsLiked:  React.Dispatch<React.SetStateAction<boolean>>
}

const FeedModal: React.FC<FeedModalProps> = ({modalOpen, setModalOpen, feed, selectedIndex, isLiked, setIsLiked}) => {
  //! States
      
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      // if(modalOpen) {console.log("feed", feed)}
  //*

  return (
    <Dialog PaperProps={{
      sx: {
        borderRadius: "15px",
        padding: "0px",
        overflow: "hidden",
      },
    }} maxWidth='lg' fullWidth open={modalOpen} onClose={() => {setModalOpen(false)}} >
      <DialogContent sx={{display:{xs : 'block', md: "flex"}, padding:"0", overflow:{xs: "auto", md: "hidden"}}} >
      <LeftModal images = {feed.feed.image} selectedIndex = {selectedIndex} setModalOpen = {setModalOpen}/>
      <RightModal feed = {feed} modalOpen = {modalOpen} setModalOpen = {setModalOpen} isLiked = {isLiked} setIsLiked = {setIsLiked} />
      </DialogContent>
      
  
    </Dialog>
  );
};

export default FeedModal;