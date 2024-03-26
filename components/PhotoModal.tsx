import React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { useGeneral } from "@/contexts/GeneralContext";
import Image from "next/image";
import grayBg from "../public/images/grayBG.svg";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import { useUserDetail } from "@/contexts/UserDetailContext";

interface PhotoModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sizeToggle: "avatar" | "cover" | null;
}

const PhotoModal: React.FC<PhotoModalProps> = ({
  open,
  setOpen,
  sizeToggle,
}) => {
  //! States
  const { isMe } = useGeneral();
  const { avatar, cover } = useUserDetail();
  const Iavatar = Cookies.get("avatar");
  const Icover = Cookies.get("cover");
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: sizeToggle === "avatar" ? "300px" : "75%",
    height: sizeToggle === "avatar" ? "300px" : "42.329%",
  };
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs

  //*

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus
    >
      <Box
        onClick={() => {
          setOpen(false);
        }}
        sx={{ position: "relative", width: "100%", height: "100%" }}
      >
        <Box onClick={(e) => e.stopPropagation()} sx={style}>
          <figure
          // style={{
          //   width: sizeToggle === "avatar" ? 300 : 1600,
          //   height: sizeToggle === "avatar" ? 300 : 400,
          // }}
          >
            <Image
              className={`${
                sizeToggle === "avatar" ? "rounded-full" : "rounded-xl"
              }`}
              fill
              src={
                sizeToggle === "avatar"
                  ? isMe
                    ? Iavatar === "null"
                      ? null
                      : Iavatar
                    : avatar === null
                    ? null
                    : avatar
                  : isMe
                  ? Icover === "null"
                    ? grayBg
                    : Icover
                  : cover === null
                  ? grayBg
                  : cover
              }
              alt="avatar"
            />
          </figure>
        </Box>
        <button className="absolute top-5 right-5 cursor-pointer">
          <CloseIcon sx={{ color: "white", width: "40px", height: "40px" }} />
        </button>
      </Box>
    </Modal>
  );
};

export default PhotoModal;
