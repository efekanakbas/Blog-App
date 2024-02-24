import React from 'react';
import Modal from '@mui/material/Modal';
import {  Box } from '@mui/material';

interface RegisterModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RegisterModal: React.FC<RegisterModalProps> = ({open, setOpen}) => {
  //! States
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
        <Box onClick={() => {
            setOpen(false)
        }} sx={{backgroundColor:'#0071D8', width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
            selam
        </Box>
      
        
      </Modal>
  );
};

export default RegisterModal;