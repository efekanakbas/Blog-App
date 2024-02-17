import { Dialog } from '@mui/material';
import React, { useState, useEffect } from 'react';

interface FeedModalProps {
  modalOpen: boolean
  setModalOpen: (modalOpen: boolean) => void;
}

const FeedModal: React.FC<FeedModalProps> = ({modalOpen, setModalOpen}) => {
  //! States
      
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    <Dialog open={modalOpen} onClose={() => {setModalOpen(false)}} >
      FeedModal
    </Dialog>
  );
};

export default FeedModal;