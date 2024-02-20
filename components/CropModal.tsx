import { Modal, Box, Button, Avatar } from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Cropper from "react-easy-crop";
import { useGeneral } from "@/contexts/GeneralContext";

interface CropModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sizeType: 'avatar' | 'cover' | null
}

const CropModal: React.FC<CropModalProps> = ({ open, setOpen, sizeType }) => {
  //! States
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    width: sizeType === 'avatar' ? "50vw" : "70vw",
    height: "60vh",
    borderRadius: "16px",
  };

  const [image, setImage] = useState< null | string>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const { avatar, setAvatar } = useGeneral();

  const [croppedImage, setCroppedImage] = useState<HTMLImageElement | null>(null);
  const [croppedArea, setCroppedArea] = useState<any>(null); 
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null); 
  
  //!
  //todo Functions
  const uploadImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Seçilen dosyayı burada işleyebilirsiniz.
      const selectedImage = files[0];
      const imageUrl = URL.createObjectURL(selectedImage);
      setCroppedImage(null)
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
  }
   
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

        const croppedImageUrl = canvas.toDataURL("image/jpeg"); 
        const newPreviewImage = new Image();
        newPreviewImage.src = croppedImageUrl;
        setCroppedImage(newPreviewImage);
      }
     
      handleClose()
    }
  };

  const handleClose = () => {
    setOpen(false)
      setCroppedArea(null)
      setCroppedAreaPixels(null)
    //   setCroppedImage(null)
      setImage(null)
  }

  const onCropChangeMemo = useMemo(() => {
    return (newCrop: any) => {
      setCrop(newCrop);
    };
  }, []);
  
  //todo
  //? useEffect
  useEffect(() => {
    if (croppedImage && croppedImage.src) {
        localStorage.setItem('avatar', croppedImage.src);
        setAvatar(croppedImage.src)
      }
  }, [croppedImage, setAvatar]);
  //?
  //* consoleLogs
  
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
                  aspect={1}
                  onCropChange={onCropChangeMemo}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              ) : (
                <Avatar
                  sx={{ width: "250px", height: "250px" }}
                  alt="avatar"
                  src={croppedImage ? croppedImage.src : avatar}
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
              onClick={() => {inputClick()}}
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
