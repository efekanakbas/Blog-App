'use client'
import React, { useState } from 'react';
import Card from './Card';
import { Avatar, Box, Icon, Typography } from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';


import { useQuery } from '@tanstack/react-query';
import { getData } from '@/utils/CRUD';
import { useRouter } from 'next/navigation';

interface RightSideProps {
    
}

const RightSide: React.FC<RightSideProps> = () => {
  //! States
      const router = useRouter()
      const [showAll, setShowAll] = useState<boolean>(true)
      const [textToggle, setTextToggle] = useState<boolean>(true)

      const {data, isLoading, error} = useQuery({
        queryKey: ['suggestions'],
        queryFn: async () => {
            return getData('suggestions')
        }
      })
  //!
  //todo Functions
      const clickHandler = () => {
        setTextToggle(!textToggle);
        setShowAll(!showAll)
      }
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      // console.log("dataAAA", data)
  //*

  return (
    <Card>
      <Typography color='dark' sx={{textAlign:"start", fontWeight:"bold"}}  >
        Suggestion for you
      </Typography>
      <Box className="flex flex-col gap-4 mt-4">
      {
        
        data?.slice(0,showAll ? 3 : data?.length).map((person: any, i: number) => (
            <Box onClick= {() => {router.push(`/profile/${person.username}`)}} className="flex justify-between items-center cursor-pointer"  key={i} >
                <Box className="flex gap-2 items-center">
                    <figure>
                        <Avatar sx={{width:'45px', height:'45px'}} alt="user avatar" src={person.avatar} />
                    </figure>
                    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <Typography>
                            {person.firstName}  {person.lastName}
                        </Typography>
                        <Typography sx={{fontSize:'13px', color:'gray'}}>
                            {person.username}
                        </Typography>
                    </Box>
                </Box>
                <figure>
                    <LocalFloristIcon color='primary' />
                </figure>
            </Box>
        ))
        
      }
      {
        data?.length > 3 && <Typography onClick={clickHandler} className='cursor-pointer' textAlign='center' color='primary'>
        {textToggle ? "Show All" : "Show Less"}
      </Typography>
      }
      </Box>
    </Card>
  );
};

export default RightSide;