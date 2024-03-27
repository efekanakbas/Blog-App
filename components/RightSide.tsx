"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Avatar, Box, Icon, Typography } from "@mui/material";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";

import { useQuery } from "@tanstack/react-query";
import { getData } from "@/utils/CRUD";
import { useRouter } from "next/navigation";
import { useGeneral } from "@/contexts/GeneralContext";
import { useUserDetail } from "@/contexts/UserDetailContext";

interface RightSideProps {}

const RightSide: React.FC<RightSideProps> = () => {
  //! States
  const router = useRouter();
  const { profileLoading, setProfileLoading, setProfilePage, setTabValue } = useGeneral();
  const {userId} = useUserDetail()
  const [showAll, setShowAll] = useState<boolean>(true);
  const [textToggle, setTextToggle] = useState<boolean>(true);

  const { data, isLoading, error } = useQuery({
    queryKey: ["suggestions"],
    queryFn: async () => {
      return getData("suggestions");
    },
  });
  //!
  //todo Functions
  const clickHandler = () => {
    setTextToggle(!textToggle);
    setShowAll(!showAll);
  };
  //todo
  //? useEffect
  // useEffect(() => {
  //   if (!profileLoading) {
  //     setTabValue(0);
  //   }
  // }, [profileLoading, setTabValue]);
  //?
  //* consoleLogs
  console.log("dataAAA", data)
  // console.log("profileLoading", profileLoading);
  //*

  return (
    <Card>
      <Typography color="dark" sx={{ textAlign: "start", fontWeight: "bold" }}>
        Suggestion for you
      </Typography>
      <Box className="flex flex-col gap-4 mt-4">
        {data
          ?.slice(0, showAll ? 3 : data?.length)
          .map((person: any, i: number) => (
            <Box
              onClick={() => {
                if (!profileLoading && person.userId !== userId) {
                  router.push(`/profile/${person.username}`);
                  setProfilePage(0);
                  setTabValue(0);
                  setProfileLoading(true);
                }
              }}
              className={`flex justify-between items-center ${
                !profileLoading ? "cursor-pointer" : "cursor-default"
              }`}
              key={i}
            >
              <Box className="flex gap-2 items-center">
                <figure>
                  <Avatar
                    sx={{
                      width: "45px",
                      height: "45px",
                      bgcolor: profileLoading && "lightgray",
                    }}
                    alt="user avatar"
                    src={person.avatar}
                  />
                </figure>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    color: !profileLoading ? "black" : "gray",
                  }}
                >
                  <Typography>
                    {person.firstName} {person.lastName}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: !profileLoading ? "gray" : "lightgray",
                    }}
                  >
                    {person.username}
                  </Typography>
                </Box>
              </Box>
              <figure>
                <LocalFloristIcon
                  sx={{ color: !profileLoading ? "primary.main" : "gray" }}
                />
              </figure>
            </Box>
          ))}
        {data?.length > 3 && (
          <Typography
            onClick={clickHandler}
            className="cursor-pointer"
            textAlign="center"
            color="primary"
          >
            {textToggle ? "Show All" : "Show Less"}
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default RightSide;
