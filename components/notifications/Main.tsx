import React, { useEffect } from "react";
import Card from "../Card";
import { Avatar, Box, Typography } from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/utils/CRUD";
import { motion } from "framer-motion";

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  //! States
  const { error, data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      return getData("notifications?from=notif");
    },
  });

  const containerFramer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemFramer = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs
  console.log("data", data);
  //*

  return (
    <Box
      sx={{
        borderRadius: "15px",
        backgroundColor: "white",
        padding: "20px",
        pb: "0",
      }}
    >
      <Typography variant="h6">Notifications</Typography>
      <hr className="mt-4" />
      {data?.length === 0 ? (
        <Box sx={{ paddingTop: "32px" }}>Notifications person not found</Box>
      ) : (
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={containerFramer}
          className="scrollBarHidden"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            overflow: "auto",
            maxHeight: "calc(100vh - 190px)",
            paddingTop: "32px",
            paddingBottom: "32px",
          }}
        >
          {data?.map((item: any, i: number) => (
            <motion.li
              variants={itemFramer}
              style={{ display: "flex", gap: "12px" }}
              key={i}
            >
              <Avatar
                sx={{ width: "70px", height: "70px" }}
                alt="user avatar"
                src={item.userFrom.avatar}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }} variant="h6">
                  {item.userFrom.username}
                </Typography>
                <Typography
                  sx={{ color: "gray" }}
                >{`${item.userFrom.username} has followed you!`}</Typography>
              </Box>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </Box>
  );
};

export default Main;
