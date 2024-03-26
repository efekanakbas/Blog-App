import { Modal, Box, Button, Avatar } from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Cropper from "react-easy-crop";
import Cookies from "js-cookie";
import { getData, patchData } from "@/utils/CRUD";
import { useGeneral } from "@/contexts/GeneralContext";
import NextImage from "next/image";
import grayBg from "../public/images/grayBG.svg";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

interface CropModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sizeType: "avatar" | "cover" | null;
}

const CropModal: React.FC<CropModalProps> = ({ open, setOpen, sizeType }) => {
  //! States
  const params = useParams().username;
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    width: sizeType === "avatar" ? "50vw" : "70vw",
    height: "60vh",
    borderRadius: "16px",
  };

  const [image, setImage] = useState<null | string>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<HTMLImageElement | null>(
    null
  );
  const [croppedArea, setCroppedArea] = useState<any>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const avatar = Cookies.get("avatar");
  const cover = Cookies.get("cover");
  const formData = new FormData();
  const { setUseAvatar } = useGeneral();
  const { refetch } = useInfiniteQuery({
    queryKey: ["feedsOne"],
    queryFn: ({ pageParam }) => {
      return getData(`feeds/${params}?page=${pageParam}&limit=10`);
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
  //!
  //todo Functions
  const uploadImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Seçilen dosyayı burada işleyebilirsiniz.
      const selectedImage = files[0];
      const imageUrl = URL.createObjectURL(selectedImage);
      setCroppedImage(null);
      setImage(imageUrl);
    }
  };

  const inputClick = () => {
    //@ts-ignore
    document.getElementById("fileInput").click();
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedArea(croppedArea);
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleChange = () => {
    if (image && croppedArea && croppedAreaPixels) {
      const canvas = document.createElement("canvas");
      //@ts-ignore
      const img = new Image();
      img.src = image;

      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(
          img,
          croppedAreaPixels.x * scaleX,
          croppedAreaPixels.y * scaleY,
          croppedAreaPixels.width * scaleX,
          croppedAreaPixels.height * scaleY,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        canvas.toBlob(async (blob) => {
          if (blob) {
            if (sizeType === "avatar") {
              formData.append("avatar", blob, "avatar.jpg");
              const response = await patchData("avatar", formData);
              Cookies.set("avatar", response.images[0]);
              setUseAvatar(response.images[0]);
              refetch();
              handleClose();
            } else {
              formData.append("cover", blob, "cover.jpg");
              const response = await patchData("cover", formData);
              Cookies.set("cover", response.images[0]);
              handleClose();
            }
          }
        }, "image/jpeg");
      }

      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCroppedArea(null);
    setCroppedAreaPixels(null);
    //   setCroppedImage(null)
    setImage(null);
  };

  const onCropChangeMemo = useMemo(() => {
    return (newCrop: any) => {
      setCrop(newCrop);
    };
  }, []);

  //todo
  //? useEffect

  //?
  //* consoleLogs
  console.log("params", params);
  //*

  return (
    <Modal
      open={open}
      //@ts-ignore
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus
    >
      <Box
        onClick={handleClose}
        sx={{ position: "relative", width: "100%", height: "100%" }}
      >
        <Box onClick={(e) => e.stopPropagation()} sx={style}>
          <Box
            sx={{
              height: "80%",
              padding: "24px",
              paddingBottom: "0px",
              borderRadius: "16px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {image ? (
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={sizeType === "avatar" ? 1 : 1098.5 / 250}
                  onCropChange={onCropChangeMemo}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              ) : sizeType === "avatar" ? (
                <Avatar
                  sx={{ width: "250px", height: "250px" }}
                  alt="avatar"
                  //@ts-ignore
                  src={croppedImage ? croppedImage.src : avatar === "null" ? null : avatar}
                />
              ) : (
                <NextImage
                  className={`rounded-lg object-cover ${
                    cover === "null" ? "cursor-default" : "cursor-pointer"
                  }`}
                  src={
                    croppedImage
                      ? croppedImage.src
                      : cover === "null"
                      ? grayBg
                      : cover
                  }
                  alt="cover photo"
                  fill
                />
              )}
            </Box>
          </Box>
          <Box
            sx={{
              height: "20%",
              display: "flex",
              gap: "12px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => {
                inputClick();
              }}
              color="error"
              variant="outlined"
              style={{ borderRadius: "100px", height: "50px", width: "152px" }}
            >
              <ImageIcon sx={{ marginRight: "8px" }} /> Choose
              <input
                id="fileInput"
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                style={{ display: "none" }}
                onChange={uploadImageHandler}
              />
            </Button>
            <Button
              onClick={handleChange}
              variant="outlined"
              style={{ borderRadius: "100px", height: "50px", width: "152px" }}
            >
              <CloudUploadIcon sx={{ marginRight: "8px" }} /> Change
            </Button>
          </Box>
        </Box>
        <button className="absolute top-5 right-5 cursor-pointer">
          <CloseIcon sx={{ color: "white", width: "40px", height: "40px" }} />
        </button>
      </Box>
    </Modal>
  );
};

export default CropModal;
