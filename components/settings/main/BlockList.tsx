import Card from '@/components/Card';
import { Avatar, Box, InputLabel, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useFormik } from "formik";
import validationSchema from "../../../schemas/settingsEmailSchema";
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface BlockedList {
  id: string;
  avatar: string;
  username: string;
  text: string;
}


interface BlockListProps {
  data: BlockedList[];
}

const BlockList: React.FC<BlockListProps> = () => {
  //! States
  const {
    values,
    handleChange,
    handleReset,
    handleSubmit,
    handleBlur,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      current: "",
      new: "",
      confirm: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // handleReset(values);
    },
  });

  const { error, data, isLoading } = useQuery({
    queryKey: ["blocked"],
    queryFn: async () => {
      const response = await axios.get(
        "https://65cbe2afefec34d9ed883ace.mockapi.io/messages"
      );

      return response.data.reverse();
    },
  });
  
  //!
  //todo Functions
      
  //todo
  //? useEffect
  
  //?
  //* consoleLogs
      
  //*

  return (
    <Card >
        <Box sx={{display:'flex', flexDirection:'column', gap:'8px'}} >
        <Typography variant='h6' >
        See people that I blocked
      </Typography>
      <Typography sx={{color:'gray'}} >
      You can select who can see your connections, your followers and your following list.
      </Typography>
        </Box>
        <hr className='mt-6 ' />

        {
          data.length === 0 ? (<Box sx={{paddingTop:'24px'}} >
            Blocked person not found
          </Box>) : ( <Box className='scrollBarHidden' sx={{ display: "flex", flexDirection: "column", gap: "32px", overflow:'auto', maxHeight:'calc(100vh - 250px)', paddingTop:'24px' }}>
          {data.map((item: BlockedList) => (
            <Box sx={{ display: "flex", gap: "12px" }} key={item.id}>
              <Avatar
                sx={{ width: "70px", height: "70px" }}
                alt="user avatar"
                src={item.avatar}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">{item.username}</Typography>
                <Typography>{item.text}</Typography>
              </Box>
            </Box>
          ))}
        </Box>)
        }
       
    </Card>
  );
};

export default BlockList;