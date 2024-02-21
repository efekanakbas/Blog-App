'use client'
import React, { useState, useEffect } from 'react';
import Card from './Card';
import { Avatar, Box, Icon, Typography } from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

import Image from 'next/image';

interface RightSideProps {
   
}

const persons = [
    {
        avatar: "/images/avatars/24.png",
        name: "Enes Doğan",
        title: "Product Manager"
    },
    {
        avatar: "/images/avatars/25.png",
        name: "Uğur Öztürk",
        title: "Sales Manager"
    },
    {
        avatar: "/images/avatars/28.png",
        name: "Ayşe Yılmaz",
        title: "CEO"
    },
    {
        avatar: "/images/avatars/28.png",
        name: "Ayşe Yılmaz",
        title: "CEO"
    },
    {
        avatar: "/images/avatars/28.png",
        name: "Ayşe Yılmaz",
        title: "CEO"
    },
    {
        avatar: "/images/avatars/28.png",
        name: "Ayşe Yılmaz",
        title: "CEO"
    },
    {
        avatar: "/images/avatars/28.png",
        name: "Ayşe Yılmaz",
        title: "CEO"
    },
]

const RightSide: React.FC<RightSideProps> = () => {
  //! States
      const [showAll, setShowAll] = useState<boolean>(true)
      const [textToggle, setTextToggle] = useState<boolean>(true)
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
      
  //*

  return (
    <Card>
      <Typography color='dark' sx={{textAlign:"start", fontWeight:"bold"}}  >
        Suggestion for you
      </Typography>
      <Box className="flex flex-col gap-4 mt-4">
      {
        
        persons.slice(0,showAll ? 3 : persons.length).map((person, i) => (
            <Box className="flex justify-between items-center"  key={i} >
                <Box className="flex gap-2 items-center">
                    <figure>
                        <Avatar alt="user avatar" src={person.avatar} />
                    </figure>
                    <Box>
                        <Typography>
                            {person.name}
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
        persons.length > 3 && <Typography onClick={clickHandler} className='cursor-pointer' textAlign='center' color='primary'>
        {textToggle ? "Show All" : "Show Less"}
      </Typography>
      }
      </Box>
    </Card>
  );
};

export default RightSide;