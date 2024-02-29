import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

interface CompaniesProps {
  data: Data[]
}

const Companies: React.FC<CompaniesProps> = ({data}) => {
  //! States
      
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      // console.log("data", data)
  //*

  return (
    <Box  sx={{borderRadius:'15px', backgroundColor:'white', padding:'20px', pb:0, overflow:'hidden'}}>
    <Typography variant='h6' >
      Companies
    </Typography>
    <hr className='mt-4' />

    <Box className='scrollBarHidden'  sx={{display:'flex', flexDirection:'column', gap:'24px', py:3, overflowY:'auto', maxHeight:'calc(100vh - 190px)', }}>
      {
        data?.map((item: Data, i: number) => (

          <Box sx={{display:'flex', gap:'12px'}} key={i}>
              <Avatar sx={{width:'60px', height:'60px'}} alt='user avatar' src={item.avatar} />
              <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <Typography>
                  {item.name}
                </Typography>

                <Typography sx={{fontSize:'14px', color:'gray'}}>
                  {item.username}
                </Typography>
              </Box>
          </Box>
        ))
      }
    </Box>
  </Box>
  );
};

export default Companies;