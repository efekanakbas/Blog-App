"use client";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Feed from "./Feed";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import Share from "./Share";
//@ts-ignore
import {animateScroll as scroll} from 'react-scroll'

interface Feeds {
  shareShow: boolean;
}

const Feeds: React.FC<Feeds> = ({ shareShow }) => {
  //! States

  const {
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    error,
    data,
  } = useInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: ({ pageParam }) => {
      return axios
        .get(
          `https://65cbe2afefec34d9ed883ace.mockapi.io/feed?page=${pageParam}&limit=5`
        )
        .then((response) => response.data);
    },
    staleTime: 5000,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const morePageExist = lastPage.length === 5;
      if (!morePageExist) {
        return;
      }
      return pages.length + 1;
    },
  });

  const { ref, inView } = useInView();

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
    scroll.scrollToTop();
  }, [])
  //?
  //* consoleLogs
  // console.log("ref", ref);
  // console.log("inView", inView);
  //*

  if (status === "pending") return <h1>Loading</h1>;

  if (status === "error") return <h1>Error</h1>;

  return (
    <Box className="flex flex-col gap-7">
      {shareShow && <Share />}
      {
        //@ts-ignore
        data.pages.map((page, i) => {
          return (
            <React.Fragment key={i}>
              {page.map((feed: any, index: number) =>
                page.length >= 3 && page.length - 3 === index ? (
                  <Feed
                    //@ts-ignore
                    ref={ref}
                    key={index}
                    feed={feed}
                  />
                ) : (
                  <Feed key={index} feed={feed} />
                )
              )}
            </React.Fragment>
          );
        })
      }
      <Box sx={{ display: "flex", justifyContent: "center" }}>
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
