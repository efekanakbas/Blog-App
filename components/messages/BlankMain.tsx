import { Box, Typography } from '@mui/material';
import React from 'react';
import AcUnitIcon from "@mui/icons-material/AcUnit";

interface BlankMainProps {
  // Define props here
}

const BlankMain: React.FC<BlankMainProps> = () => {
  //! States
      
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    <Box
 className="w-[73%] h-full bg-white"
 sx={{ borderRadius: "0 20px 20px 0" }}
>
 <Box sx={{height:'80px', display:'flex', alignItems:'center', flexShrink:'0', borderBottom:'rgb(229 231 235) 1px solid', padding:'16px'}} >
    <input type="text" className='outline-0 w-full' placeholder='To: Type a name or multiple names' />
 </Box>
 <Box
    sx={{ height: "calc(100% - 80px)", display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column' }}
 >
    <AcUnitIcon sx={{width:'30%', height:'30%', color:' rgb(37 99 235)'}} />
    <Typography sx={{fontSize:'4rem', color: ' rgb(37 99 235)'}}>
        Blog App
    </Typography>
 </Box>
</Box>
  );
};

export default BlankMain;