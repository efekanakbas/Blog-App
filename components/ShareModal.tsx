"use client";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import TagIcon from "@mui/icons-material/Tag";
import Man4Icon from "@mui/icons-material/Man4";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import Input from "./Input";
import { useFormik } from "formik";
import PlaceIcon from "@mui/icons-material/Place";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "@/utils/CRUD";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  pos1: boolean;
  pos2: boolean;
  pos3: boolean;
  pos4: boolean;
  pos5: boolean;
  inputShow: boolean;
  setPos1: Dispatch<SetStateAction<boolean>>;
  setPos2: Dispatch<SetStateAction<boolean>>;
  setPos3: Dispatch<SetStateAction<boolean>>;
  setPos4: Dispatch<SetStateAction<boolean>>;
  setPos5: Dispatch<SetStateAction<boolean>>;
  setInputShow: Dispatch<SetStateAction<boolean>>;
}

const ShareModal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  pos1,
  pos2,
  pos3,
  pos4,
  pos5,
  setPos1,
  setPos2,
  setPos3,
  setPos4,
  setPos5,
  inputShow,
  setInputShow,
}) => {
  //! States
  const avatar = Cookies.get("avatar");
  const username = Cookies.get("username");
  const [imagesPool, setImagesPool] = useState<File[]>([]);
  const [hashtagPool, setHashtagPool] = useState<string[]>([]);
  const [mentionPool, setMentionPool] = useState<string[]>([]);
  const [location, setLocation] = useState<string>("");
  const myRef = useRef(null);
  const myRef2 = useRef(null);
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const formData = new FormData();
  const [pdfFile, setPdfFile] = useState<any | null>(null);

  const { values, handleChange, handleReset, handleSubmit } = useFormik({
    initialValues: {
      inputValue: "",
    },
    onSubmit: (values) => {
      formData.append("text", value);
      imagesPool.map((item) => formData.append("images", item));
      formData.append("pdf", pdfFile)
      hashtagPool.map((item) => formData.append("hashtags", item));
      mentionPool.map((item) => formData.append("mentions", item));
      formData.append("location", location);
      mutate(formData);
      handleZero();
      setModalOpen(false);
    },
  });

  const memoizedImagesPool = useMemo(() => {
    return imagesPool.map((image, i) => (
      <figure className="relative  w-[150px] h-[150px] flex-shrink-0" key={i}>
        <CloseIcon
          onClick={() => {
            const updatedPool = imagesPool.filter((img) => img !== image);
            setImagesPool(updatedPool);
          }}
          color="error"
          sx={{ color: "white" }}
          className="absolute right-2 top-2 z-10  bg-red-600 rounded-full p-[1px] scale-110 cursor-pointer"
        />
        <Image
          className="object-cover rounded-xl"
          fill
          src={URL.createObjectURL(image)}
          alt="selam"
        />
      </figure>
    ));
  }, [imagesPool]);

  const { data, mutate, isPending } = useMutation({
    mutationKey: ["feeds"],
    mutationFn: (feeds: any) => {
      return postData("feeds", feeds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
    },
  });

  //!
  //todo Functions
  const uploadImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const files = event.target.files;
    if (files && files.length > 0) {
      // Seçilen dosyayı burada işleyebilirsiniz.
      const selectedImage = files[0];
      setImagesPool([...imagesPool, selectedImage]);
      fileInput.value = "";
    }
  };

  const inputClick = async () => {
    if (pdfFile) {
      document.body.style.overflow = "hidden";
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "If you upload image, your uploaded attachment will be deleted.",
        icon: "warning",
        customClass: {
          popup: "border-radius-15",
          confirmButton: "swalButton",
          cancelButton: "swalButton",
        },
        showCancelButton: true,
        confirmButtonColor: "#1976d2",
        cancelButtonColor: "#f44336",
        confirmButtonText: "Accept",
        backdrop: "rgba(0, 0, 0, 0.5)",
        didOpen: () => {
          document.body.style.overflow = "auto";
        },
      });
      //@ts-ignore
      if (result.isConfirmed) {
        setPdfFile(null);
        const fileInput = document.getElementById("fileInput");
        if (fileInput) {
          setTimeout(() => {
            fileInput.click();
          }, 0);
        } else {
          console.error("fileInput is null");
        }
      }
    } else {
      const fileInput = document.getElementById("fileInput");
      if (fileInput) {
        fileInput.click();
      } else {
        console.error("fileInput is null");
      }
    }
  };

  const handleScrollToBottom = () => {
    if (myRef.current) {
      // DOM güncellemesini bekleyin
      setTimeout(() => {
        //@ts-ignore
        myRef.current.scrollTop = myRef.current.scrollHeight;
      }, 0);
    }
  };

  const handleScrollToTop = () => {
    if (myRef.current) {
      //@ts-ignore
      myRef.current.scrollTop = 0;
    }
  };

  const handleHashtagFilter = (hashtag: string) => {
    const updatedHashtagPool = hashtagPool.filter((item) => item !== hashtag);
    setHashtagPool(updatedHashtagPool);
  };

  const handleMentionFilter = (mention: string) => {
    const updatedMentionPool = mentionPool.filter((item) => item !== mention);
    setMentionPool(updatedMentionPool);
  };

  const closeModal = () => {
    setTimeout(() => {
      setInputShow(false);
      setPos1(false);
      setPos2(false);
      setPos3(false);
      setPos4(false);
      setPos5(false);
      handleReset(values);
    }, 300);
  };

  const handleInput = () => {
    if (pos1) {
      const existingHashtag = hashtagPool.find(
        (hashtag) => hashtag === values.inputValue
      );

      if (existingHashtag) {
        toast.error("You can not entry same hashtag!");
      } else {
        setHashtagPool([...hashtagPool, values.inputValue]);
      }
    } else if (pos2) {
      const existingMention = mentionPool.find(
        (mention) => mention === values.inputValue
      );

      if (existingMention) {
        toast.error("You can not entry same mention!");
      } else {
        setMentionPool([...mentionPool, values.inputValue]);
      }
    } else if (pos3) {
      setLocation(values.inputValue);
    }
    handleReset(values);
    if (!pos3) {
      handleScrollToBottom();
    } else {
      handleScrollToTop();
    }
  };

  const handleZero = () => {
    handleReset(values);
    setValue("");
    setHashtagPool([]);
    setImagesPool([]);
    setMentionPool([]);
    setInputShow(false);
    setLocation("");
    setPdfFile(null)
  };

  //@ts-ignore
  const focus = () => setTimeout(myRef2?.current?.focus(), 0);

  const handleAttachment = async () => {
    if (imagesPool.length > 0) {
      document.body.style.overflow = "hidden";
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "If you upload attachment, your uploaded images will be deleted.",
        icon: "warning",
        customClass: {
          popup: "border-radius-15",
          confirmButton: "swalButton",
          cancelButton: "swalButton",
        },
        showCancelButton: true,
        confirmButtonColor: "#1976d2",
        cancelButtonColor: "#f44336",
        confirmButtonText: "Accept",
        backdrop: "rgba(0, 0, 0, 0.5)",
        didOpen: () => {
          document.body.style.overflow = "auto";
        },
      });
      //@ts-ignore
      if (result.isConfirmed) {
        setImagesPool([]);
        const attachmentInput = document.getElementById("attachmentInput");
        if (attachmentInput) {
          setTimeout(() => {
            attachmentInput.click();
          }, 0);
        } else {
          console.error("attachmentInput is null");
        }
      }
    } else {
      const attachmentInput = document.getElementById("attachmentInput");
      if (attachmentInput) {
        attachmentInput.click();
      } else {
        console.error("attachmentInput is null");
      }
    }
  };

  const uploadAttachmentHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("1");
    const fileInput = event.target;
    const files = event.target.files;
    if (files && files.length > 0) {
      // Seçilen dosyayı burada işleyebilirsiniz.
      const selectedImage = files[0];
      console.log("selectedImage", selectedImage);
      setPdfFile(selectedImage);
      fileInput.value = "";
    }
  };
  //todo
  //? useEffect
    useEffect(() => {
      if(pos4) {
        setTimeout(() => {
          handleAttachment()
        }, 0);
      } else if(pos5) {
        setTimeout(() => {
          inputClick()
        }, 0);
      }
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pos4, pos5])
  //?
  //* consoleLogs
  // console.log("values", values)
  // console.log("images", imagesPool)
  // console.log("HAshtag", hashtagPool)
  // console.log("mention", mentionPool)
  // console.log("local", location)
  // console.log("imagePool", imagesPool);
  // console.log("pdf", pdfFile);
  // console.log("pos4", pos4)
  // console.log("pos5", pos5)
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
      maxWidth="md"
      fullWidth
      open={modalOpen}
      onClose={() => {
        setModalOpen(!modalOpen);
        closeModal();
      }}
    >
      <DialogTitle className="flex justify-between p-5">
        <Typography sx={{ fontSize: "22px" }}>Create Post</Typography>
        <button
          onClick={() => {
            setModalOpen(!modalOpen);
            closeModal();
          }}
        >
          <CloseIcon />
        </button>
      </DialogTitle>
      <hr />
      <DialogContent
        ref={myRef}
        className="py-8 pb-[22px] overflow-auto  scrollBarHidden transition-all duration-300 "
      >
        <Box className="flex mb-8 gap-6 ml-[14px] items-center">
          <figure>
            <Avatar
              style={{ width: "70px", height: "70px" }}
              alt="User avatar"
              //@ts-ignore
              src={avatar === "null" ? null : avatar}
            />
          </figure>
          <Box className="flex flex-col">
            <Typography sx={{ fontWeight: "bold" }}>{username}</Typography>
            <Typography>{location}</Typography>
          </Box>
        </Box>
        <Box className="">
          <TextField
            name="textValue"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="w-full rounded-lg "
            id="standard-multiline-static"
            label="Share something..."
            multiline
            rows={7}
            variant="filled"
            sx={{
              "& .MuiFilledInput-root": {
                backgroundColor: "rgb(249, 250, 251)",
                "& .MuiInputBase-input": {
                  scrollbarWidth: "none", // Firefox için scrollbar'ı gizle
                  "::-webkit-scrollbar": {
                    display: "none", // WebKit tarayıcıları için scrollbar'ı gizle
                  },
                },
              },
            }}
          />
          {imagesPool.length > 0 && (
            <Box className="mt-8 flex gap-6 overflow-x-auto scrollBarStyled">
              {memoizedImagesPool}
              {imagesPool.length > 0 && imagesPool.length < 5 && (
                <button
                  onClick={inputClick}
                  className="w-[150px] h-[150px] rounded-xl bg-gray-200 flex-shrink-0"
                >
                  <AddIcon sx={{ color: "white", fontSize: "120px" }} />
                </button>
              )}
            </Box>
          )}
          {pdfFile && (
            <Box
              sx={{
                width: "100%",
                height: "50px",
                backgroundColor: "#F3F4F6",
                marginTop: "32px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <button
                onClick={() => {
                  setPdfFile(null);
                }}
                className="absolute right-3 top-3"
              >
                <CloseIcon />
              </button>
              <Typography className="text-blue-600">{pdfFile.name}</Typography>
            </Box>
          )}
          {hashtagPool.length > 0 && (
            <Box className="flex flex-col gap-4 mt-6  w-full">
              <Typography variant="h5">Hashtags</Typography>
              <Box className="flex gap-4 flex-wrap">
                {hashtagPool.map((hashtag, i) => (
                  <span
                    className="border border-blue-500 px-4 py-1 rounded-full text-blue-500 relative"
                    key={i}
                  >
                    <button
                      onClick={() => {
                        handleHashtagFilter(hashtag);
                      }}
                      className="absolute -top-1 -right-[1px] scale-[0.60]"
                    >
                      <CloseIcon color="error" />
                    </button>
                    #{hashtag}
                  </span>
                ))}
              </Box>
            </Box>
          )}

          {mentionPool.length > 0 && (
            <Box className="flex flex-col gap-4 mt-6  ">
              <Typography variant="h5">Mentions</Typography>
              <Box className="flex gap-4 flex-wrap">
                {mentionPool.map((mention, i) => (
                  <span
                    className="px-4 py-1 rounded-lg text-blue-500 bg-blue-200 relative"
                    key={i}
                  >
                    <button
                      onClick={() => {
                        handleMentionFilter(mention);
                      }}
                      className="absolute -top-1 -right-[2.5px] scale-[0.60]"
                    >
                      <CloseIcon color="error" />
                    </button>
                    {mention}
                  </span>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions
        sx={{ display: "flex", flexDirection: "column", padding: "8px 24px" }}
      >
        {inputShow && (
          <Box sx={{ width: "100%" }} className="mb-8 relative">
            <figure className="absolute left-[10px] top-[6.5px]">
              {pos1 ? (
                <TagIcon color="error" />
              ) : pos2 ? (
                <Man4Icon color="secondary" />
              ) : (
                <PlaceIcon color="info" />
              )}
            </figure>
            <button
              onClick={() => {
                setInputShow(false);
              }}
              className="absolute right-[10px] top-[6.5px] z-10"
            >
              <CloseIcon color="error" />
            </button>
            <form
              onSubmit={(event) => {
                event.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

                if (values.inputValue.length > 0) {
                  handleInput();
                }
              }}
            >
              <Input
                id="shareModalInput"
                onKeyDownHandler={undefined}
                disabled={false}
                sx={null}
                size="small"
                autoFocus={true}
                paddingLeft={true}
                type="text"
                value={values.inputValue}
                handleChange={handleChange}
                name="inputValue"
                placeholder="Type..."
                className="w-full"
                helperText=""
                error={false}
                handleBlur={null}
                ref={myRef2}
                handleSubmit={undefined}
              />
            </form>
          </Box>
        )}
        <Box
          sx={{ width: "100%", padding: "28px 0" }}
          className="flex  justify-evenly bg-gray-100 rounded-lg "
        >
          <Box
            onClick={() => imagesPool.length < 5 && inputClick()}
            className="flex gap-2 items-center cursor-pointer"
          >
            <input
              id="fileInput"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              style={{ display: "none" }}
              onChange={uploadImageHandler}
            />
            <figure className="scale450v2">
              <ImageIcon color="primary" />
            </figure>
            <Typography className="none450v2">Image</Typography>
          </Box>

          <Box onClick={handleAttachment} className="flex gap-1 cursor-pointer">
            <input
              id="attachmentInput"
              type="file"
              accept="application/pdf"
              style={{ display: "none" }}
              onChange={uploadAttachmentHandler}
            />
            <figure className="scale450v2">
              <AttachFileIcon color="warning" />
            </figure>
            <Typography className="none450v2">Attachment</Typography>
          </Box>

          <Box
            onClick={() => {
              setInputShow(true), setPos1(true), setPos2(false), setPos3(false);
              focus();
            }}
            className="flex gap-1 cursor-pointer"
          >
            <figure className="scale450v2">
              <TagIcon color="error" />
            </figure>
            <Typography className="none450v2">Hashtag</Typography>
          </Box>

          <Box
            onClick={() => {
              setInputShow(true), setPos1(false), setPos2(true), setPos3(false);
              focus();
            }}
            className="flex gap-1 cursor-pointer"
          >
            <figure className="scale450v2">
              <Man4Icon color="secondary" />
            </figure>
            <Typography className="none450v2">Mention</Typography>
          </Box>

          <Box
            onClick={() => {
              setInputShow(true), setPos1(false), setPos2(false), setPos3(true);
              focus();
            }}
            className="flex gap-1 cursor-pointer"
          >
            <figure className="scale450v2">
              <PlaceIcon color="info" />
            </figure>
            <Typography className="none450v2">Location</Typography>
          </Box>
        </Box>
        {/*@ts-ignore*/}
        <Button
          sx={{
            fontWeight: "bolder",
            marginTop: "32px",
            marginBottom: "32px",
            width: "100%",
            borderRadius: "200px",
            padding: "12px 0",
          }}
          className=" bg-slate-50"
          size="large"
          variant="outlined"
          onClick={handleSubmit}
          disabled={value.length < 1}
        >
          Share
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareModal;
