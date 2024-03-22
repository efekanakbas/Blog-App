"use client";
import LeftSide from "@/components/profile/leftSide/LeftSide";
import RightSide from "@/components/RightSide";
import RightBottom from "@/components/profile/rightSide/RightSide";
import TopSide from "@/components/profile/TopSide";
import { Box, Typography } from "@mui/material";
import React, { useState, useEffect, ReactNode } from "react";
import { useUserDetail } from "@/contexts/UserDetailContext";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { getData } from "@/utils/CRUD";
import { useGeneral } from "@/contexts/GeneralContext";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface ProfilePageLayoutProps {
  children: ReactNode;
}

const ProfilePageLayout: React.FC<ProfilePageLayoutProps> = ({ children }) => {
  //! States
  const router = useRouter()
  const params = useParams().username;
  const username = Cookies.get("username");
  const [isError, setIsError] = useState(false)
  const { setIsMe, setProfileLoading, profileLoading } = useGeneral();
 
  const {
    setFollowers,
    setFollowersCount,
    setFollowings,
    setFollowingsCount,
    setIntro,
    setInterests,
    setMainSkills,
    setComplementarySkills,
    setEducations,
    setExperiences,
    setLanguages,
    setFirstName,
    setLastName,
    setEmail,
    setUsername,
    setAvatar,
    setCover,
    setUserId,
  } = useUserDetail();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["details"],
    queryFn: async () => {
      return getData(`details/${params}`);
    },
    retry: false,
    staleTime: 1000 * 60
  });

  //!
  //todo Functions
  
  //todo
  //? useEffect
  useEffect(
    () => {
      if (username === params) {
        setIsMe(true);
      } else if (username !== params) {
        setIsMe(false);
      }
      if(!error) {
        setFollowers(data?.userDetails.followers);
      setFollowersCount(data?.userDetails.followersCount);
      setFollowings(data?.userDetails.followings);
      setFollowingsCount(data?.userDetails.followingsCount);
      setIntro(data?.userDetails.intro);
      setMainSkills(data?.userDetails.mainSkills);
      setComplementarySkills(data?.userDetails.complementarySkills);
      setInterests(data?.userDetails.interests);
      setExperiences(data?.userDetails.experiences);
      setEducations(data?.userDetails.educations);
      setLanguages(data?.userDetails.languages);
      setFirstName(data?.firstName);
      setLastName(data?.lastName);
      setEmail(data?.email);
      setUsername(data?.username);
      setAvatar(data?.avatar);
      setCover(data?.cover);
      setUserId(data?.userId);
      }
      const refo = async () => {
      
        setProfileLoading(true)
     
      await refetch();
      setProfileLoading(false)
      }
      refo()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params, data]
  );

  useEffect(() => {
    if(error) {
      setIsError(true)
    }
  }, [error])

  //?
  //* consoleLogs
  // console.log("followers", followers)
  // console.log("params", params)
  // console.log("data", data);
  // console.log("isLoading", isLoading);
  console.log("loading", profileLoading)
  //*

  if (error) {
    if(error && isError) {
      toast.error(`There is not user match with ${params}`)
      setTimeout(() => {
        router.push('/')
        setIsError(false)
      }, 3000);
    }
    return (
      <Box
        sx={{
          margin: "95px 0 28px 0",
          height: "100%",
          width: "100%",
          display:'flex',
          justifyContent:'center'
        }}
      >
        <Typography
          sx={{
            backgroundColor: "#0dcaf0",
            paddingY: "10px",
            justifyContent: "center",
            borderRadius: "15px",
            color: "white",
            width: "50%",
            textAlign: "center",
          }}
        >
          You are directed to the home page 
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "start" },
        padding: { xs: "0", md: "0 50px", lg: "0 50px", xl: "0 214px" },
        gap: "25px",
        margin: "95px 0 28px 0",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "75.426%" },
          padding: { xs: "0 25px ", md: "0" },
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        <TopSide isLoading={isLoading}  />
        <Box sx={{ display: { xs: "grid", md: "flex" }, gap: "25px" }}>
          <LeftSide isLoading = {isLoading}  />
          <RightBottom />
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "24.574%" },
          padding: { xs: "0 25px ", md: "0" },
        }}
      >
        <RightSide />
      </Box>
    </Box>
  );
};

export default ProfilePageLayout;
