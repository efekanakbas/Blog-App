import { Dialog, DialogContent } from "@mui/material";
import React, { useState, useEffect } from "react";
import LeftModal from "./LeftModal";
import RightModal from "./RightModal";
import { UseMutateFunction } from "@tanstack/react-query";

interface FeedModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  feed: any;
  selectedIndex: number;
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
  likeNumber: number;
  setLikeNumber: React.Dispatch<any>;
  mutate: UseMutateFunction<any, Error, any, unknown>;
  commentMutate: UseMutateFunction<any, Error, any, unknown>;
  profile: boolean;
  commentDeleteMutate: UseMutateFunction<any, Error, any, unknown>
}

const FeedModal: React.FC<FeedModalProps> = ({
  modalOpen,
  setModalOpen,
  feed,
  selectedIndex,
  isLiked,
  setIsLiked,
  likeNumber,
  setLikeNumber,
  mutate,
  commentMutate,
  profile,
  commentDeleteMutate
}) => {
  //! States

  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs
  // if(modalOpen) {console.log("feed", feed)}
  //*

  return (
    <Dialog
      PaperProps={{
        sx: {
          borderRadius: "15px",
          padding: "0px",
          overflow: "hidden",
        },
      }}
      maxWidth="lg"
      fullWidth
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
      }}
    >
      <DialogContent
        sx={{
          display: { xs: "block", md: "flex" },
          padding: "0",
          overflow: { xs: "auto", md: "hidden" },
        }}
      >
        <LeftModal
          images={feed.feed.images}
          selectedIndex={selectedIndex}
          setModalOpen={setModalOpen}
        />
        <RightModal
          likeNumber={likeNumber}
          setLikeNumber={setLikeNumber}
          feed={feed}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          mutate={mutate}
          commentMutate={commentMutate}
          commentDeleteMutate = {commentDeleteMutate}
          profile={profile}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FeedModal;
