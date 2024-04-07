import { getSearch } from "@/api";
import Card from "@/components/Card";
import { useGeneral } from "@/contexts/GeneralContext";
import { Avatar, Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface dataProps {
  avatar: string;
  cover: String;
  email: String;
  firstName: String;
  lastName: String;
  username: String;
}

interface TopProps {
  data: dataProps[];
}

const Top: React.FC<TopProps> = ({ data }) => {
  //! States
  const { setSearchTabValue } = useGeneral();
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs
  console.log("data", data);
  //*

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <Card>
        <Typography variant="h6">Users</Typography>
        <hr className="my-4" />

        <Box
          sx={{ display: "flex", flexDirection: "column", gap: "24px", pt: 1, paddingBottom:'4px' }}
        >
          {data?.length === 0 ? (
            <Typography>Users not found...</Typography>
          ) : (
            data?.slice(0, 4).map((item: dataProps, i: number) => (
              <Box sx={{ display: "flex", gap: "12px", }} key={i}>
                <Avatar
                  sx={{ width: "60px", height: "60px" }}
                  alt="user avatar"
                  src={item.avatar}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography>
                    {item.firstName}  {item.lastName}
                  </Typography>

                  <Typography sx={{ fontSize: "14px", color: "gray" }}>
                    {item.username}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>
        {data?.length > 4 && (
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => {
                setSearchTabValue(1);
              }}
              className="text-blue-600"
            >
              See All
            </button>
          </Box>
        )}
      </Card>

      {/* <Card>
      <Typography variant='h6' >
        Projects
      </Typography>
      <hr className='my-4' />

      <Box sx={{display:'flex', flexDirection:'column', gap:'24px', py:1 }}>
      {
          data?.projects?.length === 0 ? <Typography>
            Users not found...
          </Typography> : (
            data?.projects?.slice(0,4).map((item: Data, i: number) => (
  
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
  )
        }
      </Box>
      {
        data?.projects?.length > 4 && <Box sx={{mt:2, display:'flex', justifyContent:'center'}}>
          <button onClick={() => {setSearchTabValue(2)}} className='text-blue-600'>
            See All
          </button>
        </Box>
      }
    </Card>

    <Card>
      <Typography variant='h6' >
        Companies
      </Typography>
      <hr className='my-4' />

      <Box sx={{display:'flex', flexDirection:'column', gap:'24px', py:1 }}>
      {
          data?.companies?.length === 0 ? <Typography>
            Users not found...
          </Typography> : (
            data?.companies?.slice(0,4).map((item: Data, i: number) => (
  
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
  )
        }
      </Box>
      {
        data?.companies?.length > 4 && <Box sx={{mt:2, display:'flex', justifyContent:'center'}}>
          <button onClick={() => {setSearchTabValue(3)}} className='text-blue-600'>
            See All
          </button>
        </Box>
      }
    </Card> */}
    </Box>
  );
};

export default Top;
