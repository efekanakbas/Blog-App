"use client";
import { Box, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import Feed from "./Feed";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import Share from "./Share";
//@ts-ignore
import { animateScroll as scroll } from "react-scroll";
import { getData } from "../utils/CRUD";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useParams } from "next/navigation";
import { useGeneral } from "@/contexts/GeneralContext";

import { WindowVirtualizer } from "virtua";
import { motion } from "framer-motion";

interface Feeds {
  shareShow: boolean;
  profile: boolean;
}

const Feeds: React.FC<Feeds> = ({ shareShow, profile }) => {
  //! States
  const params = useParams().username;
  const {
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    error,
    data,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: !profile ? ["feeds"] : ["feedsOne"],
    queryFn: ({ pageParam }) => {
      return !profile
        ? getData(`feeds?page=${pageParam}&limit=10`)
        : getData(`feeds/${params}?page=${pageParam}&limit=10`);
    },
    staleTime: 0,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const morePageExist = lastPage.length === 10;
      if (!morePageExist) {
        return;
      }
      return pages.length + 1;
    },
  });

  const { ref, inView } = useInView();
  const skeletonItems = Array(4).fill(null);
  const { profileLoading } = useGeneral();

  const allData = data ? data.pages.flatMap((d) => d) : [];

  const container = {
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

  //!
  //todo Functions

  //todo
  //? useEffect
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (!profile) {
      scroll.scrollToTop();
    }
  }, [profile]);
  //?
  //* consoleLogs
  // console.log("ref", ref);
  // console.log("inView", inView);
  // console.log("data", data.pages[0].feeds[0])
  // console.log("data", data);
  // console.log("profile", profile)
  // console.log("params", params)
  // console.log("profileLoading", profileLoading)

  console.log("allData", allData);
  //*

  if (status === "pending" || profile ? isLoading || profileLoading : null)
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {!profile && <Share disabled={true} />}
        <Box
          sx={{
            width: "100%",
            height: "685.64px",
            borderRadius: "15px",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <Box className="flex justify-between items-center mb-4">
            <Box className="flex gap-2 items-center">
              <Skeleton variant="circular" width={40} height={40} />

              <Box className="flex flex-col justify-center">
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "8rem" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "6rem" }}
                />
              </Box>
            </Box>
            <MoreHorizIcon sx={{ color: "lightgray" }} />
          </Box>

          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
          {/* <Skeleton variant="text" sx={{ fontSize: "1rem", width: "80%" }} /> */}

          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {skeletonItems.map((_, i) => (
              <figure key={i} className="relative w-full h-[240px]">
                <Skeleton
                  variant="rounded"
                  sx={{ width: "100%", height: "100%", borderRadius: "15px" }}
                />
              </figure>
            ))}
          </Box>

          <Box className="flex gap-8 my-6">
            <Box className="flex gap-1">
              <figure className="cursor-pointer -translate-y-[2px] ">
                <FavoriteBorderIcon sx={{ color: "lightgray" }} />
              </figure>
            </Box>
            <Box className="flex gap-1 cursor-pointer">
              <ChatBubbleOutlineIcon
                sx={{ color: "lightgray", marginLeft: "13px" }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "685.64px",
            borderRadius: "15px",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <Box className="flex justify-between items-center mb-4">
            <Box className="flex gap-2 items-center">
              <Skeleton variant="circular" width={40} height={40} />

              <Box className="flex flex-col justify-center">
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "8rem" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "6rem" }}
                />
              </Box>
            </Box>
            <MoreHorizIcon sx={{ color: "lightgray" }} />
          </Box>

          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
          {/* <Skeleton variant="text" sx={{ fontSize: "1rem", width: "80%" }} /> */}

          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {skeletonItems.map((_, i) => (
              <figure key={i} className="relative w-full h-[240px]">
                <Skeleton
                  variant="rounded"
                  sx={{ width: "100%", height: "100%", borderRadius: "15px" }}
                />
              </figure>
            ))}
          </Box>

          <Box className="flex gap-8 my-6">
            <Box className="flex gap-1">
              <figure className="cursor-pointer -translate-y-[2px] ">
                <FavoriteBorderIcon sx={{ color: "lightgray" }} />
              </figure>
            </Box>
            <Box className="flex gap-1 cursor-pointer">
              <ChatBubbleOutlineIcon
                sx={{ color: "lightgray", marginLeft: "13px" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    );

  if (status === "error") return <h1>Error</h1>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {shareShow && <Share disabled={false} />}
      <motion.div initial="hidden" animate="visible" variants={container}>
        {
          <WindowVirtualizer>
            {allData.map((feed: any, index: number) => {
              return allData.length >= 3 && allData.length - 3 === index ? (
                // return page.length >= 3 && page.length - 3 === index ? (
                <Feed
                  //@ts-ignore
                  ref={ref}
                  key={feed.feed.feedId}
                  feed={feed}
                  profile={profile}
                  refetch={refetch}
                />
              ) : (
                <Feed
                  key={feed.feed.feedId}
                  feed={feed}
                  profile={profile}
                  refetch={refetch}
                />
              );
            })}
          </WindowVirtualizer>
        }
      </motion.div>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "26px" }}
      >
        {isFetchingNextPage ? (
          <h3>Loading...</h3>
        ) : (
          !hasNextPage && <h3>No more data...</h3>
        )}
      </Box>
    </Box>
  );
};

export default Feeds;
