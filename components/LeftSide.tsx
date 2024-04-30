"use client";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface LeftSideProps {
  // Define props here
}

const LeftSide: React.FC<LeftSideProps> = () => {
  //! States
  const avatar = Cookies.get("avatar");
  const username = Cookies.get("username");
  const firstName = Cookies.get("firstName");
  const lastName = Cookies.get("lastName");
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  //!
  //todo Functions

  //todo
  //? useEffect
  useEffect(() => {
    setLoaded(true);
  }, []);
  //?
  //* consoleLogs

  //*

  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: "8px" }}>
          <figure
            onClick={() => {
              router.push(`/profile/${username}`);
            }}
            className="flex items-center cursor-pointer"
          >
            {/*@ts-ignore*/}
            {loaded ? (
              <Avatar
                style={{ width: "50px", height: "50px" }}
                alt="User avatar"
                //@ts-ignore
                src={avatar === "null" ? null : avatar}
              />
            ) : (
              <Skeleton variant="circular" width={50} height={50} />
            )}
          </figure>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {
              loaded ? <Typography sx={{ fontWeight: "bold" }}>
              {firstName} {lastName}
            </Typography> : <Skeleton variant="text" sx={{ fontSize: '1rem', width:"15ch" }} />
            }

           {
            loaded ?  <Typography
            sx={{
              fontSize: "14px",
              textAlign: "start",
              color: "gray",
              marginTop: "4px",
            }}
          >
            {username}
          </Typography> :  <Skeleton variant="text" sx={{ fontSize: '1rem', width:"10ch" }} />
           }
          </Box>
        </Box>
        <SettingsIcon
          onClick={() => {
            router.push("/settings");
          }}
          sx={{ fontSize: "26px", cursor: "pointer" }}
        />
      </Box>

      <hr className="my-4" />
    </Card>
  );
};

export default LeftSide;
