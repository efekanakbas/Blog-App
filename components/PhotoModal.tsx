import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { Avatar, Box } from '@mui/material';
import { useGeneral } from '@/contexts/GeneralContext';
import Image from 'next/image';
import grayBg from "../public/images/grayBG.jpg";
import CloseIcon from '@mui/icons-material/Close';

interface PhotoModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  sizeToggle: 'avatar' | 'cover' | null
}

const PhotoModal: React.FC<PhotoModalProps> = ({open, setOpen, sizeToggle}) => {
  //! States
    const {avatar} = useGeneral()
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    
        
        <Modal
        
        open={open}
        onClose={() => {setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus
      > 
      <Box onClick={() => {setOpen(false)}} sx={{position:'relative', width:'100%', height:'100%'}} >
      <Box onClick={(e) => e.stopPropagation()} sx={style} >
        <figure style={{width:sizeToggle === 'avatar' ? 300 : 1200, height:sizeToggle === 'avatar' ? 300 : 400}} >
        <Image className={`${sizeToggle === 'avatar' ? 'rounded-full' : 'rounded-xl'}`} fill src={sizeToggle === 'avatar' ? avatar : grayBg}  alt='avatar' />
        </figure>
      
      </Box>
      <button className='absolute top-5 right-5 cursor-pointer'>
        <CloseIcon sx={{color:'white', width:'40px', height:'40px'}} />
      </button>
      </Box>
      
        
      </Modal>
    
  );
};

export default PhotoModal;